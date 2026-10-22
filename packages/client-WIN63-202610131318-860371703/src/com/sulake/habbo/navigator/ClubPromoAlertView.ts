import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { AlertView } from '@/com/sulake/habbo/navigator/AlertView';

export class ClubPromoAlertView extends AlertView {
    static { registerClassName(this, 'com.sulake.habbo.navigator::ClubPromoAlertView'); }

    declare private _text: string;

    declare private _promoText: string;

    constructor(param1: IHabboTransitionalNavigator, param2: string, param3: string, param4: string) {
        super(param1, "nav_promo_alert", param2);
        this._text = param3;
        this._promoText = param4;
    }

    public override setupAlertWindow(param1: IFrameWindow): void {
        let _loc4_: IWindowContainer = param1.content;
        _loc4_.findChildByName("body_text").caption = this._text;
        _loc4_.findChildByName("promo_text").caption = this._promoText;
        let _loc3_: IWindow = _loc4_.findChildByName("ok");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onOk);
        }
        let _loc2_: IWindow = _loc4_.findChildByName("promo_container");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onPromo);
        }
    }

    private onOk = (param1: WindowMouseEvent): void => {
        this.dispose();
    };

    private onPromo = (param1: WindowMouseEvent): void => {
        this.navigator.openCatalogClubPage("ClubPromoAlertView");
        this.dispose();
    };
}
