import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { HTTPStatusEvent } from '@habbo-pixi/runtime/events/HTTPStatusEvent';
import { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';

export class AssetLoader extends EventDispatcherWrapper implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::AssetLoader'); }

    public static readonly NONE: number = 0;
    public static readonly IO_ERROR: number = 1;
    public static readonly _SafeStr_7820: number = 2;
    protected _status: number = 0;
    protected _retries: number = 0;
    protected _SafeStr_7201: number = 2;
    protected _errorCode: number = 0;

    constructor() {
        super();
        this.loadEventHandler = this.loadEventHandler.bind(this);
    }

    public get errorCode(): number {
        return this._errorCode;
    }

    protected loadEventHandler(param1: Event): void {
        switch (param1.type) {
            case "httpStatus":
                this._status = castTo(param1, HTTPStatusEvent).status;
                this.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventStatus", this._status));
                break;
            case "complete":
                this.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventComplete", this._status));
                break;
            case "unload":
                this.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventUnload", this._status));
                break;
            case "open":
                this.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventOpen", this._status));
                break;
            case "progress":
                this.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventProgress", this._status));
                break;
            case "ioError":
                this._errorCode = 1;
                if (!this.retry()) {
                    this.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventError", this._status));
                }
                break;
            case "securityError":
                this._errorCode = 2;
                if (!this.retry()) {
                    this.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventError", this._status));
                }
        }
    }

    protected retry(): boolean {
        return false;
    }
}
