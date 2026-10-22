import { Texture, type Application } from 'pixi.js';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { FocusEvent } from '@habbo-pixi/runtime/events/FocusEvent';
import { KeyboardEvent } from '@habbo-pixi/runtime/events/KeyboardEvent';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { startTimer, stopTimer } from '@habbo-pixi/runtime/runtime/clock';
import { recordFrame, recordInput } from '@habbo-pixi/runtime/runtime/frameStats';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { Mouse } from '@habbo-pixi/runtime/ui/Mouse';
import { DisplayObject, displayState } from './DisplayObject';
import { DisplayObjectContainer } from './DisplayObjectContainer';
import { frameBroadcast } from './frameLoop';
import { InteractiveObject } from './InteractiveObject';
import { LoaderInfo } from './LoaderInfo';
import { NativeWindow } from './NativeWindow';
import { rootHook } from './rootHook';
import { Sprite } from './Sprite';
import { runBeforeRender, setRedraw } from './renderHooks';
import { setBitmapRenderer } from './gpuSurface';
import { warmUpFilters } from '@habbo-pixi/runtime/filters/gpu/warmUpFilters';

/** Text inputs register here so the stage can show a text cursor over them and route focus. */
export interface FocusTarget {
    focusIn(): void;
    focusOut(): void;
    readonly acceptsTextInput: boolean;
}

/**
 * The root of the display list, drawn into the PIXI application's canvas. It runs the frame loop
 * and turns browser pointer and keyboard input into mouse and keyboard events on display objects.
 */
export class Stage extends DisplayObjectContainer {
    readonly isStage = true;
    readonly nativeWindow: NativeWindow;
    align = '';
    scaleMode = 'showAll';
    quality = 'high';
    stageFocusRect = true;

    readonly #app: Application;
    #frameRate = 24;
    /** Frames run on every screen refresh (see runAtDisplayRate), not at frameRate. */
    #displayPaced = false;
    #nextFrame = 0;
    #lastFrame = 0;
    #redrawRequested = false;
    /** The worker clock that runs the frames when the screen's refreshes stop coming (runtime/clock.ts). */
    #watchdog: number | null = null;
    /** When the last screen refresh came. */
    #lastRefresh = 0;
    #invalidated = false;
    #focus: InteractiveObject | null = null;
    #mouse = new Point();
    #buttonDown = false;
    #over: InteractiveObject | DisplayObject | null = null;
    #downTarget: DisplayObject | null = null;
    #lastClick: { target: DisplayObject; time: number } | null = null;
    #cursor = 'default';
    #cursorOverride: string | null = null;

    constructor(app: Application) {
        super(app.stage);
        this.#app = app;
        this.nativeWindow = new NativeWindow();
        this.#listen(app.canvas);
        Mouse.apply = cursor => this.setCursorOverride(cursor);
        window.addEventListener('resize', () => runGuarded(() => this.#resize()));
        setRedraw(() => this.requestRedraw());
        // bitmaps draw on the GPU with the stage's renderer
        setBitmapRenderer(app.renderer);
        // the filters' shaders are built now, while loading, not when something first uses one
        warmUpFilters(app.renderer);
    }

    /**
     * Construct the application's root object on this stage. It is on the stage, with the
     * application's LoaderInfo, from the start of its own constructor.
     */
    createRoot<T extends DisplayObject>(RootClass: new () => T): T {
        rootHook.offer(this, root => LoaderInfo.forApplication(root as DisplayObject));
        try {
            return new RootClass();
        } finally {
            rootHook.clear();
        }
    }

    // ---------- properties ----------

    get stageWidth(): number {
        return this.#app.renderer.screen.width;
    }

    get stageHeight(): number {
        return this.#app.renderer.screen.height;
    }

    get frameRate(): number {
        return this.#frameRate;
    }

    set frameRate(value: number) {
        this.#frameRate = Math.max(0.01, Math.min(1000, value));
        // the client choosing a frame rate (the :fps command) holds the frames to it
        this.#displayPaced = false;
        if (this.#watchdog !== null) this.#startWatchdog();
    }

    /**
     * Run a frame on every screen refresh, as Habbo's own web client does (its ticker is unlimited until the stage's
     * frame rate is changed), while frameRate keeps saying what the SWF declared: on a display faster than the frame
     * rate, a dragged window, or anything else following the pointer, keeps up with the cursor instead of trailing
     * it. The client's timing is by the clock, not by frames, so it runs as fast at any rate. Setting frameRate ends
     * it.
     */
    runAtDisplayRate(): void {
        this.#displayPaced = true;
    }

    /** 'normal', 'fullScreen' or 'fullScreenInteractive' (the browser's fullscreen mode). */
    get displayState(): string {
        return document.fullscreenElement ? 'fullScreenInteractive' : 'normal';
    }

    set displayState(value: string) {
        if (value === 'normal') { if (document.fullscreenElement) void document.exitFullscreen(); }
        else if (!document.fullscreenElement) void document.documentElement.requestFullscreen();
    }

    /** The object keyboard events go to (null: the stage itself). */
    get focus(): InteractiveObject | null {
        return this.#focus;
    }

    /** Setting it tells the old object (focusOut) and the new one (focusIn), after the change. */
    set focus(value: InteractiveObject | null) {
        if (value === this.#focus) return;
        const old = this.#focus;
        this.#focus = value;
        if (isFocusTarget(old)) old.focusOut();
        if (isFocusTarget(value)) value.focusIn();
        if (old) old.dispatchEvent(new FocusEvent(FocusEvent.FOCUS_OUT, true, false, value));
        if (value && this.#focus === value) value.dispatchEvent(new FocusEvent(FocusEvent.FOCUS_IN, true, false, old));
    }

    /** Ask for a render event before the next frame is drawn. */
    invalidate(): void {
        this.#invalidated = true;
    }

    /** The pointer position in stage coordinates. */
    mousePosition(): Point {
        return this.#mouse.clone();
    }

    /** A cursor forced by the application (null: follow what the pointer is over). */
    setCursorOverride(cursor: string | null): void {
        this.#cursorOverride = cursor;
        this.#applyCursor();
    }

    override get width(): number {
        return this.getBounds(this).width;
    }

    override get height(): number {
        return this.getBounds(this).height;
    }

    // ---------- frame loop ----------

    /**
     * Start running frames (enterFrame → frameConstructed → exitFrame → render → draw) on the
     * screen's refreshes. The browser slows those down or stops them for a page in the background
     * (another tab, a covered, minimised or unfocused window), not always saying it is hidden; the
     * desktop app ran on there. So a worker clock watches: when no refresh has come for two frames,
     * it runs the frame itself (drawing it only if the page can be seen).
     */
    start(): void {
        this.#nextFrame = this.#lastRefresh = performance.now();
        const refresh = (now: number) => {
            this.#lastRefresh = performance.now();
            this.#tick(now, true);
            requestAnimationFrame(refresh);
        };
        requestAnimationFrame(refresh);
        this.#startWatchdog();
    }

    #startWatchdog(): void {
        if (this.#watchdog !== null) stopTimer(this.#watchdog);
        const interval = 1000 / this.#frameRate;
        this.#watchdog = startTimer(interval, true, () => {
            const now = performance.now();
            if (now - this.#lastRefresh > 2 * interval) this.#tick(now, !document.hidden);
        });
    }

    #tick(now: number, draw: boolean): void {
        if (this.#displayPaced && draw) {
            this.#lastFrame = now;
            this.#nextFrame = now;
            this.#redrawRequested = false;
            this.#frame(draw);
            return;
        }
        const interval = 1000 / this.#frameRate;
        // a screen refresh a little before the frame is due still runs it: at a frame rate equal
        // to the refresh rate, timing noise would otherwise skip every other frame
        if (now >= this.#nextFrame - Math.min(4, interval / 4) && now - this.#lastFrame >= interval / 2) {
            this.#lastFrame = now;
            // skip missed frames rather than bursting through them
            this.#nextFrame = Math.max(this.#nextFrame + interval, now - interval);
            this.#redrawRequested = false;
            this.#frame(draw);
        } else if (this.#redrawRequested && draw) {
            this.#redrawRequested = false;
            runGuarded(() => this.#draw());
        }
    }

    /**
     * Show changes on the next screen refresh rather than the next frame (the player redraws after
     * text entry, and after events whose handlers call updateAfterEvent()). No frame events run.
     */
    requestRedraw(): void {
        this.#redrawRequested = true;
    }

    #draw(): void {
        // bitmaps last: re-rasterised content may draw from them
        runBeforeRender(this.#app.renderer.resolution);
        this.#app.render();
    }

    #frame(draw: boolean): void {
        const start = performance.now();
        frameBroadcast.dispatch(Event.ENTER_FRAME);
        frameBroadcast.dispatch(Event.FRAME_CONSTRUCTED);
        frameBroadcast.dispatch(Event.EXIT_FRAME);
        if (this.#invalidated) {
            this.#invalidated = false;
            frameBroadcast.dispatch(Event.RENDER);
        }
        const updated = performance.now();
        // (hidden: nothing to show; the next refresh draws)
        if (draw) runGuarded(() => this.#draw());
        const drawn = performance.now();
        recordFrame(drawn, updated - start, drawn - updated, this.#frameRate);
    }

    #resize(): void {
        this.#releaseFilterInputs();
        // the renderer takes the window's size now (it would only on the next frame), so the
        // resize listeners read the new stageWidth / stageHeight
        this.#app.resize();
        this.dispatchEvent(new Event(Event.RESIZE));
    }

    /**
     * A resize has PIXI's texture pool destroy the idle textures sized to the old screen, but the
     * filter system keeps the last one it filtered through bound (and warns when it is destroyed).
     * Nothing draws from it until the next filter binds its own, so it is let go first.
     */
    #releaseFilterInputs(): void {
        const group = (this.#app.renderer as unknown as { filter?: { _globalFilterBindGroup?: { resources: Record<number, unknown>; setResource(r: unknown, i: number): void } } })
            .filter?._globalFilterBindGroup;
        if (!group) return;
        const empty = Texture.EMPTY.source;
        if (group.resources[1]) group.setResource(empty, 1);
        if (group.resources[2]) group.setResource(empty.style, 2);
        if (group.resources[3]) group.setResource(empty, 3);
    }

    // ---------- input ----------

    /** Handle one browser input event (timed for the frame stats). */
    #input(handle: () => void): void {
        const start = performance.now();
        runGuarded(handle);
        recordInput(performance.now() - start);
    }

    #listen(canvas: HTMLCanvasElement): void {
        canvas.addEventListener('pointermove', e => this.#input(() => this.#pointerMove(e)));
        canvas.addEventListener('pointerdown', e => this.#input(() => this.#pointerDown(e)));
        window.addEventListener('pointerup', e => this.#input(() => this.#pointerUp(e)));
        canvas.addEventListener('wheel', e => this.#input(() => this.#wheel(e)), { passive: true });
        canvas.addEventListener('pointerleave', () => runGuarded(() => {
            this.#setOver(null, new MouseEvent(MouseEvent.MOUSE_OUT));
            this.dispatchEvent(new Event(Event.MOUSE_LEAVE));
        }));
        canvas.addEventListener('contextmenu', e => e.preventDefault());
        // the stage decides focus itself (a clicked input field focuses its text box); the browser's
        // own mousedown focus change would take that focus straight back
        canvas.addEventListener('mousedown', e => e.preventDefault());
        window.addEventListener('keydown', e => this.#input(() => this.#key(KeyboardEvent.KEY_DOWN, e)));
        window.addEventListener('keyup', e => this.#input(() => this.#key(KeyboardEvent.KEY_UP, e)));
        window.addEventListener('focus', () => runGuarded(() => frameBroadcast.dispatch(Event.ACTIVATE)));
        window.addEventListener('blur', () => runGuarded(() => frameBroadcast.dispatch(Event.DEACTIVATE)));
    }

    #stagePoint(e: PointerEvent | WheelEvent): Point {
        const r = this.#app.canvas.getBoundingClientRect();
        const s = this.#app.renderer.screen;
        return new Point((e.clientX - r.left) * (s.width / r.width), (e.clientY - r.top) * (s.height / r.height));
    }

    /** A mouse event at the current pointer position, local to `target`. */
    #mouseEvent(type: string, target: DisplayObject, e: { ctrlKey: boolean; altKey: boolean; shiftKey: boolean }, related: DisplayObject | null = null, delta = 0, bubbles = true): MouseEvent {
        const local = target.globalToLocal(this.#mouse);
        return new MouseEvent(type, bubbles, false, local.x, local.y, related, e.ctrlKey, e.altKey, e.shiftKey, this.#buttonDown, delta);
    }

    #pointerMove(e: PointerEvent): void {
        this.#mouse = this.#stagePoint(e);
        const target = this.#targetAt(this.#mouse) ?? this;
        this.#setOver(target, e);
        target.dispatchEvent(this.#mouseEvent(MouseEvent.MOUSE_MOVE, target, e));
    }

    #pointerDown(e: PointerEvent): void {
        this.#mouse = this.#stagePoint(e);
        if (e.button !== 0) {
            const target = this.#targetAt(this.#mouse) ?? this;
            const type = e.button === 2 ? MouseEvent.RIGHT_MOUSE_DOWN : MouseEvent.MIDDLE_MOUSE_DOWN;
            if (target.willTrigger(type)) target.dispatchEvent(this.#mouseEvent(type, target, e));
            return;
        }
        this.#buttonDown = true;
        const target = this.#targetAt(this.#mouse) ?? this;
        this.#setOver(target, e);
        this.#downTarget = target;
        // clicking a text input focuses it; clicking anything else takes focus away from one. The
        // focused object (the stage when nothing is) hears of it first (mouseFocusChange) and can
        // cancel it; a focus manager can hand focus back when it goes to nothing
        const next = target instanceof InteractiveObject && isFocusTarget(target) && target.acceptsTextInput ? target
            : isFocusTarget(this.#focus) && this.#focus.acceptsTextInput ? null : this.#focus;
        if (next !== this.#focus || this.#focus === null) {
            const change = new FocusEvent(FocusEvent.MOUSE_FOCUS_CHANGE, true, true, next);
            (this.#focus?.stage === this ? this.#focus : this).dispatchEvent(change);
            if (!change.isDefaultPrevented()) this.focus = next;
        }
        target.dispatchEvent(this.#mouseEvent(MouseEvent.MOUSE_DOWN, target, e));
    }

    #pointerUp(e: PointerEvent): void {
        if (e.target === this.#app.canvas) this.#mouse = this.#stagePoint(e);
        if (e.button !== 0) {
            const target = this.#targetAt(this.#mouse) ?? this;
            const type = e.button === 2 ? MouseEvent.RIGHT_MOUSE_UP : MouseEvent.MIDDLE_MOUSE_UP;
            if (target.willTrigger(type)) target.dispatchEvent(this.#mouseEvent(type, target, e));
            if (e.button === 2 && target.willTrigger(MouseEvent.RIGHT_CLICK)) target.dispatchEvent(this.#mouseEvent(MouseEvent.RIGHT_CLICK, target, e));
            return;
        }
        if (!this.#buttonDown) return;
        this.#buttonDown = false;
        const target = e.target === this.#app.canvas ? this.#targetAt(this.#mouse) ?? this : null;
        const down = this.#downTarget;
        this.#downTarget = null;
        if (target) target.dispatchEvent(this.#mouseEvent(MouseEvent.MOUSE_UP, target, e));
        if (down && target !== down) {
            down.dispatchEvent(this.#mouseEvent(MouseEvent.RELEASE_OUTSIDE, down, e));
            return;
        }
        if (!target) return;
        const now = performance.now();
        const last = this.#lastClick;
        const isDouble = last && last.target === target && now - last.time < 500
            && target instanceof InteractiveObject && target.doubleClickEnabled;
        if (isDouble) {
            this.#lastClick = null;
            target.dispatchEvent(this.#mouseEvent(MouseEvent.DOUBLE_CLICK, target, e));
        } else {
            this.#lastClick = { target, time: now };
            target.dispatchEvent(this.#mouseEvent(MouseEvent.CLICK, target, e));
        }
    }

    #wheel(e: WheelEvent): void {
        this.#mouse = this.#stagePoint(e);
        const target = this.#targetAt(this.#mouse) ?? this;
        const lines = e.deltaMode === 1 ? e.deltaY : e.deltaY / 33.3;
        const delta = lines === 0 ? 0 : -Math.sign(lines) * Math.max(1, Math.round(Math.abs(lines)));
        target.dispatchEvent(this.#mouseEvent(MouseEvent.MOUSE_WHEEL, target, e, null, delta));
    }

    #key(type: string, e: globalThis.KeyboardEvent): void {
        const target: DisplayObject = this.#focus?.stage === this ? this.#focus : this;
        const charCode = e.key.length === 1 ? e.key.charCodeAt(0) : SPECIAL_CHARS[e.key] ?? 0;
        target.dispatchEvent(new KeyboardEvent(type, true, false, charCode, e.keyCode, e.location, e.ctrlKey, e.altKey, e.shiftKey, e.ctrlKey, e.metaKey));
    }

    /** Move the pointer onto `target`: mouseOut / rollOut for what it left, mouseOver / rollOver for what it entered. */
    #setOver(target: DisplayObject | null, e: { ctrlKey: boolean; altKey: boolean; shiftKey: boolean }): void {
        const old = this.#over;
        if (old === target) return;
        this.#over = target;
        const chain = (o: DisplayObject | null) => { const c: DisplayObject[] = []; for (let p = o; p; p = p.parent) c.push(p); return c; };
        const oldChain = chain(old), newChain = chain(target);
        if (old) {
            old.dispatchEvent(this.#mouseEvent(MouseEvent.MOUSE_OUT, old, e, target));
            for (const o of oldChain) if (!newChain.includes(o)) o.dispatchEvent(this.#mouseEvent(MouseEvent.ROLL_OUT, o, e, target, 0, false));
        }
        if (target) {
            target.dispatchEvent(this.#mouseEvent(MouseEvent.MOUSE_OVER, target, e, old));
            for (const o of [...newChain].reverse()) if (!oldChain.includes(o)) o.dispatchEvent(this.#mouseEvent(MouseEvent.ROLL_OVER, o, e, old, 0, false));
        }
        this.#applyCursor();
    }

    #applyCursor(): void {
        let cursor = 'default';
        for (let o: DisplayObject | null = this.#over; o; o = o.parent) {
            if (isFocusTarget(o) && o.acceptsTextInput) { cursor = 'text'; break; }
            if (o instanceof Sprite && o.buttonMode && o.useHandCursor) { cursor = 'pointer'; break; }
        }
        cursor = this.#cursorOverride ?? cursor;
        if (cursor !== this.#cursor) {
            this.#cursor = cursor;
            this.#app.canvas.style.cursor = cursor;
        }
    }

    /**
     * The object mouse events at `p` go to: the top-most interactive object under the point whose
     * ancestors let their children receive events. A hit on non-interactive content (a shape or
     * bitmap) goes to the nearest container that accepts mouse events.
     */
    #targetAt(p: Point): DisplayObject | null {
        const r = pick(this, p);
        return r === HIT_NON_INTERACTIVE ? null : r;
    }

    protected override localBounds(): Rectangle {
        return super.localBounds();
    }
}

const HIT_NON_INTERACTIVE = Symbol('hit');
type Pick = DisplayObject | typeof HIT_NON_INTERACTIVE | null;

function pick(container: DisplayObjectContainer, p: Point): Pick {
    const children = container.childList();
    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (!child.visible || displayState.isMaskOf(child)) continue;
        if (child.mask && !child.mask.hitTestPoint(p.x, p.y, true)) continue;
        if (child.clippedAt(p.x, p.y)) continue;
        const hitArea = child instanceof Sprite ? child.hitArea : null;
        if (child instanceof DisplayObjectContainer) {
            if (!child.mouseChildren) {
                const hit = hitArea ? hitArea.hitTestPoint(p.x, p.y, true) : child.hitTestPoint(p.x, p.y, true);
                if (hit) return child.mouseEnabled ? child : resolve(container);
                continue;
            }
            const inner = pick(child, p);
            if (inner === HIT_NON_INTERACTIVE) return child.mouseEnabled ? child : resolve(container);
            if (inner) return inner;
            if (hitArea ? hitArea.hitTestPoint(p.x, p.y, true) : child.hitTestContent(p.x, p.y)) {
                return child.mouseEnabled ? child : resolve(container);
            }
            continue;
        }
        if (child.hitTestContent(p.x, p.y)) {
            if (child instanceof InteractiveObject) return child.mouseEnabled ? child : resolve(container);
            return HIT_NON_INTERACTIVE;
        }
    }
    return null;
}

/** A hit that the child itself doesn't take goes to the container, or further up. */
function resolve(container: DisplayObjectContainer): Pick {
    return container.mouseEnabled && !(container as { isStage?: boolean }).isStage ? container : HIT_NON_INTERACTIVE;
}

function isFocusTarget(o: unknown): o is FocusTarget & DisplayObject {
    return o != null && typeof (o as FocusTarget).focusIn === 'function' && 'acceptsTextInput' in (o as object);
}

/** Character codes for keys that type a control character. */
const SPECIAL_CHARS: Record<string, number> = { Enter: 13, Backspace: 8, Tab: 9, Escape: 27, Delete: 127 };
