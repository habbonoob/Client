import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class SsoTokenAvailableEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.communication.login::SsoTokenAvailableEvent'); }

    public static readonly SSO_TOKEN_AVAILABLE: string = "SSO_TOKEN_AVAILABLE";

    declare private _ssoToken: string;

    constructor(param1: string, param2: string, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._ssoToken = param2;
    }

    public get ssoToken(): string {
        return this._ssoToken;
    }
}
