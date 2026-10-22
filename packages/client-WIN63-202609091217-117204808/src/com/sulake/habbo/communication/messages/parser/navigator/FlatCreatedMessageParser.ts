import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Logger } from '@/com/sulake/habbo/Logger';

export class FlatCreatedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::FlatCreatedMessageParser'); }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _flatName: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        this._flatName = param1.readString();
        Logger.log("FLAT CREATED: " + this._flatId + ", " + this._flatName);
        return true;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get flatName(): string {
        return this._flatName;
    }
}
