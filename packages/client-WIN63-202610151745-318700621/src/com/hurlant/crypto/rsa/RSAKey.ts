import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { System } from '@habbo-pixi/runtime/system/System';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Random } from '@/com/hurlant/crypto/prng/Random';
import { TLSError } from '@/com/hurlant/crypto/tls/TLSError';
import { BigInteger } from '@/com/hurlant/math/BarrettReduction.group';

export class RSAKey {
    static { registerClassName(this, 'com.hurlant.crypto.rsa::RSAKey'); }

    declare public e: number;
    static { (this.prototype as any).e = 0; }

    declare public n: BigInteger;

    declare public d: BigInteger;

    declare public p: BigInteger;

    declare public q: BigInteger;

    declare public dmp1: BigInteger;

    declare public dmq1: BigInteger;

    declare public _SafeStr_5464: BigInteger;

    declare protected canDecrypt: boolean;
    static { (this.prototype as any).canDecrypt = false; }

    declare protected canEncrypt: boolean;
    static { (this.prototype as any).canEncrypt = false; }

    constructor(param1: BigInteger, param2: number, param3: BigInteger = null, param4: BigInteger = null, param5: BigInteger = null, param6: BigInteger = null, param7: BigInteger = null, param8: BigInteger = null) {
        this.n = param1;
        this.e = param2;
        this.d = param3;
        this.p = param4;
        this.q = param5;
        this.dmp1 = param6;
        this.dmq1 = param7;
        this._SafeStr_5464 = param8;
        this.canEncrypt = this.n != null && this.e != 0;
        this.canDecrypt = this.canEncrypt && this.d != null;
    }

    public static parsePublicKey(param1: string, param2: string): RSAKey {
        return new RSAKey(new BigInteger(param1, 16, true), parseInt(param2, 16) | 0);
    }

    public static parsePrivateKey(param1: string, param2: string, param3: string, param4: string = null, param5: string = null, param6: string = null, param7: string = null, param8: string = null): RSAKey {
        if (param4 == null) {
            return new RSAKey(new BigInteger(param1, 16, true), parseInt(param2, 16) | 0, new BigInteger(param3, 16, true));
        }
        return new RSAKey(new BigInteger(param1, 16, true), parseInt(param2, 16) | 0, new BigInteger(param3, 16, true), new BigInteger(param4, 16, true), new BigInteger(param5, 16, true), new BigInteger(param6, 16, true), new BigInteger(param7, 16, true), new BigInteger(param8, 16, true));
    }

    public static generate(param1: number, param2: string): RSAKey {
        let _loc8_: BigInteger = null;
        let _loc6_: BigInteger = null;
        let _loc4_: BigInteger = null;
        let _loc5_: BigInteger = null;
        let _loc9_: Random = new Random();
        let _loc7_: number = (param1 >> 1) >>> 0;
        let _loc10_: RSAKey = new RSAKey(null, 0, null);
        _loc10_.e = parseInt(param2, 16) | 0;
        let _loc3_: BigInteger = new BigInteger(param2, 16, true);
        do {
            do {
                _loc10_.p = RSAKey.bigRandom(param1 - _loc7_, _loc9_);
            } while (!(_loc10_.p.subtract(BigInteger._SafeStr_2392).gcd(_loc3_).compareTo(BigInteger._SafeStr_2392) == 0 && _loc10_.p.isProbablePrime(10)));
            do {
                _loc10_.q = RSAKey.bigRandom(_loc7_ | 0, _loc9_);
            } while (!(_loc10_.q.subtract(BigInteger._SafeStr_2392).gcd(_loc3_).compareTo(BigInteger._SafeStr_2392) == 0 && _loc10_.q.isProbablePrime(10)));
            if (_loc10_.p.compareTo(_loc10_.q) <= 0) {
                _loc8_ = _loc10_.p;
                _loc10_.p = _loc10_.q;
                _loc10_.q = _loc8_;
            }
            _loc6_ = _loc10_.p.subtract(BigInteger._SafeStr_2392);
            _loc4_ = _loc10_.q.subtract(BigInteger._SafeStr_2392);
        } while (_loc5_ = _loc6_.multiply(_loc4_), _loc5_.gcd(_loc3_).compareTo(BigInteger._SafeStr_2392) != 0);
        _loc10_.n = _loc10_.p.multiply(_loc10_.q);
        _loc10_.d = _loc3_.modInverse(_loc5_);
        _loc10_.dmp1 = _loc10_.d.mod(_loc6_);
        _loc10_.dmq1 = _loc10_.d.mod(_loc4_);
        _loc10_._SafeStr_5464 = _loc10_.q.modInverse(_loc10_.p);
        _loc10_.canEncrypt = _loc10_.n != null && _loc10_.e != 0;
        _loc10_.canDecrypt = _loc10_.canEncrypt && _loc10_.d != null;
        return _loc10_;
    }

    protected static bigRandom(param1: number, param2: Random): BigInteger {
        if (param1 < 2) {
            return BigInteger.nbv(1);
        }
        let _loc4_: ByteArray = new ByteArray();
        param2.nextBytes(_loc4_, param1 >> 3);
        _loc4_.position = 0;
        let _loc3_: BigInteger = new BigInteger(_loc4_, 0, true);
        _loc3_.primify(param1, 1);
        return _loc3_;
    }

    public getBlockSize(): number {
        return (this.n.bitLength() + 7) / 8 >>> 0;
    }

    public dispose(): void {
        this.e = 0;
        this.n.dispose();
        this.n = null;
        System.pauseForGCIfCollectionImminent();
    }

    public encrypt(param1: ByteArray, param2: ByteArray, param3: number, param4: (...args: any[]) => any = null): void {
        this._encrypt(this.doPublic, param1, param2, param3, param4, 2);
    }

    public decrypt(param1: ByteArray, param2: ByteArray, param3: number, param4: (...args: any[]) => any = null): void {
        this._decrypt(this.doPrivate2, param1, param2, param3, param4, 2);
    }

    public sign(param1: ByteArray, param2: ByteArray, param3: number, param4: (...args: any[]) => any = null): void {
        this._encrypt(this.doPrivate2, param1, param2, param3, param4, 1);
    }

    public verify(param1: ByteArray, param2: ByteArray, param3: number, param4: (...args: any[]) => any = null): void {
        this._decrypt(this.doPublic, param1, param2, param3, param4, 1);
    }

    private _encrypt(param1: (...args: any[]) => any, param2: ByteArray, param3: ByteArray, param4: number, param5: (...args: any[]) => any, param6: number): void {
        let _loc11_: BigInteger = null;
        let _loc8_: BigInteger = null;
        let _loc7_: any = 0;
        if (param5 == null) {
            param5 = this.pkcs1pad;
        }
        if (param2.position >= param2.length) {
            param2.position = 0;
        }
        let _loc9_: number = this.getBlockSize();
        let _loc10_: number = param2.position + param4;
        while (param2.position < _loc10_) {
            _loc11_ = new BigInteger(param5(param2, _loc10_, _loc9_, param6), _loc9_ | 0, true);
            _loc8_ = param1(_loc11_);
            _loc7_ = _loc9_ - Math.ceil(_loc8_.bitLength() / 8) >>> 0;
            while (_loc7_ > 0) {
                param3.writeByte(0);
                _loc7_--;
            }
            _loc8_.toArray(param3);
        }
    }

    private _decrypt(param1: (...args: any[]) => any, param2: ByteArray, param3: ByteArray, param4: number, param5: (...args: any[]) => any, param6: number): void {
        let _loc11_: BigInteger = null;
        let _loc8_: BigInteger = null;
        let _loc7_: ByteArray = null;
        if (param5 == null) {
            param5 = this.pkcs1unpad;
        }
        if (param2.position >= param2.length) {
            param2.position = 0;
        }
        let _loc9_: number = this.getBlockSize();
        let _loc10_: number = param2.position + param4;
        while (param2.position < _loc10_) {
            _loc11_ = new BigInteger(param2, _loc9_ | 0, true);
            _loc8_ = param1(_loc11_);
            _loc7_ = param5(_loc8_, _loc9_, param6);
            if (_loc7_ == null) {
                throw new TLSError("Decrypt error - padding function returned null!", 50);
            }
            param3.writeBytes(_loc7_);
        }
    }

    private pkcs1pad = (param1: ByteArray, param2: number, param3: number, param4: number = 2): ByteArray => {
        let _loc8_: Random = null;
        let _loc6_: number = 0;
        let _loc9_: ByteArray = new ByteArray();
        let _loc5_: number = param1.position;
        param2 = Math.min(param2, param1.length, _loc5_ + param3 - 11) | 0;
        param1.position = param2 >>> 0;
        let _loc7_: number = param2 - 1;
        while (_loc7_ >= _loc5_ && param3 > 11) {
            _loc9_.setByteAt(--param3, param1.byteAt(_loc7_--));
        }
        _loc9_.setByteAt(--param3, 0);
        if (param4 == 2) {
            _loc8_ = new Random();
            _loc6_ = 0;
            while (param3 > 2) {
                while (true) {
                    _loc6_ = _loc8_.nextByte();
                    if (_loc6_ != 0) {
                        break;
                    }
                }
                _loc9_.setByteAt(--param3, _loc6_);
            }
        } else {
            while (param3 > 2) {
                _loc9_.setByteAt(--param3, 255);
            }
        }
        _loc9_.setByteAt(--param3, param4);
        _loc9_.setByteAt(--param3, 0);
        return _loc9_;
    };

    private pkcs1unpad = (param1: BigInteger, param2: number, param3: number = 2): ByteArray => {
        let _loc6_: ByteArray = new ByteArray();
        let _loc4_: ByteArray = new ByteArray();
        param1.toArray(_loc4_);
        _loc4_.position = 0;
        let _loc5_: number = 0;
        while (_loc5_ < _loc4_.length && _loc4_.byteAt(_loc5_) == 0) {
            _loc5_++;
        }
        if (_loc4_.length - _loc5_ != param2 - 1 || _loc4_.byteAt(_loc5_) != param3) {
            return null;
        }
        _loc5_++;
        while (_loc4_.byteAt(_loc5_) != 0) {
            if (++_loc5_ >= _loc4_.length) {
                return null;
            }
        }
        while (++_loc5_ < _loc4_.length) {
            _loc6_.writeByte(_loc4_.byteAt(_loc5_) | 0);
        }
        _loc6_.position = 0;
        return _loc6_;
    };

    public rawpad(param1: ByteArray, param2: number, param3: number, param4: number = 0): ByteArray {
        return param1;
    }

    public rawunpad(param1: BigInteger, param2: number, param3: number = 0): ByteArray {
        return param1.toByteArray();
    }

    public toString(): string {
        return "rsa";
    }

    public dump(): string {
        let _loc1_: string = "N=" + this.n.toString(16) + "\n" + "E=" + this.e.toString(16) + "\n";
        if (this.canDecrypt) {
            _loc1_ += "D=" + this.d.toString(16) + "\n";
            if (this.p != null && this.q != null) {
                _loc1_ += "P=" + this.p.toString(16) + "\n";
                _loc1_ += "Q=" + this.q.toString(16) + "\n";
                _loc1_ += "DMP1=" + this.dmp1.toString(16) + "\n";
                _loc1_ += "DMQ1=" + this.dmq1.toString(16) + "\n";
                _loc1_ += "IQMP=" + this._SafeStr_5464.toString(16) + "\n";
            }
        }
        return _loc1_;
    }

    protected doPublic = (param1: BigInteger): BigInteger => {
        return param1.modPowInt(this.e, this.n);
    };

    protected doPrivate2 = (param1: BigInteger): BigInteger => {
        if (this.p == null && this.q == null) {
            return param1.modPow(this.d, this.n);
        }
        let _loc3_: BigInteger = param1.mod(this.p).modPow(this.dmp1, this.p);
        let _loc4_: BigInteger = param1.mod(this.q).modPow(this.dmq1, this.q);
        while (_loc3_.compareTo(_loc4_) < 0) {
            _loc3_ = _loc3_.add(this.p);
        }
        return _loc3_.subtract(_loc4_).multiply(this._SafeStr_5464).mod(this.p).multiply(this.q).add(_loc4_);
    };

    protected doPrivate(param1: BigInteger): BigInteger {
        if (this.p == null || this.q == null) {
            return param1.modPow(this.d, this.n);
        }
        let _loc2_: BigInteger = param1.mod(this.p).modPow(this.dmp1, this.p);
        let _loc3_: BigInteger = param1.mod(this.q).modPow(this.dmq1, this.q);
        while (_loc2_.compareTo(_loc3_) < 0) {
            _loc2_ = _loc2_.add(this.p);
        }
        return _loc2_.subtract(_loc3_).multiply(this._SafeStr_5464).mod(this.p).multiply(this.q).add(_loc3_);
    }
}
