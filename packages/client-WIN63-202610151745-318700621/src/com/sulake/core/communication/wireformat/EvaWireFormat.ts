import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IEncryption } from '@/com/sulake/core/communication/encryption/IEncryption';
import type { IWireFormat } from '@/com/sulake/core/communication/wireformat/IWireFormat';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Byte } from '@/com/sulake/core/communication/util/Byte';
import { Long } from '@/com/sulake/core/communication/util/Long';
import { Short } from '@/com/sulake/core/communication/util/Short';
import { EvaMessageDataWrapper } from '@/com/sulake/core/communication/wireformat/EvaMessageDataWrapper';

export class EvaWireFormat implements IWireFormat {
    static { registerClassName(this, 'com.sulake.core.communication.wireformat::EvaWireFormat'); }

    private static readonly MAX_DATA: number = 262144;

    constructor() {
    }

    public dispose(): void {
    }

    public encode(param1: number, param2: any[]): ByteArray {
        let _loc10_: number = NaN;
        let _loc3_: boolean = false;
        let _loc8_: any = 0;
        let _loc9_: any = 0;
        let _loc5_: ByteArray = null;
        let _loc4_: ByteArray = new ByteArray();
        _loc4_.writeInt(0);
        _loc4_.writeShort(param1);
        for (const _loc6_ of param2 ?? []) {
            if (typeof _loc6_ === "string") {
                _loc4_.writeUTF(typeof _loc6_ === "string" ? _loc6_ : null);
            } else if (typeof _loc6_ === "number" && (_loc6_ | 0) === _loc6_) {
                _loc4_.writeInt(typeof _loc6_ === "number" && (_loc6_ | 0) === _loc6_ ? _loc6_ : null);
            } else if (typeof _loc6_ === "boolean") {
                _loc4_.writeBoolean(typeof _loc6_ === "boolean" ? _loc6_ : null);
            } else if (_loc6_ instanceof Short) {
                _loc4_.writeShort((_loc6_ instanceof Short ? _loc6_ : null).value);
            } else if (_loc6_ instanceof Byte) {
                _loc4_.writeByte((_loc6_ instanceof Byte ? _loc6_ : null).value);
            } else if (_loc6_ instanceof Long) {
                _loc10_ = (_loc6_ instanceof Long ? _loc6_ : null).value;
                _loc3_ = _loc10_ < 0;
                if (_loc3_) {
                    _loc10_ = -_loc10_;
                }
                _loc8_ = _loc10_ / 4294967296 >>> 0;
                _loc9_ = (_loc10_ & 0xFFFFFFFF) >>> 0;
                if (_loc3_) {
                    _loc8_ = ~_loc8_ >>> 0;
                    _loc9_ = ~(_loc9_ - 1) >>> 0;
                    if (_loc9_ == 0) {
                        _loc8_ += 1;
                    }
                }
                _loc4_.writeUnsignedInt(_loc8_ >>> 0);
                _loc4_.writeUnsignedInt(_loc9_ >>> 0);
            } else if (_loc6_ instanceof ByteArray) {
                _loc5_ = _loc6_ instanceof ByteArray ? _loc6_ : null;
                _loc4_.writeInt(_loc5_.length | 0);
                _loc4_.writeBytes(_loc5_);
            }
        }
        let _loc7_: number = _loc4_.length;
        _loc4_.position = 0;
        _loc4_.writeInt(_loc7_ - 4);
        _loc4_.position = _loc7_;
        return _loc4_;
    }

    public splitMessages(param1: ByteArray, param2: IConnection): any[] {
        let _loc4_: any = 0;
        let _loc3_: any = 0;
        let _loc7_: IEncryption = null;
        let _loc10_: ByteArray = null;
        let _loc9_: ByteArray = null;
        let _loc5_: ByteArray = null;
        let _loc8_: number = 0;
        let _loc6_: any[] = [];
        while (param1.bytesAvailable >= 6) {
            _loc4_ = param1.position;
            _loc3_ = 0;
            _loc7_ = param2.getServerToClientEncryption();
            if (_loc7_ != null) {
                _loc7_.mark();
                _loc10_ = new ByteArray();
                param1.readBytes(_loc10_, 0, 4);
                _loc7_.decipher(_loc10_);
                _loc3_ = _loc10_.readInt() >>> 0;
            } else {
                _loc3_ = param1.readInt() >>> 0;
            }
            if (_loc3_ < 2 || _loc3_ > 262144) {
                throw new Error("Invalid message length " + _loc3_);
            }
            if (param1.bytesAvailable < _loc3_) {
                param1.position = _loc4_ >>> 0;
                if (_loc7_ != null) {
                    _loc7_.reset();
                }
                return _loc6_;
            }
            _loc9_ = new ByteArray();
            if (_loc7_ != null) {
                _loc5_ = new ByteArray();
                _loc5_.writeBytes(param1, param1.position, _loc3_ >>> 0);
                _loc7_.decipher(_loc5_);
                _loc9_.writeBytes(_loc5_, 0, _loc3_ >>> 0);
                _loc9_.position = 0;
            } else {
                _loc9_.writeBytes(param1, param1.position, _loc3_ >>> 0);
                _loc9_.position = 0;
            }
            param1.position += _loc3_;
            _loc8_ = _loc9_.readShort();
            _loc6_.push(new EvaMessageDataWrapper(_loc8_, _loc9_));
        }
        return _loc6_;
    }
}
