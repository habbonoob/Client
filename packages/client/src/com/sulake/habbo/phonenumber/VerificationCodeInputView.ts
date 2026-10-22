import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboPhoneNumber } from '@/com/sulake/habbo/phonenumber/HabboPhoneNumber';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';

export class VerificationCodeInputView {
    static { registerClassName(this, 'com.sulake.habbo.phonenumber::VerificationCodeInputView'); }

    private static readonly INPUT_MAX_CHARS: number = 10;

    constructor(param1: HabboPhoneNumber) {
        this._component = param1;
        this.createWindow();
    }

    declare private _component: HabboPhoneNumber;

    declare private _window: IFrameWindow;

    private _inputTextNeedsClearing: boolean = true;

    declare private _SafeStr_2856: Timer;

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2856) {
            this._SafeStr_2856.reset();
            this._SafeStr_2856 = null;
        }
        this._component = null;
    }

    public handleSubmitFailure(param1: number): void {
        this._component.windowManager.alert("${generic.alert.title}", "${phone.number.verify.error." + param1 + "}", 0, null);
        castGuarded(this._window.findChildByName("verification_code_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").textColor = 16711680;
        this._window.findChildByName("verification_code_input").enable();
        this._inputTextNeedsClearing = true;
    }

    public showRetry(): void {
        this._window.findChildByName("did_not_receive_code_link").visible = true;
        this._window.findChildByName("retry_wait_label").visible = false;
    }

    public showWaitForRetry(param1: number = 0): void {
        this._window.findChildByName("did_not_receive_code_link").visible = false;
        this._window.findChildByName("retry_wait_label").visible = true;
        this.onWaitTimer();
        this._SafeStr_2856 = new Timer(1000);
        this._SafeStr_2856.addEventListener("timer", this.onWaitTimer);
        this._SafeStr_2856.start();
    }

    private createWindow(): void {
        if (this._window) {
            return;
        }
        this._window = castGuarded(this._component.windowManager.buildFromXML(XML.from(this._component.assets.getAssetByName("phonenumber_verify_xml").content)), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.center();
        if (this._window.findChildByName("wait_link")) {
            this._window.findChildByName("wait_link").procedure = this.onInputButtons;
        }
        this._window.findChildByName("ok_button").procedure = this.onInputButtons;
        if (this._window.findChildByName("header_button_close")) {
            this._window.findChildByName("header_button_close").visible = false;
        }
        this._window.findChildByName("verification_code_input").procedure = this.onInputButtons;
        this._window.findChildByName("did_not_receive_code_link").procedure = this.onInputButtons;
        this._window.findChildByName("ok_button").disable();
        this._window.findChildByName("verification_code_input").enable();
        if (this._component.retryEnableTime - getTimer() <= 0) {
            this.showRetry();
        } else {
            this.showWaitForRetry();
        }
        castGuarded(this._window.findChildByName("verification_code_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").maxChars = 10;
        this._inputTextNeedsClearing = true;
    }

    private onInputButtons = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "wait_link":
                this._component.setVerifyViewMinimized(true);
                break;
            case "did_not_receive_code_link":
                this._component.requestPhoneNumberCollectionReset();
                break;
            case "ok_button":
                this._component.sendTryVerificationCode(this._window.findChildByName("verification_code_input").caption);
                this._window.findChildByName("ok_button").disable();
                this._window.findChildByName("verification_code_input").disable();
                break;
            case "verification_code_input":
                if (this._inputTextNeedsClearing) {
                    this._window.findChildByName("verification_code_input").caption = "";
                    this._inputTextNeedsClearing = false;
                }
                this._window.findChildByName("ok_button").enable();
                castGuarded(this._window.findChildByName("verification_code_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").textColor = 0;
        }
    };

    private onWaitTimer = (param1: TimerEvent = null): void => {
        let _loc3_: string = this._component.localizationManager.getLocalization("phone.number.verify.wait.remaining", "");
        let _loc2_: number = Math.max(0, (this._component.retryEnableTime - getTimer()) / 1000) | 0;
        _loc3_ = _loc3_.replace("{0}", String(_loc2_));
        (asGuarded(this._window.findChildByName("retry_wait_label"), isILabelWindow)).text = _loc3_;
        if (_loc2_ == 0) {
            if (this._SafeStr_2856) {
                this._SafeStr_2856.stop();
            }
            this._SafeStr_2856 = null;
            this.showRetry();
        }
    };
}
