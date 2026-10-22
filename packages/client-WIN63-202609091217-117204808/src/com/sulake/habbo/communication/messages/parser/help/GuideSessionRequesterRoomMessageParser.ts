import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideSessionRequesterRoomMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideSessionRequesterRoomMessageParser'); }

    declare private _SafeStr_6871: number;
    static { (this.prototype as any)._SafeStr_6871 = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_6871 = param1.readInteger();
        return true;
    }

    public getRequesterRoomId(): number {
        return this._SafeStr_6871;
    }
}
