import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UserChangeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::UserChangeMessageParser'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _figure: string;

    declare private _sex: string;

    declare private _customInfo: string;

    declare private _achievementScore: number;
    static { (this.prototype as any)._achievementScore = 0; }

    private _SafeStr_14689: number = -1;

    constructor() {
    }

    public get id(): number {
        return this._id;
    }

    public get figure(): string {
        return this._figure;
    }

    public get sex(): string {
        return this._sex;
    }

    public get customInfo(): string {
        return this._customInfo;
    }

    public get achievementScore(): number {
        return this._achievementScore;
    }

    public get badgesRank(): number {
        return this._SafeStr_14689;
    }

    public flush(): boolean {
        this._id = 0;
        this._figure = "";
        this._sex = "";
        this._customInfo = "";
        this._SafeStr_14689 = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._id = param1.readInteger();
        this._figure = param1.readString();
        this._sex = param1.readString();
        this._customInfo = param1.readString();
        this._achievementScore = param1.readInteger();
        param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            param1.readInteger();
            param1.readInteger();
            param1.readInteger();
            _loc3_++;
        }
        this._SafeStr_14689 = param1.readInteger();
        if (this._sex) {
            this._sex = this._sex.toUpperCase();
        }
        return true;
    }
}
