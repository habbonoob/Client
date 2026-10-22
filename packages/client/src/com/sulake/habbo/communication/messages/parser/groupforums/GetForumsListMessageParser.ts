import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ForumData';

export class GetForumsListMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::GetForumsListMessageParser'); }

    constructor() {
    }

    declare private _startIndex: number;
    static { (this.prototype as any)._startIndex = 0; }

    declare private _listCode: number;
    static { (this.prototype as any)._listCode = 0; }

    public get listCode(): number {
        return this._listCode;
    }

    declare private _totalAmount: number;
    static { (this.prototype as any)._totalAmount = 0; }

    public get totalAmount(): number {
        return this._totalAmount;
    }

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    declare private _forums: any[];

    public get forums(): any[] {
        return this._forums;
    }

    public get startIndex(): number {
        return this._startIndex;
    }

    public flush(): boolean {
        this._forums = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._listCode = param1.readInteger();
        this._totalAmount = param1.readInteger();
        this._startIndex = param1.readInteger();
        this._amount = param1.readInteger();
        this._forums = [];
        _loc2_ = 0;
        while (_loc2_ < this.amount) {
            this._forums.push(ForumData.readFromMessage(param1));
            _loc2_++;
        }
        return true;
    }
}
