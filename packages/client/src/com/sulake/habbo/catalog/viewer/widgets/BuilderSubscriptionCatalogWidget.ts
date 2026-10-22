import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { CatalogWidgetBuilderSubscriptionUpdatedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetBuilderSubscriptionUpdatedEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class BuilderSubscriptionCatalogWidget extends CatalogWidget implements ICatalogWidget, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::BuilderSubscriptionCatalogWidget'); }

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_5076: string;

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._SafeStr_5076 = this._catalog.getProperty("builders_club.buy_membership_page");
        this.updateSubscriptionInfo();
        this._window.procedure = this.windowProcedure;
        this.events.addEventListener("CWE_BUILDER_SUBSCRIPTION_UPDATED", this.onBuilderSubscriptionUpdated);
        return true;
    }

    private updateSubscriptionInfo(): void {
        let _loc4_: number = this._catalog.builderSecondsLeft;
        let _loc2_: IWindow = this._window.findChildByName("subscribe_button");
        let _loc3_: IWindow = this._window.findChildByName("subscribe_button_sms");
        let _loc1_: IWindow = this._window.findChildByName("subscribe_button_big");
        let _loc5_: IWindow = this._window.findChildByName("try_button");
        if (_loc5_ == null || _loc2_ == null || _loc1_ == null) {
            return;
        }
        if (_loc4_ > 0 || this._catalog.getCatalogNavigator("BUILDERS_CLUB").getOptionalNodeByName(this._catalog.getProperty("builders_club.try_page")) == null) {
            _loc1_.visible = true;
            _loc2_.visible = false;
            _loc5_.visible = false;
            _loc3_.visible = false;
        } else {
            _loc1_.visible = false;
            _loc2_.visible = false;
            _loc5_.visible = true;
            _loc3_.visible = false;
        }
        if (this._SafeStr_5076 != null && this._SafeStr_5076 != "") {
            _loc3_.visible = true;
            if (!_loc5_.visible) {
                _loc3_.x = _loc5_.x;
                _loc3_.y = _loc5_.y;
            }
            if (_loc1_.visible) {
                _loc1_.visible = false;
                _loc2_.visible = false;
            }
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "subscribe_button_big":
            case "subscribe_button":
                HabboWebTools.openWebPageAndMinimizeClient(this._catalog.getProperty("web.shop.subscription.relativeUrl"));
                break;
            case "subscribe_button_sms":
                HabboWebTools.openWebPageAndMinimizeClient(this._SafeStr_5076);
                break;
            case "try_button":
                this._catalog.openCatalogPage(this._catalog.getProperty("builders_club.try_page"), "BUILDERS_CLUB");
        }
    };

    private onBuilderSubscriptionUpdated = (param1: CatalogWidgetBuilderSubscriptionUpdatedEvent): void => {
        this.updateSubscriptionInfo();
    };

    get [IDisposable](): true {
        return true;
    }
}
