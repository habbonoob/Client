import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboWebApiListener } from '@/com/sulake/habbo/communication/IHabboWebApiListener';
import type { IHabboWebApiSession } from '@/com/sulake/habbo/communication/IHabboWebApiSession';
import type { ICaptchaListener } from '@/com/sulake/habbo/communication/login/ICaptchaListener';
import type { ICaptchaView } from '@/com/sulake/habbo/communication/login/ICaptchaView';
import type { ILoginProvider } from '@/com/sulake/habbo/communication/login/ILoginProvider';
import type { ILoginViewer } from '@/com/sulake/habbo/communication/login/ILoginViewer';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import { SsoTokenAvailableEvent } from '@/com/sulake/habbo/communication/login/SsoTokenAvailableEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';

export class WebApiLoginProvider extends EventDispatcher implements IHabboWebApiListener, ILoginProvider, ICaptchaListener {
    static { registerClassName(this, 'com.sulake.habbo.communication.login::WebApiLoginProvider'); }

    public static readonly ERROR_TYPE_IO_ERROR: string = "ioError";
    public static readonly ERROR_CODE_MAINTENANCE: string = "maintenance";
    private static readonly AUTO_RECONNECT: boolean = false;
    private static readonly POCKET_MODE_LOGIN_AND_REGISTER: number = 1;
    private static readonly _SafeStr_8415: number = 2;

    declare private _communication: IHabboCommunicationManager;

    declare private _environmentId: string;

    declare private _loginView: ILoginViewer;

    declare private _pendingLoginError: any;

    private _autoLogin: boolean = false;

    declare private _localizationLoaded: boolean;
    static { (this.prototype as any)._localizationLoaded = false; }

    declare private _SafeStr_4356: boolean;
    static { (this.prototype as any)._SafeStr_4356 = false; }

    declare private _SafeStr_5729: boolean;
    static { (this.prototype as any)._SafeStr_5729 = false; }

    private _pocketSessionMode: number = 1;

    declare private _name: string;

    declare private _password: string;

    declare private _SafeStr_7387: number;
    static { (this.prototype as any)._SafeStr_7387 = 0; }

    declare private _SafeStr_7367: string;

    declare private _ssoToken: string;

    declare private _SafeStr_2171: IHabboWebApiSession;

    declare private _SafeStr_3916: ICaptchaView;

    constructor(param1: ILoginViewer) {
        super();
        this._loginView = param1;
    }

    public get disposed(): boolean {
        return false;
    }

    public init(param1: IHabboCommunicationManager): void {
        this._communication = param1;
        let _loc2_: string = this.getProperty("web.api");
        Logger.log("[WebApiLoginProvider] Init with: " + _loc2_);
        if (_loc2_ != null) {
            this._communication.createHabboWebApiSession(this, _loc2_);
        }
        this._SafeStr_2171 = this.createHabboWebApiSession();
        this.initHabboWebApiSession();
    }

    public loginWithCredentials(param1: string, param2: string, param3: number = 0): void {
        this._name = param1;
        this._password = param2;
        this._SafeStr_7387 = param3;
        if (this._SafeStr_2171) {
            this._SafeStr_2171.login(param1, param2);
        } else {
            Logger.log("[WebApiLoginProvider] Login not available");
        }
    }

    public loginWithCredentialsWeb(param1: string): void {
        this._SafeStr_7367 = param1;
        if (this._SafeStr_2171) {
            this._SafeStr_2171.selectAvatar(param1);
        } else {
            Logger.log("[WebApiLoginProvider] Login not available");
        }
    }

    private createHabboWebApiSession(): IHabboWebApiSession {
        let _loc2_: IHabboWebApiSession = this._communication.getHabboWebApiSession();
        if (_loc2_ != null) {
            _loc2_.dispose();
            _loc2_ = null;
        }
        let _loc1_: string = this.getProperty("web.api");
        if (_loc1_ == "") {
            _loc1_ = this.getProperty("url.prefix");
            _loc1_ = _loc1_.replace("http:", "https:");
        }
        return this._communication.createHabboWebApiSession(this, _loc1_);
    }

    private initHabboWebApiSession(): void {
        if (this._SafeStr_2171) {
            this._SafeStr_2171.hello();
            return;
        }
        throw new Error("Tried to init null IHabboWebApiSession");
    }

    public habboWebApiError(param1: string, param2: number, param3: string, param4: any, param5: boolean = false): void {
        let _loc8_: boolean = false;
        Logger.log("[WebApiLoginProvider] Api Error: id: " + param1 + " type: " + param3 + " captcha: " + param5);
        let _loc7_: string = stringOrNull(param4 && param4.error ? param4.error : "");
        if (_loc7_ == "maintenance") {
        }
        let _loc9_: boolean = false;
        if (param3 == "ioError") {
            _loc9_ = true;
        }
        let _loc6_: IHabboWebApiSession = this._communication.getHabboWebApiSession();
        switch (param1) {
            case "/api/ssotoken":
                if (this._autoLogin) {
                    _loc9_ = true;
                    _loc6_.login(this._name, this._password);
                }
            case "/api/public/info/hello":
                this._loginView.showLoginScreen();
                break;
            case "/api/public/registration/new":
                this._loginView.showRegistrationError(param4);
                break;
            case "/api/ssotoken":
                Logger.log("[WebApiLoginProvider] There was an error getting the SSO-token (is this an employee account?)...");
                this._loginView.showInvalidLoginError(param4);
                break;
            case "/api/user/avatars":
                Logger.log("[WebApiLoginProvider] There was an error getting the Avatars");
                this._loginView.showInvalidLoginError(param4);
                break;
            case "/api/newuser/name/check":
            case "/api/newuser/name/select":
                Logger.log("[WebApiLoginProvider] There was an error checking name");
                this._loginView.nameCheckResponse(param4, param1 == "/api/newuser/name/check");
                break;
            case "/api/public/authentication/login":
            case "/api/public/authentication/facebook":
            case "/api/force/tos-accept":
                Logger.log("[WebApiLoginProvider] There was an error authorizing connection...");
                if (param4 != null && (param4.message != null || param4.error != null || param4.errors != null)) {
                    if (param5) {
                        _loc8_ = param4.captcha == true && param4.message == "invalid-captcha";
                        if (!_loc8_) {
                            this._pendingLoginError = param4;
                        }
                        this.showCaptchaView();
                    } else {
                        this._loginView.showInvalidLoginError(param4);
                    }
                } else if (param5) {
                    this.showCaptchaView();
                } else {
                    this._loginView.showInvalidLoginError(null);
                }
                break;
            case "/api/user/avatars/select":
                Logger.log("[WebApiLoginProvider] There was an error selecting avatar");
                if (_loc6_) {
                    this._loginView.showAccountError(param4);
                    this._loginView.showLoadingScreen();
                    _loc6_.avatars();
                } else {
                    this._loginView.showInvalidLoginError(param4);
                }
                break;
            case "/api/newuser/room/select":
                Logger.log("[WebApiLoginProvider] There was an error selecting home room.");
                break;
            case "/api/user/look/save":
                this._loginView.saveLooksError(param4);
                break;
            default:
                Logger.log("[WebApiLoginProvider] Did not process Habbo API message: " + param1);
        }
        if (!_loc9_) {
            this._autoLogin = false;
        }
    }

    public onUserList(param1: AvatarData[]): void {
        let _loc2_: string = null;
        if (this._autoLogin) {
            _loc2_ = CommunicationUtils.readSOLString("useruniqueid");
            if (!this.userExists(param1, _loc2_)) {
                this._loginView.populateCharacterList(param1);
            }
        } else {
            this._loginView.populateCharacterList(param1);
        }
    }

    public habboWebApiResponse(param1: string, param2: any): void {
        let _loc5_: string = null;
        let _loc8_: any[] = null;
        let _loc7_: any = undefined;
        let _loc4_: number = 0;
        Logger.log("[WebApiLoginProvider] Got Habbo Web Api Response: " + param1, param2);
        let _loc6_: IHabboWebApiSession = this._communication.getHabboWebApiSession();
        if (_loc6_ == null) {
            return;
        }
        if (param2 != null && param2.force != null && Array.isArray(param2.force)) {
            _loc8_ = Array.isArray(param2.force) ? param2.force : null;
            if (_loc8_.indexOf("TOS") > -1) {
                this._loginView.showTOS();
                return;
            }
            if (_loc8_.indexOf("EMAIL") > -1 || _loc8_.indexOf("PASSWORD") > -1) {
                this._loginView.showInvalidLoginError({ "errors": ["account_issue"] });
                return;
            }
        }
        switch (param1) {
            case "/api/public/info/hello":
                if (this._pocketSessionMode == 1) {
                }
                if (this._autoLogin) {
                    _loc6_.ssoToken();
                } else {
                    this._loginView.environmentReady();
                }
                break;
            case "/api/user/avatars/select":
                if (this._pocketSessionMode != 2) {
                    _loc6_.ssoToken();
                }
                break;
            case "/api/public/authentication/login":
            case "/api/public/authentication/facebook":
            case "/api/force/tos-accept":
                _loc5_ = param1 == "/api/public/authentication/login" ? "habbo" : "facebook";
                CommunicationUtils.writeSOLProperty("loginmethod", _loc5_);
                this.fetchAvatars();
                break;
            case "/api/user/avatars":
                if (this._pocketSessionMode != 2) {
                    _loc7_ = new Array<AvatarData>(0).fill(null);
                    for (const _loc3_ of valuesOf(param2)) {
                        _loc7_.push(new AvatarData(_loc3_));
                    }
                    if (_loc7_.length == 1) {
                        CommunicationUtils.writeSOLProperty("useruniqueid", _loc7_[0].uniqueId);
                        _loc6_.selectAvatar(stringOrNull(_loc7_[0].uniqueId));
                    } else if (!this._autoLogin) {
                        this._loginView.populateCharacterList(_loc7_);
                    }
                }
                break;
            case "/api/ssotoken":
                this._ssoToken = stringOrNull(param2["ssoToken"]);
                this._pocketSessionMode = 2;
                this.dispatchEvent(new SsoTokenAvailableEvent("SSO_TOKEN_AVAILABLE", this._ssoToken));
                break;
            case "/api/public/registration/new":
                if (param2 != null) {
                    _loc4_ = parseInt(stringOrNull(param2.id)) | 0;
                    CommunicationUtils.writeSOLProperty("userid", _loc4_.toString());
                }
                this._loginView.showSelectAvatar(param2);
                break;
            case "/api/public/lists/hotlooks":
                this._loginView.showPromoHabbos(param2 instanceof XML ? param2 : null);
                break;
            case "/api/newuser/name/select":
            case "/api/newuser/name/check":
                this._loginView.nameCheckResponse(param2, param1 == "/api/newuser/name/check");
                break;
            case "/api/user/look/save":
                this._loginView.showSelectRoom();
                break;
            case "/api/newuser/room/select":
                CommunicationUtils.writeSOLProperty("loginmethod", "habbo");
                this.fetchAvatars();
        }
    }

    public habboWebApiRawResponse(param1: string, param2: any): void {
    }

    public closeCaptcha(): void {
        this.removeCaptchaView();
    }

    private showCaptchaView(): void {
        this._SafeStr_3916 = this._loginView.createCaptchaView();
        if (this._SafeStr_3916 == null) {
            this._loginView.showCaptchaError();
        }
    }

    public handleCaptchaError(): void {
        this.removeCaptchaView();
        this._loginView.showCaptchaError();
    }

    public handleCaptchaResult(param1: string): void {
        this.removeCaptchaView();
        this._loginView.captchaReady();
        if (this._pendingLoginError) {
            this._loginView.showInvalidLoginError(this._pendingLoginError);
            this._pendingLoginError = null;
        }
        if (param1 == null || this._SafeStr_2171 == null) {
            this._loginView.showCaptchaError();
            return;
        }
        let _loc2_: boolean = this._SafeStr_2171.setCaptchaToken(param1);
    }

    private removeCaptchaView(): void {
        if (this._SafeStr_3916 != null) {
            this._SafeStr_3916.dispose();
            this._SafeStr_3916 = null;
        }
    }

    public getProperty(param1: string, param2: Map<any, any> = null): string {
        return this._loginView.getProperty(param1, param2);
    }

    private userExists(param1: AvatarData[], param2: string): boolean {
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.uniqueId == param2) {
                return true;
            }
        }
        return false;
    }

    private fetchAvatars(): void {
        let _loc1_: string = null;
        if (this._SafeStr_2171 == null) {
            return;
        }
        if (this._autoLogin) {
            _loc1_ = CommunicationUtils.readSOLString("useruniqueid");
            if (_loc1_) {
                this._SafeStr_2171.selectAvatar(_loc1_);
            } else {
                this._SafeStr_2171.avatars();
            }
        } else if (this._pocketSessionMode == 1) {
            this._SafeStr_2171.avatars();
        }
    }

    public selectAvatar(param1: number): void {
    }

    public selectAvatarUniqueid(param1: string): void {
        if (this._SafeStr_2171 == null) {
            return;
        }
        this._SafeStr_2171.selectAvatar(param1);
    }
}
