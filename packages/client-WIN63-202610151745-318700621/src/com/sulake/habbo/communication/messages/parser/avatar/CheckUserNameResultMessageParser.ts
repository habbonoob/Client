import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CheckUserNameResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.avatar::CheckUserNameResultMessageParser'); }

    private _resultCode: number = -1;

    declare private _name: string;

    declare private _nameSuggestions: any[];

    constructor() {
    }

    public get resultCode(): number {
        return this._resultCode;
    }

    public get name(): string {
        return this._name;
    }

    public get nameSuggestions(): any[] {
        return this._nameSuggestions;
    }

    public flush(): boolean {
        this._resultCode = -1;
        this._name = "";
        this._nameSuggestions = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._resultCode = param1.readInteger();
        this._name = param1.readString();
        let _loc2_: number = param1.readInteger();
        this._nameSuggestions = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._nameSuggestions.push(param1.readString());
            _loc3_++;
        }
        return true;
    }
}
