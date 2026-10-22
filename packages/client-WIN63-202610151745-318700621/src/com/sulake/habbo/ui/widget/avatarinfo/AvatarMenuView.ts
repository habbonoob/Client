import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { AvatarInfoWidgetHandler } from '@/com/sulake/habbo/ui/handler/AvatarInfoWidgetHandler';
import type { AvatarInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarInfoData';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';

export class AvatarMenuView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::AvatarMenuView'); }

    protected static readonly MODE_ACTIONS: number = 1;
    protected static readonly MODE_MODERATE: number = 2;
    protected static readonly MODE_BAN: number = 4;
    protected static readonly MODE_MUTE: number = 5;
    protected static readonly MODE_RELATIONSHIP: number = 6;
    protected static readonly MODE_AMBASSADOR: number = 7;
    protected static lastViewMode: number = 1;

    declare protected _data: AvatarInfoData;

    protected _mode: number = 1;

    declare protected _SafeStr_2668: boolean;
    static { (this.prototype as any)._SafeStr_2668 = false; }

    constructor(param1: AvatarInfoWidget) {
        super(param1);
        this._SafeStr_2318 = false;
    }

    public static setup_AvatarMenuView(param1: AvatarMenuView, param2: number, param3: string, param4: number, param5: number, param6: AvatarInfoData): void {
        param1._data = param6;
        param1._mode = 1;
        AvatarContextInfoButtonView.setup(param1, param2, param3, param4, param5, false);
    }

    public override dispose(): void {
        if (this._window) {
            this._window.removeEventListener("WME_OVER", this.onMouseHoverEvent);
            this._window.removeEventListener("WME_OUT", this.onMouseHoverEvent);
        }
        this._data = null;
        super.dispose();
    }

    protected updateButtons(): void {
        let _loc10_: number = 0;
        let _loc5_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: AvatarInfoWidgetHandler = null;
        let _loc11_: boolean = false;
        let _loc6_: string = null;
        let _loc3_: number = 0;
        let _loc12_: IRoomObject = null;
        let _loc7_: number = 0;
        if (!this._window || !this._data) {
            return;
        }
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
        if (!_loc4_) {
            return;
        }
        _loc4_.procedure = this.buttonEventProc;
        _loc4_.autoArrangeItems = false;
        let _loc8_: number = _loc4_.numListItems;
        _loc10_ = 0;
        while (_loc10_ < _loc8_) {
            _loc4_.getListItemAt(_loc10_ >>> 0).visible = false;
            _loc10_++;
        }
        let _loc9_: boolean = this._data.isBlocked;
        if (this._mode == 1) {
            this.showButton("open_profile", _loc9_);
            this.showButton("moderate", this.moderateMenuHasContent());
            this.showButton("friend", this._data.canBeAskedAsFriend && !_loc9_);
            this.showButton("ignore", !this._data.isIgnored && !_loc9_);
            this.showButton("unignore", this._data.isIgnored && !_loc9_);
            this.showButton("report", !!(this.widget.configuration && this.widget.configuration.getBoolean("infostand.report.show") && !_loc9_));
            _loc5_ = this._data.respectLeft;
            _loc1_ = this._data.respectReplenishesLeft;
            this.widget.localizations.registerParameter("infostand.button.respect", "count", _loc5_.toString());
            this.showButton("respect", _loc5_ > 0 && !_loc9_);
            this.showButton("replenish_respect", _loc5_ <= 0 && _loc1_ > 0 && !_loc9_);
            _loc2_ = this.widget.handler;
            _loc11_ = _loc2_.container.sessionDataManager.isAccountSafetyLocked();
            this.showButton("trade", this.citizenshipTalentTrackEnabled || !_loc11_ && this._data.canTrade && !_loc9_);
            switch (this._data.canTradeReason - 2) {
                case 0:
                    _loc6_ = "${infostand.button.trade.tooltip.shutdown}";
                    break;
                case 1:
                    _loc6_ = "${infostand.button.trade.tooltip.tradingroom}";
                    break;
                default:
                    _loc6_ = "";
            }
            castGuarded(castGuarded(_loc4_.getListItemByName("trade"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("button"), isIInteractiveWindow, "com.sulake.core.window.components.IInteractiveWindow").toolTipCaption = _loc6_;
            this.showButton("whisper", !_loc9_);
            if (this.widget.configuration.getBoolean("handitem.give.enabled") && !_loc2_.container.roomEngine.activeRoomHasHanditemControlBlocked) {
                _loc3_ = _loc2_.container.roomSession.ownUserRoomId;
                _loc12_ = _loc2_.container.roomEngine.getRoomObject(_loc2_.roomSession.roomId, _loc3_, 100);
                if (_loc12_ != null) {
                    _loc7_ = _loc12_.getModel().getNumber("figure_carry_object") | 0;
                    if (_loc7_ > 0 && _loc7_ < 999999) {
                        this.showButton("pass_handitem");
                    }
                }
            }
            this.showButton("relationship", this.widget.configuration.getBoolean("relationship.status.enabled") && this._data.isFriend && !_loc9_);
            this.showButton("ambassador", this.ambassadorMenuHasContent());
            this.showButton("wired_inspect", _loc2_.container.userDefinedRoomEvents.showInspectButton());
        }
        if (this._mode == 2) {
            this.showButton("kick", this._data.canBeKicked);
            this.showButton("ban_with_duration", this._data.canBeBanned);
            this.showButton("mute", this._data.canBeMuted);
            this.showButton("give_rights", this.isShowGiveRights());
            this.showButton("remove_rights", this.isShowRemoveRights());
            this.showButton("actions");
        }
        if (this._mode == 4) {
            this.showButton("ban_hour");
            this.showButton("ban_day");
            this.showButton("perm_ban");
            this.showButton("actions");
        }
        if (this._mode == 5) {
            this.showButton("mute_2min");
            this.showButton("mute_5min");
            this.showButton("mute_10min");
            this.showButton("actions");
        }
        if (this._mode == 6) {
            this.showButtonGrid("relationship_grid");
            this.showButton("no_relationship");
            this.showButton("actions");
        }
        if (this._mode == 7) {
            this.showButton("ambassador_kick");
            this.showButton("ambassador_alert");
            this.showButton("ambassador_mute_15min");
            this.showButton("ambassador_mute_60min");
            this.showButton("ambassador_mute_18hour");
            this.showButton("ambassador_mute_36hour");
            this.showButton("ambassador_mute_72hour");
            this.showButton("ambassador_unmute");
            this.showButton("actions");
        }
        _loc4_.autoArrangeItems = true;
        _loc4_.visible = true;
        AvatarMenuView.lastViewMode = this._mode;
        this._SafeStr_2668 = false;
    }

    private ambassadorMenuHasContent(): boolean {
        return this._data.isAmbassador;
    }

    private moderateMenuHasContent(): boolean {
        return this._data.canBeKicked || this._data.canBeBanned || this._data.canBeMuted || this.isShowGiveRights() || this.isShowRemoveRights();
    }

    private isShowGiveRights(): boolean {
        return this._data.amIOwner && this._data.targetRoomControllerLevel < 1;
    }

    private isShowRemoveRights(): boolean {
        return this._data.amIOwner && this._data.targetRoomControllerLevel == 1;
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        let _loc7_: ITextWindow = null;
        let _loc4_: IItemGridWindow = null;
        let _loc3_: IIterator = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc8_: IWindowContainer = null;
        let _loc2_: IWindowContainer = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (ContextInfoView._SafeStr_2596) {
            this.activeView = this.getMinimizedView();
        } else {
            if (!this._window) {
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("avatar_menu_widget"), XmlAsset).content, XML);
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
            this._window.findChildByName("profile_link").procedure = this.buttonEventProc;
            _loc7_ = asGuarded(this._window.findChildByName("name"), isITextWindow);
            if (this._data.isBlocked) {
                _loc7_.italic = true;
                _loc7_.caption = "${infostand.blocked_user}";
            } else {
                _loc7_.italic = false;
                this._window.findChildByName("name").caption = this._userName;
            }
            this._window.visible = false;
            this.activeView = this._window;
            this.updateButtons();
            this.updateRelationshipStatus();
            _loc4_ = asGuarded(this._window.findChildByName("relationship_grid"), isIItemGridWindow);
            _loc3_ = _loc4_.iterator;
            _loc5_ = _loc3_.length | 0;
            _loc6_ = 0;
            while (_loc6_ < _loc5_) {
                _loc8_ = asGuarded(_loc3_[_loc6_], isIWindowContainer);
                _loc2_ = asGuarded(_loc8_.findChildByName("button"), isIWindowContainer);
                _loc2_.procedure = this.buttonEventProc;
                _loc6_++;
            }
        }
    }

    protected override buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc6_: string = null;
        let _loc4_: number = 0;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        let _loc5_: RoomWidgetMessage = null;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                _loc3_ = true;
                switch (param2.parent.name) {
                    case "whisper":
                        _loc6_ = "RWUAM_WHISPER_USER";
                        break;
                    case "friend":
                        param2.disable();
                        this._data.canBeAskedAsFriend = false;
                        _loc6_ = "RWUAM_SEND_FRIEND_REQUEST";
                        break;
                    case "respect":
                        this._data.respectLeft -= 1;
                        _loc4_ = this._data.respectLeft;
                        this.widget.localizations.registerParameter("infostand.button.respect", "count", _loc4_.toString());
                        this.showButton("respect", this._data.respectLeft > 0);
                        _loc6_ = "RWUAM_RESPECT_USER";
                        if (_loc4_ > 0) {
                            _loc3_ = false;
                        }
                        break;
                    case "replenish_respect":
                        _loc6_ = "RWUAM_REPLENISH_RESPECT_USER";
                        break;
                    case "wired_inspect":
                        _loc6_ = "RWUAM_WIRED_INSPECT";
                        break;
                    case "open_profile":
                        _loc6_ = "RWUAM_OPEN_PROFILE";
                        break;
                    case "ignore":
                        param2.parent.visible = false;
                        this._window.findChildByName("unignore").visible = true;
                        this._data.isIgnored = true;
                        _loc6_ = "RWUAM_IGNORE_USER";
                        break;
                    case "unignore":
                        param2.parent.visible = false;
                        this._window.findChildByName("ignore").visible = true;
                        this._data.isIgnored = false;
                        _loc6_ = "RWUAM_UNIGNORE_USER";
                        break;
                    case "kick":
                        _loc6_ = "RWUAM_KICK_USER";
                        break;
                    case "ban_hour":
                        _loc6_ = "RWUAM_BAN_USER_HOUR";
                        break;
                    case "ban_day":
                        _loc6_ = "RWUAM_BAN_USER_DAY";
                        break;
                    case "perm_ban":
                        _loc6_ = "RWUAM_BAN_USER_PERM";
                        break;
                    case "mute_2min":
                        _loc6_ = "RWUAM_MUTE_USER_2MIN";
                        break;
                    case "mute_5min":
                        _loc6_ = "RWUAM_MUTE_USER_5MIN";
                        break;
                    case "mute_10min":
                        _loc6_ = "RWUAM_MUTE_USER_10MIN";
                        break;
                    case "ban_with_duration":
                        this._mode = 4;
                        this._SafeStr_2668 = true;
                        _loc3_ = false;
                        break;
                    case "mute":
                        this._mode = 5;
                        this._SafeStr_2668 = true;
                        _loc3_ = false;
                        break;
                    case "give_rights":
                        param2.parent.visible = false;
                        this._window.findChildByName("remove_rights").visible = true;
                        this._data.myRoomControllerLevel = 1;
                        _loc6_ = "RWUAM_GIVE_RIGHTS";
                        break;
                    case "remove_rights":
                        param2.parent.visible = false;
                        this._window.findChildByName("give_rights").visible = true;
                        this._data.myRoomControllerLevel = 0;
                        _loc6_ = "RWUAM_TAKE_RIGHTS";
                        break;
                    case "trade":
                        _loc6_ = "RWUAM_START_TRADING";
                        break;
                    case "moderate":
                        this._mode = 2;
                        this._SafeStr_2668 = true;
                        _loc3_ = false;
                        break;
                    case "report":
                        _loc6_ = "RWUAM_REPORT_CFH_OTHER";
                        break;
                    case "actions":
                        this._mode = 1;
                        this._SafeStr_2668 = true;
                        _loc3_ = false;
                        break;
                    case "relationship":
                        this._mode = 6;
                        this._SafeStr_2668 = true;
                        _loc3_ = false;
                        break;
                    case "pass_handitem":
                        _loc6_ = "RWUAM_PASS_CARRY_ITEM";
                        break;
                    case "relationship_heart":
                        this.setRelationship(1);
                        break;
                    case "relationship_smile":
                        this.setRelationship(2);
                        break;
                    case "relationship_bobba":
                        this.setRelationship(3);
                        break;
                    case "no_relationship":
                        this.setRelationship(0);
                        break;
                    case "ambassador":
                        this._mode = 7;
                        this._SafeStr_2668 = true;
                        _loc3_ = false;
                        break;
                    case "ambassador_alert":
                        _loc6_ = "RWUAM_AMBASSADOR_ALERT_USER";
                        break;
                    case "ambassador_kick":
                        _loc6_ = "RWUAM_AMBASSADOR_KICK_USER";
                        break;
                    case "ambassador_mute_2min":
                        _loc6_ = "RWUAM_AMBASSADOR_MUTE_2MIN";
                        break;
                    case "ambassador_mute_10min":
                        _loc6_ = "RWUAM_AMBASSADOR_MUTE_10MIN";
                        break;
                    case "ambassador_mute_15min":
                        _loc6_ = "RWUAM_AMBASSADOR_MUTE_15MIN";
                        break;
                    case "ambassador_mute_60min":
                        _loc6_ = "RWUAM_AMBASSADOR_MUTE_60MIN";
                        break;
                    case "ambassador_mute_18hour":
                        _loc6_ = "RWUAM_AMBASSADOR_MUTE_18HOUR";
                        break;
                    case "ambassador_mute_36hour":
                        _loc6_ = "RWUAM_AMBASSADOR_MUTE_36HOUR";
                        break;
                    case "ambassador_mute_72hour":
                        _loc6_ = "RWUAM_AMBASSADOR_MUTE_72HOUR";
                        break;
                    case "ambassador_unmute":
                        _loc6_ = "RWUAM_AMBASSADOR_UNMUTE";
                }
            }
            if (param2.name == "profile_link") {
                _loc3_ = true;
                _loc5_ = new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", this._userId, "avatarContextMenu");
            }
            if (_loc6_ != null) {
                _loc5_ = new RoomWidgetUserActionMessage(_loc6_, this._userId);
                HabboTracking.getInstance().trackEventLog("InfoStand", "click", _loc6_);
            }
            if (_loc5_ != null) {
                this._widget.messageListener.processWidgetMessage(_loc5_);
            }
            this.updateButtons();
        } else if (param1.type == "WME_OVER") {
            if (param2.name == "button") {
                switch (param2.parent.name) {
                    case "kick":
                        HabboTracking.getInstance().trackEventLogOncePerSession("InterfaceExplorer", "hover", "avatar.kick.hover");
                        break;
                    case "perm_ban":
                    case "ban_hour":
                    case "ban_day":
                    case "ban_with_duration":
                        HabboTracking.getInstance().trackEventLogOncePerSession("InterfaceExplorer", "hover", "avatar.ban.hover");
                        break;
                    case "mute":
                    case "mute_2min":
                    case "mute_5min":
                    case "mute_10min":
                        HabboTracking.getInstance().trackEventLogOncePerSession("InterfaceExplorer", "hover", "avatar.mute.hover");
                        break;
                    case "unignore":
                    case "ignore":
                        HabboTracking.getInstance().trackEventLogOncePerSession("InterfaceExplorer", "hover", "avatar.ignore.hover");
                }
            }
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_) {
            this._widget.removeView(this, false);
        }
    }

    private get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
    }

    private get citizenshipTalentTrackEnabled(): boolean {
        return castTo(this._widget, AvatarInfoWidget).configuration.getBoolean("talent.track.citizenship.enabled");
    }

    private setRelationship(param1: number): void {
        this._widget.friendList.setRelationshipStatus(this._userId, param1);
    }
}
