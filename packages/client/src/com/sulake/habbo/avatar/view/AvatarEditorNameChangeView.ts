import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { AvatarEditorView } from '@/com/sulake/habbo/avatar/AvatarEditorView';
import type { HabboAvatarEditorManager } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarEditorNameSuggestionListRenderer, HabboAvatarEditorCom } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';
import { ChangeUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/ChangeUserNameResultMessageEvent';

export class AvatarEditorNameChangeView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.view::AvatarEditorNameChangeView'); }

    private static NAME_SUGGESTION_BG_COLOR: number = 13232628;
    private static NAME_SUGGESTION_BG_COLOR_OVER: number = 11129827;

    constructor(param1: AvatarEditorView, param2: number, param3: number) {
        this._SafeStr_2276 = param1;
        this._manager = this._SafeStr_2276.editor.manager;
        this._window = castGuarded(this._manager.windowManager.buildFromXML(XML.from(new HabboAvatarEditorCom.avatar_editor_name_change())), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.x = param2;
        let _loc4_: number = this._manager.windowManager.getDesktop(1).width;
        if (this._window.x + this._window.width > _loc4_) {
            this._window.x = _loc4_ - this._window.width;
        }
        this._window.y = param3;
        this.initControls();
    }

    declare private _window: IFrameWindow;

    declare private _SafeStr_2276: AvatarEditorView;

    declare private _manager: HabboAvatarEditorManager;

    declare private _SafeStr_3893: AvatarEditorNameSuggestionListRenderer;

    declare private _pendingName: string;

    private _SafeStr_4197: boolean = false;

    declare private _checkedName: string;

    public set checkedName(param1: string) {
        this._checkedName = param1;
        if (this._pendingName == this._checkedName) {
            return;
        }
        this.setNameAvailableView();
    }

    public focus(): void {
        this._window.activate();
    }

    public nameCheckWaitBegin(): void {
        let _loc1_: IWindow = null;
        if (this._window && !this._window.disposed) {
            _loc1_ = this._window.findChildByName("select_name_button");
            if (_loc1_) {
                _loc1_.disable();
            }
            _loc1_ = this._window.findChildByName("check_name_button");
            if (_loc1_) {
                _loc1_.disable();
            }
            _loc1_ = this._window.findChildByName("input");
            if (_loc1_) {
                _loc1_.disable();
            }
            _loc1_ = this._window.findChildByName("info_text");
            if (_loc1_) {
                _loc1_.caption = this._manager.localization.getLocalization("help.tutorial.name.wait_while_checking");
            }
        }
        this._SafeStr_4197 = true;
    }

    public setNameAvailableView(): void {
        if (this._window == null) {
            return;
        }
        this.nameCheckWaitEnd(true);
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("info_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        this._manager.localization.registerParameter("help.tutorial.name.available", "name", this._checkedName);
        _loc2_.text = this._manager.localization.getLocalization("help.tutorial.name.available");
        let _loc3_: ITextFieldWindow = asGuarded(this._window.findChildByName("input"), isITextFieldWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.text = this._checkedName;
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName("suggestions"), isIWindowContainer);
        if (_loc1_ == null) {
            return;
        }
        _loc1_.visible = false;
    }

    public setNameNotAvailableView(param1: number, param2: string, param3: any[]): void {
        let _loc8_: number = 0;
        let _loc6_: IWindow = null;
        this.nameCheckWaitEnd(false);
        this._pendingName = null;
        this._checkedName = null;
        if (this._window == null) {
            return;
        }
        let _loc5_: ITextWindow = asGuarded(this._window.findChildByName("info_text"), isITextWindow);
        if (_loc5_ == null) {
            return;
        }
        switch (param1) {
            case ChangeUserNameResultMessageEvent._SafeStr_5350:
                this._manager.localization.registerParameter("help.tutorial.name.taken", "name", param2);
                _loc5_.text = this._manager.localization.getLocalization("help.tutorial.name.taken");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_4985:
                this._manager.localization.registerParameter("help.tutorial.name.invalid", "name", param2);
                _loc5_.text = this._manager.localization.getLocalization("help.tutorial.name.invalid");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_6549:
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5263:
                _loc5_.text = this._manager.localization.getLocalization("help.tutorial.name.long");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5378:
                _loc5_.text = this._manager.localization.getLocalization("help.tutorial.name.short");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_4702:
                _loc5_.text = this._manager.localization.getLocalization("help.tutorial.name.change_not_allowed");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5642:
                _loc5_.text = this._manager.localization.getLocalization("help.tutorial.name.merge_hotel_down");
        }
        let _loc4_: IWindowContainer = asGuarded(this._window.findChildByName("suggestions"), isIWindowContainer);
        if (_loc4_ == null) {
            return;
        }
        if (param1 == ChangeUserNameResultMessageEvent._SafeStr_5642 || param1 == ChangeUserNameResultMessageEvent._SafeStr_4702) {
            _loc4_.visible = false;
            return;
        }
        _loc4_.visible = true;
        this._SafeStr_3893 = new AvatarEditorNameSuggestionListRenderer(this._manager);
        let _loc7_: number = this._SafeStr_3893.render(param3, _loc4_);
        _loc8_ = 0;
        while (_loc8_ < _loc4_.numChildren) {
            _loc6_ = _loc4_.getChildAt(_loc8_);
            _loc6_.color = AvatarEditorNameChangeView.NAME_SUGGESTION_BG_COLOR;
            _loc6_.addEventListener("WME_CLICK", this.nameSelected);
            _loc6_.addEventListener("WME_OVER", this.nameOver);
            _loc6_.addEventListener("WME_OUT", this.nameOut);
            _loc8_++;
        }
    }

    public nameCheckWaitEnd(param1: boolean): void {
        let _loc2_: IWindow = null;
        if (this._window && !this._window.disposed) {
            if (param1) {
                _loc2_ = this._window.findChildByName("select_name_button");
                if (_loc2_) {
                    _loc2_.enable();
                }
            }
            _loc2_ = this._window.findChildByName("check_name_button");
            if (_loc2_) {
                _loc2_.enable();
            }
            _loc2_ = this._window.findChildByName("input");
            if (_loc2_) {
                _loc2_.enable();
            }
        }
        this._SafeStr_4197 = false;
    }

    public setNormalView(): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("info_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = this._manager.localization.getLocalization("help.tutorial.name.info");
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName("suggestions"), isIWindowContainer);
        if (_loc1_ == null) {
            return;
        }
        _loc1_.visible = false;
    }

    private initControls(): void {
        this._window.procedure = this.windowEventHandler;
        let _loc1_: IButtonWindow = asGuarded(this._window.findChildByName("select_name_button"), isIButtonWindow);
        if (_loc1_) {
            _loc1_.disable();
        }
    }

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IWindow = null;
        let _loc4_: ITextFieldWindow = null;
        if (!this._SafeStr_4197) {
            if (param1.type == "WE_CHANGE") {
                if (param2.name == "input") {
                    _loc3_ = this._window.findChildByName("select_name_button");
                    _loc4_ = isITextFieldWindow(param2) ? param2 : null;
                    if (_loc3_ && _loc4_) {
                        if (_loc4_.text.length > 2) {
                            _loc3_.enable();
                        } else {
                            _loc3_.disable();
                        }
                    }
                }
            }
        }
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc5_: any = param2.name;
        if ("check_name_button" === _loc5_) {
            this._manager.handler.checkName(this.getName());
            this.nameCheckWaitBegin();
        }
    };

    private getName(): string {
        let _loc1_: ITextFieldWindow = null;
        if (this._window) {
            _loc1_ = asGuarded(this._window.findChildByName("input"), isITextFieldWindow);
            if (_loc1_) {
                return _loc1_.text;
            }
        }
        return null;
    }

    private nameSelected = (param1: WindowMouseEvent): void => {
        this.nameCheckWaitEnd(true);
        let _loc4_: ITextWindow = asGuarded(param1.target, isITextWindow);
        if (!_loc4_) {
            return;
        }
        let _loc3_: string = _loc4_.text;
        this.setNormalView();
        let _loc2_: ITextFieldWindow = asGuarded(this._window.findChildByName("input"), isITextFieldWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = _loc3_;
    };

    private nameOver = (param1: WindowMouseEvent): void => {
        let _loc2_: ITextWindow = asGuarded(param1.target, isITextWindow);
        if (_loc2_ != null) {
            _loc2_.color = AvatarEditorNameChangeView.NAME_SUGGESTION_BG_COLOR_OVER;
        }
    };

    private nameOut = (param1: WindowMouseEvent): void => {
        let _loc2_: ITextWindow = asGuarded(param1.target, isITextWindow);
        if (_loc2_ != null) {
            _loc2_.color = AvatarEditorNameChangeView.NAME_SUGGESTION_BG_COLOR;
        }
    };
}
