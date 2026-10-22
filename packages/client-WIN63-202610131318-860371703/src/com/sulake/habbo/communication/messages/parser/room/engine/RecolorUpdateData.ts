import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RecolorUpdateData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::RecolorUpdateData'); }

    declare private _SafeStr_14131: number[];

    declare private _SafeStr_14132: number;
    static { (this.prototype as any)._SafeStr_14132 = 0; }

    declare private _SafeStr_14133: number;
    static { (this.prototype as any)._SafeStr_14133 = 0; }

    declare private _SafeStr_14134: number;
    static { (this.prototype as any)._SafeStr_14134 = 0; }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._SafeStr_14131 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14131.push(param1.readInteger());
            _loc3_++;
        }
        this._SafeStr_14132 = param1.readShort();
        this._SafeStr_14133 = param1.readShort();
        this._SafeStr_14134 = param1.readShort();
    }

    public get furniIds(): number[] {
        return this._SafeStr_14131;
    }

    public get red(): number {
        return this._SafeStr_14132;
    }

    public get green(): number {
        return this._SafeStr_14133;
    }

    public get blue(): number {
        return this._SafeStr_14134;
    }
}
