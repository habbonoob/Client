import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AvailabilityStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.availability::AvailabilityStatusMessageParser'); }

    constructor() {
    }

    declare private _onShutDown: boolean;
    static { (this.prototype as any)._onShutDown = false; }

    declare private _isAuthenticHabbo: boolean;
    static { (this.prototype as any)._isAuthenticHabbo = false; }

    declare private _isOpen: boolean;
    static { (this.prototype as any)._isOpen = false; }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public get onShutDown(): boolean {
        return this._onShutDown;
    }

    public get isAuthenticHabbo(): boolean {
        return this._isAuthenticHabbo;
    }

    public flush(): boolean {
        this._isOpen = false;
        this._onShutDown = false;
        this._isAuthenticHabbo = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isOpen = param1.readBoolean();
        this._onShutDown = param1.readBoolean();
        if (param1.bytesAvailable) {
            this._isAuthenticHabbo = param1.readBoolean();
        }
        return true;
    }
}
