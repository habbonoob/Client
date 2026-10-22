import { requestRedraw } from '@habbo-pixi/runtime/display/renderHooks';
import { Event } from './Event';

/**
 * localX/localY are relative to the target; stageX/stageY are derived from
 * them through the target's transform (NaN while the event has no display-object target).
 */
export class MouseEvent extends Event {
    static readonly CLICK: string = 'click';
    static readonly CONTEXT_MENU: string = 'contextMenu';
    static readonly DOUBLE_CLICK: string = 'doubleClick';
    static readonly MIDDLE_CLICK: string = 'middleClick';
    static readonly MIDDLE_MOUSE_DOWN: string = 'middleMouseDown';
    static readonly MIDDLE_MOUSE_UP: string = 'middleMouseUp';
    static readonly MOUSE_DOWN: string = 'mouseDown';
    static readonly MOUSE_MOVE: string = 'mouseMove';
    static readonly MOUSE_OUT: string = 'mouseOut';
    static readonly MOUSE_OVER: string = 'mouseOver';
    static readonly MOUSE_UP: string = 'mouseUp';
    static readonly MOUSE_WHEEL: string = 'mouseWheel';
    static readonly RELEASE_OUTSIDE: string = 'releaseOutside';
    static readonly RIGHT_CLICK: string = 'rightClick';
    static readonly RIGHT_MOUSE_DOWN: string = 'rightMouseDown';
    static readonly RIGHT_MOUSE_UP: string = 'rightMouseUp';
    static readonly ROLL_OUT: string = 'rollOut';
    static readonly ROLL_OVER: string = 'rollOver';

    localX: number;
    localY: number;
    relatedObject: any;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    buttonDown: boolean;
    delta: number;
    commandKey: boolean;
    controlKey: boolean;
    clickCount: number;

    constructor(
        type: string, bubbles: boolean = true, cancelable: boolean = false, localX: number = NaN, localY: number = NaN,
        relatedObject: any = null, ctrlKey: boolean = false, altKey: boolean = false, shiftKey: boolean = false,
        buttonDown: boolean = false, delta: number = 0, commandKey: boolean = false, controlKey: boolean = false, clickCount: number = 0,
    ) {
        super(type, bubbles, cancelable);
        this.localX = localX;
        this.localY = localY;
        this.relatedObject = relatedObject;
        this.ctrlKey = ctrlKey;
        this.altKey = altKey;
        this.shiftKey = shiftKey;
        this.buttonDown = buttonDown;
        this.delta = delta;
        this.commandKey = commandKey;
        this.controlKey = controlKey;
        this.clickCount = clickCount;
    }

    get stageX(): number {
        return this.#stagePoint()?.x ?? NaN;
    }

    get stageY(): number {
        return this.#stagePoint()?.y ?? NaN;
    }

    #stagePoint(): { x: number; y: number } | null {
        const t = this.target as { localToGlobal?: (p: { x: number; y: number }) => { x: number; y: number } } | null;
        return t?.localToGlobal ? t.localToGlobal({ x: this.localX, y: this.localY }) : null;
    }

    /** Request a redraw after the handler; the renderer already redraws every frame, so there is nothing to do. */
    /** Show what the handler changed on the next screen refresh rather than the next frame. */
    updateAfterEvent(): void {
        requestRedraw();
    }

    override clone(): Event {
        return new MouseEvent(this.type, this.bubbles, this.cancelable, this.localX, this.localY, this.relatedObject, this.ctrlKey,
            this.altKey, this.shiftKey, this.buttonDown, this.delta, this.commandKey, this.controlKey, this.clickCount);
    }

    override toString(): string {
        return this.formatToString('MouseEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'localX', 'localY', 'stageX', 'stageY',
            'relatedObject', 'ctrlKey', 'altKey', 'shiftKey', 'buttonDown', 'delta');
    }
}
