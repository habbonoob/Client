import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { RoomWidgetRentableBotInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotInfoUpdateEvent';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RemoveBotFromFlatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/RemoveBotFromFlatMessageComposer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class InfoStandRentableBotView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandRentableBotView'); }

    private static readonly STATUS_BAR_WIDTH: number = 162;
    private static readonly STATUS_BAR_HEIGHT: number = 16;
    private static readonly ITEM_SPACER: number = 5;
    private static readonly STATUS_BAR_HIGHLIGHT_HEIGHT: number = 4;
    private static readonly STATUS_BAR_BORDER_COLOR: number = 14342874;
    private static readonly STATUS_BAR_BG_COLOR: number = 3815994;
    private static readonly STATUS_BAR_EXPIRE_HIGHLIGHT_COLOR: number = 2085362;
    private static readonly STATUS_BAR_EXPIRE_CONTENT_COLOR: number = 39616;
    private static readonly FIELD_NAME: string = "name_text";
    private static readonly FIELD_DESCRIPTION: string = "description_text";
    private static readonly FIELD_HAND_ITEM: string = "handitem_text";
    private static readonly FIELD_OWNER: string = "owner_text";
    private static readonly FIELD_EXPIRE_TIME: string = "expire_time_left";
    private static readonly FIELD_EXPIRE_HEADER: string = "expire_time_info";
    private static readonly _SafeStr_8299: string = "handitem_spacer";
    private static readonly BUTTONS_MAX_WIDTH: number = 250;
    private static readonly BUTTON_HEIGHT: number = 25;
    private static readonly BUTTON_MARGIN: number = 5;

    constructor(param1: InfoStandWidget, param2: string, param3: IHabboCatalog) {
        this._widget = param1;
        this._catalog = param3;
        this._habboTracking = HabboTracking.getInstance();
        this.createWindow(param2);
    }

    declare private _catalog: IHabboCatalog;

    declare private _habboTracking: IHabboTracking;

    declare private _widget: InfoStandWidget;

    declare private _border: IBorderWindow;

    declare private _buttonsContainer: IWindowContainer;

    declare private _SafeStr_2212: IItemListWindow;

    declare private _badgeId: string;

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _window: IItemListWindow;

    public get window(): IItemListWindow {
        return this._window;
    }

    public dispose(): void {
        this._widget = null;
        this._catalog = null;
        this._habboTracking = null;
        this._border = null;
        this._buttonsContainer = null;
        this._SafeStr_2212 = null;
        if (this._window) {
            this._window.dispose();
        }
        this._window = null;
        this._disposed = true;
    }

    public setCarryItem(param1: number): void {
        let _loc2_: string = null;
        let _loc6_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("handitem_text"), isITextWindow);
        let _loc3_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("handitem_spacer"), isIWindowContainer);
        if (_loc6_ == null || _loc3_ == null) {
            return;
        }
        if (param1 > 0 && param1 < 999999) {
            _loc2_ = this._widget.localizations.getLocalization("handitem" + param1, "handitem" + param1);
            this._widget.localizations.registerParameter("infostand.text.handitem", "item", _loc2_);
        }
        _loc6_.height = _loc6_.textHeight + 5 | 0;
        let _loc4_: boolean = Boolean(_loc6_.visible);
        let _loc5_: boolean = param1 > 0 && param1 < 999999;
        _loc6_.visible = _loc5_;
        _loc3_.visible = _loc5_;
        if (_loc5_ != _loc4_) {
            this._SafeStr_2212.arrangeListItems();
        }
        this.updateWindow();
    }

    protected onButtonClicked = (param1: WindowMouseEvent): void => {
        if (param1.target.name == "pick") {
            this._widget.handler.container.connection.send(new RemoveBotFromFlatMessageComposer(this._botId));
        }
    };

    protected showButton(param1: string, param2: boolean): void {
        if (this._buttonsContainer == null) {
            return;
        }
        let _loc3_: IWindow = this._buttonsContainer.getChildByName(param1);
        if (_loc3_ != null) {
            _loc3_.visible = param2;
            this.arrangeButtons();
        }
    }

    protected onButtonResized = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.window.parent;
        if (_loc2_ && _loc2_.tags.indexOf("CMD_BUTTON_REGION") > -1) {
            _loc2_.width = param1.window.width;
        }
    };

    private updateWindow(): void {
        if (this._SafeStr_2212 == null || this._border == null || this._buttonsContainer == null) {
            return;
        }
        this._buttonsContainer.width = this._buttonsContainer.width;
        this._buttonsContainer.visible = this._buttonsContainer.width > 0;
        this._SafeStr_2212.height = this._SafeStr_2212.scrollableRegion.height | 0;
        this._border.height = this._SafeStr_2212.height + 20;
        this._window.width = Math.max(this._border.width, this._buttonsContainer.width) | 0;
        this._window.height = this._window.scrollableRegion.height | 0;
        if (this._border.width < this._buttonsContainer.width) {
            this._border.x = this._window.width - this._border.width;
            this._buttonsContainer.x = 0;
        } else {
            this._buttonsContainer.x = this._window.width - this._buttonsContainer.width;
            this._border.x = 0;
        }
        this._widget.refreshContainer();
    }

    private updateRentExpireField(): void {
        this.setFieldText("expire_time_left", false, "N/A");
        this.setFieldText("expire_time_info", false, "");
    }

    private createPercentageBar(param1: number, param2: number, param3: number, param4: number): BitmapData {
        param2 = Math.max(param2, 1) | 0;
        param1 = Math.max(param1, 0) | 0;
        if (param1 > param2) {
            param1 = param2;
        }
        let _loc10_: number = param1 / param2;
        let _loc9_: number = 1;
        let _loc7_: BitmapData = new BitmapData(162, 16, false);
        _loc7_.fillRect(new Rectangle(0, 0, _loc7_.width, _loc7_.height), 14342874);
        let _loc8_: Rectangle = new Rectangle(_loc9_, _loc9_, _loc7_.width - _loc9_ * 2, _loc7_.height - _loc9_ * 2);
        _loc7_.fillRect(_loc8_, 3815994);
        let _loc6_: Rectangle = new Rectangle(_loc9_, _loc9_ + 4, _loc7_.width - _loc9_ * 2, _loc7_.height - _loc9_ * 2 - 4);
        _loc6_.width = _loc10_ * _loc6_.width;
        _loc7_.fillRect(_loc6_, param3);
        let _loc5_: Rectangle = new Rectangle(_loc9_, _loc9_, _loc7_.width - _loc9_ * 2, 4);
        _loc5_.width = _loc10_ * _loc5_.width;
        _loc7_.fillRect(_loc5_, param4);
        return _loc7_;
    }

    private createWindow(param1: string): void {
        let _loc5_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("rentable_bot_view"), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc5_.content, XML)), isIItemListWindow);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._border = asGuarded(this._window.getListItemByName("info_border"), isIBorderWindow);
        if (this._border != null) {
            this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
        }
        this._window.name = param1;
        this._widget.mainContainer.addChild(this._window);
        let _loc4_: IWindow = this._border.findChildByTag("close");
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onClose);
        }
        this._buttonsContainer = asGuarded(this._window.getListItemByName("button_list"), isIWindowContainer);
        if (this._buttonsContainer == null) {
            return;
        }
        let _loc3_: any[] = [];
        this._buttonsContainer.groupChildrenWithTag("CMD_BUTTON", _loc3_, -1);
        for (const _loc2_ of _loc3_ ?? []) {
            _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
        for (const _loc6_ of _loc3_ ?? []) {
            if (_loc6_.parent) {
                _loc6_.parent.width = _loc6_.width;
            }
            _loc6_.addEventListener("WE_RESIZED", this.onButtonResized);
        }
    }

    private setFieldText(param1: string, param2: boolean, param3: string): void {
        let _loc5_: IWindowContainer = null;
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc4_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName(param1), isITextWindow);
        if (_loc4_ == null) {
            _loc5_ = asGuarded(this._SafeStr_2212.getListItemByName("description_container"), isIWindowContainer);
            if (_loc5_ == null) {
                return;
            }
            _loc4_ = asGuarded(_loc5_.findChildByName(param1), isITextWindow);
            if (!_loc4_) {
                return;
            }
        }
        _loc4_.text = param3;
        _loc4_.visible = param2;
    }

    private setFigure(param1: string): void {
        let _loc2_: IAvatarImageWidget = asGuarded(castGuarded(this._border.findChildByName("avatar_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget);
        _loc2_.figure = param1;
    }

    private setBadge(param1: string): void {
        let _loc2_: IBadgeImageWidget = asGuarded(castGuarded(this._border.findChildByName("badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc2_.badgeId = param1;
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this._widget.close();
    };

    private arrangeButtons(): void {
        let _loc5_: number = 250;
        this._buttonsContainer.width = _loc5_;
        let _loc2_: any[] = [];
        this._buttonsContainer.groupChildrenWithTag("CMD_BUTTON_REGION", _loc2_, -1);
        let _loc1_: any = _loc5_;
        let _loc3_: number = 0;
        for (const _loc4_ of _loc2_ ?? []) {
            if (_loc4_.visible) {
                if (_loc1_ - _loc4_.width < 0) {
                    _loc1_ = _loc5_;
                    _loc3_ += 25 + 5;
                }
                _loc4_.x = _loc1_ - _loc4_.width;
                _loc4_.y = _loc3_;
                _loc1_ = _loc4_.x - 5;
            }
        }
        this._buttonsContainer.height = _loc3_ + 25;
        this.updateWindow();
    }

    public update(param1: RoomWidgetRentableBotInfoUpdateEvent): void {
        this._botId = param1.webID;
        this.setFieldText("name_text", true, param1.name);
        this.setFieldText("description_text", true, param1.motto);
        if (param1.ownerId > -1) {
            this._widget.localizations.registerParameter("infostand.text.botowner", "name", param1.ownerName);
            this.setFieldText("owner_text", true, this._widget.localizations.getLocalization("infostand.text.botowner"));
        } else {
            this.setFieldText("owner_text", false, "");
        }
        this.updateRentExpireField();
        this.setCarryItem(param1.carryItem);
        let _loc2_: any[] = param1.badges;
        this.setBadge(stringOrNull(_loc2_ && _loc2_.length > 0 ? _loc2_[0] : null));
        this.setFigure(param1.figure);
        this.showButton("whisper", false);
        this.showButton("ignore", false);
        this.showButton("unignore", false);
        this.showButton("pick", param1.ownerId > -1 && (param1.amIOwner || param1.amIAnyRoomController));
        this.updateWindow();
    }
}
