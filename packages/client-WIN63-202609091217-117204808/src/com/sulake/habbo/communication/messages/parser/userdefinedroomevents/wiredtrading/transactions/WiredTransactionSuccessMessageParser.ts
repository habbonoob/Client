import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredTransactionSuccessContents } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionSuccessContents';

export class WiredTransactionSuccessMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionSuccessMessageParser'); }

    private static _SafeStr_6560: number = 1;

    declare private _contents: WiredTransactionSuccessContents;

    constructor() {
    }

    public flush(): boolean {
        this._contents = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = WiredTransactionSuccessMessageParser._SafeStr_6560++;
        this._contents = new WiredTransactionSuccessContents(_loc2_, param1);
        return true;
    }

    public get contents(): WiredTransactionSuccessContents {
        return this._contents;
    }
}
