import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredErrorData } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredmenu/WiredErrorData';

export class WiredErrorLogsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredErrorLogsMessageParser'); }

    private _errors: WiredErrorData[] = null;

    constructor() {
    }

    public flush(): boolean {
        this._errors = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._errors = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._errors.push(new WiredErrorData(param1));
            _loc3_ += 1;
        }
        return true;
    }

    public get errors(): WiredErrorData[] {
        return this._errors;
    }
}
