import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';

export class AssetLibraryVariableFxAssetProvider implements VariableFxAssetProvider {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::AssetLibraryVariableFxAssetProvider'); }

    declare private _assets: IAssetLibrary;

    constructor(param1: IAssetLibrary) {
        this._assets = param1;
    }

    public getBitmapData(param1: string): BitmapData {
        let _loc3_: IAsset = this._assets.getAssetByName(param1);
        let _loc2_: BitmapDataAsset = _loc3_ instanceof BitmapDataAsset ? _loc3_ : null;
        if (_loc2_ == null) {
            return null;
        }
        return asInstanceOf(_loc2_.content, BitmapData);
    }

    public getXml(param1: string): XML {
        let _loc3_: IAsset = this._assets.getAssetByName(param1);
        let _loc2_: XmlAsset = _loc3_ instanceof XmlAsset ? _loc3_ : null;
        if (_loc2_ == null) {
            return null;
        }
        return asInstanceOf(_loc2_.content, XML);
    }
}
