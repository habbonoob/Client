import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FriendRequest } from '@/com/sulake/habbo/friendbar/data/FriendRequest';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Tab } from '@/com/sulake/habbo/friendbar/view/tabs/Tab';

export class FriendRequestsTab extends Tab {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs::FriendRequestsTab'); }

    protected static readonly REQUESTS_WINDOW_RESOURCE: string = "friend_requests_tab_xml";
    protected static readonly ICON: string = "icon";
    protected static readonly LABEL: string = "label";
    protected static readonly HEADER: string = "header";
    protected static readonly CANVAS: string = "canvas";
    protected static readonly BUBBLE: string = "bubble";
    protected static readonly REQUEST_LIST: string = "request_entity_list";
    protected static readonly NAME: string = "name";
    protected static readonly COUNTER: string = "badge_counter";
    protected static readonly REGION_PROFILE: string = "region_profile";
    protected static readonly REGION_PROFILE_NAME: string = "region_profile_name";
    protected static readonly _SafeStr_7808: string = "button_accept_all";
    protected static readonly _SafeStr_7747: string = "click_area_discard_all";
    protected static readonly _SafeStr_7631: string = "button_close";
    protected static readonly BUTTON_ACCEPT: string = "button_accept";
    protected static readonly _SafeStr_7839: string = "click_area_discard";
    protected static readonly _SafeStr_8260: string = "text_discard";
    private static readonly DEFAULT_COLOR: number = 4294625561;
    private static readonly _SafeStr_7659: number = 4294957414;
    private static readonly _SafeStr_8195: number = 4289431312;
    private static readonly _SafeStr_8508: number = 4290616362;
    private static readonly REGION_REJECT_COLOR_EXPOSED: number = 16770666;
    private static readonly REGION_REJECT_COLOR_NORMAL: number = 16777215;
    private static _SafeStr_5530: FriendRequestsTab;

    public static allocate(param1: any[]): FriendRequestsTab {
        let _loc2_: FriendRequestsTab = FriendRequestsTab._SafeStr_5530 ? FriendRequestsTab._SafeStr_5530 : new FriendRequestsTab();
        _loc2_._recycled = false;
        _loc2_._requests = param1;
        _loc2_._window.findChildByName("badge_counter").caption = String(param1.length);
        return _loc2_;
    }

    constructor() {
        super();
        this._window = this.allocateRequestsTabWindow();
    }

    declare private _requests: any[];

    private _SafeStr_5511: boolean = false;

    declare private _entity: IWindowContainer;

    public override dispose(): void {
        if (this._window) {
            this.releaseRequestsTabWindow(this._window);
            this._window = null;
        }
        if (this._entity) {
            this._entity.dispose();
            this._entity = null;
        }
        super.dispose();
    }

    public override recycle(): void {
        let _loc1_: IBubbleWindow = null;
        let _loc2_: IItemListWindow = null;
        if (!this.disposed) {
            if (!this._recycled) {
                if (this._window) {
                    _loc1_ = asGuarded(this._window.findChildByName("bubble"), isIBubbleWindow);
                    if (_loc1_) {
                        _loc2_ = asGuarded(_loc1_.content.getChildByName("request_entity_list"), isIItemListWindow);
                        if (_loc2_) {
                            while (_loc2_.numListItems > 0) {
                                _loc2_.removeListItemAt(0).dispose();
                            }
                        }
                    }
                }
                this._SafeStr_5511 = false;
                this._requests = null;
                this._recycled = true;
                FriendRequestsTab._SafeStr_5530 = this;
            }
        }
    }

    public override select(param1: boolean): void {
        let _loc3_: IBubbleWindow = null;
        let _loc7_: IItemListWindow = null;
        let _loc8_: IWindowContainer = null;
        let _loc2_: FriendRequest = null;
        let _loc5_: IBitmapWrapperWindow = null;
        let _loc9_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: BitmapData = null;
        if (!this.selected) {
            if (this._window) {
                _loc3_ = asGuarded(this._window.findChildByName("bubble"), isIBubbleWindow);
                if (_loc3_) {
                    _loc3_.visible = true;
                    if (!this._SafeStr_5511) {
                        _loc7_ = asGuarded(_loc3_.content.getChildByName("request_entity_list"), isIItemListWindow);
                        if (_loc7_) {
                            _loc9_ = 0;
                            _loc6_ = 0;
                            while (_loc6_ < this._requests.length) {
                                _loc8_ = asGuarded(this._entity.clone(), isIWindowContainer);
                                _loc8_.color = _loc6_ % 2 == 0 ? 4289431312 : 4290616362;
                                _loc2_ = this._requests[_loc6_];
                                _loc8_.id = _loc2_.id;
                                _loc8_.findChildByName("name").caption = _loc2_.name;
                                _loc5_ = asGuarded(_loc8_.findChildByName("canvas"), isIBitmapWrapperWindow);
                                _loc4_ = Tab.VIEW.getAvatarFaceBitmap(_loc2_.figure);
                                if (_loc4_) {
                                    _loc5_.disposesBitmap = false;
                                    _loc5_.bitmap = _loc4_;
                                    _loc5_.width = _loc4_.width;
                                    _loc5_.height = _loc4_.height;
                                    _loc5_.disposesBitmap = true;
                                }
                                _loc7_.addListItem(_loc8_);
                                _loc9_ += _loc8_.height + _loc7_.spacing;
                                _loc6_++;
                            }
                            _loc7_.height = _loc9_;
                        }
                    }
                    this._SafeStr_5511 = true;
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
        this._window.color = this.exposed ? 4294957414 : 4294625561;
        castGuarded(this._window.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = this.exposed;
    }

    protected override conceal(): void {
        super.conceal();
        this._window.color = this.exposed ? 4294957414 : 4294625561;
        castGuarded(this._window.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = this.exposed;
    }

    public avatarImageReady(param1: FriendRequest, param2: BitmapData): void {
        let _loc6_: IItemListWindow = null;
        let _loc7_: IWindowContainer = null;
        let _loc5_: number = 0;
        let _loc3_: IBitmapWrapperWindow = null;
        if (this.disposed) {
            return;
        }
        let _loc4_: IBubbleWindow = asGuarded(this._window.findChildByName("bubble"), isIBubbleWindow);
        if (_loc4_) {
            _loc6_ = asGuarded(_loc4_.content.getChildByName("request_entity_list"), isIItemListWindow);
            if (_loc6_) {
                _loc5_ = 0;
                while (_loc5_ < _loc6_.numListItems) {
                    _loc7_ = asGuarded(_loc6_.getListItemAt(_loc5_ >>> 0), isIWindowContainer);
                    if (_loc7_.id == param1.id) {
                        _loc3_ = asGuarded(_loc7_.findChildByName("canvas"), isIBitmapWrapperWindow);
                        _loc3_.disposesBitmap = true;
                        _loc3_.bitmap = param2;
                        _loc3_.width = param2.width;
                        _loc3_.height = param2.height;
                        return;
                    }
                    _loc5_++;
                }
            }
        }
    }

    private allocateRequestsTabWindow(): IWindowContainer {
        let _loc8_: BitmapDataAsset = null;
        let _loc1_: IWindowContainer = asGuarded(Tab.WINDOWING.buildFromXML(asInstanceOf(Tab.ASSETS.getAssetByName("friend_requests_tab_xml").content, XML)), isIWindowContainer);
        let _loc7_: IBitmapWrapperWindow = castGuarded(_loc1_.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc6_: IRegionWindow = castGuarded(_loc1_.findChildByName("header"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc5_: IRegionWindow = castGuarded(_loc1_.findChildByName("region_profile"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc2_: IRegionWindow = castGuarded(_loc1_.findChildByName("region_profile_name"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc4_: IBubbleWindow = asGuarded(_loc1_.findChildByName("bubble"), isIBubbleWindow);
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
        _loc5_.toolTipCaption = Tab._SafeStr_2508.getLocalization("infostand.profile.link.tooltip", "");
        _loc5_.toolTipDelay = 100;
        _loc2_.toolTipCaption = Tab._SafeStr_2508.getLocalization("infostand.profile.link.tooltip", "");
        _loc2_.toolTipDelay = 100;
        _loc7_.disposesBitmap = true;
        _loc4_.visible = false;
        _loc4_.y = -(_loc4_.height - (_loc4_.height - _loc4_.margins.bottom)) - 1;
        _loc4_.procedure = this.bubbleEventProc;
        _loc8_ = asInstanceOf(Tab.ASSETS.getAssetByName("add_friends_icon_png"), BitmapDataAsset);
        let _loc3_: IBitmapWrapperWindow = asGuarded(_loc1_.findChildByName("icon"), isIBitmapWrapperWindow);
        _loc3_.disposesBitmap = false;
        _loc3_.bitmap = asInstanceOf(_loc8_.content, BitmapData);
        let _loc9_: IItemListWindow = asGuarded(_loc4_.content.getChildByName("request_entity_list"), isIItemListWindow);
        this._entity = asGuarded(_loc9_.removeListItemAt(0), isIWindowContainer);
        return _loc1_;
    }

    private releaseRequestsTabWindow(param1: IWindowContainer): void {
        let _loc2_: IRegionWindow = null;
        let _loc3_: IBitmapWrapperWindow = null;
        if (param1 && !param1.disposed) {
            param1.procedure = null;
            param1.removeEventListener("WME_CLICK", this.onMouseClick);
            param1.removeEventListener("WME_OVER", this.onMouseOver);
            param1.removeEventListener("WME_OUT", this.onMouseOut);
            _loc2_ = castGuarded(param1.findChildByName("header"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            _loc2_.removeEventListener("WME_CLICK", this.onMouseClick);
            _loc2_.removeEventListener("WME_OVER", this.onMouseOver);
            _loc2_.removeEventListener("WME_OUT", this.onMouseOut);
            param1.width = Tab.WIDTH;
            param1.height = Tab.HEIGHT;
            param1.color = 4294625561;
            _loc3_ = castGuarded(param1.findChildByName("canvas"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
            if (_loc3_) {
                _loc3_.bitmap = null;
            }
            castGuarded(param1.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = false;
        }
    }

    private bubbleEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "button_close":
                    if (this.selected) {
                        Tab.VIEW.deSelect(true);
                    }
                    break;
                case "button_accept_all":
                    Tab.DATA.acceptAllFriendRequests();
                    break;
                case "click_area_discard_all":
                    Tab.DATA.declineAllFriendRequests();
                    break;
                case "button_accept":
                    Tab.DATA.acceptFriendRequest(param2.parent.id);
                    break;
                case "click_area_discard":
                    Tab.DATA.declineFriendRequest(param2.parent.id);
                    break;
                case "region_profile":
                    Tab.TRACKING.trackGoogle("extendedProfile", "friendBar_multipleFriendRequestsAvatar");
                    Tab.DATA.showProfile(param2.parent.id);
                    break;
                case "region_profile_name":
                    Tab.TRACKING.trackGoogle("extendedProfile", "friendBar_multipleFriendRequestsName");
                    Tab.DATA.showProfile(param2.parent.id);
            }
        } else if (param1.type == "WME_OVER") {
            if (param2.name == "click_area_discard") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("text_discard"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16770666;
            }
            if (param2.name == "region_profile_name") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("name"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = true;
            }
        } else if (param1.type == "WME_OUT") {
            if (param2.name == "click_area_discard") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("text_discard"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = 16777215;
            }
            if (param2.name == "region_profile_name") {
                castGuarded(castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildByName("name"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = false;
            }
        }
    };
}
