import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboFriendList } from '@/com/sulake/habbo/friendlist/HabboFriendList';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FriendListTabsView } from '@/com/sulake/habbo/friendlist/FriendListTabsView';
import { Util } from '@/com/sulake/habbo/friendlist/Util';
import { Logger } from '@/com/sulake/habbo/Logger';

export class FriendListView {
    static { registerClassName(this, 'com.sulake.habbo.friendlist::FriendListView'); }

    private static readonly MIN_LEFT_MARGIN: number = 110;
    private static readonly _SafeStr_7813: number = 1;
    private static readonly DEFAULT_LOCATION: Point = new Point(110, 50);

    declare private _friendList: HabboFriendList;

    declare private _SafeStr_5709: FriendListTabsView;

    declare private _SafeStr_2133: IFrameWindow;

    declare private _SafeStr_5998: IWindowContainer;

    declare private _SafeStr_2584: IWindowContainer;

    declare private _SafeStr_5194: ITextWindow;

    private _SafeStr_3337: number = -1;
    private _lastWindowWidth: number = -1;

    declare private _ignoreResizeEvents: boolean;
    static { (this.prototype as any)._ignoreResizeEvents = false; }

    constructor(param1: HabboFriendList) {
        this._friendList = param1;
        this._SafeStr_5709 = new FriendListTabsView(this._friendList);
    }

    public openFriendList(): void {
        if (this._SafeStr_2133 == null) {
            this.prepare();
            this._SafeStr_2133.position = FriendListView.DEFAULT_LOCATION;
        } else {
            this._SafeStr_2133.visible = true;
            this._SafeStr_2133.activate();
        }
    }

    public showInfo(param1: WindowEvent, param2: string): void {
        let _loc3_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        if (_loc3_.type == "WME_OUT") {
            this._SafeStr_5194.text = "";
        } else if (_loc3_.type == "WME_OVER") {
            this._SafeStr_5194.text = param2;
        }
    }

    public refresh(param1: string): void {
        if (this._SafeStr_2133 == null) {
            return;
        }
        this._SafeStr_5709.refresh(param1);
        this.refreshWindowSize();
    }

    public close(): void {
        if (this._SafeStr_2133 != null) {
            this._SafeStr_2133.visible = false;
        }
    }

    public isOpen(): boolean {
        return !!(this._SafeStr_2133 && this._SafeStr_2133.visible);
    }

    private prepare(): void {
        this._SafeStr_2133 = castGuarded(this._friendList.getXmlWindow("main_window"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._SafeStr_2133.findChildByTag("close").procedure = this.onWindowClose;
        this._SafeStr_5998 = castGuarded(this._SafeStr_2133.content.findChildByName("main_content"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2584 = castGuarded(this._SafeStr_2133.content.findChildByName("footer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_5709.prepare(this._SafeStr_5998);
        this._SafeStr_2133.procedure = this.onWindow;
        this._SafeStr_2133.content.setParamFlag(3072, false);
        this._SafeStr_2133.content.setParamFlag(0, true);
        this._SafeStr_2133.header.setParamFlag(192, false);
        this._SafeStr_2133.header.setParamFlag(0, true);
        this._SafeStr_2133.content.setParamFlag(192, false);
        this._SafeStr_2133.content.setParamFlag(0, true);
        let _loc1_: boolean = this._friendList.getBoolean("friendship.category.management.enabled");
        if (_loc1_ && this._friendList.getInteger("spaweb", 0) != 1) {
            this._SafeStr_2133.findChildByName("open_edit_ctgs_but").procedure = this.onEditCategoriesButtonClick;
        } else {
            this._SafeStr_2133.findChildByName("open_edit_ctgs_but").visible = false;
        }
        this._SafeStr_5194 = castGuarded(this._SafeStr_2133.findChildByName("info_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        this._SafeStr_5194.text = "";
        this._friendList.refreshButton(this._SafeStr_2133, "open_edit_ctgs", true, null, 0);
        this.refresh("prepare");
        this._SafeStr_2133.height = 350;
        this._SafeStr_2133.width = 230;
    }

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Close window");
        this._SafeStr_2133.visible = false;
        this._friendList.trackFriendListEvent("HABBO_FRIENDLIST_TRACKING_EVENT_CLOSED");
        this._friendList.categories.view.refreshed();
    };

    private onWindow = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_RELOCATE" || param1.type == "WE_RESIZED") {
            this._friendList.categories.view.refreshed();
        }
        if (param1.type != "WE_RESIZED" || param2 != this._SafeStr_2133) {
            return;
        }
        if (this._ignoreResizeEvents) {
            return;
        }
        let _loc3_: number = this._SafeStr_3337 == -1 ? 0 : this._SafeStr_2133.height - this._SafeStr_3337;
        let _loc4_: number = this._lastWindowWidth == -1 ? 0 : this._SafeStr_2133.width - this._lastWindowWidth;
        this._friendList.tabs.tabContentHeight = Math.max(100, this._friendList.tabs.tabContentHeight + _loc3_) | 0;
        this._friendList.tabs.windowWidth = Math.max(147, this._friendList.tabs.windowWidth + _loc4_) | 0;
        this.refresh("resize: " + _loc3_);
    };

    private refreshWindowSize(): void {
        this._ignoreResizeEvents = true;
        this._SafeStr_2584.visible = false;
        this._SafeStr_2584.y = Util.getLowestPoint(this._SafeStr_2133.content);
        this._SafeStr_2584.width = this._friendList.tabs.windowWidth;
        this._SafeStr_2584.visible = true;
        this._SafeStr_2133.content.height = Util.getLowestPoint(this._SafeStr_2133.content);
        this._SafeStr_2133.content.width = this._friendList.tabs.windowWidth - 10;
        this._SafeStr_2133.header.width = this._friendList.tabs.windowWidth - 10;
        this._SafeStr_2133.height = this._SafeStr_2133.content.height + 30;
        this._SafeStr_2133.width = this._friendList.tabs.windowWidth;
        this._ignoreResizeEvents = false;
        this._SafeStr_2133.scaler.setParamFlag(12288, false);
        this._SafeStr_2133.scaler.setParamFlag(12288, this._friendList.tabs.findSelectedTab() != null);
        this._SafeStr_2133.scaler.setParamFlag(192, false);
        this._SafeStr_2133.scaler.setParamFlag(3072, false);
        this._SafeStr_2133.scaler.x = this._SafeStr_2133.width - this._SafeStr_2133.scaler.width;
        this._SafeStr_2133.scaler.y = this._SafeStr_2133.height - this._SafeStr_2133.scaler.height;
        this._SafeStr_3337 = this._SafeStr_2133.height;
        this._lastWindowWidth = this._SafeStr_2133.width;
        Logger.log("RESIZED: " + this._friendList.tabs.windowWidth);
    }

    private onEditCategoriesButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        this._friendList.view.showInfo(param1, "${friendlist.tip.preferences}");
        if (param1.type != "WME_CLICK") {
            return;
        }
        Logger.log("Edit categories clicked");
        let _loc3_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        this._friendList.openHabboWebPage("link.format.friendlist.pref", new Dictionary(), _loc3_.stageX | 0, _loc3_.stageY | 0);
    };

    public get mainWindow(): IWindowContainer {
        return this._SafeStr_2133;
    }

    public alignBottomLeftTo(param1: Point): void {
        let _loc2_: Point = param1.clone();
        _loc2_.y -= this._SafeStr_2133.height;
        let _loc3_: number = this._friendList.windowManager.getWindowContext(1).getDesktopWindow().width;
        _loc2_.x = Math.min(_loc3_ - this._SafeStr_2133.width, _loc2_.x);
        _loc2_.x = Math.max(110, _loc2_.x);
        this._SafeStr_2133.position = _loc2_;
    }
}
