import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';
import type { Token } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/Token';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Combo } from '@/com/sulake/core/window/motion/Combo';
import { EaseOut } from '@/com/sulake/core/window/motion/EaseOut';
import { Motions } from '@/com/sulake/core/window/motion/Motions';
import { MoveTo } from '@/com/sulake/core/window/motion/MoveTo';
import { ResizeTo } from '@/com/sulake/core/window/motion/ResizeTo';
import { Tab } from '@/com/sulake/habbo/friendbar/view/tabs/Tab';
import { AchievementToken } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/AchievementToken';
import { GameToken } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/GameToken';
import { QuestToken } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/QuestToken';
import { RoomEventToken } from '@/com/sulake/habbo/friendbar/view/tabs/tokens/RoomEventToken';

export class NewFriendEntityTab extends Tab {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs::NewFriendEntityTab'); }

    private static readonly _SafeStr_7861: string = "new_friend_entity_xml";
    private static readonly _SafeStr_7770: string = "facebook_piece_xml";
    private static readonly CONTROLS_PIECE_RESOURCE: string = "new_controls_piece_xml";
    protected static readonly PIECES: string = "pieces";
    protected static readonly _SafeStr_7655: string = "icons";
    protected static readonly HEADER: string = "header";
    protected static readonly PROFILE: string = "region_profile";
    protected static readonly _SafeStr_7964: string = "facebook";
    protected static readonly CONTROLS: string = "controls";
    protected static readonly CANVAS: string = "canvas";
    protected static readonly NAME: string = "name";
    protected static readonly MESSAGE: string = "btn_message";
    protected static readonly MESSAGE_ICON: string = "icon_message";
    protected static readonly VISIT: string = "btn_visit";
    protected static readonly ICON: string = "icon";
    protected static readonly LABEL: string = "label";
    protected static readonly NOTIFICATION: string = "notification";
    protected static readonly BTN_PROFILE: string = "button_profile";
    protected static readonly BTN_MESSENGER: string = "btn_chat";
    protected static readonly BTN_GAME: string = "btn_game";
    protected static readonly GAME_ICON: string = "icon_game";
    protected static readonly BUBBLE: string = "bubble";
    protected static readonly BUBBLE_MESSAGE: string = "bubble_message";
    protected static readonly BUBBLE_BUTTON_ACCEPT: string = "bubble_button_accept";
    protected static readonly _SafeStr_7775: string = "bubble_button_close";
    protected static readonly _SafeStr_8371: string = "bubble_click_region_reject";
    private static readonly DEFAULT_COLOR: number = 10338138;
    private static readonly _SafeStr_7659: number = 13891476;
    private static readonly TOKEN_ICON_TAG_NONE: string = null;
    private static readonly TOKEN_ICON_TAG_NOTIFY: string = "icon_tag_notify";
    private static readonly TOKEN_ICON_TAG_MESSAGE: string = "icon_tag_message";
    private static readonly TOKEN_ICON_TAG_GAME: string = "icon_tag_game";
    private static readonly _SafeStr_4348: NewFriendEntityTab[] = [];
    private static readonly _SafeStr_4478: IWindowContainer[] = [];

    declare protected _friend: IFriendEntity;

    declare protected _SafeStr_2298: Token[];

    protected _isInGame: boolean = false;

    declare protected _gameType: string;

    declare private _SafeStr_4292: boolean;
    static { (this.prototype as any)._SafeStr_4292 = false; }

    constructor() {
        super();
    }

    public static allocate(param1: IFriendEntity): NewFriendEntityTab {
        let _loc2_: NewFriendEntityTab = NewFriendEntityTab._SafeStr_4348.length > 0 ? NewFriendEntityTab._SafeStr_4348.pop() : new NewFriendEntityTab();
        _loc2_._recycled = false;
        _loc2_.friend = param1;
        if (param1.notifications.length > 0) {
            for (const _loc3_ of param1.notifications ?? []) {
                _loc2_.addNotificationToken(_loc3_);
            }
        }
        return _loc2_;
    }

    private static purgeEntityPieces(param1: IWindowContainer): void {
        let _loc3_: IWindowContainer = null;
        let _loc4_: IItemListWindow = castGuarded(param1.getChildByName("pieces"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        _loc3_ = asGuarded(_loc4_.getListItemByName("facebook"), isIWindowContainer);
        if (_loc3_) {
            _loc3_.dispose();
        }
        _loc3_ = asGuarded(_loc4_.getListItemByName("controls"), isIWindowContainer);
        if (_loc3_) {
            _loc3_.dispose();
        }
        let _loc5_: any[] = [];
        _loc4_.groupListItemsWithTag("notification", _loc5_);
        if (_loc5_.length > 0) {
            for (const _loc2_ of _loc5_ ?? []) {
                _loc2_.parent = null;
            }
        }
        param1.height = Tab.HEIGHT;
        param1.y = 0;
    }

    public set friend(param1: IFriendEntity) {
        this._friend = param1;
        this.refresh();
    }

    public get friend(): IFriendEntity {
        return this._friend;
    }

    public override recycle(): void {
        if (!this.disposed) {
            if (!this._recycled) {
                if (this._window) {
                    this.releaseFriendTabWindow(this._window);
                    this._window = null;
                }
                if (this._SafeStr_2298) {
                    while (this._SafeStr_2298.length > 0) {
                        this._SafeStr_2298.pop().dispose();
                    }
                    this._SafeStr_2298 = null;
                }
                this._friend = null;
                this._isInGame = false;
                this._gameType = "";
                this._recycled = true;
                NewFriendEntityTab._SafeStr_4348.push(this);
            }
        }
    }

    public override select(param1: boolean): void {
        let _loc9_: IItemListWindow = null;
        let _loc6_: IWindowContainer = null;
        let _loc7_: IBitmapWrapperWindow = null;
        let _loc8_: boolean = false;
        let _loc10_: ITextWindow = null;
        let _loc2_: IWindow = null;
        let _loc4_: IWindow = null;
        let _loc3_: IWindow = null;
        let _loc5_: string = null;
        if (!this.selected) {
            _loc9_ = castGuarded(this.window.getChildByName("pieces"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            _loc8_ = false;
            if (this.friend.realName != null && this.friend.realName != "") {
                _loc6_ = asGuarded(Tab.WINDOWING.buildFromXML(asInstanceOf(Tab.ASSETS.getAssetByName("facebook_piece_xml").content, XML)), isIWindowContainer);
                _loc6_.name = "facebook";
                _loc10_ = asGuarded(_loc6_.getChildByName("name"), isITextWindow);
                _loc10_.caption = this.friend.realName;
                if (!_loc10_.wordWrap) {
                    Tab.CROPPER.crop(_loc10_);
                }
                _loc7_ = castGuarded(_loc6_.getChildByName("icon"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
                _loc7_.bitmap = asInstanceOf(Tab.ASSETS.getAssetByName(_loc7_.bitmapAssetName).content, BitmapData);
                _loc7_.width = _loc7_.bitmap.width;
                _loc7_.height = _loc7_.bitmap.height;
                _loc9_.addListItem(_loc6_);
                _loc8_ = true;
            }
            if (this._SafeStr_2298) {
                for (const _loc11_ of this._SafeStr_2298 ?? []) {
                    _loc9_.addListItem(_loc11_.windowElement);
                    _loc8_ = true;
                }
            }
            if (this.friend.online) {
                _loc6_ = asGuarded(Tab.WINDOWING.buildFromXML(asInstanceOf(Tab.ASSETS.getAssetByName("new_controls_piece_xml").content, XML)), isIWindowContainer);
                _loc6_.name = "controls";
                _loc2_ = _loc6_.getChildByName("btn_message");
                if (_loc2_) {
                    _loc2_.addEventListener("WME_CLICK", this.onButtonClick);
                }
                if (!this._isInGame) {
                    _loc4_ = _loc6_.getChildByName("btn_game");
                    if (_loc4_) {
                        _loc4_.visible = false;
                    }
                    _loc2_ = _loc6_.getChildByName("btn_visit");
                    if (_loc2_) {
                        if (this.friend.allowFollow) {
                            _loc2_.visible = true;
                            _loc2_.addEventListener("WME_CLICK", this.onButtonClick);
                        } else {
                            _loc2_.visible = false;
                        }
                    }
                } else {
                    _loc3_ = _loc6_.getChildByName("btn_visit");
                    if (_loc3_) {
                        _loc3_.visible = false;
                    }
                    _loc2_ = _loc6_.getChildByName("btn_game");
                    if (_loc2_) {
                        _loc5_ = Tab._SafeStr_2508.getLocalization("gamecenter." + this._gameType + ".name");
                        Tab._SafeStr_2508.registerParameter("friend.bar.game", "game", _loc5_);
                        Tab._SafeStr_2508.registerParameter("friend.bar.game.tip", "game", _loc5_);
                        _loc2_.visible = true;
                        _loc2_.addEventListener("WME_CLICK", this.onButtonClick);
                    }
                }
                _loc2_ = _loc6_.getChildByName("button_profile");
                if (_loc2_) {
                    _loc2_.addEventListener("WME_CLICK", this.onButtonClick);
                }
                _loc2_ = _loc6_.getChildByName("btn_chat");
                if (_loc2_) {
                    _loc2_.addEventListener("WME_CLICK", this.onButtonClick);
                }
                _loc9_.addListItem(_loc6_);
                _loc6_.x = 30;
                _loc8_ = true;
            }
            if (param1 && false && _loc8_ && Motions.getMotionByTarget(this.window) == null) {
                Motions.runMotion(new Combo(new EaseOut(new ResizeTo(this.window, 80, this.window.width, _loc9_.height), 3), new EaseOut(new MoveTo(this.window, 80, this.window.x, Tab.HEIGHT - _loc9_.height), 3)));
            } else {
                if (_loc8_) {
                    this.window.height = _loc9_.height;
                }
                this.window.y = Tab.HEIGHT - this.window.height;
            }
            super.select(param1);
            if (param1) {
                if (Tab.TRACKING) {
                    Tab.TRACKING.trackEventLog("FriendBar", "", "clicked", "", this.friend.logEventId > 0 ? this.friend.logEventId : 0);
                }
                this.friend.logEventId = -1;
            }
        }
    }

    public override deselect(param1: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: Token = null;
        if (this.selected) {
            if (this._window) {
                NewFriendEntityTab.purgeEntityPieces(this._window);
                if (this._SafeStr_2298) {
                    _loc3_ = this._SafeStr_2298.length - 1;
                    while (_loc3_ > -1) {
                        _loc4_ = this._SafeStr_2298[_loc3_];
                        if (_loc4_.viewOnce) {
                            this.removeNotificationToken(_loc4_.typeCode, param1);
                        }
                        _loc3_--;
                    }
                }
            }
            super.deselect(param1);
        }
        let _loc2_: IWindow = this._window.findChildByName("bubble");
        if (_loc2_) {
            _loc2_.visible = false;
        }
    }

    protected override expose(): void {
        super.expose();
        this._window.color = (this.exposed ? 13891476 : 10338138) >>> 0;
        castGuarded(this._window.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = this.exposed;
    }

    protected override conceal(): void {
        super.conceal();
        this._window.color = (this.exposed ? 13891476 : 10338138) >>> 0;
        castGuarded(this._window.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = this.exposed;
    }

    private onAvatarRendererReady = (param1: Event): void => {
        this._SafeStr_4292 = false;
        Tab.AVATAR_RENDER_MANAGER.events.removeEventListener("AVATAR_RENDER_READY", this.onAvatarRendererReady);
        this.refresh();
    };

    protected refresh(): void {
        let _loc1_: IBitmapWrapperWindow = null;
        let _loc2_: IWindowContainer = null;
        if (!this._window) {
            this._window = this.allocateFriendTabWindow();
        }
        if (!Tab.AVATAR_RENDER_MANAGER.isReady) {
            if (!this._SafeStr_4292) {
                Tab.AVATAR_RENDER_MANAGER.events.addEventListener("AVATAR_RENDER_READY", this.onAvatarRendererReady);
                this._SafeStr_4292 = true;
            }
            return;
        }
        if (this._friend) {
            this._window.id = this._friend.id;
            _loc2_ = asGuarded(castGuarded(this._window.getChildByName("pieces"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").getListItemByName("header"), isIWindowContainer);
            _loc2_.findChildByName("name").caption = this._friend.name;
            Tab.CROPPER.crop(asGuarded(_loc2_.getChildByName("name"), isITextWindow));
            _loc1_ = castGuarded(_loc2_.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            if (this._friend.id > 0) {
                _loc1_.bitmap = Tab.VIEW.getAvatarFaceBitmap(this._friend.figure);
            } else {
                _loc1_.bitmap = Tab.VIEW.getGroupIconBitmap(this._friend.figure);
            }
            if (_loc1_.bitmap) {
                _loc1_.width = _loc1_.bitmap.width;
                _loc1_.height = _loc1_.bitmap.height;
            }
        }
    }

    private allocateFriendTabWindow(): IWindowContainer {
        let _loc1_: IWindowContainer = NewFriendEntityTab._SafeStr_4478.length > 0 ? NewFriendEntityTab._SafeStr_4478.pop() : asGuarded(Tab.WINDOWING.buildFromXML(asInstanceOf(Tab.ASSETS.getAssetByName("new_friend_entity_xml").content, XML)), isIWindowContainer);
        let _loc5_: IBitmapWrapperWindow = castGuarded(_loc1_.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc4_: IRegionWindow = castGuarded(_loc1_.findChildByName("header"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc3_: IRegionWindow = castGuarded(_loc1_.findChildByName("region_profile"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc6_: IWindow = _loc1_.findChildByName("icons");
        let _loc2_: IBubbleWindow = asGuarded(_loc1_.findChildByName("bubble"), isIBubbleWindow);
        _loc1_.x = 0;
        _loc1_.y = 0;
        _loc1_.width = Tab.WIDTH;
        _loc1_.height = Tab.HEIGHT;
        _loc1_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc1_.addEventListener("WME_OVER", this.onMouseOver);
        _loc1_.addEventListener("WME_OUT", this.onMouseOut);
        _loc4_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc4_.addEventListener("WME_OVER", this.onMouseOver);
        _loc4_.addEventListener("WME_OUT", this.onMouseOut);
        _loc3_.addEventListener("WME_CLICK", this.onProfileMouseEvent);
        _loc3_.toolTipCaption = Tab._SafeStr_2508.getLocalization("infostand.profile.link.tooltip", "");
        _loc3_.toolTipDelay = 100;
        _loc6_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc6_.addEventListener("WME_OVER", this.onMouseOver);
        _loc6_.addEventListener("WME_OUT", this.onMouseOut);
        _loc5_.disposesBitmap = true;
        _loc2_.procedure = this.bubbleEventProc;
        _loc2_.y = -(_loc2_.height + 5);
        _loc2_.visible = false;
        return _loc1_;
    }

    private releaseFriendTabWindow(param1: IWindowContainer): void {
        let _loc3_: IRegionWindow = null;
        let _loc5_: IWindow = null;
        let _loc2_: IRegionWindow = null;
        let _loc4_: IBitmapWrapperWindow = null;
        if (param1 && !param1.disposed) {
            param1.procedure = null;
            param1.removeEventListener("WME_CLICK", this.onMouseClick);
            param1.removeEventListener("WME_OVER", this.onMouseOver);
            param1.removeEventListener("WME_OUT", this.onMouseOut);
            _loc3_ = castGuarded(param1.findChildByName("header"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            _loc3_.removeEventListener("WME_CLICK", this.onMouseClick);
            _loc3_.removeEventListener("WME_OVER", this.onMouseOver);
            _loc3_.removeEventListener("WME_OUT", this.onMouseOut);
            _loc5_ = param1.findChildByName("icons");
            _loc5_.removeEventListener("WME_CLICK", this.onMouseClick);
            _loc5_.removeEventListener("WME_OVER", this.onMouseClick);
            _loc5_.removeEventListener("WME_OUT", this.onMouseClick);
            _loc2_ = castGuarded(param1.findChildByName("region_profile"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            _loc2_.removeEventListener("WME_CLICK", this.onProfileMouseEvent);
            param1.width = Tab.WIDTH;
            param1.height = Tab.HEIGHT;
            param1.color = 10338138;
            _loc4_ = castGuarded(param1.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            _loc4_.bitmap = null;
            castGuarded(param1.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = false;
            NewFriendEntityTab.purgeEntityPieces(param1);
            if (NewFriendEntityTab._SafeStr_4478.indexOf(param1) == -1) {
                NewFriendEntityTab._SafeStr_4478.push(param1);
            }
        }
    }

    private onButtonClick = (param1: WindowMouseEvent): void => {
        if (!this.disposed && !this.recycled) {
            switch (param1.window.name) {
                case "btn_message":
                case "icon_message":
                    Tab.VIEW.removeMessengerNotifications();
                    if (Tab.DATA && this._friend) {
                        Tab.DATA.startConversation(this._friend.id);
                        this.deselect(true);
                        if (param1.window.name == "icon_message") {
                            Tab.VIEW.setMessengerIconNotify(false);
                        }
                    }
                    break;
                case "btn_visit":
                    if (Tab.DATA && this._friend) {
                        Tab.DATA.followToRoom(this._friend.id);
                        this.deselect(true);
                    }
                    break;
                case "button_profile":
                    if (Tab.DATA && this._friend) {
                        Tab.TRACKING.trackGoogle("extendedProfile", "friendToolbar_friendButton");
                        Tab.DATA.showProfile(this._friend.id);
                        this.deselect(true);
                    }
                    break;
                case "btn_chat":
                    if (Tab.DATA && this._friend) {
                        Tab.DATA.startConversation(this._friend.id);
                        this.deselect(true);
                    }
                    break;
                case "btn_game":
                case "icon_game":
                    if (Tab.GAMES) {
                        this.deselect(true);
                        Tab.GAMES.initGameDirectoryConnection();
                        Tab.DATA.sendGameButtonTracking(this._gameType);
                    }
            }
        }
    };

    protected onProfileMouseEvent = (param1: WindowMouseEvent): void => {
        if (param1.type == "WME_CLICK") {
            Tab.TRACKING.trackGoogle("extendedProfile", "friendBar_friendAvatar");
            Tab.DATA.showProfile(this._friend.id);
            this.deselect(true);
        }
    };

    public addNotificationToken(param1: IFriendNotification): void {
        let _loc6_: any = undefined;
        let _loc7_: Token = null;
        let _loc5_: IItemListWindow = null;
        let _loc4_: IWindow = null;
        this.removeNotificationToken(param1.typeCode, false);
        if (!this._SafeStr_2298) {
            this._SafeStr_2298 = [];
        }
        let _loc2_: boolean = this.selected;
        if (_loc2_) {
            _loc6_ = this._SafeStr_2298;
            this._SafeStr_2298 = null;
            this.deselect(false);
            this._SafeStr_2298 = _loc6_;
        }
        let _loc3_: string = null;
        switch (param1.typeCode - -1) {
            case 0:
                break;
            case 1:
                _loc7_ = new RoomEventToken(this.friend, param1);
                _loc7_.iconElement.addEventListener("WME_CLICK", this.onMouseClick);
                _loc3_ = "icon_tag_notify";
                break;
            case 2:
                _loc7_ = new AchievementToken(this.friend, param1, Tab._SafeStr_2508);
                _loc7_.iconElement.addEventListener("WME_CLICK", this.onMouseClick);
                _loc3_ = "icon_tag_notify";
                break;
            case 3:
                _loc7_ = new QuestToken(this.friend, param1);
                _loc7_.iconElement.addEventListener("WME_CLICK", this.onMouseClick);
                _loc3_ = "icon_tag_notify";
                break;
            case 4:
                _loc7_ = new GameToken(this.friend, param1);
                _loc7_.iconElement.name = "icon_game";
                _loc7_.iconElement.addEventListener("WME_CLICK", this.onMouseClick);
                _loc3_ = "icon_tag_game";
                this._isInGame = true;
                this._gameType = _loc7_.notification.message;
                break;
            case 5:
                this.removeNotificationToken(3, true);
                this._isInGame = false;
                return;
            default:
                throw new Error("Unknown friend notification type: " + param1.typeCode + "!");
        }
        if (_loc7_) {
            this._SafeStr_2298.push(_loc7_);
            if (_loc3_ != null) {
                _loc5_ = castGuarded(this._window.findChildByName("icons"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
                if (!_loc5_.getListItemByTag(_loc3_)) {
                    _loc4_ = _loc7_.iconElement;
                    if (_loc4_.tags.indexOf(_loc3_) == -1) {
                        _loc4_.tags.push(_loc3_);
                    }
                    _loc5_.addListItemAt(_loc4_, 0);
                }
            }
        }
        if (_loc2_) {
            this.select(false);
        }
    }

    public removeNotificationToken(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: Token = null;
        if (!this._SafeStr_2298) {
            return;
        }
        _loc3_ = this._SafeStr_2298.length - 1;
        while (_loc3_ > -1) {
            _loc4_ = this._SafeStr_2298[_loc3_];
            if (_loc4_.typeCode == param1) {
                this._SafeStr_2298.splice(_loc3_, 1);
                if (param2) {
                    this._friend.notifications.splice(this._friend.notifications.indexOf(_loc4_.notification), 1);
                }
                _loc4_.dispose();
                return;
            }
            _loc3_--;
        }
    }

    private bubbleEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "bubble_button_accept":
                case "bubble_button_close":
                case "bubble_click_region_reject":
                    this.deselect(true);
            }
        }
    };

    public toString(): string {
        return getQualifiedClassName(this) + " " + this._friend.name;
    }
}
