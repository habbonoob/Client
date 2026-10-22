import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class PNGDecoder {
    static { registerClassName(this, 'com.sulake.core.utils.images::PNGDecoder'); }

    private readonly _SafeStr_8416: number = 1229472850;
    private readonly PLTE: number = 1347179589;
    private readonly IDAT: number = 1229209940;
    private readonly IEND: number = 1229278788;

    constructor() {
    }

    private imgWidth: number = 0;
    private _SafeStr_4097: number = 0;
    private bitDepth: number = 0;
    private _SafeStr_7391: number = 0;
    private compressionMethod: number = 0;
    private filterMethod: number = 0;
    private interlaceMethod: number = 0;

    declare private _SafeStr_3664: any[];

    declare private input: ByteArray;

    declare private output: ByteArray;

    public decode(param1: ByteArray): BitmapData {
        let _loc3_: number = 0;
        let _loc2_: Matrix = null;
        this._SafeStr_3664 = [];
        this.input = new ByteArray();
        this.output = new ByteArray();
        this.input = param1;
        this.input.position = 0;
        if (!this.readSignature()) {
            throw new Error("wrong signature");
        }
        this.getChunks();
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_3664.length) {
            switch (this._SafeStr_3664[_loc3_].type) {
                case 1229472850:
                    this.processIHDR(_loc3_ >>> 0);
                    break;
                case 1229209940:
                    this.processIDAT(_loc3_ >>> 0);
            }
            _loc3_++;
        }
        let _loc5_: BitmapData = new BitmapData(this.imgWidth | 0, this._SafeStr_4097 | 0);
        let _loc4_: BitmapData = new BitmapData(this.imgWidth | 0, this._SafeStr_4097 | 0, true, 16777215);
        if (this.output.length > 0 && this.imgWidth * this._SafeStr_4097 * 4 == this.output.length) {
            this.output.position = 0;
            _loc5_.setPixels(new Rectangle(0, 0, this.imgWidth, this._SafeStr_4097), this.output);
            _loc2_ = new Matrix();
            _loc2_.scale(-1, -1);
            _loc2_.translate(this.imgWidth, this._SafeStr_4097);
            _loc4_.draw(_loc5_, _loc2_);
        }
        return _loc4_;
    }

    private processIHDR(param1: number): void {
        this.input.position = this._SafeStr_3664[param1].position >>> 0;
        this.imgWidth = this.input.readUnsignedInt();
        this._SafeStr_4097 = this.input.readUnsignedInt();
        this.bitDepth = this.input.readUnsignedByte();
        this._SafeStr_7391 = this.input.readUnsignedByte();
        this.compressionMethod = this.input.readUnsignedByte();
        this.filterMethod = this.input.readUnsignedByte();
        this.interlaceMethod = this.input.readUnsignedByte();
    }

    private processIDAT(param1: number): void {
        let _loc7_: number = 0;
        let _loc2_: any = 0;
        let _loc3_: any = 0;
        let _loc6_: any = 0;
        let _loc4_: any = 0;
        let _loc5_: ByteArray = new ByteArray();
        let _loc8_: number = this.imgWidth * 4 >>> 0;
        _loc5_.writeBytes(this.input, this._SafeStr_3664[param1].position >>> 0, this._SafeStr_3664[param1].length >>> 0);
        _loc5_.uncompress();
        _loc7_ = _loc5_.length - 1;
        while (_loc7_ > 0) {
            if (_loc7_ % (_loc8_ + 1) != 0) {
                _loc2_ = _loc5_.byteAt(_loc7_);
                _loc3_ = _loc5_.byteAt(_loc7_ - 1);
                _loc6_ = _loc5_.byteAt(_loc7_ - 2);
                _loc4_ = _loc5_.byteAt(_loc7_ - 3);
                this.output.writeByte(_loc2_ | 0);
                this.output.writeByte(_loc4_ | 0);
                this.output.writeByte(_loc6_ | 0);
                this.output.writeByte(_loc3_ | 0);
                _loc7_ -= 3;
            }
            _loc7_--;
        }
    }

    private getChunks(): void {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = this.input.length | 0;
        while (this.input.position < _loc4_) {
            _loc1_ = this.input.readUnsignedInt();
            _loc3_ = this.input.readUnsignedInt();
            _loc2_ = this.input.position;
            this.input.position += _loc1_;
            this.input.position += 4;
            this._SafeStr_3664.push({ "position": _loc2_, "length": _loc1_, "type": _loc3_ });
        }
    }

    private readSignature(): boolean {
        return this.input.readUnsignedInt() == 2303741511 && this.input.readUnsignedInt() == 218765834;
    }

    private fixType(param1: number): string {
        let _loc2_: string = "";
        let _loc3_: string = param1.toString(16);
        while (_loc3_.length < 8) {
            _loc3_ = "0" + _loc3_;
        }
        _loc2_ += String.fromCharCode(parseInt(_loc3_.substr(0, 2), 16));
        _loc2_ += String.fromCharCode(parseInt(_loc3_.substr(2, 2), 16));
        _loc2_ += String.fromCharCode(parseInt(_loc3_.substr(4, 2), 16));
        return _loc2_ + String.fromCharCode(parseInt(_loc3_.substr(6, 2), 16));
    }
}
