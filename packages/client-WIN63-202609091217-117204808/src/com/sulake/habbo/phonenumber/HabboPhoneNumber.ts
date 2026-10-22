import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { PhoneCollectionStateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/gifts/PhoneCollectionStateMessageEvent';
import { TryPhoneNumberResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/gifts/TryPhoneNumberResultMessageEvent';
import { TryVerificationCodeResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/gifts/TryVerificationCodeResultMessageEvent';
import { ResetPhoneNumberStateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/gifts/ResetPhoneNumberStateMessageComposer';
import { SetPhoneNumberVerificationStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/gifts/SetPhoneNumberVerificationStatusMessageComposer';
import { TryPhoneNumberMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/gifts/TryPhoneNumberMessageComposer';
import { VerifyCodeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/gifts/VerifyCodeMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { PhoneNumberCollectMinimizedView } from '@/com/sulake/habbo/phonenumber/PhoneNumberCollectMinimizedView';
import { PhoneNumberCollectView } from '@/com/sulake/habbo/phonenumber/PhoneNumberCollectView';
import { VerificationCodeInputMinimizedView } from '@/com/sulake/habbo/phonenumber/VerificationCodeInputMinimizedView';
import { VerificationCodeInputView } from '@/com/sulake/habbo/phonenumber/VerificationCodeInputView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboPhoneNumber extends Component {
    static { registerClassName(this, 'com.sulake.habbo.phonenumber::HabboPhoneNumber'); }

    declare protected _communicationManager: IHabboCommunicationManager;

    declare protected _localizationManager: IHabboLocalizationManager;

    declare protected _sessionDataManager: ISessionDataManager;

    declare protected _toolbar: IHabboToolbar;

    declare protected _windowManager: IHabboWindowManager;

    declare private _connection: IConnection;

    declare private _SafeStr_3725: PhoneNumberCollectView;

    declare private _SafeStr_3523: PhoneNumberCollectMinimizedView;

    declare private _SafeStr_3607: VerificationCodeInputView;

    declare private _SafeStr_3479: VerificationCodeInputMinimizedView;

    declare private _retryEnableTime: number;

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         })]);
    }

    protected override initComponent(): void {
        if (this.getBoolean("sms.identity.verification.enabled")) {
            this._connection = this._communicationManager.connection;
            this._connection.addMessageEvent(new PhoneCollectionStateMessageEvent(this.onStateMessage));
            this._connection.addMessageEvent(new TryPhoneNumberResultMessageEvent(this.onPhoneNumberResultMessage));
            this._connection.addMessageEvent(new TryVerificationCodeResultMessageEvent(this.onVerificationCodeResultMessage));
        }
    }

    public sendTryPhoneNumber(param1: string, param2: string): void {
        this._connection.send(new TryPhoneNumberMessageComposer(param1, param2));
    }

    public sendTryVerificationCode(param1: string): void {
        if (!param1) {
            return;
        }
        param1 = param1.toUpperCase();
        this._connection.send(new VerifyCodeMessageComposer(param1));
    }

    public setNeverAgain(): void {
        this._connection.send(new SetPhoneNumberVerificationStatusMessageComposer(2));
        this.destroyCollectView();
    }

    public setCollectViewMinimized(param1: boolean): void {
        if (param1) {
            this.destroyCollectView();
            this.createCollectMinimizedView();
        } else {
            this.destroyCollectMinimizedView();
            this.createCollectView();
        }
    }

    public setVerifyViewMinimized(param1: boolean): void {
        if (param1) {
            this.destroyVerifyView();
            this.createVerifyMinimizedView();
        } else {
            this.destroyVerifyMinimizedView();
            this.createVerifyView();
        }
    }

    public requestPhoneNumberCollectionReset(): void {
        this.destroyVerifyView();
        this._connection.send(new ResetPhoneNumberStateMessageComposer());
    }

    private onPhoneNumberResultMessage(param1: TryPhoneNumberResultMessageEvent): void {
        switch (param1.getParser().resultCode - 1) {
            case 0:
            case 2:
            case 8:
                this.destroyCollectView();
                this._retryEnableTime = param1.getParser().millisToAllowProcessReset + getTimer();
                this.createVerifyView();
                break;
            case 1:
                this.destroyCollectView();
                break;
            case 3:
            case 4:
            case 5:
            case 9:
                if (!this._SafeStr_3523 && !this._SafeStr_3725) {
                    this.createCollectView();
                } else if (this._SafeStr_3523) {
                    this.setCollectViewMinimized(false);
                }
                this._windowManager.alert("${generic.alert.title}", "${phone.number.collect.error." + param1.getParser().resultCode + "}", 0, null);
                this._SafeStr_3725.handleSubmitFailure(param1.getParser().resultCode);
        }
    }

    private onVerificationCodeResultMessage(param1: TryVerificationCodeResultMessageEvent): void {
        switch (param1.getParser().resultCode - 2) {
            case 0:
            case 1:
                this.destroyVerifyView();
                break;
            case 2:
                if (!this._SafeStr_3479 && !this._SafeStr_3607) {
                    this._retryEnableTime = getTimer() + param1.getParser().millisecondsToAllowProcessReset;
                    this.createVerifyView();
                } else if (this._SafeStr_3479) {
                    this.setVerifyViewMinimized(false);
                }
                this._SafeStr_3607.handleSubmitFailure(param1.getParser().resultCode);
        }
    }

    private onStateMessage(param1: PhoneCollectionStateMessageEvent): void {
        let _loc2_: number = param1.getParser().collectionStatusCode;
        let _loc3_: number = param1.getParser().phoneStatusCode;
        this.context.configuration.setProperty("phone.collection.status", _loc2_.toString());
        this.context.configuration.setProperty("phone.verification.status", _loc3_.toString());
        if (_loc2_ == 2) {
            return;
        }
        if (_loc2_ == 3 && (_loc3_ == 9 || _loc3_ == 1)) {
            this.destroyCollectView();
            // (never true, as in AS3: the enclosing test requires 3)
            if ((_loc2_ as number) == 1) {
                this.createVerifyMinimizedView();
            } else {
                this._retryEnableTime = param1.getParser().millisecondsToAllowProcessReset + getTimer();
                this.createVerifyView();
            }
            return;
        }
        switch (_loc3_) {
            case 0:
            case 9:
                this.createCollectView();
                break;
            case 2:
            case 3:
                this.destroyCollectView();
                this.destroyVerifyView();
                break;
            case 4:
            case 5:
            case 6:
                Logger.log("INVALID STATE!! Phone number / verify errors should not be handled here!");
        }
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get retryEnableTime(): number {
        return this._retryEnableTime;
    }

    private createCollectView(): void {
        this.destroyCollectView();
        let _loc2_: string = this.context.configuration.getProperty("phone.number.preferred.countries");
        let _loc1_: any[] = _loc2_.split(",");
        this._SafeStr_3725 = new PhoneNumberCollectView(this, _loc1_);
    }

    private createVerifyView(): void {
        this.destroyVerifyView();
        this._SafeStr_3607 = new VerificationCodeInputView(this);
    }

    private createCollectMinimizedView(): void {
        this.destroyCollectMinimizedView();
        this._SafeStr_3523 = new PhoneNumberCollectMinimizedView(this);
        this._toolbar.extensionView.attachExtension("phone_number", this._SafeStr_3523.window, 12);
    }

    private createVerifyMinimizedView(): void {
        this.destroyVerifyMinimizedView();
        this._SafeStr_3479 = new VerificationCodeInputMinimizedView(this);
        this._toolbar.extensionView.attachExtension("verification_code", this._SafeStr_3479.window, 12);
    }

    private destroyCollectView(): void {
        if (this._SafeStr_3725) {
            this._SafeStr_3725.dispose();
            this._SafeStr_3725 = null;
        }
    }

    private destroyVerifyView(): void {
        if (this._SafeStr_3607) {
            this._SafeStr_3607.dispose();
            this._SafeStr_3607 = null;
        }
    }

    private destroyCollectMinimizedView(): void {
        this._toolbar.extensionView.detachExtension("phone_number");
        if (this._SafeStr_3523) {
            this._SafeStr_3523.dispose();
            this._SafeStr_3523 = null;
        }
    }

    private destroyVerifyMinimizedView(): void {
        this._toolbar.extensionView.detachExtension("verification_code");
        if (this._SafeStr_3479) {
            this._SafeStr_3479.dispose();
            this._SafeStr_3479 = null;
        }
    }

    protected override initInstanceFields(): void {
        this.onPhoneNumberResultMessage = this.onPhoneNumberResultMessage.bind(this);
        this.onVerificationCodeResultMessage = this.onVerificationCodeResultMessage.bind(this);
        this.onStateMessage = this.onStateMessage.bind(this);
        this._retryEnableTime = 0;
        super.initInstanceFields();
    }
}
