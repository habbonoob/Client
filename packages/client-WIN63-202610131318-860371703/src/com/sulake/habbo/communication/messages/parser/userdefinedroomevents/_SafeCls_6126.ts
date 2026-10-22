import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class _SafeCls_6126 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6126'); }

    declare private _SafeStr_14918: number[];

    declare private _SafeStr_14801: number;
    static { (this.prototype as any)._SafeStr_14801 = 0; }

    declare private _SafeStr_14428: boolean;
    static { (this.prototype as any)._SafeStr_14428 = false; }

    declare private _easingMode: number;
    static { (this.prototype as any)._easingMode = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14918 = new Array<number>(0).fill(0);
        this._SafeStr_14801 = 0;
        this._SafeStr_14428 = false;
        this._easingMode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        if (_loc2_ < 0) {
            return false;
        }
        this._SafeStr_14918 = new Array<number>(0).fill(0);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14918.push(param1.readInteger());
            _loc3_++;
        }
        this._SafeStr_14801 = param1.readInteger();
        this._SafeStr_14428 = param1.readBoolean();
        this._easingMode = param1.readInteger();
        return true;
    }

    public get roomIndices(): number[] {
        return this._SafeStr_14918;
    }

    public get transparency(): number {
        return this._SafeStr_14801;
    }

    public get allowClickThrough(): boolean {
        return this._SafeStr_14428;
    }

    public get easingMode(): number {
        return this._easingMode;
    }
}
