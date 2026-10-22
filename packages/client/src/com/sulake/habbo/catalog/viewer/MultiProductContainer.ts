import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { SingleProductContainer } from '@/com/sulake/habbo/catalog/viewer/SingleProductContainer';

export class MultiProductContainer extends SingleProductContainer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::MultiProductContainer'); }

    constructor(param1: IPurchasableOffer, param2: IProduct[], param3: HabboCatalog) {
        super(param1, param2, param3);
    }

    public override initProductIcon(param1: IRoomEngine, param2: IStuffData = null): void {
        super.initProductIcon(param1);
        let _loc3_: IWindow = this._view.findChildByName("multiContainer");
        if (_loc3_) {
            _loc3_.visible = true;
        }
        let _loc4_: ITextWindow = asGuarded(this._view.findChildByName("multiCounter"), isITextWindow);
        if (_loc4_) {
            _loc4_.text = "x" + this.firstProduct.productCount;
        }
        this.setClubIconLevel(this.offer.clubLevel);
    }
}
