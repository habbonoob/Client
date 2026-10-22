import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CallForHelpDisabledNotifyMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::CallForHelpDisabledNotifyMessageParser'); }

    declare private _infoUrl: string;

    constructor() {
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._infoUrl = param1.readString();
        return true;
    }

    public get infoUrl(): string {
        return this._infoUrl;
    }
}
