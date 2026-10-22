import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { RoomEventData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomEventData';
import type { RoomAdErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/advertisement/RoomAdErrorMessageParser';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { RoomAdErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/advertisement/RoomAdErrorEvent';
import { CancelEventMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/CancelEventMessageComposer';
import { EditEventMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/EditEventMessageComposer';
import { TextFieldManager } from '@/com/sulake/habbo/navigator/TextFieldManager';

export class RoomEventViewCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.inroom::RoomEventViewCtrl'); }

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2894: TextFieldManager;

    declare private _SafeStr_3060: TextFieldManager;

    public get disposed(): boolean {
        return this._navigator == null;
    }

    public dispose(): void {
        this._navigator = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._SafeStr_2894 = null;
        this._SafeStr_3060 = null;
    }

    public show(): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this._window.visible = false;
            return;
        }
        this.prepareWindow();
        this.clearErrors();
        let _loc1_: RoomEventData = this._navigator.data.roomEventData;
        if (_loc1_ == null) {
            this.createEvent();
        } else {
            this.editEvent(_loc1_);
        }
        this._window.visible = true;
        this._window.activate();
    }

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    private editEvent(param1: RoomEventData): void {
        this._window.caption = this._navigator.getText("navigator.eventsettings.editcaption");
        this._SafeStr_2894.setText(param1.eventName);
        this._SafeStr_3060.setText(param1.eventDescription);
    }

    private createEvent(): void {
        this._window.caption = this._navigator.getText("navigator.createevent");
        this._SafeStr_3060.goBackToInitialState();
        this._SafeStr_2894.goBackToInitialState();
    }

    private getInput(param1: string): ITextFieldWindow {
        return castGuarded(this._window.findChildByName(param1), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
    }

    private onClose = (param1: WindowEvent): void => {
        this.close();
    };

    private save(): void {
        let _loc1_: number = this._navigator.data.roomEventData.adId;
        let _loc3_: string = this._SafeStr_2894.getText();
        let _loc2_: string = this._SafeStr_3060.getText();
        if (!this.isMandatoryFieldsFilled()) {
            return;
        }
        this._navigator.send(new EditEventMessageComposer(_loc1_, _loc3_, _loc2_));
    }

    private onEndButtonClick(param1: WindowEvent): void {
        this._navigator.send(new CancelEventMessageComposer(this._navigator.data.roomEventData.adId));
        this.close();
    }

    private onCancelButtonClick(param1: WindowEvent): void {
        this.close();
    }

    private onUnfocus = (param1: WindowEvent): void => {
        if (this._navigator.data.roomEventData != null) {
            this.save();
        }
    };

    private onRoomAdError = (param1: RoomAdErrorEvent): void => {
        this.clearErrors();
        let _loc2_: RoomAdErrorMessageParser = param1.getParser();
        let _loc3_: number = _loc2_.errorCode;
        if (_loc3_ == 0) {
            this._SafeStr_2894.displayError(this._navigator.getText("roomad.error.0.description"));
            this._SafeStr_2894.setText(_loc2_.filteredText);
        } else if (_loc3_ == 1) {
            this._SafeStr_3060.displayError(this._navigator.getText("roomad.error.0.description"));
            this._SafeStr_3060.setText(_loc2_.filteredText);
        }
    };

    private isMandatoryFieldsFilled(): boolean {
        this.clearErrors();
        if (!this._SafeStr_2894.checkMandatory(this._navigator.getText("navigator.eventsettings.nameerr"))) {
            return false;
        }
        return true;
    }

    private clearErrors(): void {
        this._SafeStr_2894.clearErrors();
        this._SafeStr_3060.clearErrors();
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._navigator.getXmlWindow("iro_event_settings"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this.addMouseClickListener(this._window.findChildByTag("close"), this.onClose);
        this._SafeStr_2894 = new TextFieldManager(this._navigator, this.getInput("event_name"), 25);
        this._SafeStr_3060 = new TextFieldManager(this._navigator, this.getInput("event_desc"), 100);
        this._SafeStr_2894.input.addEventListener("WE_UNFOCUSED", this.onUnfocus);
        this._SafeStr_3060.input.addEventListener("WE_UNFOCUSED", this.onUnfocus);
        this._navigator.communication.addHabboConnectionMessageEvent(new RoomAdErrorEvent(this.onRoomAdError));
        this._window.center();
    }

    private addMouseClickListener(param1: IWindow, param2: (...args: any[]) => any): void {
        if (param1 != null) {
            param1.addEventListener("WME_CLICK", param2);
        }
    }

    private find(param1: string): IWindow {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ == null) {
            throw new Error("Window element with name: " + param1 + " cannot be found!");
        }
        return _loc2_;
    }

    private prepareEventTypes(): void {
        let _loc2_: number = 0;
        let _loc4_: string = null;
        let _loc1_: string = null;
        let _loc3_: any[] = [];
        let _loc5_: number = 100;
        _loc2_ = 1;
        while (_loc2_ < _loc5_) {
            _loc4_ = "roomevent_type_" + _loc2_;
            _loc1_ = this._navigator.getText(_loc4_);
            if (_loc1_ == null || _loc1_ == _loc4_) {
                break;
            }
            _loc3_.push(_loc1_);
            _loc2_++;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
