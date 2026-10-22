import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class LibraryLoaderEvent extends Event {
    static { registerClassName(this, 'com.sulake.core.utils::LibraryLoaderEvent'); }

    public static readonly LIBRARY_LOADER_EVENT_COMPLETE: string = "LIBRARY_LOADER_EVENT_COMPLETE";
    public static readonly LIBRARY_LOADER_EVENT_PROGRESS: string = "LIBRARY_LOADER_EVENT_PROGRESS";
    public static readonly LIBRARY_LOADER_EVENT_UNLOAD: string = "LIBRARY_LOADER_EVENT_UNLOAD";
    public static readonly LIBRARY_LOADER_EVENT_STATUS: string = "LIBRARY_LOADER_EVENT_STATUS";
    public static readonly LIBRARY_LOADER_EVENT_ERROR: string = "LIBRARY_LOADER_EVENT_ERROR";
    public static readonly LIBRARY_LOADER_EVENT_DEBUG: string = "LIBRARY_LOADER_EVENT_DEBUG";
    public static readonly LIBRARY_LOADER_EVENT_DISPOSE: string = "LIBRARY_LOADER_EVENT_DISPOSE";

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    declare private _bytesTotal: number;
    static { (this.prototype as any)._bytesTotal = 0; }

    declare private _bytesLoaded: number;
    static { (this.prototype as any)._bytesLoaded = 0; }

    declare private _elapsedTime: number;
    static { (this.prototype as any)._elapsedTime = 0; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: number) {
        super(param1, false, false);
        this._status = param2;
        this._bytesTotal = param3;
        this._bytesLoaded = param4;
        this._elapsedTime = param5;
    }

    public get status(): number {
        return this._status;
    }

    public get bytesTotal(): number {
        return this._bytesTotal;
    }

    public get bytesLoaded(): number {
        return this._bytesLoaded;
    }

    public get elapsedTime(): number {
        return this._elapsedTime;
    }

    public override clone(): Event {
        return new LibraryLoaderEvent(this.type, this._status, this._bytesTotal, this._bytesLoaded, this.elapsedTime);
    }
}
