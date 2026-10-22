import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AvatarEffectAddedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.avatareffect::AvatarEffectAddedMessageParser'); }

    constructor() {
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _subType: number;
    static { (this.prototype as any)._subType = 0; }

    declare private _duration: number;
    static { (this.prototype as any)._duration = 0; }

    declare private _isPermanent: boolean;
    static { (this.prototype as any)._isPermanent = false; }

    public get type(): number {
        return this._type;
    }

    public get subType(): number {
        return this._subType;
    }

    public get duration(): number {
        return this._duration;
    }

    public get isPermanent(): boolean {
        return this._isPermanent;
    }

    public flush(): boolean {
        this._type = 0;
        this._subType = 0;
        this._duration = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._type = param1.readInteger();
        this._subType = param1.readInteger();
        this._duration = param1.readInteger();
        this._isPermanent = param1.readBoolean();
        return true;
    }
}
