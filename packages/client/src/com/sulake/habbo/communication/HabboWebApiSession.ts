import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';
import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';
import type { IApiListener } from '@/com/sulake/habbo/communication/IApiListener';
import type { IHabboWebApiListener } from '@/com/sulake/habbo/communication/IHabboWebApiListener';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { URLRequestHeader } from '@habbo-pixi/runtime/net/URLRequestHeader';
import { URLVariables } from '@habbo-pixi/runtime/net/URLVariables';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { describeType, type MethodDescription, type TypeDescription } from '@habbo-pixi/runtime/utils/describeType';
import { SHA1 } from '@/com/hurlant/crypto/hash/SHA1';
import { Hex } from '@/com/hurlant/util/Hex';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IHabboWebApiSession } from '@/com/sulake/habbo/communication/IHabboWebApiSession';
import { WebApiRequest } from '@/com/sulake/habbo/communication/WebApiRequest';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { PlatformData } from '@/com/sulake/habbo/utils/PlatformData';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboWebApiSession implements IHabboWebApiSession, IApiListener, ICoreErrorLogger {
    static {
        registerClassName(this, 'com.sulake.habbo.communication::HabboWebApiSession');
        registerTypeDescriptions({"com.sulake.habbo.communication::HabboWebApiSession":{"impls":["com.sulake.habbo.communication::IHabboWebApiSession","com.sulake.habbo.communication::IApiListener","com.sulake.core.runtime::ICoreErrorLogger"],"instance":[["m","setCaptchaToken","Boolean",[],[["String",false]]],["r","captchaToken","String"],["m","apiResponse","void",[],[["String",false],["Object",false]]],["m","apiRawResponse","void",[],[["String",false],["Object",false]]],["m","apiError","void",[],[["String",false],["int",false],["String",false],["Object",false],["Boolean",true]]],["m","dispose","void",[],[]],["r","disposed","Boolean"],["m","addListener","Boolean",[],[["com.sulake.habbo.communication::IHabboWebApiListener",false]]],["m","removeListener","void",[],[["com.sulake.habbo.communication::IHabboWebApiListener",false]]],["m","emailChange","void",[],[["String",false]]],["m","passwordChange","void",[],[["String",false]]],["m","tosAccept","void",[],[]],["m","captcha","void",[],[]],["m","achievements","void",[],[]],["m","achievementsForId","void",[],[["int",false]]],["m","time","void",[],[]],["m","activate","void",[],[["String",false]]],["m","login","void",[],[["String",false],["String",false]]],["m","facebook","void",[],[["String",false]]],["m","rpx","void",[],[["String",false]]],["m","logout","void",[],[]],["m","authenticateUser","void",[],[]],["m","forgotPassword","void",[],[["String",false]]],["m","changePassword","void",[],[["String",false],["String",false],["String",false],["String",false]]],["m","groups","void",[],[["int",false]]],["m","members","void",[],[["int",false]]],["m","hello","void",[],[]],["m","register","void",[],[["String",false],["String",false],["int",false],["int",false],["int",false],["Boolean",false],["String",false]]],["m","popularRooms","void",[],[]],["m","room","void",[],[["int",false]]],["m","hotlooks","void",[],[]],["m","logCrash","void",[],[["String",false]]],["m","logError","void",[],[["String",false]]],["m","logLoginStep","void",[],[["String",false],["String",false]]],["m","clientUrl","void",[],[]],["m","nameCheck","void",[],[["String",false]]],["m","selectUser","void",[],[["String",false]]],["m","selectRoom","void",[],[["int",false]]],["m","safetyLockStatus","void",[],[]],["m","safetyLockDisable","void",[],[]],["m","resetTrustedLogins","void",[],[]],["m","safetyLockSave","void",[],[["String",false],["int",false],["String",false],["int",false],["String",false]]],["m","safetyLockQuestions","void",[],[]],["m","safetyLockUnlock","void",[],[["String",false],["String",false],["Boolean",false]]],["m","commonFriends","void",[],[["int",false]]],["m","preferences","void",[],[]],["m","self","void",[],[]],["m","ping","void",[],[]],["m","saveUser","void",[],[]],["m","saveVisibility","void",[],[["Boolean",false]]],["m","campaignMessages","void",[],[]],["m","campaignMessagesAll","void",[],[]],["m","campaignMessagesSeen","void",[],[]],["m","discussions","void",[],[]],["m","creditBalance","void",[],[]],["m","friendRequestsSent","void",[],[]],["m","friendRequestsReceived","void",[],[]],["m","saveLooks","void",[],[["String",false],["String",false]]],["m","avatars","void",[],[]],["m","selectAvatar","void",[],[["String",false]]],["m","changeEmail","void",[],[["String",false],["String",false]]],["m","createAvatar","void",[],[["String",false]]],["m","profile","void",[],[]],["m","ssoToken","void",[],[]],["m","validateItunesIAP","void",[],[["String",false],["String",false],["int",false],["String",false]]],["m","validatePlaystoreIAP","void",[],[["String",false],["String",false],["int",false],["String",false],["String",false]]],["m","setDeviceToken","void",[],[["String",false]]],["m","getDeviceToken","String",[],[]]]}});
    }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboWebApiSession.#initStatics();
        return HabboWebApiSession._log;
    }

    private SHARED_SECRET: string = "CnurvLf7UP";

    declare private _requests: Map<any, any>;

    declare private _SafeStr_6616: MethodDescription[];

    declare private _server: string;

    declare private _captchaToken: string;

    declare private _listeners: IHabboWebApiListener[];

    private _SafeStr_7711: boolean = false;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_5788: string;

    declare private _deviceToken: string;

    declare private _SafeStr_5217: WebApiRequest;

    declare private _lastVariables: URLVariables;

    declare private _lastReplacementProperties: any[];

    declare private _SafeStr_4289: string;

    constructor(param1: string) {
        let _loc3_: any;
        let _loc7_: string = null;
        let _loc10_: string = null;
        let _loc6_: string = null;
        let _loc4_: string = CommunicationUtils.readSOLString("machineid", CommunicationUtils.generateRandomHexString(32));
        this._SafeStr_5788 = this.generateDeviceId(_loc4_);
        this._server = param1;
        this._listeners = new Array<IHabboWebApiListener>(0).fill(null);
        this._SafeStr_6616 = describeType(this).methods;
        let _loc9_: TypeDescription = describeType(IHabboWebApiSession);
        HabboWebApiSession._log.info("Start searching for Metadata");
        this._requests = new Dictionary();
        let _loc2_: string = "";
        let _loc5_: number = 0;
        for (const _loc8_ of _loc9_.factory.methods) {
            _loc7_ = _loc8_.name;
            for (_loc3_ of _loc8_.metadata) {
                if (_loc3_.name == "HabboWebApiRoute") {
                    _loc10_ = _loc3_.args.find(($x) => $x.key == "uri").value;
                    _loc6_ = _loc3_.args.find(($x) => $x.key == "method").value;
                    if (!(_loc10_ != null && _loc6_ != null)) {
                        throw new Error("Web Api Route Metdata missing for method (both uri and requestType are required): " + _loc7_);
                    }
                    this._requests.set(_loc7_, new WebApiRequest(_loc10_, _loc6_, _loc10_.indexOf("/public/") == -1));
                    _loc5_++;
                }
            }
        }
        if (_loc5_ == 0) {
            HabboWebApiSession._log.warn("Could not fetch META information correctly, make sure the build-params keep the information!");
        }
    }

    private generateDeviceId(param1: string): string {
        let _loc2_: SHA1 = new SHA1();
        let _loc4_: ByteArray = Hex.toArray(Hex.fromString(this.SHARED_SECRET + param1));
        let _loc5_: ByteArray = _loc2_.hash(_loc4_);
        let _loc3_: string = Hex.fromArray(_loc5_);
        return param1 + ":" + _loc3_;
    }

    private getFunctionName(param1: (...args: any[]) => any): string {
        for (const _loc2_ of this._SafeStr_6616 ?? []) {
            if ((this as unknown as Record<string, unknown>)[_loc2_.name] == param1) {
                return _loc2_.name;
            }
        }
        return null;
    }

    private getURL(param1: string): string {
        return this._server + param1;
    }

    private executeRequest(param1: string, param2: URLVariables = null, param3: any[] = null): void {
        let _loc5_: WebApiRequest = null;
        let _loc4_: URLRequest = null;
        if (param1 != null) {
            this._SafeStr_5217 = _loc5_ = this._requests.get(param1);
            this._lastVariables = param2;
            this._lastReplacementProperties = param3;
            if (_loc5_ != null) {
                HabboWebApiSession._log.info(["Found request for method: " + param1, _loc5_.uri, _loc5_.requestMethod].join(","));
                if (this._captchaToken != null) {
                    if (param2 == null) {
                        param2 = new URLVariables();
                    }
                    param2.captchaToken = this._captchaToken;
                    this._captchaToken = null;
                }
                _loc4_ = new URLRequest(this.getURL(_loc5_.uri));
                _loc4_.manageCookies = true;
                if (_loc5_.requestMethod.toUpperCase() == "GET".toUpperCase()) {
                    if (param2 != null && param2.toString().length > 0) {
                        _loc4_.data = param2;
                    }
                } else {
                    if (param2 != null && param2.toString().length > 0) {
                        _loc4_.data = JSON.stringify(param2);
                    } else {
                        _loc4_.data = "{}";
                    }
                    _loc4_.requestHeaders.push(new URLRequestHeader("Content-type", "application/json"));
                }
                this.addHeaders(_loc4_);
                _loc5_.makeRequest(this, _loc4_);
            }
        } else {
            HabboWebApiSession._log.warn("Could not execute request for null method...");
        }
    }

    public setCaptchaToken(param1: string): boolean {
        let _loc2_: string = null;
        this._captchaToken = param1;
        if (this._SafeStr_5217 && this._SafeStr_4289 && this._SafeStr_4289 == this._SafeStr_5217.uri) {
            _loc2_ = this.getMethodForRequest(this._SafeStr_5217);
            if (_loc2_ != null) {
                this.executeRequest(_loc2_, this._lastVariables, this._lastReplacementProperties);
                return true;
            }
        }
        return false;
    }

    public get captchaToken(): string {
        return this._captchaToken;
    }

    private getMethodForRequest(param1: WebApiRequest): string {
        let _loc2_: WebApiRequest = null;
        for (const _loc3_ of this._requests?.keys() ?? []) {
            _loc2_ = this._requests.get(_loc3_);
            if (_loc2_ && _loc2_.uri == param1.uri) {
                return stringOrNull(_loc3_);
            }
        }
        return null;
    }

    private addHeaders(param1: URLRequest): void {
        param1.requestHeaders.push(new URLRequestHeader("X-Habbo-Device-ID", this._SafeStr_5788));
        param1.requestHeaders.push(new URLRequestHeader("x-habbo-api-deviceid", this._SafeStr_5788));
        param1.requestHeaders.push(new URLRequestHeader("X-Habbo-Device-Type", PlatformData.platformString()));
    }

    public apiResponse(param1: string, param2: any): void {
        HabboWebApiSession._log.info("Got response for Web Api: " + param1);
        if (this._listeners != null) {
            for (const _loc3_ of this._listeners ?? []) {
                if (!_loc3_.disposed) {
                    _loc3_.habboWebApiResponse(param1, param2);
                }
            }
        }
    }

    public apiRawResponse(param1: string, param2: any): void {
        HabboWebApiSession._log.info("Got response for Web Api Raw: " + param1);
        if (this._listeners != null) {
            for (const _loc3_ of this._listeners ?? []) {
                if (!_loc3_.disposed) {
                    _loc3_.habboWebApiRawResponse(param1, param2);
                }
            }
        }
    }

    public apiError(param1: string, param2: number, param3: string, param4: any, param5: boolean = false): void {
        let _loc8_: any[] = null;
        let _loc7_: string = null;
        HabboWebApiSession._log.info(["Got error for Web Api: " + param1, param2, param3, param4].join(","));
        this._SafeStr_4289 = null;
        if (param4 != null && typeof param4 === "string") {
            param4 = { "error": param4 };
        }
        if (param4 != null && !(typeof param4 === "string")) {
            if (param4.error == null) {
                _loc8_ = param4.errors;
                _loc7_ = stringOrNull(_loc8_ && _loc8_.length > 0 ? _loc8_[0] : "");
                if (_loc7_ == "" && param4.message != null) {
                    _loc7_ = stringOrNull(param4.message);
                }
            } else {
                _loc7_ = typeof param4.error === "string" ? param4.error : null;
            }
        } else {
            _loc7_ = param2.toString();
        }
        HabboWebApiSession._log.error("Error code: " + _loc7_);
        switch (_loc7_) {
            case "invalid-captcha":
            case "registration.captcha_is_empty":
            case "registration.invalid_captcha":
                if (_loc8_ == null || _loc8_.length == 1) {
                    this._SafeStr_4289 = param1;
                }
        }
        if (this._listeners != null) {
            for (const _loc6_ of this._listeners ?? []) {
                if (!_loc6_.disposed) {
                    _loc6_.habboWebApiError(param1, param2, param3, param4, param5);
                }
            }
        }
    }

    public dispose(): void {
        let _loc1_: WebApiRequest = null;
        this._listeners = null;
        this._server = "";
        this._disposed = true;
        for (const _loc2_ of this._requests?.keys() ?? []) {
            _loc1_ = this._requests.get(_loc2_);
            _loc1_.dispose();
        }
        this._requests = new Dictionary();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public addListener(param1: IHabboWebApiListener): boolean {
        if (this._listeners && this._listeners.indexOf(param1) == -1) {
            this._listeners.push(param1);
            return true;
        }
        return false;
    }

    public removeListener(param1: IHabboWebApiListener): void {
        let _loc2_: number = 0;
        if (this._listeners) {
            _loc2_ = this._listeners.indexOf(param1);
            if (_loc2_ != -1) {
                this._listeners.splice(_loc2_, 1);
            }
        }
    }

    public emailChange = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.newEmail = param1;
        this.executeRequest(this.getFunctionName(this.emailChange), _loc2_);
    };

    public passwordChange = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.newPassword = param1;
        this.executeRequest(this.getFunctionName(this.passwordChange), _loc2_);
    };

    public tosAccept = (): void => {
        this.executeRequest(this.getFunctionName(this.tosAccept));
    };

    public captcha = (): void => {
        this.executeRequest(this.getFunctionName(this.captcha));
    };

    public achievements = (): void => {
        this.executeRequest(this.getFunctionName(this.achievements));
    };

    public achievementsForId = (param1: number): void => {
        this.executeRequest(this.getFunctionName(this.achievementsForId), null, ["id", param1]);
    };

    public time = (): void => {
        this.executeRequest(this.getFunctionName(this.time));
    };

    public activate = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.token = param1;
        this.executeRequest(this.getFunctionName(this.activate), _loc2_);
    };

    public login = (param1: string, param2: string): void => {
        let _loc3_: URLVariables = new URLVariables();
        _loc3_.email = param1;
        _loc3_.password = param2;
        this.executeRequest(this.getFunctionName(this.login), _loc3_);
    };

    public facebook = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.accessToken = param1;
        this.executeRequest(this.getFunctionName(this.facebook), _loc2_);
    };

    public rpx = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.token = param1;
        this.executeRequest(this.getFunctionName(this.rpx), _loc2_);
    };

    public logout = (): void => {
        this.executeRequest(this.getFunctionName(this.logout));
    };

    public authenticateUser = (): void => {
        this.executeRequest(this.getFunctionName(this.authenticateUser));
    };

    public forgotPassword = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.email = param1;
        this.executeRequest(this.getFunctionName(this.forgotPassword), _loc2_);
    };

    public changePassword = (param1: string, param2: string, param3: string, param4: string): void => {
        let _loc5_: URLVariables = new URLVariables();
        _loc5_.token = param1;
        _loc5_.password = param2;
        _loc5_.answer1 = param3;
        _loc5_.answer2 = param4;
        this.executeRequest(this.getFunctionName(this.changePassword), _loc5_);
    };

    public groups = (param1: number): void => {
        this.executeRequest(this.getFunctionName(this.groups), null, ["id", param1]);
    };

    public members = (param1: number): void => {
        this.executeRequest(this.getFunctionName(this.members), null, ["id", param1]);
    };

    public hello = (): void => {
        this.executeRequest(this.getFunctionName(this.hello));
    };

    public register = (param1: string, param2: string, param3: number, param4: number, param5: number, param6: boolean, param7: string): void => {
        this._captchaToken = param7;
        let _loc8_: URLVariables = new URLVariables();
        _loc8_.email = param1;
        _loc8_.password = param2;
        _loc8_.passwordRepeated = param2;
        _loc8_.birthdate = { "day": param3, "month": param4, "year": param5 };
        _loc8_.termsOfServiceAccepted = param6;
        this.executeRequest(this.getFunctionName(this.register), _loc8_);
    };

    public popularRooms = (): void => {
        this.executeRequest(this.getFunctionName(this.popularRooms));
    };

    public room = (param1: number): void => {
        this.executeRequest(this.getFunctionName(this.room), null, ["id", param1]);
    };

    public hotlooks = (): void => {
        this.executeRequest(this.getFunctionName(this.hotlooks));
    };

    public logCrash = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.message = param1;
        this.executeRequest(this.getFunctionName(this.logCrash), _loc2_);
    };

    public logError = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.message = param1;
        this.executeRequest(this.getFunctionName(this.logError), _loc2_);
    };

    public logLoginStep = (param1: string, param2: string): void => {
        let _loc3_: URLVariables = new URLVariables();
        _loc3_.step = param1;
        this.executeRequest(this.getFunctionName(this.logLoginStep), _loc3_);
    };

    public clientUrl = (): void => {
        this.executeRequest(this.getFunctionName(this.clientUrl));
    };

    public nameCheck = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.name = param1;
        this.executeRequest(this.getFunctionName(this.nameCheck), _loc2_);
    };

    public selectUser = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.name = param1;
        this.executeRequest(this.getFunctionName(this.selectUser), _loc2_);
    };

    public selectRoom = (param1: number): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.roomIndex = param1;
        this.executeRequest(this.getFunctionName(this.selectRoom), _loc2_);
    };

    public safetyLockStatus = (): void => {
        this.executeRequest(this.getFunctionName(this.safetyLockStatus));
    };

    public safetyLockDisable = (): void => {
        this.executeRequest(this.getFunctionName(this.safetyLockDisable));
    };

    public resetTrustedLogins = (): void => {
        this.executeRequest(this.getFunctionName(this.resetTrustedLogins));
    };

    public safetyLockSave = (param1: string, param2: number, param3: string, param4: number, param5: string): void => {
        let _loc6_: URLVariables = new URLVariables();
        _loc6_.password = param1;
        _loc6_.questionId1 = param2;
        _loc6_.answer1 = param3;
        _loc6_.questionId2 = param4;
        _loc6_.answer2 = param5;
        this.executeRequest(this.getFunctionName(this.safetyLockSave), _loc6_);
    };

    public safetyLockQuestions = (): void => {
        this.executeRequest(this.getFunctionName(this.safetyLockQuestions));
    };

    public safetyLockUnlock = (param1: string, param2: string, param3: boolean): void => {
        let _loc4_: URLVariables = new URLVariables();
        _loc4_.answer1 = param1;
        _loc4_.answer2 = param2;
        _loc4_.trustDevice = param3;
        this.executeRequest(this.getFunctionName(this.safetyLockUnlock), _loc4_);
    };

    public commonFriends = (param1: number): void => {
        this.executeRequest(this.getFunctionName(this.commonFriends), null, ["id", param1]);
    };

    public preferences = (): void => {
        this.executeRequest(this.getFunctionName(this.preferences));
    };

    public self = (): void => {
        this.executeRequest(this.getFunctionName(this.self));
    };

    public ping = (): void => {
        this.executeRequest(this.getFunctionName(this.ping));
    };

    public saveUser = (): void => {
        this.executeRequest(this.getFunctionName(this.saveUser));
    };

    public saveVisibility = (param1: boolean): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.visibility = param1;
        this.executeRequest(this.getFunctionName(this.saveVisibility), _loc2_);
    };

    public campaignMessages = (): void => {
        this.executeRequest(this.getFunctionName(this.campaignMessages));
    };

    public campaignMessagesAll = (): void => {
        this.executeRequest(this.getFunctionName(this.campaignMessagesAll));
    };

    public campaignMessagesSeen = (): void => {
        this.executeRequest(this.getFunctionName(this.campaignMessagesSeen));
    };

    public discussions = (): void => {
        this.executeRequest(this.getFunctionName(this.discussions));
    };

    public creditBalance = (): void => {
        this.executeRequest(this.getFunctionName(this.creditBalance));
    };

    public friendRequestsSent = (): void => {
        this.executeRequest(this.getFunctionName(this.friendRequestsSent));
    };

    public friendRequestsReceived = (): void => {
        this.executeRequest(this.getFunctionName(this.friendRequestsReceived));
    };

    public saveLooks = (param1: string, param2: string): void => {
        let _loc3_: URLVariables = new URLVariables();
        _loc3_.figure = param1;
        _loc3_.gender = param2;
        this.executeRequest(this.getFunctionName(this.saveLooks), _loc3_);
    };

    public avatars = (): void => {
        this.executeRequest(this.getFunctionName(this.avatars));
    };

    public selectAvatar = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.uniqueId = param1;
        this.executeRequest(this.getFunctionName(this.selectAvatar), _loc2_);
    };

    public changeEmail = (param1: string, param2: string): void => {
        let _loc3_: URLVariables = new URLVariables();
        _loc3_.newEmail = param1;
        _loc3_.currentPassword = param2;
        this.executeRequest(this.getFunctionName(this.changeEmail), _loc3_);
    };

    public createAvatar = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.name = param1;
        this.executeRequest(this.getFunctionName(this.createAvatar), _loc2_);
    };

    public profile = (): void => {
        this.executeRequest(this.getFunctionName(this.profile));
    };

    public ssoToken = (): void => {
        this.executeRequest(this.getFunctionName(this.ssoToken));
    };

    public validateItunesIAP = (param1: string, param2: string, param3: number, param4: string): void => {
        let _loc5_: URLVariables = new URLVariables();
        _loc5_.transactionId = param1;
        _loc5_.receipt = param2;
        _loc5_.centPrice = param3;
        _loc5_.priceLocale = param4;
        this.executeRequest(this.getFunctionName(this.validateItunesIAP), _loc5_);
    };

    public validatePlaystoreIAP = (param1: string, param2: string, param3: number, param4: string, param5: string): void => {
        let _loc6_: URLVariables = new URLVariables();
        _loc6_.transactionId = param1;
        _loc6_.receipt = param2;
        _loc6_.centPrice = param3;
        _loc6_.priceLocale = param4;
        _loc6_.signature = param5;
        this.executeRequest(this.getFunctionName(this.validatePlaystoreIAP), _loc6_);
    };

    public setDeviceToken = (param1: string): void => {
        let _loc2_: URLVariables = new URLVariables();
        _loc2_.device_token = param1;
        this._deviceToken = param1;
        this.executeRequest(this.getFunctionName(this.setDeviceToken), _loc2_);
    };

    public getDeviceToken(): string {
        return this._deviceToken;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboWebApiSession.#staticsReady) return;
        HabboWebApiSession.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboWebApiSession, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.communication.HabboWebApiSession"));
    }

    get [IHabboWebApiSession](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
