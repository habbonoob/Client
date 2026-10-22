import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { GetGuildCreationInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildCreationInfoMessageComposer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';

export class BuyGuildWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::BuyGuildWidget'); }

    declare private _button: IButtonWindow;

    constructor(param1: IWindowContainer) {
        super(param1);
        if (this._button) {
            this._button.removeEventListener("WME_CLICK", this.onButtonClicked);
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._button = asGuarded(this.window.findChildByName("start_guild_purchase"), isIButtonWindow);
        this._button.addEventListener("WME_CLICK", this.onButtonClicked);
        return true;
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        if (HabboTracking.getInstance() != null) {
            HabboTracking.getInstance().trackGoogle("groupPurchase", "catalogBuyClicked");
        }
        this.page.viewer.catalog.connection.send(new GetGuildCreationInfoMessageComposer());
        this.page.viewer.catalog.toggleCatalog("NORMAL");
    };
}
