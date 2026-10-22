import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import { SetRoomPreviewerStuffDataEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetRoomPreviewerStuffDataEvent';
import { BadgesEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgesEvent';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class UserBadgeSelectorCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::UserBadgeSelectorCatalogWidget'); }

    private static readonly BADGE_GRID_ITEM_NAME: string = "badgeGridItem";

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
        this._excludedBadges = this._catalog.getProperty("badge.display.excluded.badgeCodes").split(",");
    }

    declare private _itemGrid: IItemGridWindow;

    declare private _gridItemLayout: XML;

    declare private _catalog: HabboCatalog;

    private _SafeStr_3657: number = -1;

    declare private _SafeStr_5455: IMessageEvent;

    declare private _excludedBadges: any[];

    public override dispose(): void {
        if (this._SafeStr_5455) {
            this._catalog.connection.removeMessageEvent(this._SafeStr_5455);
        }
        this._catalog = null;
        this._excludedBadges = null;
        super.dispose();
    }

    public override init(): boolean {
        this._itemGrid = asGuarded(this._window.findChildByName("badgeGrid"), isIItemGridWindow);
        let _loc1_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("badgeGridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(_loc1_.content, XML);
        this.resetBadgeSelectorGrid();
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        this._SafeStr_5455 = new BadgesEvent(this.onUserBadgesUpdated);
        this._catalog.connection.addMessageEvent(this._SafeStr_5455);
        return true;
    }

    protected createGridItem(param1: string, param2: number): IWindowContainer {
        let _loc4_: IWindowContainer = asGuarded(this.page.viewer.catalog.windowManager.buildFromXML(this._gridItemLayout), isIWindowContainer);
        let _loc3_: IBadgeImageWidget = castGuarded(castGuarded(_loc4_.findChildByName("badgeWidget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget");
        _loc3_.type = "normal";
        _loc3_.badgeId = param1;
        _loc4_.id = param2;
        _loc4_.name = "badgeGridItem";
        _loc4_.procedure = this.badgeGridItemWindowProc;
        return _loc4_;
    }

    private resetBadgeSelectorGrid(): void {
        this._itemGrid.destroyGridItems();
        let _loc2_: number = 0;
        for (const _loc1_ of this._catalog.inventory.getAllMyBadgeIds(this._excludedBadges) ?? []) {
            this._itemGrid.addGridItem(this.createGridItem(stringOrNull(_loc1_), _loc2_++));
        }
    }

    private setBadgeGridItemSelectionBg(param1: number, param2: boolean): void {
        let _loc3_: IWindowContainer = castGuarded(this._itemGrid.getGridItemAt(param1 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc3_ != null) {
            castGuarded(_loc3_.findChildByName("bg"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow").style = (param2 ? 0 : 2) >>> 0;
        }
    }

    private getBadgeIdOfGridItem(param1: number): string {
        let _loc3_: IWindowContainer = castGuarded(this._itemGrid.getGridItemAt(param1 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc2_: IBadgeImageWidget = castGuarded(castGuarded(_loc3_.findChildByName("badgeWidget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget");
        return _loc2_.badgeId;
    }

    private badgeGridItemWindowProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param2.name == "badgeGridItem") {
            if (this._SafeStr_3657 != -1) {
                this.setBadgeGridItemSelectionBg(this._SafeStr_3657, false);
            }
            this._SafeStr_3657 = param2.id;
            if (this._SafeStr_3657 < this._catalog.inventory.getAllMyBadgeIds(this._excludedBadges).length) {
                this.setBadgeGridItemSelectionBg(this._SafeStr_3657, true);
                this.events.dispatchEvent(new SetExtraPurchaseParameterEvent(this.getBadgeIdOfGridItem(this._SafeStr_3657)));
                this.page.dispatchWidgetEvent(new SetRoomPreviewerStuffDataEvent(this.getPreviewerStuffData()));
            }
        }
    };

    private getPreviewerStuffData(): IStuffData {
        let _loc1_: any[] = [];
        _loc1_.push("0");
        _loc1_.push(this._catalog.inventory.getAllMyBadgeIds(this._excludedBadges)[this._SafeStr_3657]);
        _loc1_.push("");
        _loc1_.push("");
        let _loc2_: StringArrayStuffData = new StringArrayStuffData();
        _loc2_.setArray(_loc1_);
        return _loc2_;
    }

    private onUserBadgesUpdated = (param1: IMessageEvent): void => {
        this.resetBadgeSelectorGrid();
    };

    private onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        if (this.page.offers.length == 0) {
            return;
        }
        let _loc2_: IPurchasableOffer = this.page.offers[0];
        this.events.dispatchEvent(new CatalogWidgetEvent("CWE_EXTRA_PARAM_REQUIRED_FOR_BUY"));
        this.events.dispatchEvent(new SelectProductEvent(_loc2_));
    };
}
