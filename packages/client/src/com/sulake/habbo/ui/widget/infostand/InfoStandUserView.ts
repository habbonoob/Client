import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RelationshipStatusInfo } from '@/com/sulake/habbo/communication/messages/incoming/users/RelationshipStatusInfo';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { RelationshipStatusEnum } from '@/com/sulake/habbo/friendlist/RelationshipStatusEnum';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { TagListRenderer } from '@/com/sulake/habbo/ui/widget/infostand/TagListRenderer';
import { RoomWidgetChangeMottoMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChangeMottoMessage';
import { RoomWidgetGetBadgeDetailsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetGetBadgeDetailsMessage';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetRoomTagSearchMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomTagSearchMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class InfoStandUserView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandUserView'); }

    protected static readonly LINK_COLOR_ACTIONS_DEFAULT: number = 16777215;
    protected static readonly LINK_COLOR_ACTIONS_HOVER: number = 9552639;
    private readonly ITEM_SPACER: number = 5;
    private readonly MOTTO_TEXT_OFFSET: number = 3;
    private readonly MOTTO_EDITED_COLOR: number = 11184810;
    private readonly MOTTO_UNCHANGED_COLOR: number = 16777215;
    private readonly _SafeStr_7624: number = 2000;
    private readonly MAX_MOTTO_HEIGHT: number = 50;
    private readonly MIN_MOTTO_HEIGHT: number = 23;
    private readonly TOOLTIP_DELAY: number = 100;

    constructor(param1: InfoStandWidget, param2: string) {
        this._widget = param1;
        this.createWindow(param2);
        this._SafeStr_3603 = new TagListRenderer(param1, this.onTagSelected);
    }

    declare protected _widget: InfoStandWidget;

    declare protected _SafeStr_2212: IItemListWindow;

    declare protected _SafeStr_6595: IItemListWindow;

    declare protected _SafeStr_2794: IRegionWindow;

    declare private _border: IBorderWindow;

    declare private _SafeStr_3603: TagListRenderer;

    declare private _badgeDetails: IBorderWindow;

    declare private _SafeStr_7118: number;
    static { (this.prototype as any)._SafeStr_7118 = 0; }

    declare protected _window: IItemListWindow;

    public get window(): IItemListWindow {
        return this._window;
    }

    public set name(param1: string) {
        if (this._SafeStr_2794 == null) {
            this._SafeStr_2794 = asGuarded(this._SafeStr_2212.getListItemByName("profile_link"), isIRegionWindow);
            if (this._SafeStr_2794 == null) {
                return;
            }
            this._SafeStr_2794.procedure = this.onProfileLink;
            this._SafeStr_2794.visible = true;
        }
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2794.findChildByName("name_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = param1;
        _loc2_.visible = true;
    }

    public set realName(param1: string) {
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("realname_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        if (param1.length == 0) {
            _loc2_.text = "";
        } else {
            this._widget.localizations.registerParameter("infostand.text.realname", "realname", param1);
            _loc2_.text = this._widget.localizations.getLocalization("infostand.text.realname");
        }
        _loc2_.height = _loc2_.textHeight + 5 | 0;
        _loc2_.visible = param1.length > 0;
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

    public set xp(param1: number) {
        let _loc5_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("xp_text"), isITextWindow);
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("xp_spacer"), isIWindowContainer);
        if (_loc5_ == null || _loc2_ == null) {
            return;
        }
        this._widget.localizations.registerParameter("infostand.text.xp", "xp", param1.toString());
        _loc5_.height = _loc5_.textHeight + 5 | 0;
        let _loc3_: boolean = Boolean(_loc5_.visible);
        let _loc4_: any = param1 > 0;
        _loc5_.visible = _loc4_;
        _loc2_.visible = _loc4_;
        if (_loc4_ != _loc3_) {
            this._SafeStr_2212.arrangeListItems();
        }
        this.updateWindow();
    }

    public dispose(): void {
        if (this._SafeStr_2794) {
            this._SafeStr_2794.dispose();
            this._SafeStr_2794 = null;
        }
        this._widget = null;
        this._window.dispose();
        this._window = null;
        this._SafeStr_3603.dispose();
        this._SafeStr_3603 = null;
        this.disposeBadgeDetails();
    }

    public setFigure(param1: string): void {
        let _loc2_: IAvatarImageWidget = asGuarded(castGuarded(this._border.findChildByName("avatar_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIAvatarImageWidget);
        _loc2_.figure = param1;
    }

    public setMotto(param1: string, param2: boolean): void {
        let _loc7_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("motto_container"), isIWindowContainer);
        if (!_loc7_) {
            return;
        }
        let _loc3_: IWindow = _loc7_.findChildByName("changemotto.image");
        let _loc6_: ITextWindow = asGuarded(_loc7_.findChildByName("motto_text"), isITextWindow);
        let _loc5_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("motto_spacer"), isIWindowContainer);
        if (_loc6_ == null || _loc5_ == null) {
            return;
        }
        if (param1 == null) {
            param1 = "";
        }
        if (param2) {
            _loc3_.visible = true;
            if (param1 == "") {
                param1 = this._widget.localizations.getLocalization("infostand.motto.change");
                _loc6_.textColor = 11184810;
            } else {
                _loc6_.textColor = 16777215;
            }
            _loc6_.enable();
        } else {
            _loc3_.visible = false;
            _loc6_.textColor = 16777215;
            _loc6_.disable();
        }
        if (!this._widget.config.getBoolean("infostand.motto.change.enabled")) {
            _loc6_.disable();
        }
        _loc6_.text = param1;
        _loc6_.height = Math.min(_loc6_.textHeight + 5, 50) | 0;
        _loc6_.height = Math.max(_loc6_.height, 23) | 0;
        _loc7_.height = _loc6_.height + 3;
        if (param2) {
            _loc6_.addEventListener("WKE_KEY_UP", this.onMottoKeyboard);
            _loc6_.addEventListener("WME_CLICK", this.onMottoClicked);
        } else {
            _loc6_.removeEventListener("WKE_KEY_UP", this.onMottoClicked);
        }
        let _loc4_: boolean = !!(_loc6_.text && _loc6_.text.toLowerCase().indexOf("crikey") >= 0);
        if (this._border) {
            this._border.findChildByName("sticker_croco").visible = _loc4_;
            this._border.findChildByName("avatar_image").visible = !_loc4_;
        }
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

    public clearGroupBadge(): void {
        let _loc1_: IBadgeImageWidget = asGuarded(castGuarded(this._border.findChildByName("badge_group"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc1_.badgeId = "";
    }

    public setGroupBadge(param1: string): void {
        let _loc2_: IBadgeImageWidget = asGuarded(castGuarded(this._border.findChildByName("badge_group"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc2_.badgeId = param1;
    }

    public setRelationshipStatuses(param1: UtilsMap): void {
        let _loc5_: string = null;
        let _loc2_: IWindow = null;
        let _loc3_: RelationshipStatusInfo = null;
        let _loc7_: string = null;
        let _loc6_: IWindow = null;
        if (!this._border || !this._widget) {
            return;
        }
        for (const _loc4_ of RelationshipStatusEnum.displayableStatuses ?? []) {
            _loc5_ = RelationshipStatusEnum.statusAsString(_loc4_ | 0);
            _loc2_ = this._border.findChildByName("relationship_" + _loc5_);
            _loc3_ = param1.getValue(_loc4_);
            if (_loc3_) {
                _loc2_.visible = _loc3_.friendCount > 0;
                _loc7_ = _loc5_ + "_randomusername";
                _loc6_ = this._border.findChildByName(_loc7_);
                if (_loc6_) {
                    _loc6_.caption = _loc3_.randomFriendName;
                    _loc6_.id = _loc3_.randomFriendId;
                }
                this._border.findChildByName(_loc5_ + "_others").visible = _loc3_.friendCount > 1;
                this._widget.localizations.registerParameter("infostand.relstatus." + _loc5_ + ".others", "amount", (_loc3_.friendCount - 1).toString());
            } else {
                _loc2_.visible = false;
            }
        }
    }

    protected updateWindow(): void {
        if (this._SafeStr_2212 == null || this._border == null) {
            return;
        }
        this._SafeStr_2212.height = this._SafeStr_2212.scrollableRegion.height | 0;
        this._border.height = this._SafeStr_2212.height + 20;
        this._window.width = this._border.width;
        this._window.height = this._window.scrollableRegion.height | 0;
        this._widget.refreshContainer();
    }

    protected createWindow(param1: string): void {
        let _loc8_: BitmapDataAsset = null;
        let _loc7_: BitmapData = null;
        let _loc3_: IWindow = null;
        let _loc6_: number = 0;
        this._window = asGuarded(this._widget.getXmlWindow("user_view"), isIItemListWindow);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._border = asGuarded(this._window.getListItemByName("info_border"), isIBorderWindow);
        if (this._border != null) {
            this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
            this._SafeStr_6595 = asGuarded(this._border.findChildByName("relationship_status_container"), isIItemListWindow);
            this._SafeStr_6595.visible = this._widget.config.getBoolean("relationship.status.enabled");
            this._border.findChildByName("heart_randomusername").procedure = this.onRelationshipUserNameLinkClicked;
            this._border.findChildByName("smile_randomusername").procedure = this.onRelationshipUserNameLinkClicked;
            this._border.findChildByName("bobba_randomusername").procedure = this.onRelationshipUserNameLinkClicked;
        }
        this._window.name = param1;
        let _loc5_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("home_icon"), isIBitmapWrapperWindow);
        if (_loc5_ != null) {
            _loc5_.bitmap = new BitmapData(_loc5_.width, _loc5_.height, true, 0);
            _loc8_ = asInstanceOf(this._widget.assets.getAssetByName("icon_home"), BitmapDataAsset);
            _loc7_ = asInstanceOf(_loc8_.content, BitmapData);
            _loc5_.bitmap = new BitmapData(_loc5_.width, _loc5_.height, true, 0);
            _loc5_.bitmap.copyPixels(_loc7_, _loc7_.rect, new Point(0, 0));
            _loc5_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
        this._widget.mainContainer.addChild(this._window);
        let _loc4_: IWindow = this._border.findChildByTag("close");
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onClose);
        }
        _loc6_ = 0;
        while (_loc6_ < 5) {
            _loc3_ = this._border.findChildByName("badge_" + _loc6_);
            if (_loc3_ != null) {
                _loc3_.addEventListener("WME_OVER", this.showBadgeInfo);
                _loc3_.addEventListener("WME_OUT", this.hideBadgeInfo);
            }
            _loc6_++;
        }
        _loc3_ = this._border.findChildByName("badge_group");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.selectGroupBadge);
            _loc3_.addEventListener("WME_OVER", this.showGroupBadgeInfo);
            _loc3_.addEventListener("WME_OUT", this.hideGroupBadgeInfo);
        }
        let _loc2_: IWindow = this._border.findChildByName("avatar_image_profile_link");
        if (_loc2_ != null) {
            _loc2_.procedure = this.onProfileLink;
        }
        if (this._widget.handler.isActivityDisplayEnabled) {
            this._border.findChildByName("score_spacer").visible = true;
            this._border.findChildByName("score_value").visible = true;
            this._border.findChildByName("score_text").visible = true;
        }
    }

    protected onMottoKeyboard = (param1: WindowKeyboardEvent): void => {
        let _loc5_: RoomWidgetChangeMottoMessage = null;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("motto_container"), isIWindowContainer);
        if (!_loc7_) {
            return;
        }
        let _loc4_: ITextFieldWindow = asGuarded(_loc7_.findChildByName("motto_text"), isITextFieldWindow);
        let _loc3_: string = _loc4_.text;
        if (param1.keyCode == 13) {
            _loc2_ = getTimer();
            if (_loc2_ - this._SafeStr_7118 > 2000 && _loc3_ != this._widget.localizations.getLocalization("infostand.motto.change")) {
                _loc6_ = this._widget.userData.userId;
                _loc5_ = new RoomWidgetChangeMottoMessage(_loc3_);
                this._widget.messageListener.processWidgetMessage(_loc5_);
                this._SafeStr_7118 = _loc2_;
                _loc4_.textColor = 16777215;
                _loc4_.unfocus();
            }
        } else {
            _loc4_.textColor = 11184810;
        }
        _loc4_.height = Math.min(_loc4_.textHeight + 5, 50) | 0;
        _loc4_.height = Math.max(_loc4_.height, 23) | 0;
        _loc7_.height = _loc4_.height + 3;
    };

    protected onMottoClicked = (param1: WindowMouseEvent): void => {
        let _loc3_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("motto_container"), isIWindowContainer);
        if (!_loc3_) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(_loc3_.findChildByName("motto_text"), isITextWindow);
        if (_loc2_.text == this._widget.localizations.getLocalization("infostand.motto.change")) {
            _loc2_.text = "";
        }
        _loc2_.textColor = 11184810;
    };

    protected onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc3_: RoomWidgetMessage = null;
        let _loc4_: string = null;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc5_: any = _loc2_.name;
        if ("home_icon" === _loc5_) {
            _loc4_ = "RWUAM_OPEN_HOME_PAGE";
        }
        if (_loc4_ != null) {
            _loc3_ = new RoomWidgetUserActionMessage(_loc4_, this._widget.userData.userId);
            HabboTracking.getInstance().trackEventLog("InfoStand", "click", _loc4_);
        }
        if (_loc3_ != null) {
            this._widget.messageListener.processWidgetMessage(_loc3_);
        }
        this.updateWindow();
    };

    protected onProfileLink = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: ITextWindow = null;
        if (param1.type == "WME_CLICK") {
            this._widget.messageListener.processWidgetMessage(new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", this._widget.userData.userId, "infoStand_userView"));
        }
        if (param2.name == "profile_link") {
            if (param1.type == "WME_OVER") {
                _loc3_ = asGuarded(this._SafeStr_2794.findChildByName("name_text"), isITextWindow);
                _loc3_.textColor = 9552639;
            }
            if (param1.type == "WME_OUT") {
                _loc3_ = asGuarded(this._SafeStr_2794.findChildByName("name_text"), isITextWindow);
                _loc3_.textColor = 16777215;
            }
        }
    };

    private selectGroupBadge = (param1: WindowMouseEvent): void => {
        if (this._widget.userData.groupId < 0) {
            return;
        }
        let _loc2_: any = this._widget.userData.type == "RWUIUE_OWN_USER";
        let _loc3_: RoomWidgetGetBadgeDetailsMessage = new RoomWidgetGetBadgeDetailsMessage(_loc2_, this._widget.userData.groupId);
        this._widget.messageListener.processWidgetMessage(_loc3_);
    };

    private showGroupBadgeInfo = (param1: WindowMouseEvent): void => {
        if (this._widget.userData.groupId < 0) {
            return;
        }
        this.createBadgeDetails();
        if (param1.window == null) {
            return;
        }
        this._badgeDetails.findChildByName("name").caption = this._widget.userData.groupName;
        let _loc2_: Rectangle = new Rectangle();
        param1.window.getGlobalRectangle(_loc2_);
        this._badgeDetails.x = _loc2_.left - this._badgeDetails.width | 0;
        this._badgeDetails.y = _loc2_.top + (_loc2_.height - this._badgeDetails.height) / 2 | 0;
    };

    private hideGroupBadgeInfo = (param1: WindowMouseEvent): void => {
        this.disposeBadgeDetails();
    };

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

    private onTagSelected = (param1: WindowMouseEvent): void => {
        let _loc2_: ITextWindow = asGuarded(param1.target, isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        this._widget.messageListener.processWidgetMessage(new RoomWidgetRoomTagSearchMessage(_loc2_.text));
    };

    private onRelationshipUserNameLinkClicked = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && isITextLinkWindow(param2)) {
            this._widget.handler.container.connection.send(new GetExtendedProfileMessageComposer(param2.id));
        }
    };

    public update(param1: RoomWidgetUserInfoUpdateEvent): void {
        this.clearBadges();
        this.clearGroupBadge();
        this.setGroupBadge(param1.groupBadgeId);
        this.updateInfo(param1);
    }

    protected updateInfo(param1: RoomWidgetUserInfoUpdateEvent): void {
        this.name = param1.name;
        this.setMotto(param1.motto, param1.type == "RWUIUE_OWN_USER");
        this.achievementScore = param1.achievementScore;
        this.carryItem = param1.carryItem;
        this.xp = param1.xp;
        this.setFigure(param1.figure);
    }
}
