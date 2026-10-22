import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDropListWindow } from '@/com/sulake/core/window/components/IDropListWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuildMembershipsController } from '@/com/sulake/habbo/catalog/guilds/GuildMembershipsController';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { HabboGroupEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupEntryData';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDropListWindow } from '@/com/sulake/core/window/components/IDropListWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Offer } from '@/com/sulake/habbo/catalog/viewer/Offer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import { CatalogWidgetGuildSelectedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetGuildSelectedEvent';
import { CatalogWidgetToggleEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetToggleEvent';
import { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import { SetRoomPreviewerStuffDataEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetRoomPreviewerStuffDataEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';

export class GuildSelectorCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::GuildSelectorCatalogWidget'); }

    private static readonly CATALOG_PAGE_LAYOUT_WIDGET_NAME: string = "guild_selector";
    private static readonly _SafeStr_7983: string = "guild_selector_widget_item";
    private static readonly GUILD_COLORS_BMP_BORDER_COLOR: number = 0;
    private static readonly GUILD_COLORS_BMP_BORDER_WIDTH: number = 1;
    private static readonly GUILD_COLORS_BMP_HEIGHT: number = 14;
    private static readonly GUILD_COLORS_BMP_WIDTH: number = 21;

    declare private _SafeStr_2459: IDropListWindow;

    declare protected _SafeStr_3389: GuildMembershipsController;

    declare private _SafeStr_4930: any[];

    declare private _SafeStr_3847: IWindow;

    declare private _membersOnlyInfo: IWindow;

    private _SafeStr_3340: number = -1;

    constructor(param1: IWindowContainer, param2: GuildMembershipsController) {
        super(param1);
        this._SafeStr_3389 = param2;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this.events.removeEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
            this.page.dispatchWidgetEvent(new CatalogWidgetGuildSelectedEvent(-1, "", "", ""));
            if (this._SafeStr_2459) {
                this._SafeStr_2459.procedure = null;
                this._SafeStr_2459 = null;
            }
            this._SafeStr_3847 = null;
            this._membersOnlyInfo = null;
            if (this._SafeStr_3389) {
                this._SafeStr_3389.unregisterGuildSelectorWidget(this);
                this._SafeStr_3389 = null;
            }
            super.dispose();
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        this.attachWidgetView("guildSelectorWidget");
        this._SafeStr_3847 = this.window.findChildByName("guild_selector");
        this._membersOnlyInfo = this.window.findChildByName("members_only");
        let _loc1_: IWindow = this.window.findChildByName("find_groups_button");
        if (_loc1_) {
            _loc1_.addEventListener("WME_CLICK", this.onFindGroups);
        }
        this._SafeStr_2459 = asGuarded(this._window.findChildByName("guild_selector"), isIDropListWindow);
        if (this._SafeStr_2459) {
            this._SafeStr_2459.procedure = this.dropMenuEventProc;
        } else {
            Logger.log("ERROR: Missing \'guild_selector\' itemlist_dropmenu component from page layout xml");
        }
        this._SafeStr_3847.visible = false;
        this._membersOnlyInfo.visible = false;
        return true;
    }

    private onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        this._SafeStr_3389.registerGuildSelectorWidget(this);
        this.events.dispatchEvent(new CatalogWidgetEvent("CWE_EXTRA_PARAM_REQUIRED_FOR_BUY"));
    };

    public populateAndSelectFavorite(param1: any[]): void {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: HabboGroupEntryData = null;
        let _loc2_: number = -1;
        this._SafeStr_4930 = this.filterGroupMemberships(param1);
        let _loc3_: boolean = param1.length > 0;
        this.events.dispatchEvent(new CatalogWidgetToggleEvent("purchaseWidget", _loc3_));
        this._SafeStr_3847.visible = _loc3_;
        this._membersOnlyInfo.visible = !_loc3_;
        let _loc6_: number = this._SafeStr_2459.numMenuItems;
        _loc4_ = 0;
        while (_loc4_ < _loc6_) {
            this._SafeStr_2459.removeMenuItemAt(0);
            _loc4_++;
        }
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_4930.length) {
            _loc7_ = this._SafeStr_4930[_loc5_];
            this._SafeStr_2459.addMenuItem(this.createDropmenuItemWindow(_loc7_));
            if (_loc7_.favourite) {
                _loc2_ = _loc5_;
            }
            _loc5_++;
        }
        if (this._SafeStr_3340 == -1) {
            if (_loc2_ != -1) {
                this._SafeStr_2459.selection = _loc2_;
            } else if (this._SafeStr_2459.numMenuItems > 0) {
                this._SafeStr_2459.selection = 0;
            }
        } else {
            this._SafeStr_2459.selection = this._SafeStr_3340;
        }
    }

    protected filterGroupMemberships(param1: any[]): any[] {
        return param1;
    }

    public selectFirstOffer(): void {
        if (this.page && this.page.offers && this.page.offers.length > 0) {
            this.page.selectOffer(castTo(this.page.offers[0], Offer).offerId);
        }
    }

    private dropMenuEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = param1.type;
        if ("WE_SELECTED" === _loc3_) {
            this.selectFromDropList(this._SafeStr_2459.selection);
            this._SafeStr_3340 = this._SafeStr_2459.selection;
        }
    };

    private selectFromDropList(param1: number): void {
        let _loc2_: HabboGroupEntryData = null;
        if (param1 > -1) {
            _loc2_ = this._SafeStr_4930[param1];
            this.selectGroup(_loc2_);
        }
    }

    protected selectGroup(param1: HabboGroupEntryData): void {
        this.page.dispatchWidgetEvent(new CatalogWidgetGuildSelectedEvent(param1.groupId, param1.primaryColor, param1.secondaryColor, param1.badgeCode));
        this.page.dispatchWidgetEvent(new SetRoomPreviewerStuffDataEvent(this.getPreviewerStuffData(param1.groupId >>> 0, param1.primaryColor, param1.secondaryColor, param1.badgeCode)));
        this.events.dispatchEvent(new SetExtraPurchaseParameterEvent(param1.groupId.toString()));
    }

    private createGuildColorsBitmap(param1: number, param2: number): BitmapData {
        let _loc3_: BitmapData = new BitmapData(21, 14, false, 0);
        let _loc5_: number = _loc3_.width / 2 + 1 | 0;
        let _loc6_: Rectangle = new Rectangle();
        _loc6_.left = 1;
        _loc6_.top = 1;
        _loc6_.right = _loc5_;
        _loc6_.bottom = _loc3_.height - 1;
        let _loc4_: Rectangle = new Rectangle();
        _loc4_.left = _loc5_;
        _loc4_.top = 1;
        _loc4_.right = _loc3_.width - 1;
        _loc4_.bottom = _loc3_.height - 1;
        _loc3_.fillRect(_loc6_, param1);
        _loc3_.fillRect(_loc4_, param2);
        return _loc3_;
    }

    private createDropmenuItemWindow(param1: HabboGroupEntryData): IWindow {
        let _loc4_: BitmapData = this.createGuildColorsBitmap(parseInt(param1.primaryColor, 16) >>> 0, parseInt(param1.secondaryColor, 16) >>> 0);
        let _loc2_: XML = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("guild_selector_widget_item").content, XML);
        let _loc6_: IWindowContainer = asGuarded(this.page.viewer.catalog.windowManager.buildFromXML(_loc2_), isIWindowContainer);
        let _loc3_: IBitmapWrapperWindow = asGuarded(_loc6_.findChildByName("guild_colors"), isIBitmapWrapperWindow);
        let _loc5_: ILabelWindow = asGuarded(_loc6_.findChildByName("guild_name"), isILabelWindow);
        _loc3_.bitmap = _loc4_;
        _loc5_.caption = param1.groupName;
        return _loc6_;
    }

    private onFindGroups = (param1: WindowMouseEvent): void => {
        if (this.page && this.page.viewer && this.page.viewer.catalog && this.page.viewer.catalog.navigator) {
            this.page.viewer.catalog.navigator.performGuildBaseSearch();
        }
    };

    private getPreviewerStuffData(param1: number, param2: string, param3: string, param4: string): IStuffData {
        let _loc5_: any[] = [];
        _loc5_.push("0");
        _loc5_.push(param1.toString());
        _loc5_.push(param4);
        _loc5_.push(param2);
        _loc5_.push(param3);
        let _loc6_: StringArrayStuffData = new StringArrayStuffData();
        _loc6_.setArray(_loc5_);
        return _loc6_;
    }
}
