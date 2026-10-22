import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Endian } from '@habbo-pixi/runtime/utils/Endian';
import { _SafeCls_6001 } from '@/com/sulake/habbo/_SafeCls_6001';

const _SafeStr_14001_binAsset = embedBytes("_safecls_6000/_SafeStr_14001.bin");
const _SafeStr_14002_binAsset = embedBytes("_safecls_6000/_SafeStr_14002.bin");
const _SafeStr_14003_binAsset = embedBytes("_safecls_6000/_SafeStr_14003.bin");

export class _SafeCls_6000 extends Sprite {
    static { registerClassName(this, '_SafeCls_6000'); }

    private static _SafeStr_14000: number = 0;

    private static _SafeStr_14001 = _SafeStr_14001_binAsset;

    private static _SafeStr_14002 = _SafeStr_14002_binAsset;

    private static _SafeStr_14003 = _SafeStr_14003_binAsset;

    private static _SafeStr_14004: any[] = [];
    private static _SafeStr_14005: any[] = [];
    private static _SafeStr_14006: boolean = false;

    constructor() {
        super();
    }

    private static _SafeStr_14007(): void {
        let _loc1_: ByteArray = asInstanceOf(new _SafeCls_6000._SafeStr_14001(), ByteArray);
        let _loc2_: ByteArray = asInstanceOf(new _SafeCls_6000._SafeStr_14002(), ByteArray);
        let _loc3_: ByteArray = asInstanceOf(new _SafeCls_6000._SafeStr_14003(), ByteArray);
        _loc3_.endian = Endian.LITTLE_ENDIAN;
        _SafeCls_6000._SafeStr_14000 = _loc3_.readInt();
        let _loc4_: number = _loc2_.readByte();
        let _loc5_: number = 0;
        while (_loc5_ < _loc4_) {
            _SafeCls_6000._SafeStr_14008(_loc2_);
            _loc5_++;
        }
        _loc4_ = _loc1_.readInt();
        let _loc6_: number = 0;
        while (_loc6_ < _loc4_) {
            _SafeCls_6000._SafeStr_14009(_loc1_, _SafeCls_6000._SafeStr_14005[_loc6_ % _SafeCls_6000._SafeStr_14005.length]);
            _loc6_++;
        }
        _SafeCls_6000._SafeStr_14006 = true;
    }

    private static _SafeStr_14009(param1: ByteArray, param2: ByteArray): void {
        let _loc3_: number = param1.readInt();
        let _loc4_: ByteArray = new ByteArray();
        param1.readBytes(_loc4_, 0, _loc3_ >>> 0);
        let _loc5_: _SafeCls_6001 = new _SafeCls_6001(param2);
        _loc5_._SafeStr_14010(_loc4_);
        _loc4_.position = 0;
        _SafeCls_6000._SafeStr_14004.push(_loc4_.readUTFBytes(_loc4_.length));
    }

    private static _SafeStr_14008(param1: ByteArray): void {
        let _loc2_: ByteArray = new ByteArray();
        param1.readBytes(_loc2_, 0, 16);
        _loc2_.position = 0;
        _SafeCls_6000._SafeStr_14005.push(_loc2_);
    }

    public static _SafeStr_14011(param1: number): string {
        if (!_SafeCls_6000._SafeStr_14006) {
            _SafeCls_6000._SafeStr_14007();
        }
        return stringOrNull(_SafeCls_6000._SafeStr_14004[param1 ^ _SafeCls_6000._SafeStr_14000]);
    }
}
