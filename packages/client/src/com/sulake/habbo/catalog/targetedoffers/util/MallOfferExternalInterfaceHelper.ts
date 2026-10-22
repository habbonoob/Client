import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { OfferController } from '@/com/sulake/habbo/catalog/targetedoffers/OfferController';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { HabboMallOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/HabboMallOffer';

export class MallOfferExternalInterfaceHelper {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers.util::MallOfferExternalInterfaceHelper'); }

    private static readonly GET_HABBO_SHOP_OFFER_FUNCTION: string = "TargetedWebOffer.checkOffer";
    private static readonly GET_HABBO_SHOP_OFFER_FAILED_CALLBACK: string = "targetedWebOfferCheckFailed";
    private static readonly GET_HABBO_SHOP_OFFER_RESULT_CALLBACK: string = "targetedWebOfferCheckResponse";

    constructor(param1: OfferController) {
        this._controller = param1;
        if (ExternalInterface.available) {
            ExternalInterface.addCallback("targetedWebOfferCheckResponse", this.onShopOfferResult);
            ExternalInterface.addCallback("targetedWebOfferCheckFailed", this.onShopOfferFailed);
            ExternalInterface.call("TargetedWebOffer.checkOffer");
        }
    }

    declare private _controller: OfferController;

    public dispose(): void {
        if (ExternalInterface.available) {
            ExternalInterface.addCallback("targetedWebOfferCheckResponse", null);
            ExternalInterface.addCallback("targetedWebOfferCheckFailed", null);
        }
        this._controller = null;
    }

    public onShopOfferResult = (param1: any): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: HabboMallOffer = new HabboMallOffer(param1);
        if (!_loc2_) {
            return;
        }
        this._controller.onHabboMallOffer(_loc2_);
    };

    public onShopOfferFailed = (): void => {
    };
}
