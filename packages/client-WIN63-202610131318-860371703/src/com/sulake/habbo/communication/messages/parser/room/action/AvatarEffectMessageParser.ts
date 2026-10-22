import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AvatarEffectMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.action::AvatarEffectMessageParser'); }

    private _userId: number = 0;
    private _effectId: number = 0;
    private _delayMilliSeconds: number = 0;

    constructor() {
    }

    public get userId(): number {
        return this._userId;
    }

    public get effectId(): number {
        return this._effectId;
    }

    public get delayMilliSeconds(): number {
        return this._delayMilliSeconds;
    }

    public flush(): boolean {
        this._userId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._userId = param1.readInteger();
        this._effectId = param1.readInteger();
        this._delayMilliSeconds = param1.readInteger();
        return true;
    }
}
