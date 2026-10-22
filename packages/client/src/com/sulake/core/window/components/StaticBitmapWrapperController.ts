import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetReceiver } from '@/com/sulake/core/assets/IAssetReceiver';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { BitmapDataController } from '@/com/sulake/core/window/Classes.group';
import { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class StaticBitmapWrapperController extends BitmapDataController implements IStaticBitmapWrapperWindow, IBitmapDataContainer, IAssetReceiver {
    static { registerClassName(this, 'com.sulake.core.window.components::StaticBitmapWrapperController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    declare protected _SafeStr_2886: boolean;

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.unshift(this.createProperty("asset_uri", this._assetUri));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            let _loc3_: any = _loc2_.key;
            if ("asset_uri" === _loc3_) {
                this.assetUri = typeof _loc2_.value === "string" ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    declare protected _assetUri: string;

    public get assetUri(): string {
        return this._assetUri;
    }

    public set assetUri(param1: string) {
        if (this._assetUri == param1) {
            return;
        }
        this._assetUri = param1;
        if (param1 == null || param1.length <= 0) {
            if (this._SafeStr_2886) {
                this._bitmapData.dispose();
            }
            this._bitmapData = null;
            this._SafeStr_2886 = false;
            this._context.invalidate(this, null, 1);
        } else {
            this._context.getResourceManager().retrieveAsset(this._assetUri, this);
        }
    }

    public override dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2886) {
                this._bitmapData.dispose();
            }
            super.dispose();
        }
    }

    public override clone(): IWindow {
        let _loc1_: StaticBitmapWrapperController = asInstanceOf(super.clone(), StaticBitmapWrapperController);
        if (this._SafeStr_2886) {
            _loc1_._bitmapData = this._bitmapData.clone();
        } else {
            _loc1_._bitmapData = this._bitmapData;
        }
        _loc1_._assetUri = this._assetUri;
        _loc1_._SafeStr_2886 = this._SafeStr_2886;
        return _loc1_;
    }

    public receiveAsset(param1: IAsset, param2: string): void {
        let _loc5_: Rectangle = null;
        if (this._disposed || !this._context.getResourceManager().isSameAsset(this._assetUri, param2)) {
            return;
        }
        let _loc4_: BitmapDataAsset = param1 instanceof BitmapDataAsset ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: BitmapData = asInstanceOf(_loc4_.content, BitmapData);
        if (_loc3_ == null) {
            return;
        }
        if (this._bitmapData != _loc3_) {
            if (this._SafeStr_2886) {
                this._bitmapData.dispose();
            }
            this._SafeStr_2886 = false;
            _loc5_ = _loc4_.rectangle;
            if (_loc3_.width == _loc5_.width && _loc3_.height == _loc5_.height) {
                this._bitmapData = _loc3_;
            } else {
                this._bitmapData = new BitmapData(_loc5_.width | 0, _loc5_.height | 0);
                this._bitmapData.copyPixels(_loc3_, _loc5_, new Point(0, 0));
                this._SafeStr_2886 = true;
            }
            this._context.invalidate(this, null, 1);
        }
        this.fitSize();
    }

    protected override initInstanceFields(): void {
        this._SafeStr_2886 = false;
        super.initInstanceFields();
    }

    get [IStaticBitmapWrapperWindow](): true {
        return true;
    }
}
