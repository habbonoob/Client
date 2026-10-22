import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPRNG } from '@/com/hurlant/crypto/prng/IPRNG';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { System } from '@habbo-pixi/runtime/system/System';
import { Font } from '@habbo-pixi/runtime/text/Font';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { ARC4 } from '@/com/hurlant/crypto/prng/ARC4';
import { isIPRNG } from '@/com/hurlant/crypto/prng/IPRNG';
import { Memory } from '@/com/hurlant/util/Memory';

export class Random {
    static { registerClassName(this, 'com.hurlant.crypto.prng::Random'); }

    declare private state: IPRNG;

    private ready: boolean = false;

    declare private _SafeStr_2381: ByteArray;

    declare private _SafeStr_4746: number;
    static { (this.prototype as any)._SafeStr_4746 = 0; }

    declare private pptr: number;
    static { (this.prototype as any).pptr = 0; }

    private seeded: boolean = false;

    constructor(param1: any = null) {
        let _loc2_: any = 0;
        if (param1 == null) {
            param1 = ARC4;
        }
        this.state = asGuarded(new param1(), isIPRNG);
        this._SafeStr_4746 = this.state.getPoolSize() | 0;
        this._SafeStr_2381 = new ByteArray();
        this.pptr = 0;
        while (this.pptr < this._SafeStr_4746) {
            _loc2_ = 65536 * Math.random() >>> 0;
            this._SafeStr_2381.setByteAt(this.pptr++, _loc2_ >>> 8);
            this._SafeStr_2381.setByteAt(this.pptr++, _loc2_ & 0xFF);
        }
        this.pptr = 0;
        this.seed();
    }

    public seed(param1: number = 0): void {
        if (param1 == 0) {
            param1 = new Date().getTime() | 0;
        }
        let _loc2_: number = this.pptr++;
        let _loc3_: number = this._SafeStr_2381.byteAt(_loc2_) ^ param1 & 0xFF;
        this._SafeStr_2381.setByteAt(_loc2_, _loc3_);
        this._SafeStr_2381.setByteAt(this.pptr++, this._SafeStr_2381.byteAt(this.pptr++) ^ param1 >> 8 & 0xFF);
        this._SafeStr_2381.setByteAt(this.pptr++, this._SafeStr_2381.byteAt(this.pptr++) ^ param1 >> 16 & 0xFF);
        this._SafeStr_2381.setByteAt(this.pptr++, this._SafeStr_2381.byteAt(this.pptr++) ^ param1 >> 24 & 0xFF);
        this.pptr %= this._SafeStr_4746;
        this.seeded = true;
    }

    public autoSeed(): void {
        let _loc2_: ByteArray = new ByteArray();
        _loc2_.writeUnsignedInt(System.totalMemory);
        _loc2_.writeUTF(Capabilities.serverString);
        _loc2_.writeUnsignedInt(getTimer() >>> 0);
        _loc2_.writeUnsignedInt(new Date().getTime() >>> 0);
        let _loc1_: any[] = Font.enumerateFonts(true);
        for (const _loc3_ of _loc1_ ?? []) {
            _loc2_.writeUTF(stringOrNull(_loc3_.fontName));
            _loc2_.writeUTF(stringOrNull(_loc3_.fontStyle));
            _loc2_.writeUTF(stringOrNull(_loc3_.fontType));
        }
        _loc2_.position = 0;
        while (_loc2_.bytesAvailable >= 4) {
            this.seed(_loc2_.readUnsignedInt() | 0);
        }
    }

    public nextBytes(param1: ByteArray, param2: number): void {
        while (param2--) {
            param1.writeByte(this.nextByte());
        }
    }

    public nextByte(): number {
        if (!this.ready) {
            if (!this.seeded) {
                this.autoSeed();
            }
            this.state.init(this._SafeStr_2381);
            this._SafeStr_2381.length = 0;
            this.pptr = 0;
            this.ready = true;
        }
        return this.state.next() | 0;
    }

    public dispose(): void {
        let _loc1_: any = 0;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_2381.length) {
            this._SafeStr_2381.setByteAt(_loc1_, Math.random() * 256);
            _loc1_++;
        }
        this._SafeStr_2381.length = 0;
        this._SafeStr_2381 = null;
        this.state.dispose();
        this.state = null;
        this._SafeStr_4746 = 0;
        this.pptr = 0;
        Memory.gc();
    }

    public toString(): string {
        return "random-" + this.state.toString();
    }
}
