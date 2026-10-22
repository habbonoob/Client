import { asGuarded, asInstanceOf, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IStructureData } from '@/com/sulake/habbo/avatar/structure/IStructureData';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLoaderStruct, Core, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class AvatarStructureDownload extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure::AvatarStructureDownload'); }

    static #staticsReady = false;

    private static get _log_AvatarStructureDownload(): SimpleLogger {
        AvatarStructureDownload.#initStatics();
        return AvatarStructureDownload._log_AvatarStructureDownload;
    }

    public static readonly STRUCTURE_DONE: string = "AVATAR_STRUCTURE_DONE";

    constructor(param1: IAssetLibrary, param2: string, param3: IStructureData) {
        super();
        this._SafeStr_6510 = param3;
        if (param1.hasAsset(param2)) {
            AvatarStructureDownload._log_AvatarStructureDownload.info("reload data for url: " + param2);
        }
        let _loc4_: URLRequest = new URLRequest(param2);
        let _loc5_: AssetLoaderStruct = param1.loadAssetFromFile(param2, _loc4_, "text/plain");
        _loc5_.addEventListener("AssetLoaderEventComplete", this.onDataComplete);
        _loc5_.addEventListener("AssetLoaderEventError", this.onDataFailed);
    }

    declare private _SafeStr_6510: IStructureData;

    private onDataComplete = (param1: Event): void => {
        let _loc2_: string = null;
        let _loc4_: XML = null;
        let _loc3_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc3_ == null || _loc3_.assetLoader == null) {
            return;
        }
        try {
            _loc2_ = asGuarded(_loc3_.assetLoader.content, isString);
            if (_loc2_ == null || _loc2_.length == 0) {
                Core.error("Could not load avatar structure, got empty data from URL " + _loc3_.assetLoader.url + " data length = " + _loc2_.length + ".", false, 1);
            }
            _loc4_ = new XML(_loc2_);
        } catch (e) {
            AvatarStructureDownload._log_AvatarStructureDownload.error("Error: " + e.message);
            return;
        }
        if (_loc4_ == null) {
            AvatarStructureDownload._log_AvatarStructureDownload.warn("XML error: " + _loc3_ + " not valid XML");
            return;
        }
        this._SafeStr_6510.appendXML(_loc4_);
        this.dispatchEvent(new Event("AVATAR_STRUCTURE_DONE"));
    };

    private onDataFailed = (param1: Event): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        let _loc3_: string = "";
        if (_loc2_ != null && _loc2_.assetLoader != null) {
            _loc3_ = _loc2_.assetLoader.url;
        }
        HabboWebTools.logEventLog("figurepartlist download error " + _loc3_);
        Core.error("Could not load avatar structure. Failed to get data from URL " + _loc3_, true, 1);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarStructureDownload.#staticsReady) return;
        AvatarStructureDownload.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarStructureDownload, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log_AvatarStructureDownload", null);
        set("_log_AvatarStructureDownload", new SimpleLogger("com.sulake.habbo.avatar.structure.AvatarStructureDownload"));
    }
}
