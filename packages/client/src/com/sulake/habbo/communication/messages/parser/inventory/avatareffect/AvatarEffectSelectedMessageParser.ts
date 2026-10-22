import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AvatarEffectSelectedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.avatareffect::AvatarEffectSelectedMessageParser'); }

    constructor() {
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    public get type(): number {
        return this._type;
    }

    public flush(): boolean {
        this._type = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._type = param1.readInteger();
        return true;
    }
}
