import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { AvatarInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoData';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { isIContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import { AvatarExpressionEnum } from '@/com/sulake/habbo/ui/widget/enums/AvatarExpressionEnum';
import { RoomWidgetAvatarExpressionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetAvatarExpressionMessage';
import { RoomWidgetChangePostureMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChangePostureMessage';
import { RoomWidgetDanceMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetDanceMessage';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetRequestWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRequestWidgetMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';

export class OwnAvatarMenuView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::OwnAvatarMenuView'); }

    private static readonly MODE_NORMAL: number = 0;
    private static readonly MODE_CLUB_DANCES: number = 1;
    private static readonly MODE_NAME_CHANGE: number = 2;
    private static readonly MODE_EXPRESSIONS: number = 3;
    private static readonly MODE_SIGNS: number = 4;
    private static readonly MODE_CHANGE_LOOKS: number = 5;
    private static readonly EXPRESSION_67_ENABLED_KEY: string = "avatar.expression.67.enabled";
    private static _SafeStr_7424: boolean = false;

    declare private _data: AvatarInfoData;

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    constructor(param1: AvatarInfoWidget) {
        super(isIContextMenuParentWidget(param1) ? param1 : null);
        this._SafeStr_2318 = false;
    }

    public static setup_OwnAvatarMenuView(param1: OwnAvatarMenuView, param2: number, param3: string, param4: number, param5: number, param6: AvatarInfoData): void {
        if (param1 == null || param1.widget == null) {
            return;
        }
        param1._data = param6;
        if (!OwnAvatarMenuView._SafeStr_7424 && param1.widget.configuration.getInteger("new.identity", 0) > 0 && param1.widget.configuration.getBoolean("new.user.reception.enabled")) {
            param1._mode = 0;
            OwnAvatarMenuView._SafeStr_7424 = true;
        } else if (param1.widget.isDancing && param1.widget.hasClub && !param1.widget.hasEffectOn) {
            param1._mode = 1;
        } else if (param6.allowNameChange && param1.widget.useMinimizedOwnAvatarMenu) {
            param1._mode = 2;
        } else {
            param1._mode = 0;
        }
        AvatarContextInfoButtonView.setup(param1, param2, param3, param4, param5, false);
    }

    public override dispose(): void {
        this._data = null;
        super.dispose();
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        let _loc4_: IItemGridWindow = null;
        let _loc3_: IIterator = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc8_: IWindowContainer = null;
        let _loc2_: IWindowContainer = null;
        let _loc7_: IRegionWindow = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (ContextInfoView._SafeStr_2596) {
            this.activeView = this.getMinimizedView();
        } else {
            if (!this._window) {
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("own_avatar_menu"), XmlAsset).content, XML);
                this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
                if (!this._window) {
                    return;
                }
                this._window.addEventListener("WME_OVER", this.onMouseHoverEvent);
                this._window.addEventListener("WME_OUT", this.onMouseHoverEvent);
                this._window.findChildByName("minimize").addEventListener("WME_CLICK", this.onMinimize);
                this._window.findChildByName("minimize").addEventListener("WME_OVER", this.onMinimizeHover);
                this._window.findChildByName("minimize").addEventListener("WME_OUT", this.onMinimizeHover);
            }
            this._buttons = asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
            this._buttons.procedure = this.buttonEventProc;
            _loc4_ = asGuarded(this._window.findChildByName("signs_grid"), isIItemGridWindow);
            _loc3_ = _loc4_.iterator;
            _loc5_ = _loc3_.length | 0;
            _loc6_ = 0;
            while (_loc6_ < _loc5_) {
                _loc8_ = asGuarded(_loc3_[_loc6_], isIWindowContainer);
                _loc2_ = asGuarded(_loc8_.findChildByName("button"), isIWindowContainer);
                _loc2_.procedure = this.gridEventProc;
                _loc6_++;
            }
            _loc7_ = asGuarded(this._window.findChildByName("profile_link"), isIRegionWindow);
            if (_loc7_) {
                _loc7_.procedure = this.buttonEventProc;
                _loc7_.toolTipCaption = this.widget.localizations.getLocalization("infostand.profile.link.tooltip", "Click to view profile");
                _loc7_.toolTipDelay = 100;
            }
            this._window.findChildByName("name").caption = this._userName;
            this._window.visible = false;
            this.activeView = this._window;
            this.updateButtons();
        }
    }

    public updateButtons(): void {
        let _loc4_: number = 0;
        let _loc1_: boolean = false;
        let _loc2_: boolean = false;
        if (!this._window || !this._data || !this._buttons) {
            return;
        }
        this._buttons.autoArrangeItems = false;
        let _loc3_: number = this._buttons.numListItems;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            this._buttons.getListItemAt(_loc4_ >>> 0).visible = false;
            _loc4_++;
        }
        let _loc5_: boolean = this.widget.isCurrentUserRiding;
        switch (this._mode) {
            case 0:
                this.showButton("change_name", this._data.allowNameChange);
                this.showButton("decorate", this.decorateModeSupported() && (this._data.myRoomControllerLevel >= 1 || this._data.amIOwner));
                this.showButton("change_looks");
                this.showButton("dance_menu", this.widget.hasClub && !_loc5_, !this.widget.hasEffectOn);
                this.showButton("dance", !this.widget.hasClub && !this.widget.isDancing && !_loc5_, !this.widget.hasEffectOn);
                this.showButton("dance_stop", !this.widget.hasClub && this.widget.isDancing && !_loc5_);
                if (!(asInstanceOf(this._widget.windowManager, Component)).getBoolean("memenu.effects.widget.disabled")) {
                    this.showButton("effects", !_loc5_);
                }
                this.showButton("handitem", this._data.carryItemType > 0 && this._data.carryItemType < 999999 && this.widget.configuration.getBoolean("handitem.drop.enabled") && !this.widget.handler.roomEngine.activeRoomHasHanditemControlBlocked);
                _loc1_ = this.widget.configuration.getBoolean("avatar.expressions_menu.enabled");
                this.showButton(_loc1_ ? "expressions" : "wave");
                _loc2_ = this.widget.configuration.getBoolean("avatar.signs.enabled");
                this.showButton("signs", _loc2_);
                this.showButton("wired_inspect", this.widget.handler.container.userDefinedRoomEvents.showInspectButton());
                break;
            case 1:
                this.showButton("dance_stop", true, this.widget.isDancing);
                this.showButton("dance_1");
                this.showButton("dance_2");
                this.showButton("dance_3");
                this.showButton("dance_4");
                this.showButton("back");
                break;
            case 2:
                this.showButton("change_name");
                this.showButton("more");
                break;
            case 3:
                this.showButton("wave", true, !this.widget.isSwimming);
                this.showButton("laugh", true, !this.widget.hasEffectOn && !this.widget.isSwimming && this.widget.hasVip, !this.widget.hasVip);
                this.showButton("blow", true, !this.widget.hasEffectOn && !this.widget.isSwimming && this.widget.hasVip, !this.widget.hasVip);
                this.showButton("67", this.widget.configuration.getBoolean("avatar.expression.67.enabled"), !this.widget.hasEffectOn && !this.widget.isSwimming && this.widget.hasVip, !this.widget.hasVip);
                this.showButton("idle", true);
                if (this.widget.configuration.getBoolean("avatar.sitting.enabled") && !this.widget.isSwimming && !_loc5_) {
                    this.showButton("sit", this.widget.ownAvatarPosture == "std");
                    this.showButton("stand", this.widget.canStandUp);
                }
                this.showButton("back");
                break;
            case 4:
                this.showButtonGrid("signs_grid");
                this.showButton("back");
                break;
            case 5:
                this.showButton("change_looks");
                this.showButton("more");
        }
        this._buttons.autoArrangeItems = true;
        this._buttons.visible = true;
    }

    private gridEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc7_: string = null;
        let _loc3_: string = null;
        let _loc6_: string = null;
        let _loc5_: number = 0;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc4_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                _loc4_ = true;
                _loc7_ = "_";
                _loc3_ = param2.parent.name ? param2.parent.name : "";
                _loc6_ = _loc3_.substr(0, _loc3_.lastIndexOf(_loc7_));
                _loc5_ = parseInt(_loc3_.substr(_loc3_.lastIndexOf(_loc7_) + 1)) | 0;
                let _loc8_: string = _loc6_;
                if ("sign" === _loc8_) {
                    this.widget.sendSignRequest(_loc5_);
                    HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "sign", null, _loc5_);
                }
            }
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc4_) {
            this._widget.removeView(this, false);
        }
    };

    protected override buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc4_: RoomWidgetMessage = null;
        let _loc5_: IWindow = null;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                _loc5_ = (isIWindowContainer(param2) ? param2 : null).getChildByName("icon_vip");
                if (_loc5_ != null && _loc5_.visible && !this.widget.hasVip) {
                    this._widget.catalog.openClubCenter();
                    return;
                }
                _loc3_ = true;
                switch (param2.parent.name) {
                    case "change_name":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_START_NAME_CHANGE");
                        break;
                    case "decorate":
                        if (this.decorateModeSupported()) {
                            this.widget.isUserDecorating = true;
                        }
                        break;
                    case "change_looks":
                        this.widget.openAvatarEditor();
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "clothes");
                        break;
                    case "expressions":
                        _loc3_ = false;
                        this.changeMode(3);
                        break;
                    case "sit":
                        _loc4_ = new RoomWidgetChangePostureMessage(1);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "sit");
                        break;
                    case "stand":
                        _loc4_ = new RoomWidgetChangePostureMessage(0);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "stand");
                        break;
                    case "wave":
                        _loc4_ = new RoomWidgetAvatarExpressionMessage(AvatarExpressionEnum.WAVE);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "wave");
                        break;
                    case "blow":
                        _loc4_ = new RoomWidgetAvatarExpressionMessage(AvatarExpressionEnum.BLOW);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "blow");
                        break;
                    case "67":
                        if (this.widget.configuration.getBoolean("avatar.expression.67.enabled")) {
                            _loc4_ = new RoomWidgetAvatarExpressionMessage(AvatarExpressionEnum.EXPRESSION_67);
                            HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "67");
                        }
                        break;
                    case "jump":
                        break;
                    case "laugh":
                        _loc4_ = new RoomWidgetAvatarExpressionMessage(AvatarExpressionEnum.LAUGH);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "laugh");
                        break;
                    case "idle":
                        _loc4_ = new RoomWidgetAvatarExpressionMessage(AvatarExpressionEnum._SafeStr_4392);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "idle");
                        break;
                    case "dance_menu":
                        _loc3_ = false;
                        this.changeMode(1);
                        break;
                    case "dance":
                        _loc4_ = new RoomWidgetDanceMessage(1);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "dance_start");
                        break;
                    case "dance_stop":
                        _loc4_ = new RoomWidgetDanceMessage(0);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "dance_stop");
                        break;
                    case "dance_1":
                    case "dance_2":
                    case "dance_3":
                    case "dance_4":
                        _loc4_ = new RoomWidgetDanceMessage(parseInt(param2.parent.name.charAt(param2.parent.name.length - 1)) | 0);
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "dance_start");
                        break;
                    case "effects":
                        _loc4_ = new RoomWidgetRequestWidgetMessage("RWRWM_EFFECTS");
                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "click", "effects");
                        break;
                    case "signs":
                        _loc3_ = false;
                        this.changeMode(4);
                        break;
                    case "back":
                        _loc3_ = false;
                        this.changeMode(0);
                        break;
                    case "more":
                        _loc3_ = false;
                        this.widget.useMinimizedOwnAvatarMenu = false;
                        this.changeMode(0);
                        break;
                    case "handitem":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_DROP_CARRY_ITEM", this._userId);
                        break;
                    case "wired_inspect":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_WIRED_INSPECT", this._userId);
                }
            }
            if (param2.name == "profile_link") {
                _loc3_ = true;
                _loc4_ = new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", this.userId, "ownAvatarContextMenu");
            }
            if (_loc4_) {
                this._widget.messageListener.processWidgetMessage(_loc4_);
            }
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_ && !this._disposed) {
            this._widget.removeView(this, false);
        }
    }

    private get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
    }

    private changeMode(param1: number): void {
        this._mode = param1;
        this.updateButtons();
    }

    private decorateModeSupported(): boolean {
        return this.widget.hasClub;
    }
}
