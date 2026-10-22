import { asGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import type { ICaptchaView } from '@/com/sulake/habbo/communication/login/ICaptchaView';
import type { ILoginViewer } from '@/com/sulake/habbo/communication/login/ILoginViewer';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropListWindow } from '@/com/sulake/core/window/components/IDropListWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { LoginEnvironmentsController } from '@/com/sulake/habbo/communication/demo/LoginEnvironmentsController';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';

export class HabboLoginDemoScreen extends EventDispatcherWrapper implements ILoginViewer {
    static { registerClassName(this, 'com.sulake.habbo.communication.demo::HabboLoginDemoScreen'); }

    public static readonly INIT_LOGIN: string = "INIT_LOGIN";
    public static readonly AVATAR_SELECTED: string = "AVATAR_SELECTED";
    public static readonly ENVIRONMENT_SELECTED: string = "ENVIRONMENT_SELECTED";

    public static getModalXmlWindow(param1: string, param2: IAssetLibrary, param3: IHabboWindowManager, param4: string = "_xml"): IModalDialog {
        let _loc7_: IAsset = null;
        let _loc5_: XmlAsset = null;
        let _loc6_: IModalDialog = null;
        try {
            _loc7_ = param2.getAssetByName(param1 + param4);
            _loc5_ = castTo(_loc7_, XmlAsset);
            _loc6_ = param3.buildModalDialogFromXML(XML.from(_loc5_.content));
        } catch (e) {
            ErrorReportStorage.addDebugData("Communication", "Failed to build modal window " + param1 + "_xml, " + _loc7_ + "!");
            throw e;
        }
        return _loc6_;
    }

    constructor(param1: ICoreConfiguration, param2: IAssetLibrary, param3: IHabboWindowManager) {
        super();
        this._SafeStr_3665 = param1;
        this._SafeStr_5776 = param2;
        this._SafeStr_5939 = param3;
        this._defaultPropertyValues = new Dictionary();
        this._SafeStr_2492 = HabboLoginDemoScreen.getModalXmlWindow("login_window", this._SafeStr_5776, this._SafeStr_5939, "");
        this._window = asGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer);
        this.createWindow();
    }

    public name: string = "";
    public password: string = "";

    declare private _SafeStr_3665: ICoreConfiguration;

    declare private _SafeStr_5939: IHabboWindowManager;

    declare private _SafeStr_5776: IAssetLibrary;

    declare private _SafeStr_2492: IModalDialog;

    declare private _window: IWindowContainer;

    private _SafeStr_6396: boolean = false;

    declare private _defaultPropertyValues: Map<any, any>;

    declare private _SafeStr_6292: IWindow;

    declare private _SafeStr_2998: IButtonWindow;

    declare private _SafeStr_2804: ITextFieldWindow;

    declare private _SafeStr_3493: ITextFieldWindow;

    declare private _SafeStr_2625: LoginEnvironmentsController;

    declare private _avatarId: number;
    static { (this.prototype as any)._avatarId = 0; }

    declare private _accounts: AvatarData[];

    declare private _selectedAccount: AvatarData;

    public get avatarId(): number {
        return this._avatarId;
    }

    public get selectedAccount(): AvatarData {
        return this._selectedAccount;
    }

    public get selectedEnvironment(): string {
        return this._SafeStr_2625.selectedEnvironment;
    }

    public get useWebApi(): boolean {
        let _loc1_: ISelectableWindow = asGuarded(this._window.findChildByName("useTicket"), isISelectableWindow);
        if (_loc1_ != null) {
            return _loc1_.isSelected;
        }
        return false;
    }

    public get useExistingSession(): boolean {
        return false;
    }

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_2492) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
        if (this._SafeStr_2625) {
            this._SafeStr_2625.removeEventListener("ENVIRONMENT_SELECTED_EVENT", this.onEnvironmentSelected);
            this._SafeStr_2625.dispose();
            this._SafeStr_2625 = null;
        }
        this._defaultPropertyValues = null;
    }

    public closeLoginWindow(): void {
        if (this._SafeStr_2492) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
    }

    public populateUserList(param1: UtilsMap): void {
        let _loc3_: IWindow = null;
        let _loc4_: number = 0;
        let _loc5_: IItemListWindow = asGuarded(this._window.findChildByName("list"), isIItemListWindow);
        if (!_loc5_) {
            return;
        }
        this._window.findChildByName("users_info").visible = false;
        let _loc2_: IWindow = this._SafeStr_6292.clone();
        _loc2_.procedure = this.listEventHandler;
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ = _loc2_.clone();
            _loc3_.id = param1.getKey(_loc4_) | 0;
            _loc3_.caption = stringOrNull(param1.getWithIndex(_loc4_));
            _loc5_.addListItem(_loc3_);
            _loc4_++;
        }
        _loc2_.dispose();
    }

    public displayResults(param1: string): void {
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("text002"), isITextWindow);
        if (_loc2_ != null) {
            _loc2_.text = param1;
        }
    }

    public showError(param1: number, param2: number, param3: string): void {
        this._window.findChildByName("users_info").caption = "Received error: " + param1 + " regarding message: " + param2;
    }

    public showLoginScreen(): void {
    }

    public showRegistrationError(param1: any): void {
        this.showErrorMessage("Registration error");
    }

    public showInvalidLoginError(param1: any): void {
        this.showErrorMessage("Invalid login");
    }

    public nameCheckResponse(param1: any, param2: boolean): void {
    }

    public showCaptchaError(): void {
        this.showErrorMessage("Captcha required, please add your IP to Housekeeping property to avoid this.");
    }

    public showAccountError(param1: any): void {
        this.showErrorMessage("Error with account during login");
    }

    public showLoadingScreen(): void {
        this.dispose();
    }

    public saveLooksError(param1: any): void {
        this.showErrorMessage("Save looks error ");
    }

    public showTOS(): void {
        this.showErrorMessage("Web-api wants to show Terms of Service");
    }

    public environmentReady(): void {
        this._SafeStr_2998.enable();
        this._SafeStr_2998.caption = "Login (" + this._SafeStr_2625.selectedEnvironment + ")";
        this.showInfoMessage("Web Api connection is established for (" + this._SafeStr_2625.getEnvironmentName(this._SafeStr_2625.selectedEnvironment) + "). Ready to connect.");
    }

    public populateCharacterList(param1: AvatarData[]): void {
        let _loc3_: any = null;
        this._accounts = param1;
        let _loc6_: string = CommunicationUtils.readSOLString("useruniqueid");
        let _loc2_: UtilsMap = new UtilsMap();
        let _loc4_: number = 0;
        for (const _loc5_ of param1 ?? []) {
            if (_loc5_.uniqueId == _loc6_) {
                _loc3_ = _loc5_;
            }
            _loc2_[_loc4_] = _loc5_.name;
            _loc4_++;
        }
        this.populateUserList(_loc2_);
    }

    public showSelectAvatar(param1: any): void {
    }

    public showPromoHabbos(param1: XML): void {
    }

    public showSelectRoom(): void {
    }

    public showDisconnectedWithText(param1: number): void {
        this.showErrorMessage("Hotel is closed");
    }

    public showDisconnected(param1: number, param2: string): void {
        this.showErrorMessage("Disconnected reason: " + param2 + " (" + param1 + ")");
    }

    public getProperty(param1: string, param2: Map<any, any> = null): string {
        return this._SafeStr_3665 ? this._SafeStr_3665.getProperty(param1, param2) : "";
    }

    public createCaptchaView(): ICaptchaView {
        return undefined;
    }

    public captchaReady(): void {
    }

    private createWindow(): void {
        this._window.center();
        this._window.caption += " (air)";
        this._window.findChildByName("useExistingSession").disable();
        this._window.findChildByName("useExistingSession").blend = 0.5;
        this._SafeStr_2998 = asGuarded(this._window.findChildByName("login_btn"), isIButtonWindow);
        this._SafeStr_2804 = asGuarded(this._window.findChildByName("name_field"), isITextFieldWindow);
        this._SafeStr_3493 = asGuarded(this._window.findChildByName("pwd_field"), isITextFieldWindow);
        let _loc3_: string = CommunicationUtils.readSOLString("environment");
        this._SafeStr_2998.addEventListener("WME_CLICK", this.windowEventProcessor);
        this._SafeStr_2998.caption = _loc3_ == null ? "Select environment above" : "Initializing (" + _loc3_ + ")";
        this._SafeStr_2998.disable();
        if (this._SafeStr_2804 != null) {
            this._SafeStr_2804.textBackground = true;
            this._SafeStr_2804.textBackgroundColor = 16777215;
            this._SafeStr_2804.text = CommunicationUtils.readSOLString("login");
            this._SafeStr_2804.focus();
            this._SafeStr_2804.setSelection(this._SafeStr_2804.text.length, this._SafeStr_2804.text.length);
            this._SafeStr_2804.addEventListener("WKE_KEY_UP", this.windowEventProcessor);
        }
        if (this._SafeStr_3493 != null) {
            this._SafeStr_3493.textBackground = true;
            this._SafeStr_3493.textBackgroundColor = 16777215;
            this._SafeStr_3493.text = CommunicationUtils.restorePassword();
            this._SafeStr_3493.addEventListener("WKE_KEY_UP", this.windowEventProcessor);
        }
        let _loc2_: ISelectableWindow = asGuarded(this._window.findChildByName("useTicket"), isISelectableWindow);
        _loc2_.addEventListener("WME_CLICK", this.windowEventProcessorCheckbox);
        if (_loc2_) {
            _loc2_.select();
        }
        let _loc1_: ISelectableWindow = asGuarded(this._window.findChildByName("useExistingSession"), isISelectableWindow);
        if (_loc1_) {
            _loc1_.unselect();
        }
        if (this._SafeStr_3665.getBoolean("try.existing.session")) {
            this._SafeStr_6396 = true;
            this._window.visible = false;
            this.windowEventProcessor(WindowEvent.allocate("WE_OK", this._window, null, false));
        }
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("list"), isIItemListWindow);
        this._SafeStr_6292 = _loc4_.removeListItemAt(0);
        this._SafeStr_2625 = new LoginEnvironmentsController(asGuarded(this._window.findChildByName("environment_list"), isIDropListWindow), this._SafeStr_3665, this._SafeStr_5939, this._SafeStr_5776);
        this._SafeStr_2625.addEventListener("ENVIRONMENT_SELECTED_EVENT", this.onEnvironmentSelected);
    }

    private handleKeyUp(param1: WindowKeyboardEvent): void {
        let _loc3_: number = 0;
        let _loc6_: string = null;
        let _loc4_: string = null;
        let _loc5_: ITextFieldWindow = null;
        let _loc2_: ITextFieldWindow = null;
        let _loc7_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        if (_loc7_.ctrlKey) {
            _loc3_ = _loc7_.keyCode - 49;
            if (_loc3_ >= 0 && _loc3_ < 10) {
                _loc6_ = this._SafeStr_3665.getProperty("login.user." + _loc3_ + ".name");
                _loc4_ = this._SafeStr_3665.getProperty("login.user." + _loc3_ + ".pass");
                _loc5_ = asGuarded(this._window.findChildByName("name_field"), isITextFieldWindow);
                _loc2_ = asGuarded(this._window.findChildByName("pwd_field"), isITextFieldWindow);
                if (_loc6_ != "") {
                    _loc5_.caption = _loc6_;
                }
                if (_loc4_ != "") {
                    _loc2_.caption = _loc4_;
                }
                _loc5_.setSelection(_loc5_.text.length, _loc5_.text.length);
                if (_loc7_.cancelable) {
                    _loc7_.preventDefault();
                    _loc7_.preventWindowOperation();
                }
                param1.stopImmediatePropagation();
                param1.stopPropagation();
            }
        }
    }

    private windowEventProcessor = (param1: WindowEvent = null, param2: IWindow = null): void => {
        if (param1.type == "WKE_KEY_UP") {
            this.handleKeyUp(param1 instanceof WindowKeyboardEvent ? param1 : null);
            if ((param1 instanceof WindowKeyboardEvent ? param1 : null).keyCode != 13) {
                return;
            }
        }
        if (this._SafeStr_2804 != null) {
            this.name = this._SafeStr_2804.text;
        }
        if (this._SafeStr_3493 != null) {
            this.password = this._SafeStr_3493.text;
        }
        CommunicationUtils.writeSOLProperty("login", this.name);
        this.dispatchEvent(new Event("INIT_LOGIN"));
        this._SafeStr_2998.disable();
    };

    private windowEventProcessorCheckbox = (param1: WindowEvent = null, param2: IWindow = null): void => {
        this._SafeStr_2998.enable();
    };

    private listEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this.useWebApi) {
            this._selectedAccount = this._accounts[param2.id];
        } else {
            this._avatarId = this._accounts[param2.id].id;
        }
        this.dispatchEvent(new Event("AVATAR_SELECTED"));
    };

    private showErrorMessage(param1: string): void {
        this._window.findChildByName("users_info").caption = "Error:\n\n" + param1;
    }

    private showInfoMessage(param1: string): void {
        this._window.findChildByName("users_info").caption = param1;
    }

    private onEnvironmentSelected = (param1: Event = null): void => {
        this.dispatchEvent(new Event("ENVIRONMENT_SELECTED"));
        this._SafeStr_2998.disable();
        this._SafeStr_2998.caption = "Initializing (" + this._SafeStr_2625.selectedEnvironment + ")";
        this.showInfoMessage("Initializing Web Api connection to (" + this._SafeStr_2625.getEnvironmentName(this._SafeStr_2625.selectedEnvironment) + ")");
    };
}
