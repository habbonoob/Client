import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserRightsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::UserRightsMessageParser'); }

    constructor() {
    }

    declare private _clubLevel: number;
    static { (this.prototype as any)._clubLevel = 0; }

    declare private _securityLevel: number;
    static { (this.prototype as any)._securityLevel = 0; }

    declare private _isAmbassador: boolean;
    static { (this.prototype as any)._isAmbassador = false; }

    public get isAmbassador(): boolean {
        return this._isAmbassador;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get securityLevel(): number {
        return this._securityLevel;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._clubLevel = param1.readInteger();
        this._securityLevel = param1.readInteger();
        this._isAmbassador = param1.readBoolean();
        return true;
    }
}
