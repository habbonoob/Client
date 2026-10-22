import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ExtendedForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ExtendedForumData';
import type { GroupForumController } from '@/com/sulake/habbo/friendbar/groupforums/GroupForumController';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GroupForumView, HabboFriendBarCom } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';

export class ForumSettingsView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::ForumSettingsView'); }

    private static readonly _SafeStr_8421: number = 0.5;

    private static setSelectorState(param1: ISelectorWindow, param2: number, param3: number): number {
        let _loc5_: any = 0;
        let _loc6_: ISelectableWindow = null;
        let _loc4_: IWindow = null;
        if (param3 < param2) {
            param3 = param2;
        }
        _loc5_ = 0;
        while (_loc5_ < param2) {
            _loc6_ = param1.getSelectableByName(String(_loc5_));
            if (_loc6_ != null) {
                _loc6_.disable();
                _loc6_.blend = 0.5;
                _loc4_ = castGuarded(param1.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("label" + _loc5_);
                if (_loc4_ != null) {
                    _loc4_.blend = 0.5;
                }
            }
            _loc5_++;
        }
        _loc5_ = param2;
        while (_loc5_ < 4) {
            _loc6_ = param1.getSelectableByName(String(_loc5_));
            if (_loc6_ != null) {
                _loc6_.enable();
                _loc6_.blend = 1;
                _loc4_ = castGuarded(param1.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("label" + _loc5_);
                if (_loc4_ != null) {
                    _loc4_.blend = 1;
                }
                if (_loc5_ == param3) {
                    param1.setSelected(_loc6_);
                }
            }
            _loc5_++;
        }
        return param3;
    }

    private static getSelectorState(param1: ISelectorWindow): number {
        let _loc2_: ISelectableWindow = param1.getSelected();
        if (_loc2_ == null) {
            return 0;
        }
        return Number(_loc2_.name) | 0;
    }

    constructor(param1: GroupForumView, param2: number, param3: number, param4: ExtendedForumData) {
        this._SafeStr_2276 = param1;
        this._controller = this._SafeStr_2276.controller;
        this._forumData = param4;
        this._window = castGuarded(this._controller.windowManager.buildFromXML(XML.from(new HabboFriendBarCom.groupforum_forum_settings_xml())), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.x = param2;
        let _loc5_: number = this._controller.windowManager.getDesktop(1).width;
        if (this._window.x + this._window.width > _loc5_) {
            this._window.x = _loc5_ - this._window.width;
        }
        this._window.y = param3;
        this.initControls();
    }

    declare private _controller: GroupForumController;

    declare private _SafeStr_2276: GroupForumView;

    declare private _window: IFrameWindow;

    declare private _SafeStr_4316: ISelectorWindow;

    declare private _SafeStr_4167: ISelectorWindow;

    declare private _SafeStr_4146: ISelectorWindow;

    declare private _SafeStr_4491: ISelectorWindow;

    declare private _forumData: ExtendedForumData;

    declare private _readPermissions: number;
    static { (this.prototype as any)._readPermissions = 0; }

    declare private _postMessagePermissions: number;
    static { (this.prototype as any)._postMessagePermissions = 0; }

    declare private _postThreadPermissions: number;
    static { (this.prototype as any)._postThreadPermissions = 0; }

    declare private _moderatePermissions: number;
    static { (this.prototype as any)._moderatePermissions = 0; }

    public focus(param1: ExtendedForumData): void {
        if (this._forumData != param1) {
            this._forumData = param1;
            this.initControls();
        }
        this._window.activate();
    }

    public dispose(): void {
        this._controller.forumSettingsView = null;
        this._window.dispose();
        this._window = null;
    }

    private initControls(): void {
        let _loc2_: IRegionWindow = GroupForumView.initTopAreaForForum(this._window, this._forumData);
        _loc2_.removeEventListener("WME_CLICK", this.onTopAreaClick);
        _loc2_.addEventListener("WME_CLICK", this.onTopAreaClick);
        let _loc1_: IWindow = this._window.findChildByName("cancel_btn");
        _loc1_.removeEventListener("WME_CLICK", this.onCancelButtonClick);
        _loc1_.addEventListener("WME_CLICK", this.onCancelButtonClick);
        let _loc3_: IWindow = this._window.findChildByName("header_button_close");
        _loc3_.removeEventListener("WME_CLICK", this.onCancelButtonClick);
        _loc3_.addEventListener("WME_CLICK", this.onCancelButtonClick);
        let _loc4_: IWindow = this._window.findChildByName("ok_btn");
        _loc4_.removeEventListener("WME_CLICK", this.onPostButtonClick);
        _loc4_.addEventListener("WME_CLICK", this.onPostButtonClick);
        this._SafeStr_4316 = castGuarded(this._window.findChildByName("read_selector"), isISelectorWindow, "com.sulake.core.window.components.ISelectorWindow");
        this._SafeStr_4316.addEventListener("WME_OVER", this.onReadSelectorHover);
        this.addSelectorListeners(this._SafeStr_4316);
        this._SafeStr_4167 = castGuarded(this._window.findChildByName("post_message_selector"), isISelectorWindow, "com.sulake.core.window.components.ISelectorWindow");
        this._SafeStr_4167.addEventListener("WME_OVER", this.onPostMessageSelectorHover);
        this.addSelectorListeners(this._SafeStr_4167);
        this._SafeStr_4146 = castGuarded(this._window.findChildByName("post_thread_selector"), isISelectorWindow, "com.sulake.core.window.components.ISelectorWindow");
        this._SafeStr_4146.addEventListener("WME_OVER", this.onPostThreadSelectorHover);
        this.addSelectorListeners(this._SafeStr_4146);
        this._SafeStr_4491 = castGuarded(this._window.findChildByName("moderate_selector"), isISelectorWindow, "com.sulake.core.window.components.ISelectorWindow");
        this._SafeStr_4491.addEventListener("WME_OVER", this.onModerateSelectorHover);
        this.addSelectorListeners(this._SafeStr_4491);
        this._readPermissions = ForumSettingsView.setSelectorState(this._SafeStr_4316, 0, this._forumData.readPermissions);
        this._postMessagePermissions = ForumSettingsView.setSelectorState(this._SafeStr_4167, this._readPermissions, this._forumData.postMessagePermissions);
        this._postThreadPermissions = ForumSettingsView.setSelectorState(this._SafeStr_4146, this._postMessagePermissions, this._forumData.postThreadPermissions);
        this._moderatePermissions = ForumSettingsView.setSelectorState(this._SafeStr_4491, 2, this._forumData.moderatePermissions);
    }

    private onTopAreaClick = (param1: WindowMouseEvent): void => {
        this._controller.context.createLinkEvent("group/" + this._forumData.groupId);
    };

    private onPostButtonClick = (param1: WindowMouseEvent): void => {
        this._controller.updateForumSettings(this._forumData.groupId, this._readPermissions, this._postMessagePermissions, this._postThreadPermissions, this._moderatePermissions);
        this.dispose();
    };

    private onCancelButtonClick = (param1: WindowMouseEvent): void => {
        this.dispose();
    };

    private addSelectorListeners(param1: ISelectorWindow): void {
        let _loc2_: number = 0;
        let _loc3_: ISelectableWindow = null;
        _loc2_ = 0;
        while (_loc2_ < param1.numSelectables) {
            _loc3_ = param1.getSelectableAt(_loc2_);
            _loc3_.removeEventListener("WE_SELECTED", this.onSelectionChanged);
            _loc3_.addEventListener("WE_SELECTED", this.onSelectionChanged);
            _loc2_++;
        }
    }

    private onSelectionChanged = (param1: WindowEvent): void => {
        this._readPermissions = ForumSettingsView.getSelectorState(this._SafeStr_4316);
        this._postMessagePermissions = ForumSettingsView.setSelectorState(this._SafeStr_4167, this._readPermissions, ForumSettingsView.getSelectorState(this._SafeStr_4167));
        this._postThreadPermissions = ForumSettingsView.setSelectorState(this._SafeStr_4146, this._postMessagePermissions, ForumSettingsView.getSelectorState(this._SafeStr_4146));
        this._moderatePermissions = ForumSettingsView.getSelectorState(this._SafeStr_4491);
    };

    private onReadSelectorHover = (param1: WindowMouseEvent): void => {
        this._controller.tracking.trackEventLogOncePerSession("InterfaceExplorer", "hover", "forum.can.read.seen");
    };

    private onPostMessageSelectorHover = (param1: WindowMouseEvent): void => {
        this._controller.tracking.trackEventLogOncePerSession("InterfaceExplorer", "hover", "forum.can.post.seen");
    };

    private onPostThreadSelectorHover = (param1: WindowMouseEvent): void => {
        this._controller.tracking.trackEventLogOncePerSession("InterfaceExplorer", "hover", "forum.can.start.thread.seen");
    };

    private onModerateSelectorHover = (param1: WindowMouseEvent): void => {
        this._controller.tracking.trackEventLogOncePerSession("InterfaceExplorer", "hover", "forum.can.moderate.seen");
    };
}
