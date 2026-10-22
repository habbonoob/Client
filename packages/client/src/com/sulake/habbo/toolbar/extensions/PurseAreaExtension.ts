import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { PurseEvent } from '@/com/sulake/habbo/catalog/purse/PurseEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { PurseClubArea } from '@/com/sulake/habbo/toolbar/extensions/purse/PurseClubArea';

export class PurseAreaExtension implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions::PurseAreaExtension'); }

    private static readonly MENU_HELP: string = "HELP";

    constructor(param1: HabboToolbar, param2: IHabboCatalog) {
        this._toolbar = param1;
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(param1.assets.getAssetByName("purse_xml").content, XML)), isIWindowContainer);
        this._window.procedure = this.windowProcedure;
        this._clubArea = new PurseClubArea(param1, isIWindowContainer(this._window) ? this._window : null);
        this._catalog = param2;
        this._catalog.events.addEventListener("catalog_purse_credit_balance", this.onCreditsBalance);
        this._catalog.events.addEventListener("catalog_purse_activity_point_balance", this.onPointBalance);
        this.updateCreditAndPointValues();
        param1.extensionView.attachExtension("purse", this._window, 0);
        let _loc3_: IWindow = this._window.findChildByName("credit_count");
        this._toolbar.windowManager.registerHintWindow("credit_count", _loc3_);
        this.refreshIndicators();
    }

    declare private _toolbar: HabboToolbar;

    declare private _window: IWindowContainer;

    declare private _clubArea: PurseClubArea;

    declare private _catalog: IHabboCatalog;

    public get disposed(): boolean {
        return this._toolbar == null;
    }

    private get earningsUnseenIndicator(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("earnings_unseen_indicator"), isIStaticBitmapWrapperWindow);
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._clubArea.dispose();
        this._catalog = null;
        this._toolbar = null;
    }

    public getClubArea(): PurseClubArea {
        return this._clubArea;
    }

    public getIconLocation(param1: string): Rectangle {
        let _loc2_: Rectangle = null;
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_) {
            _loc2_ = _loc3_.rectangle;
            _loc2_.x += this._window.desktop.width - this._window.width;
            _loc2_.y += this._window.y;
        }
        return _loc2_;
    }

    public getIcon(param1: string): IWindow {
        return this._window.findChildByName(param1);
    }

    public refreshIndicators(): void {
        let _loc1_: boolean = this._catalog.getEarnings().showingIndicator;
        this.earningsUnseenIndicator.visible = _loc1_;
    }

    private updateCreditAndPointValues(): void {
        let _loc2_: IWindow = null;
        let _loc3_: IWindow = null;
        let _loc5_: IItemListWindow = null;
        let _loc1_: IWindow = this._window.findChildByName("credit_count");
        if (_loc1_ != null) {
            _loc1_.caption = this._catalog.getPurse().credits.toString();
        }
        let _loc4_: IWindow = this._window.findChildByName("ducket_count");
        if (_loc4_ != null) {
            _loc4_.caption = this._catalog.getPurse().getActivityPointsForType(0).toString();
        }
        if (this._toolbar.getBoolean("diamonds.enabled")) {
            _loc2_ = this._window.findChildByName("diamond_count");
            if (_loc2_) {
                _loc2_.caption = this._catalog.getPurse().getActivityPointsForType(5).toString();
            }
        } else {
            _loc3_ = this._window.findChildByName("diamond_count_button");
            _loc5_ = asGuarded(this._window.findChildByName("purse_itemlist"), isIItemListWindow);
            if (_loc3_ && _loc5_) {
                _loc5_.removeListItem(_loc3_);
            }
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._toolbar.windowManager.hideMatchingHint(param2.name);
        switch (param2.name) {
            case "earnings_button":
                this._toolbar.catalog.openVault();
                break;
            case "hc_join_button":
                this._toolbar.catalog.openClubCenter();
                break;
            case "help_button":
                this._toolbar.toggleWindowVisibility("HELP");
                break;
            case "settings_button":
                this._toolbar.toggleSettingVisibility();
                break;
            case "credit_count_button":
                this._catalog.openCreditsHabblet();
                break;
            case "ducket_count_button":
                this._catalog.openCatalogPage("ducket_info");
                break;
            case "diamond_count_button":
                this._catalog.openCatalogPage("loyalty_info");
                break;
            case "logout_button":
                this._toolbar.reboot();
        }
    };

    public onCreditsBalance = (param1: PurseEvent): void => {
        let _loc3_: string = param1.balance.toString();
        let _loc2_: IWindow = this._window.findChildByName("credit_count");
        if (_loc2_ != null) {
            _loc2_.caption = _loc3_.toString();
        }
    };

    public onPointBalance = (param1: PurseEvent): void => {
        let _loc2_: IWindow = null;
        let _loc3_: string = null;
        switch (param1.activityPointType) {
            case 0:
                _loc2_ = this._window.findChildByName("ducket_count");
                break;
            case 5:
                _loc2_ = this._window.findChildByName("diamond_count");
        }
        if (_loc2_ != null) {
            _loc3_ = param1.balance.toString();
            _loc2_.caption = _loc3_.toString();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
