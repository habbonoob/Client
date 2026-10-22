import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CfhReportMessage } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhReportMessage';

export class MyCfhReportStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.callforhelp::MyCfhReportStatusMessageParser'); }

    declare private _messages: CfhReportMessage[];

    constructor() {
    }

    public flush(): boolean {
        this._messages = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._messages = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._messages.push(new CfhReportMessage(param1));
            _loc3_ += 1;
        }
        return true;
    }

    public get messages(): CfhReportMessage[] {
        return this._messages;
    }
}
