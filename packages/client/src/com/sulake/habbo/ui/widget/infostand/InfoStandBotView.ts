import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class InfoStandBotView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandBotView'); }

    private readonly ITEM_SPACER: number = 5;
    private readonly MOTTO_TEXT_OFFSET: number = 3;
    private readonly MAX_MOTTO_HEIGHT: number = 50;
    private readonly MIN_MOTTO_HEIGHT: number = 23;

    constructor(param1: InfoStandWidget, param2: string) {
        this._widget = param1;
        this.createWindow(param2);
    }

    declare private _widget: InfoStandWidget;

    declare private _SafeStr_2212: IItemListWindow;

    declare private _border: IBorderWindow;

    declare private _badgeDetails: IBorderWindow;

    declare private _window: IItemListWindow;

    public get window(): IItemListWindow {
        return this._window;
    }

    public set name(param1: string) {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("name_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = param1;
        _loc2_.visible = true;
    }

    public set achievementScore(param1: number) {
        if (!this._widget.handler.isActivityDisplayEnabled) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("score_value"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = String(param1);
    }

    public set carryItem(param1: number) {
        let _loc2_: string = null;
        let _loc6_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("handitem_txt"), isITextWindow);
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

    public dispose(): void {
        this._widget = null;
        this._window.dispose();
        this._window = null;
        this.disposeBadgeDetails();
    }

    public setFigure(param1: string): void {
        let _loc2_: IAvatarImageWidget = asGuarded(castGuarded(this._border.findChildByName("avatar_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget);
        _loc2_.figure = param1;
    }

    public setMotto(param1: string): void {
        let _loc4_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("motto_container"), isIWindowContainer);
        if (!_loc4_) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(_loc4_.findChildByName("motto_text"), isITextWindow);
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("motto_spacer"), isIWindowContainer);
        if (_loc3_ == null || _loc2_ == null) {
            return;
        }
        if (param1 == null) {
            param1 = "";
        }
        _loc3_.text = param1;
        _loc3_.height = Math.min(_loc3_.textHeight + 5, 50) | 0;
        _loc3_.height = Math.max(_loc3_.height, 23) | 0;
        _loc4_.height = _loc3_.height + 3;
        this.updateWindow();
    }

    public setBadge(param1: number, param2: string): void {
        let _loc3_: IBadgeImageWidget = asGuarded(castGuarded(this._border.findChildByName("badge_" + param1), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc3_.badgeId = param2;
    }

    public clearBadges(): void {
        let _loc2_: number = 0;
        let _loc1_: IBadgeImageWidget = null;
        _loc2_ = 0;
        while (_loc2_ < 5) {
            _loc1_ = asGuarded(castGuarded(this._border.findChildByName("badge_" + _loc2_), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
            _loc1_.badgeId = "";
            _loc2_++;
        }
    }

    private updateWindow(): void {
        if (this._SafeStr_2212 == null || this._border == null) {
            return;
        }
        this._SafeStr_2212.height = this._SafeStr_2212.scrollableRegion.height | 0;
        this._border.height = this._SafeStr_2212.height + 20;
        this._window.width = this._border.width;
        this._window.height = this._window.scrollableRegion.height | 0;
        this._widget.refreshContainer();
    }

    private createWindow(param1: string): void {
        let _loc2_: IWindow = null;
        let _loc4_: number = 0;
        this._window = asGuarded(this._widget.getXmlWindow("bot_view"), isIItemListWindow);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._border = asGuarded(this._window.getListItemByName("info_border"), isIBorderWindow);
        this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
        if (this._border != null) {
            this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
        }
        this._window.name = param1;
        this._widget.mainContainer.addChild(this._window);
        let _loc3_: IWindow = this._border.findChildByTag("close");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onClose);
        }
        _loc4_ = 0;
        while (_loc4_ < 5) {
            _loc2_ = this._border.findChildByName("badge_" + _loc4_);
            if (_loc2_ != null) {
                _loc2_.addEventListener("WME_OVER", this.showBadgeInfo);
                _loc2_.addEventListener("WME_OUT", this.hideBadgeInfo);
            }
            _loc4_++;
        }
    }

    private showBadgeInfo = (param1: WindowMouseEvent): void => {
        let _loc5_: ITextWindow = null;
        if (param1.window == null) {
            return;
        }
        let _loc6_: number = Number(param1.window.name.replace("badge_", "")) | 0;
        if (_loc6_ < 0) {
            return;
        }
        let _loc2_: any[] = this._widget.userData.badges;
        if (_loc2_ == null) {
            return;
        }
        if (_loc6_ >= _loc2_.length) {
            return;
        }
        let _loc3_: string = stringOrNull(this._widget.userData.badges[_loc6_]);
        if (_loc3_ == null) {
            return;
        }
        this.createBadgeDetails();
        _loc5_ = asGuarded(this._badgeDetails.getChildByName("name"), isITextWindow);
        if (_loc5_ != null) {
            _loc5_.text = this._widget.localizations.getBadgeName(_loc3_);
        }
        _loc5_ = asGuarded(this._badgeDetails.getChildByName("description"), isITextWindow);
        if (_loc5_ != null) {
            _loc5_.text = this._widget.localizations.getBadgeDesc(_loc3_);
            this._badgeDetails.height = _loc5_.text == "" ? 40 : 99;
        }
        let _loc4_: Rectangle = new Rectangle();
        param1.window.getGlobalRectangle(_loc4_);
        this._badgeDetails.x = _loc4_.left - this._badgeDetails.width | 0;
        this._badgeDetails.y = _loc4_.top + (_loc4_.height - this._badgeDetails.height) / 2 | 0;
    };

    private hideBadgeInfo = (param1: WindowMouseEvent): void => {
        this.disposeBadgeDetails();
    };

    private createBadgeDetails(): void {
        if (this._badgeDetails != null) {
            return;
        }
        let _loc1_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("badge_details"), XmlAsset);
        if (_loc1_ == null) {
            return;
        }
        this._badgeDetails = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIBorderWindow);
        if (this._badgeDetails == null) {
            throw new Error("Failed to construct window from XML!");
        }
    }

    private disposeBadgeDetails(): void {
        if (this._badgeDetails != null) {
            this._badgeDetails.dispose();
            this._badgeDetails = null;
        }
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this._widget.close();
    };

    private updateBadges(param1: any[]): void {
        let _loc2_: number = 0;
        if (param1 == null) {
            return;
        }
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            this.setBadge(_loc2_, stringOrNull(param1[_loc2_]));
            _loc2_++;
        }
    }

    public update(param1: RoomWidgetUserInfoUpdateEvent): void {
        this.clearBadges();
        this.updateInfo(param1);
    }

    private updateInfo(param1: RoomWidgetUserInfoUpdateEvent): void {
        this.name = param1.name;
        this.setMotto(param1.motto);
        this.achievementScore = param1.achievementScore;
        this.carryItem = param1.carryItem;
        this.setFigure(param1.figure);
        this.updateBadges(param1.badges);
    }
}
