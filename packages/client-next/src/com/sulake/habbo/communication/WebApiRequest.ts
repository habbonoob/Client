import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ApiRequest } from '@/com/sulake/habbo/communication/ApiRequest';

export class WebApiRequest extends ApiRequest {
    static { registerClassName(this, 'com.sulake.habbo.communication::WebApiRequest'); }

    declare private _requiresSession: boolean;
    static { (this.prototype as any)._requiresSession = false; }

    constructor(param1: string, param2: string, param3: boolean = true) {
        super(param2, param1);
        this._requiresSession = param3;
    }

    public get requiresSession(): boolean {
        return this._requiresSession;
    }
}
