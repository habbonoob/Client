import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BanInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::BanInfoMessageParser'); }

    constructor() {
    }

    declare private _target: number;
    static { (this.prototype as any)._target = 0; }

    declare private _reason: string;

    declare private _banExpirySeconds: number;
    static { (this.prototype as any)._banExpirySeconds = 0; }

    declare private _localizedReason: string;

    public get target(): number {
        return this._target;
    }

    public get reason(): string {
        return this._reason;
    }

    public get banExpirySeconds(): number {
        return this._banExpirySeconds;
    }

    public get localizedReason(): string {
        return this._localizedReason;
    }

    public flush(): boolean {
        this._target = -1;
        this._reason = "";
        this._banExpirySeconds = -1;
        this._localizedReason = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._target = param1.readShort();
        this._reason = param1.readString();
        this._banExpirySeconds = param1.readInteger();
        this._localizedReason = param1.readString();
        return true;
    }
}
