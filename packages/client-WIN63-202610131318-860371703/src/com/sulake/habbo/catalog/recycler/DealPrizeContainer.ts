import { asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { PrizeMessageSubProduct } from '@/com/sulake/habbo/communication/messages/incoming/recycler/PrizeMessageSubProduct';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { PrizeContainer } from '@/com/sulake/habbo/catalog/recycler/PrizeContainer';

export class DealPrizeContainer extends PrizeContainer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.recycler::DealPrizeContainer'); }

    declare private _subProducts: any[];

    declare private _furnitureDatas: any[];

    declare private _catalog_DealPrizeContainer: HabboCatalog;

    declare private _gridItemLayout: XML;

    declare private _SafeStr_3971: BitmapData;

    constructor(param1: any[], param2: number, param3: HabboCatalog) {
        let _loc6_: number = 0;
        let _loc4_: PrizeMessageSubProduct = null;
        let _loc7_: IFurnitureData = null;
        let _loc8_: XmlAsset = asInstanceOf(param3.assets.getAssetByName("gridItem"), XmlAsset);
        let _loc5_: BitmapDataAsset = asInstanceOf(param3.assets.getAssetByName("ctlg_pic_deal_icon_narrow"), BitmapDataAsset);
        super("deal", -1, null, param2, param3);
        this._furnitureDatas = [];
        this._catalog_DealPrizeContainer = param3;
        this._subProducts = param1;
        while (_loc6_ < param1.length) {
            _loc4_ = param1[_loc6_];
            _loc7_ = param3.getFurnitureData(_loc4_.productItemTypeId, _loc4_.productItemType);
            this._furnitureDatas.push(_loc7_);
            _loc6_++;
        }
        this._gridItemLayout = asInstanceOf(_loc8_.content, XML);
        this._SafeStr_3971 = castTo(_loc5_.content, BitmapData);
    }

    public override setIcon(param1: IRoomEngine): void {
        let _loc2_: IBitmapWrapperWindow = castGuarded(this.view.findChildByName("image"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height, true, 0);
        _loc2_.bitmap.copyPixels(this._SafeStr_3971, this._SafeStr_3971.rect, new Point((_loc2_.width - this._SafeStr_3971.width) / 2, (_loc2_.height - this._SafeStr_3971.height) / 2));
        castGuarded(this.view.findChildByName("bundleCounter"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = this._subProducts.length.toString();
    }

    public override get title(): string {
        return "";
    }

    public get subProducts(): any[] {
        return this._subProducts;
    }

    public get furnitureDatas(): any[] {
        return this._furnitureDatas;
    }
}
