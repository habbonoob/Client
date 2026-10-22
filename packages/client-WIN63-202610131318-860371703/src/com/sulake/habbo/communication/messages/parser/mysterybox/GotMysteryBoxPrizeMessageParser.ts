import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GotMysteryBoxPrizeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.mysterybox::GotMysteryBoxPrizeMessageParser'); }

    declare private _contentType: string;

    declare private _classId: number;
    static { (this.prototype as any)._classId = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._contentType = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._contentType = param1.readString();
        this._classId = param1.readInteger();
        return true;
    }

    public get contentType(): string {
        return this._contentType;
    }

    public get classId(): number {
        return this._classId;
    }
}
