import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ModeratorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::ModeratorMessageParser'); }

    constructor() {
    }

    declare private _message: string;

    declare private _SafeStr_2991: string;

    public get message(): string {
        return this._message;
    }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public ModerationCautionParser(): any {
    }

    public flush(): boolean {
        this._message = "";
        this._SafeStr_2991 = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._message = param1.readString();
        this._SafeStr_2991 = param1.readString();
        return true;
    }
}
