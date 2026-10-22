import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CompetitionEntrySubmitResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.competition::CompetitionEntrySubmitResultMessageParser'); }

    public static readonly _SafeStr_8419: number = 0;
    public static readonly _SafeStr_8014: number = 1;
    public static readonly _SafeStr_7738: number = 2;
    public static readonly _SafeStr_8579: number = 3;
    public static readonly _SafeStr_7640: number = 4;
    public static readonly _SafeStr_8639: number = 5;
    public static readonly _SafeStr_8276: number = 6;

    constructor() {
    }

    declare private _goalId: number;
    static { (this.prototype as any)._goalId = 0; }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    declare private _requiredFurnis: any[];

    declare private _SafeStr_4513: Map<any, any>;

    declare private _goalCode: string;

    public get goalCode(): string {
        return this._goalCode;
    }

    public get goalId(): number {
        return this._goalId;
    }

    public get result(): number {
        return this._result;
    }

    public get requiredFurnis(): any[] {
        return this._requiredFurnis;
    }

    public flush(): boolean {
        this._requiredFurnis = null;
        this._SafeStr_4513 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._goalId = param1.readInteger();
        this._goalCode = param1.readString();
        this._result = param1.readInteger();
        this._requiredFurnis = [];
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._requiredFurnis.push(param1.readString());
            _loc2_++;
        }
        this._SafeStr_4513 = new Dictionary();
        _loc3_ = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._SafeStr_4513.set(param1.readString(), "");
            _loc2_++;
        }
        return true;
    }

    public isMissing(param1: string): boolean {
        return this._SafeStr_4513.get(param1) != null;
    }
}
