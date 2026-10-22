import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class AssetLoaderEvent extends Event {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::AssetLoaderEvent'); }

    public static readonly ASSET_LOADER_EVENT_COMPLETE: string = "AssetLoaderEventComplete";
    public static readonly ASSET_LOADER_EVENT_PROGRESS: string = "AssetLoaderEventProgress";
    public static readonly ASSET_LOADER_EVENT_UNLOAD: string = "AssetLoaderEventUnload";
    public static readonly ASSET_LOADER_EVENT_STATUS: string = "AssetLoaderEventStatus";
    public static readonly ASSET_LOADER_EVENT_ERROR: string = "AssetLoaderEventError";
    public static readonly ASSET_LOADER_EVENT_OPEN: string = "AssetLoaderEventOpen";

    constructor(param1: string, param2: number) {
        super(param1, false, false);
        this._status = param2;
    }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    public get status(): number {
        return this._status;
    }

    public override clone(): Event {
        return new AssetLoaderEvent(this.type, this._status);
    }

    public override toString(): string {
        return this.formatToString("AssetLoaderEvent", "type", "status");
    }
}
