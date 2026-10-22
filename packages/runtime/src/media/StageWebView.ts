import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { LocationChangeEvent } from '@habbo-pixi/runtime/events/LocationChangeEvent';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';

/**
 * A web page shown over the stage, in an iframe at `viewPort` (stage coordinates). It is visible
 * while `stage` is set.
 */
export class StageWebView extends EventDispatcher {
    static readonly isSupported = true;

    readonly #frame: HTMLIFrameElement;
    #stage: Stage | null = null;
    #viewPort: Rectangle | null = null;
    #location = '';

    constructor(useNative: boolean = false, mediaPlaybackRequiresUserAction: boolean = true) {
        super();
        void useNative;
        void mediaPlaybackRequiresUserAction;
        const f = document.createElement('iframe');
        Object.assign(f.style, { position: 'fixed', border: '0', display: 'none' });
        f.addEventListener('load', () => runGuarded(() => {
            this.dispatchEvent(new LocationChangeEvent(LocationChangeEvent.LOCATION_CHANGE, false, false, this.#location));
            this.dispatchEvent(new Event(Event.COMPLETE));
        }));
        this.#frame = f;
    }

    get location(): string {
        return this.#location;
    }

    get stage(): Stage | null {
        return this.#stage;
    }

    set stage(value: Stage | null) {
        this.#stage = value;
        if (value && !this.#frame.isConnected) document.body.appendChild(this.#frame);
        this.#frame.style.display = value ? 'block' : 'none';
        this.#place();
    }

    get viewPort(): Rectangle | null {
        return this.#viewPort ? this.#viewPort.clone() : null;
    }

    set viewPort(value: Rectangle | null) {
        this.#viewPort = value ? value.clone() : null;
        this.#place();
    }

    loadURL(url: string): void {
        this.#location = url;
        this.#frame.src = url;
    }

    reload(): void {
        this.#frame.src = this.#location;
    }

    dispose(): void {
        this.#frame.remove();
        this.#stage = null;
    }

    #place(): void {
        const vp = this.#viewPort;
        if (!vp) return;
        const canvas = document.querySelector('canvas');
        const r = canvas?.getBoundingClientRect();
        const sx = r && this.#stage ? r.width / this.#stage.stageWidth : 1;
        const sy = r && this.#stage ? r.height / this.#stage.stageHeight : 1;
        Object.assign(this.#frame.style, {
            left: `${(r?.left ?? 0) + vp.x * sx}px`, top: `${(r?.top ?? 0) + vp.y * sy}px`,
            width: `${vp.width * sx}px`, height: `${vp.height * sy}px`,
        });
    }
}
