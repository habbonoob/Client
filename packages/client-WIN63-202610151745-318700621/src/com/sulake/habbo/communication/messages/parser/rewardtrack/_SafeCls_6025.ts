import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6027 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6027';
import { _SafeCls_6029 } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/_SafeCls_6029';

export class _SafeCls_6025 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::_SafeCls_6025'); }

    declare private _id: string;

    declare private _theme: string;

    declare private _SafeStr_5536: number;
    static { (this.prototype as any)._SafeStr_5536 = 0; }

    declare private _hasPremiumConfig: boolean;
    static { (this.prototype as any)._hasPremiumConfig = false; }

    declare private _SafeStr_14087: number;
    static { (this.prototype as any)._SafeStr_14087 = NaN; }

    declare private _SafeStr_14088: number;
    static { (this.prototype as any)._SafeStr_14088 = 0; }

    declare private _SafeStr_14089: number;
    static { (this.prototype as any)._SafeStr_14089 = 0; }

    declare private _SafeStr_14090: number;
    static { (this.prototype as any)._SafeStr_14090 = 0; }

    declare private _SafeStr_14083: boolean;
    static { (this.prototype as any)._SafeStr_14083 = false; }

    declare private _complete: boolean;
    static { (this.prototype as any)._complete = false; }

    declare private _SafeStr_14091: boolean;
    static { (this.prototype as any)._SafeStr_14091 = false; }

    declare private _tasks: _SafeCls_6027[];

    declare private _prizes: _SafeCls_6029[];

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        this._id = param1.readString();
        this._theme = param1.readString();
        this._SafeStr_5536 = param1.readInteger();
        this._hasPremiumConfig = param1.readBoolean();
        if (this._hasPremiumConfig) {
            this._SafeStr_14087 = param1.readDouble();
            this._SafeStr_14088 = param1.readInteger();
            this._SafeStr_14089 = param1.readInteger();
            this._SafeStr_14090 = param1.readInteger();
        }
        this._SafeStr_14083 = param1.readBoolean();
        this._complete = param1.readBoolean();
        this._SafeStr_14091 = param1.readBoolean();
        this._tasks = [];
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            this._tasks.push(new _SafeCls_6027(param1));
            _loc4_++;
        }
        this._prizes = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            this._prizes.push(new _SafeCls_6029(param1));
            _loc4_++;
        }
    }

    public get id(): string {
        return this._id;
    }

    public get theme(): string {
        return this._theme;
    }

    public get points(): number {
        return this._SafeStr_5536;
    }

    public get hasPremiumConfig(): boolean {
        return this._hasPremiumConfig;
    }

    public get taskPointsBoost(): number {
        return this._SafeStr_14087;
    }

    public get instantPoints(): number {
        return this._SafeStr_14088;
    }

    public get costDiamonds(): number {
        return this._SafeStr_14089;
    }

    public get costCredits(): number {
        return this._SafeStr_14090;
    }

    public get premium(): boolean {
        return this._SafeStr_14083;
    }

    public get complete(): boolean {
        return this._complete;
    }

    public get premiumComplete(): boolean {
        return this._SafeStr_14091;
    }

    public get tasks(): _SafeCls_6027[] {
        return this._tasks;
    }

    public get prizes(): _SafeCls_6029[] {
        return this._prizes;
    }
}
