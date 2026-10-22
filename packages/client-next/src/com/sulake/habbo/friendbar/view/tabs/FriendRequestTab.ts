import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FriendRequest } from '@/com/sulake/habbo/friendbar/data/FriendRequest';
import type { IFriendRequest } from '@/com/sulake/habbo/friendbar/data/IFriendRequest';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FriendEntity } from '@/com/sulake/habbo/friendbar/data/FriendEntity';
import { FriendEntityTab } from '@/com/sulake/habbo/friendbar/view/tabs/FriendEntityTab';
import { Tab } from '@/com/sulake/habbo/friendbar/view/tabs/Tab';

export class FriendRequestTab extends FriendEntityTab {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs::FriendRequestTab'); }

    protected static readonly REQUEST_WINDOW_RESOURCE: string = "friend_request_tab_xml";
    protected static readonly BUBBLE: string = "bubble";
    protected static readonly MESSAGE: string = "message";
    protected static readonly BUTTON_ACCEPT: string = "button_accept";
    protected static readonly _SafeStr_7631: string = "button_close";
    protected static readonly REGION_REJECT: string = "click_region_reject";
    protected static readonly REGION_REJECT_TEXT: string = "link_reject";
    private static readonly DEFAULT_COLOR_FriendRequestTab: number = 16435481;
    private static readonly _SafeStr_7659_FriendRequestTab: number = 16767334;
    private static readonly REGION_REJECT_COLOR_EXPOSED: number = 16770666;
    private static readonly REGION_REJECT_COLOR_NORMAL: number = 16777215;
    private static _SafeStr_5530: FriendRequestTab;

    declare private _SafeStr_7952: string;

    constructor() {
        super();
        this._window = this.allocateRequestTabWindow();
        if (this._window) {
            this._window.findChildByName("bubble").visible = false;
        }
    }

    public static allocate_FriendRequestTab(param1: IFriendRequest): FriendRequestTab {
        let _loc3_: IBitmapWrapperWindow = null;
        let _loc2_: FriendRequestTab = FriendRequestTab._SafeStr_5530 ? FriendRequestTab._SafeStr_5530 : new FriendRequestTab();
        _loc2_._recycled = false;
        if (_loc2_.friend) {
            if (_loc2_.friend.figure != param1.figure) {
                _loc3_ = castGuarded(_loc2_._window.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
                _loc3_.bitmap = Tab.VIEW.getAvatarFaceBitmap(param1.figure);
            }
        }
        _loc2_.friend = new FriendEntity(param1.id, param1.name, null, null, -1, false, false, param1.figure, 0, null);
        return _loc2_;
    }

    public override dispose(): void {
        if (this._window) {
            this.releaseRequestTabWindow(this._window);
            this._window = null;
        }
        super.dispose();
    }

    public override recycle(): void {
        if (!this.disposed) {
            if (!this._recycled) {
                this._friend = null;
                this._recycled = true;
                FriendRequestTab._SafeStr_5530 = this;
            }
        }
    }

    public override select(param1: boolean): void {
        let _loc2_: IWindow = null;
        if (!this.selected) {
            if (this._window) {
                _loc2_ = this._window.findChildByName("bubble");
                if (_loc2_) {
                    _loc2_.visible = true;
                }
            }
            super.select(param1);
        }
    }

    public override deselect(param1: boolean): void {
        let _loc2_: IWindow = null;
        if (this.selected) {
            if (this._window) {
                _loc2_ = this._window.findChildByName("bubble");
                if (_loc2_) {
                    _loc2_.visible = false;
                }
            }
            super.deselect(param1);
        }
    }

    protected override expose(): void {
        super.expose();
        this._window.color = (this.exposed ? 16767334 : 16435481) >>> 0;
    }

    protected override conceal(): void {
        super.conceal();
        this._window.color = (this.exposed ? 16767334 : 16435481) >>> 0;
    }

    private allocateRequestTabWindow(): IWindowContainer {
        let _loc9_: BitmapDataAsset = null;
        let _loc1_: IWindowContainer = asGuarded(Tab.WINDOWING.buildFromXML(asInstanceOf(Tab.ASSETS.getAssetByName("friend_request_tab_xml").content, XML)), isIWindowContainer);
        let _loc7_: IBitmapWrapperWindow = castGuarded(_loc1_.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc6_: IRegionWindow = castGuarded(_loc1_.findChildByName("header"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc3_: IRegionWindow = castGuarded(_loc1_.findChildByName("region_profile"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc8_: IWindow = _loc1_.findChildByName("icons");
        let _loc2_: IBubbleWindow = asGuarded(_loc1_.findChildByName("bubble"), isIBubbleWindow);
        _loc1_.x = 0;
        _loc1_.y = 0;
        _loc1_.width = Tab.WIDTH;
        _loc1_.height = Tab.HEIGHT;
        _loc1_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc1_.addEventListener("WME_OVER", this.onMouseOver);
        _loc1_.addEventListener("WME_OUT", this.onMouseOut);
        _loc6_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc6_.addEventListener("WME_OVER", this.onMouseOver);
        _loc6_.addEventListener("WME_OUT", this.onMouseOut);
        _loc3_.addEventListener("WME_CLICK", this.onProfileMouseEvent);
        _loc3_.toolTipCaption = Tab._SafeStr_2508.getLocalization("infostand.profile.link.tooltip", "");
        _loc3_.toolTipDelay = 100;
        _loc8_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc8_.addEventListener("WME_OVER", this.onMouseOver);
        _loc8_.addEventListener("WME_OUT", this.onMouseOut);
        _loc7_.disposesBitmap = true;
        _loc2_.procedure = this.bubbleEventProc_FriendRequestTab;
        _loc2_.y = -(_loc2_.height - (_loc2_.height - _loc2_.margins.bottom)) - 1;
        let _loc5_: IRegionWindow = asGuarded(Tab.WINDOWING.create("ICON", 5, 0, 1, new Rectangle(0, 0, 25, 25)), isIRegionWindow);
        _loc5_.mouseThreshold = 0;
        let _loc4_: IBitmapWrapperWindow = asGuarded(Tab.WINDOWING.create("BITMAP", 21, 0, 16, new Rectangle(0, 0, 25, 25)), isIBitmapWrapperWindow);
        _loc4_.disposesBitmap = false;
        _loc9_ = asInstanceOf(Tab.ASSETS.getAssetByName("plus_friend_icon_png"), BitmapDataAsset);
        if (_loc9_) {
            _loc4_.bitmap = asInstanceOf(_loc9_.content, BitmapData);
        }
        _loc5_.addChild(_loc4_);
        castGuarded(_loc1_.findChildByName("icons"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").addListItemAt(_loc5_, 0);
        return _loc1_;
    }

    private releaseRequestTabWindow(param1: IWindowContainer): void {
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
            param1.color = 16435481;
            _loc4_ = castGuarded(param1.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            _loc4_.bitmap = null;
            castGuarded(param1.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = false;
        }
    }

    private bubbleEventProc_FriendRequestTab = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "button_accept":
                    Tab.DATA.acceptFriendRequest(this._friend.id);
                    break;
                case "button_close":
                    if (this.selected) {
                        Tab.VIEW.deSelect(true);
                    }
                    break;
                case "button_profile":
                    Tab.TRACKING.trackGoogle("extendedProfile", "friendBar_friendRequestButton");
                    Tab.DATA.showProfile(this._friend.id);
                    break;
                case "click_region_reject":
                    Tab.DATA.declineFriendRequest(this._friend.id);
            }
        } else if (param1.type == "WME_OVER") {
            if (param2.name == "click_region_reject") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("link_reject"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16770666;
            }
            if (param2.name == "button_profile") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("icon"), isIIconWindow, "com.sulake.core.window.components.IIconWindow").style = 22;
            }
            if (param2.name == "region_profile") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("name"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = true;
            }
        } else if (param1.type == "WME_OUT") {
            if (param2.name == "click_region_reject") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("link_reject"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16777215;
            }
            if (param2.name == "button_profile") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("icon"), isIIconWindow, "com.sulake.core.window.components.IIconWindow").style = 21;
            }
            if (param2.name == "region_profile") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("name"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = false;
            }
        }
    };

    public avatarImageReady(param1: FriendRequest, param2: BitmapData): void {
        let _loc4_: IBitmapWrapperWindow = null;
        let _loc3_: BitmapData = null;
        if (!this.disposed) {
            if (this.friend) {
                if (this.friend.figure == param1.figure) {
                    _loc4_ = asGuarded(this._window.findChildByName("canvas"), isIBitmapWrapperWindow);
                    if (_loc4_) {
                        _loc3_ = Tab.VIEW.getAvatarFaceBitmap(param1.figure);
                        if (_loc3_) {
                            _loc4_.bitmap = _loc3_;
                            _loc4_.width = _loc3_.width;
                            _loc4_.height = _loc3_.height;
                        }
                    }
                }
            }
        }
    }
}
