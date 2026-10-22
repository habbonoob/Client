import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Hex } from '@/com/hurlant/util/Hex';

export class EvaMessageDataWrapper implements IMessageDataWrapper {
    static { registerClassName(this, 'com.sulake.core.communication.wireformat::EvaMessageDataWrapper'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _data: ByteArray;

    constructor(param1: number, param2: ByteArray) {
        this._id = param1;
        this._data = param2;
    }

    public getID(): number {
        return this._id;
    }

    public readString(): string {
        return this._data.readUTF();
    }

    public readInteger(): number {
        return this._data.readInt();
    }

    public readLong(): number {
        let _loc2_: number = this._data.readUnsignedInt();
        let _loc3_: number = this._data.readUnsignedInt();
        let _loc1_: boolean = !!(_loc2_ & 0x80000000);
        if (_loc1_) {
            _loc2_ = (~_loc2_ & 0x7FFFFFFF) >>> 0;
            _loc3_ = ~_loc3_ + 1 >>> 0;
            if (_loc3_ == 0) {
                _loc2_ += 1;
            }
        }
        let _loc4_: number = _loc2_ * 4294967296 + _loc3_;
        if (_loc1_) {
            _loc4_ = -_loc4_;
        }
        return _loc4_;
    }

    public readBoolean(): boolean {
        return this._data.readBoolean();
    }

    public readShort(): number {
        return this._data.readShort();
    }

    public readByte(): number {
        return this._data.readByte();
    }

    public readFloat(): number {
        return this._data.readFloat();
    }

    public readDouble(): number {
        return this._data.readDouble();
    }

    public get bytesAvailable(): number {
        return this._data.bytesAvailable;
    }

    public toString(): string {
        return "id=" + this._id + ", pos=" + this._data.position + ", data=" + Hex.fromArray(this._data, true);
    }
}
