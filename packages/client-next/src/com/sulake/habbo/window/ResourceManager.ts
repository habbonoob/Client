import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetReceiver } from '@/com/sulake/core/assets/IAssetReceiver';
import type { IResourceManager } from '@/com/sulake/core/assets/IResourceManager';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ResourceManager implements IResourceManager {
    static { registerClassName(this, 'com.sulake.habbo.window::ResourceManager'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _windowManager: HabboWindowManagerComponent;

    private _assetReceivers: Map<any, any> = new Dictionary();

    constructor(param1: HabboWindowManagerComponent) {
        this._windowManager = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public retrieveAsset(param1: string, param2: IAssetReceiver): void {
        let _loc3_: AssetLoaderStruct = null;
        let _loc5_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        let _loc6_: BitmapDataAsset = null;
        if (param1 == null || param1.length == 0) {
            return;
        }
        let _loc7_: string = this.resolveAssetName(param1);
        if (_loc7_ == null) {
            return;
        }
        let _loc8_: IAsset = this._windowManager.assets.getAssetByName(_loc7_);
        if (_loc8_ == null) {
            if (_loc7_.substr(0, 7) == "http://" || _loc7_.substr(0, 8) == "https://") {
                try {
                    _loc3_ = this._windowManager.assets.loadAssetFromFile(_loc7_, new URLRequest(_loc7_));
                    if (_loc3_ != null && !_loc3_.disposed) {
                        if (this._assetReceivers.get(_loc7_) == null) {
                            this._assetReceivers.set(_loc7_, []);
                        }
                        if (param2 != null) {
                            this._assetReceivers.get(_loc7_).push(param2);
                        }
                        _loc3_.addEventListener("AssetLoaderEventComplete", this.passAssetToCallback);
                    }
                } catch (error) {
                    _loc5_ = asInstanceOf(this._windowManager.assets.getAssetByName("missing_image_icon"), BitmapDataAsset);
                    _loc4_ = asInstanceOf(_loc5_.content, BitmapData);
                    _loc6_ = new BitmapDataAsset(null);
                    _loc6_.setUnknownContent(_loc4_.clone());
                    param2.receiveAsset(_loc6_, _loc7_);
                }
            }
        } else if (param2 != null) {
            param2.receiveAsset(_loc8_, _loc7_);
        }
    }

    private passAssetToCallback = (param1: AssetLoaderEvent = null): void => {
        if (this._disposed) {
            return;
        }
        let _loc3_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc3_ == null || this._assetReceivers.get(_loc3_.assetName) == null) {
            return;
        }
        let _loc4_: IAsset = this._windowManager.assets.getAssetByName(_loc3_.assetName);
        for (const _loc2_ of valuesOf(this._assetReceivers.get(_loc3_.assetName))) {
            if (_loc2_ != null && !_loc2_.disposed) {
                _loc2_.receiveAsset(_loc4_, _loc4_.url);
            }
        }
        this._assetReceivers.delete(_loc3_.assetName);
    };

    public isSameAsset(param1: string, param2: string): boolean {
        return param2 == this.resolveAssetName(param1);
    }

    private resolveAssetName(param1: string): string {
        return this._windowManager.interpolate(param1);
    }

    public createAsset(param1: string, param2: any, param3: any): IAsset {
        let _loc4_: IAsset = new param2(this._windowManager.assets.getAssetTypeDeclarationByClass(param2));
        this._windowManager.assets.setAsset(param1, _loc4_);
        _loc4_.setUnknownContent(param3);
        return _loc4_;
    }

    public removeAsset(param1: string): void {
        let _loc2_: string = this.resolveAssetName(param1);
        this._windowManager.assets.removeAsset(this._windowManager.assets.getAssetByName(_loc2_));
    }

    get [IDisposable](): true {
        return true;
    }
}
