import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IEventQueue } from '@/com/sulake/core/window/utils/IEventQueue';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GenericEventQueue implements IEventQueue, IDisposable {
    static { registerClassName(this, 'com.sulake.core.window.utils::GenericEventQueue'); }

    constructor(param1: IEventDispatcher) {
        this._eventArray = [];
        this._SafeStr_2546 = param1;
    }

    declare protected _SafeStr_2546: IEventDispatcher;

    declare protected _eventArray: Event[];

    protected _index: number = 0;
    protected _SafeStr_4848: boolean = true;
    protected _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get length(): number {
        return this._eventArray.length;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_2546 = null;
            if (this._eventArray.length) {
                this._eventArray.splice(0, this._eventArray.length);
            }
            this._disposed = true;
        }
    }

    public begin(): void {
        if (!this._SafeStr_4848) {
            this.flush();
        }
        this._index = 0;
        this._SafeStr_4848 = false;
    }

    public next(): Event {
        let _loc1_: Event = null;
        if (this._index < this._eventArray.length) {
            _loc1_ = this._eventArray[this._index];
            this._index = this._index + 1 >>> 0;
        }
        return _loc1_;
    }

    public remove(): void {
        this._eventArray.splice(this._index - 1, 1);
        if (this._index > 0) {
            this._index = this._index - 1 >>> 0;
        }
    }

    public end(): void {
        this._index = 0;
        this._SafeStr_4848 = true;
    }

    public flush(): void {
        this._eventArray.splice(0, this._eventArray.length);
        this._index = 0;
    }

    protected eventListener(param1: Event): void {
        this._eventArray.push(param1);
    }

    get [IDisposable](): true {
        return true;
    }
}
