import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IApiListener } from '@/com/sulake/habbo/communication/IApiListener';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { HTTPStatusEvent } from '@habbo-pixi/runtime/events/HTTPStatusEvent';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import type { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import type { SecurityErrorEvent } from '@habbo-pixi/runtime/events/SecurityErrorEvent';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Logger } from '@/com/sulake/habbo/Logger';

export class ApiRequest {
    static { registerClassName(this, 'com.sulake.habbo.communication::ApiRequest'); }

    public static readonly ERROR_TYPE_INVALID_CAPTCHA: string = "invalid-captcha";

    declare private _SafeStr_2333: IApiListener;

    declare private _SafeStr_3925: URLRequest;

    declare private _uri: string;

    declare private _requestMethod: string;

    declare private _currentStatus: number;
    static { (this.prototype as any)._currentStatus = 0; }

    constructor(param1: string, param2: string) {
        this._uri = param2;
        this._requestMethod = param1;
    }

    public get uri(): string {
        return this._uri;
    }

    public get requestMethod(): string {
        return this._requestMethod;
    }

    public dispose(): void {
        this._SafeStr_2333 = null;
        this._SafeStr_3925 = null;
        this._uri = null;
        this._requestMethod = null;
        this._currentStatus = 0;
    }

    public makeRequest(param1: IApiListener, param2: URLRequest): void {
        param2.method = this._requestMethod;
        this._SafeStr_3925 = param2;
        this._SafeStr_2333 = param1;
        let _loc3_: URLLoader = new URLLoader();
        _loc3_.dataFormat = "text";
        this.configureListeners(_loc3_);
        try {
            Logger.log("[ApiRequest] Make request: " + param2.url + " for " + this._uri);
            _loc3_.load(param2);
        } catch (error) {
            Logger.log("[ApiRequest] Unable to load requested document.");
        }
    }

    private configureListeners(param1: IEventDispatcher): void {
        param1.addEventListener("complete", this.completeHandler);
        param1.addEventListener("open", this.openHandler);
        param1.addEventListener("progress", this.progressHandler);
        param1.addEventListener("securityError", this.securityErrorHandler);
        param1.addEventListener("httpStatus", this.httpStatusHandler);
        param1.addEventListener("ioError", this.ioErrorHandler);
    }

    private removeListeners(param1: IEventDispatcher): void {
        param1.removeEventListener("complete", this.completeHandler);
        param1.removeEventListener("open", this.openHandler);
        param1.removeEventListener("progress", this.progressHandler);
        param1.removeEventListener("securityError", this.securityErrorHandler);
        param1.removeEventListener("httpStatus", this.httpStatusHandler);
        param1.removeEventListener("ioError", this.ioErrorHandler);
    }

    private completeHandler = (param1: Event): void => {
        let _loc5_: string = null;
        let _loc6_: boolean = false;
        let _loc2_: boolean = false;
        let _loc3_: any = null;
        let _loc7_: boolean = false;
        let _loc4_: URLLoader = castTo(param1.target, URLLoader);
        this.removeListeners(_loc4_);
        if (this._SafeStr_2333) {
            _loc5_ = typeof _loc4_.data === "string" ? _loc4_.data : null;
            _loc6_ = !!(_loc5_ && (_loc5_.charAt(0) == "{" || _loc5_.charAt(0) == "["));
            _loc2_ = !!(_loc5_ && _loc5_.charAt(0) == "<");
            try {
                if (_loc6_) {
                    _loc3_ = JSON.parse(_loc5_);
                } else if (_loc2_) {
                    _loc3_ = new XML(_loc5_);
                }
                if (this._currentStatus >= 400 || _loc6_ && _loc3_.error != null) {
                    _loc7_ = false;
                    if (_loc6_) {
                        _loc7_ = _loc3_.error == "invalid-captcha" || _loc3_.message == "invalid-captcha";
                    }
                    this._SafeStr_2333.apiError(this._uri, this._currentStatus, stringOrNull(_loc6_ ? _loc3_.error : ""), _loc3_, _loc7_);
                } else {
                    this._SafeStr_2333.apiResponse(this._uri, _loc3_);
                }
            } catch (e) {
                Logger.log("JSON parsing for API Request message failed. Data: " + _loc4_.data + " Error: " + (e.errorID ?? 0), e.name, e.message, e.stack);
                this._SafeStr_2333.apiRawResponse(this._uri, _loc4_.data);
            }
        }
    };

    private openHandler = (param1: Event): void => {
        let _loc2_: URLLoader = castTo(param1.target, URLLoader);
    };

    private progressHandler = (param1: ProgressEvent): void => {
        let _loc2_: URLLoader = castTo(param1.target, URLLoader);
    };

    private securityErrorHandler = (param1: SecurityErrorEvent): void => {
        let _loc2_: URLLoader = castTo(param1.target, URLLoader);
        Logger.log("[ApiRequest] securityErrorHandler: " + param1);
        if (this._SafeStr_2333 != null) {
            this._SafeStr_2333.apiError(this._uri, -1, "securityError", null);
        }
        this.removeListeners(_loc2_);
    };

    private httpStatusHandler = (param1: HTTPStatusEvent): void => {
        let _loc2_: URLLoader = castTo(param1.target, URLLoader);
        this._currentStatus = param1.status;
        switch (param1.status) {
            case 200:
            case 403:
                break;
            case 404:
                Logger.log("[ApiRequest - 404] httpStatusHandler: Resource does not exist. " + this._uri, this._requestMethod, this._SafeStr_3925.url);
                break;
            case 409:
                Logger.log("[ApiRequest - 409] httpStatusHandler: Conflict. " + this._uri, this._requestMethod, this._SafeStr_3925.url, _loc2_);
                break;
            case 500:
                Logger.log("[ApiRequest - 500] httpStatusHandler: Internal server error. " + this._uri, this._requestMethod, _loc2_);
                break;
            default:
                Logger.log("[ApiRequest - " + param1.status + "] httpStatusHandler: undhandled. " + this._uri, this._requestMethod, this._SafeStr_3925.url);
        }
    };

    private ioErrorHandler = (param1: IOErrorEvent): void => {
        let _loc3_: any = null;
        let _loc4_: boolean = false;
        let _loc6_: string = null;
        let _loc7_: boolean = false;
        let _loc2_: boolean = false;
        let _loc5_: URLLoader = castTo(param1.target, URLLoader);
        this.removeListeners(_loc5_);
        if (this._SafeStr_2333 != null) {
            _loc3_ = { "message": _loc5_.data };
            _loc4_ = false;
            if (_loc5_.data) {
                try {
                    _loc6_ = stringOrNull(_loc5_.data);
                    _loc7_ = !!(_loc6_ && (_loc6_.charAt(0) == "{" || _loc6_.charAt(0) == "["));
                    _loc2_ = !!(_loc6_ && _loc6_.charAt(0) == "<");
                    _loc3_ = _loc7_ ? JSON.parse(stringOrNull(_loc5_.data)) : _loc5_.data;
                    if (_loc7_) {
                        if (_loc3_.captcha != null && typeof _loc3_.captcha === "boolean") {
                            _loc4_ = Boolean(_loc3_.captcha);
                        }
                    }
                } catch (e) {
                    Logger.log("JSON parsing for Api Request ioError. Data: " + _loc5_.data);
                }
            }
            this._SafeStr_2333.apiError(this._uri, -2, "ioError", _loc3_, _loc4_);
        }
    };
}
