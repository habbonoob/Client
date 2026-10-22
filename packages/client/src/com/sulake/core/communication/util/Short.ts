import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class Short {
    static { registerClassName(this, 'com.sulake.core.communication.util::Short'); }

    constructor(param1: number) {
        this._SafeStr_3841 = new ByteArray();
        this._SafeStr_3841.writeShort(param1);
        this._SafeStr_3841.position = 0;
    }

    declare private _SafeStr_3841: ByteArray;

    public get value(): number {
        let _loc1_: number = 0;
        this._SafeStr_3841.position = 0;
        if (this._SafeStr_3841.bytesAvailable) {
            _loc1_ = this._SafeStr_3841.readShort();
            this._SafeStr_3841.position = 0;
        }
        return _loc1_;
    }
}
