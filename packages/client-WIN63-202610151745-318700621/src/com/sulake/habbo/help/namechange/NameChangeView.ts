import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { INameChangeUI } from '@/com/sulake/habbo/help/INameChangeUI';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ChangeUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/ChangeUserNameResultMessageEvent';
import { NameSuggestionListRenderer } from '@/com/sulake/habbo/help/namechange/NameSuggestionListRenderer';

export class NameChangeView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help.namechange::NameChangeView'); }

    private static readonly NAME_UPDATE_FUNCTION: string = "FlashExternalInterface.updateName";
    private static NAME_SUGGESTION_BG_COLOR: number = 13232628;
    private static NAME_SUGGESTION_BG_COLOR_OVER: number = 11129827;

    declare private _controller: INameChangeUI;

    declare private _window: IFrameWindow;

    declare private _checkedName: string;

    declare private _pendingName: string;

    declare private _SafeStr_2276: IWindowContainer;

    declare private _SafeStr_3465: IWindowContainer;

    declare private _SafeStr_3006: IWindowContainer;

    declare private _SafeStr_2182: IWindowContainer;

    private _SafeStr_4197: boolean = false;

    declare private _SafeStr_3893: NameSuggestionListRenderer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: INameChangeUI) {
        this._controller = param1;
    }

    public get id(): string {
        return "TUI_NAME_VIEW";
    }

    public set checkedName(param1: string) {
        this._checkedName = param1;
        if (this._pendingName == this._checkedName) {
            this.showConfirmationView();
            return;
        }
        this.setNameAvailableView();
    }

    public dispose(): void {
        if (!this._disposed) {
            this.disposeWindow();
            if (this._SafeStr_3893 != null) {
                this._SafeStr_3893.dispose();
                this._SafeStr_3893 = null;
            }
            this._disposed = true;
        }
    }

    private disposeWindow(): void {
        this._SafeStr_2276 = null;
        this._SafeStr_3465 = null;
        this._SafeStr_3006 = null;
        this._SafeStr_2182 = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private showView(param1: IWindowContainer): void {
        this._SafeStr_4197 = false;
        if (this._SafeStr_2182) {
            this._SafeStr_2182.visible = false;
        }
        this._SafeStr_2182 = param1;
        this._SafeStr_2182.visible = true;
        if (this._window) {
            this._window.content.width = this._SafeStr_2182.width;
            this._window.content.height = this._SafeStr_2182.height;
        }
    }

    public showMainView(): void {
        if (!this._window) {
            this._window = asGuarded(this._controller.buildXmlWindow("welcome_name_change"), isIFrameWindow);
            this._window.center();
            this._window.procedure = this.windowEventHandler;
            this._SafeStr_2276 = asGuarded(this._window.content.getChildAt(0), isIWindowContainer);
        }
        this._controller.localization.registerParameter("tutorial.name_change.current", "name", this._controller.myName);
        this._window.caption = this._controller.localization.getLocalization("tutorial.name_change.title.main");
        this.showView(this._SafeStr_2276);
    }

    private showSelectionView(): void {
        if (!this._SafeStr_3465) {
            this._SafeStr_3465 = asGuarded(this._controller.buildXmlWindow("welcome_name_selection"), isIWindowContainer);
            if (!this._SafeStr_3465) {
                return;
            }
            this._window.content.addChild(this._SafeStr_3465);
        }
        this._window.caption = this._controller.localization.getLocalization("tutorial.name_change.title.select");
        let _loc1_: IButtonWindow = asGuarded(this._window.findChildByName("select_name_button"), isIButtonWindow);
        if (_loc1_) {
            _loc1_.disable();
        }
        this.setNormalView();
        this.showView(this._SafeStr_3465);
    }

    private showConfirmationView(): void {
        if (!this._SafeStr_3006) {
            this._SafeStr_3006 = asGuarded(this._controller.buildXmlWindow("welcome_name_confirmation"), isIWindowContainer);
            if (!this._SafeStr_3006) {
                return;
            }
            this._window.content.addChild(this._SafeStr_3006);
        }
        this._window.caption = this._controller.localization.getLocalization("tutorial.name_change.title.confirm");
        let _loc1_: ITextWindow = asGuarded(this._SafeStr_3006.findChildByName("final_name"), isITextWindow);
        if (_loc1_) {
            _loc1_.text = this._checkedName;
        }
        this.showView(this._SafeStr_3006);
        if (ExternalInterface.available) {
            ExternalInterface.call("FlashExternalInterface.updateName", this._checkedName);
        }
    }

    public get view(): IWindowContainer {
        return this._window;
    }

    public setNormalView(): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("info_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = this._controller.localization.getLocalization("help.tutorial.name.info");
        let _loc1_: IWindowContainer = asGuarded(this._window.findChildByName("suggestions"), isIWindowContainer);
        if (_loc1_ == null) {
            return;
        }
        _loc1_.visible = false;
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
        this._controller.localization.registerParameter("help.tutorial.name.available", "name", this._checkedName);
        _loc2_.text = this._controller.localization.getLocalization("help.tutorial.name.available");
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
        if (this._SafeStr_2182 != this._SafeStr_3465) {
            this.showSelectionView();
        }
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
                this._controller.localization.registerParameter("help.tutorial.name.taken", "name", param2);
                _loc5_.text = this._controller.localization.getLocalization("help.tutorial.name.taken");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_4985:
                this._controller.localization.registerParameter("help.tutorial.name.invalid", "name", param2);
                _loc5_.text = this._controller.localization.getLocalization("help.tutorial.name.invalid");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_6549:
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5263:
                _loc5_.text = this._controller.localization.getLocalization("help.tutorial.name.long");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5378:
                _loc5_.text = this._controller.localization.getLocalization("help.tutorial.name.short");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_4702:
                _loc5_.text = this._controller.localization.getLocalization("help.tutorial.name.change_not_allowed");
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5642:
                _loc5_.text = this._controller.localization.getLocalization("help.tutorial.name.merge_hotel_down");
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
        this._SafeStr_3893 = new NameSuggestionListRenderer(this._controller);
        let _loc7_: number = this._SafeStr_3893.render(param3, _loc4_);
        _loc8_ = 0;
        while (_loc8_ < _loc4_.numChildren) {
            _loc6_ = _loc4_.getChildAt(_loc8_);
            _loc6_.color = NameChangeView.NAME_SUGGESTION_BG_COLOR;
            _loc6_.addEventListener("WME_CLICK", this.nameSelected);
            _loc6_.addEventListener("WME_OVER", this.nameOver);
            _loc6_.addEventListener("WME_OUT", this.nameOut);
            _loc8_++;
        }
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
            _loc2_.color = NameChangeView.NAME_SUGGESTION_BG_COLOR_OVER;
        }
    };

    private nameOut = (param1: WindowMouseEvent): void => {
        let _loc2_: ITextWindow = asGuarded(param1.target, isITextWindow);
        if (_loc2_ != null) {
            _loc2_.color = NameChangeView.NAME_SUGGESTION_BG_COLOR;
        }
    };

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
                _loc1_.caption = this._controller.localization.getLocalization("help.tutorial.name.wait_while_checking");
            }
        }
        this._SafeStr_4197 = true;
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

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IWindow = null;
        let _loc4_: ITextFieldWindow = null;
        let _loc5_: string = null;
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
        switch (param2.name) {
            case "change_name_button":
                this.showSelectionView();
                break;
            case "keep_name_button":
                this._checkedName = this._controller.myName;
                this.showConfirmationView();
                break;
            case "check_name_button":
                this._controller.checkName(this.getName());
                this.nameCheckWaitBegin();
                break;
            case "select_name_button":
                _loc5_ = this.getName();
                if (_loc5_.length < 1) {
                    return;
                }
                if (this._checkedName != _loc5_) {
                    this._pendingName = _loc5_;
                    this._controller.checkName(_loc5_);
                    this.nameCheckWaitBegin();
                } else {
                    this.showConfirmationView();
                }
                break;
            case "cancel_selection_button":
                this._controller.hideView();
                break;
            case "confirm_name_button":
                this._controller.changeName(this._checkedName);
                break;
            case "cancel_confirmation_button":
                this._controller.hideView();
                break;
            case "header_button_close":
                this._controller.hideView();
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

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
