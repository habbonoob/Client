import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RecolorUpdateData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::RecolorUpdateData'); }

    declare private _SafeStr_14162: number[];

    declare private _SafeStr_14163: number;
    static { (this.prototype as any)._SafeStr_14163 = 0; }

    declare private _SafeStr_14164: number;
    static { (this.prototype as any)._SafeStr_14164 = 0; }

    declare private _SafeStr_14165: number;
    static { (this.prototype as any)._SafeStr_14165 = 0; }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._SafeStr_14162 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14162.push(param1.readInteger());
            _loc3_++;
        }
        this._SafeStr_14163 = param1.readShort();
        this._SafeStr_14164 = param1.readShort();
        this._SafeStr_14165 = param1.readShort();
    }

    public get furniIds(): number[] {
        return this._SafeStr_14162;
    }

    public get red(): number {
        return this._SafeStr_14163;
    }

    public get green(): number {
        return this._SafeStr_14164;
    }

    public get blue(): number {
        return this._SafeStr_14165;
    }
}
