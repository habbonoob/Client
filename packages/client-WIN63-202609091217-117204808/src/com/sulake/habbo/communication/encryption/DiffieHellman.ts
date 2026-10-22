import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IKeyExchange } from '@/com/sulake/core/communication/handshake/IKeyExchange';
import { BigInteger } from '@/com/hurlant/math/BarrettReduction.group';

export class DiffieHellman implements IKeyExchange {
    static { registerClassName(this, 'com.sulake.habbo.communication.encryption::DiffieHellman'); }

    declare private _privateKey: BigInteger;

    declare private _publicKey: BigInteger;

    declare private _serverPublicKey: BigInteger;

    declare private _sharedKey: BigInteger;

    declare private _prime: BigInteger;

    declare private _SafeStr_6858: BigInteger;

    private _minimumPublicKey: BigInteger = BigInteger.nbv(2);
    private _SafeStr_6612: BigInteger = BigInteger.nbv(2);

    constructor(param1: BigInteger, param2: BigInteger) {
        this._prime = param1;
        this._SafeStr_6858 = param2;
    }

    public init(param1: string, param2: number = 16): boolean {
        this._privateKey = new BigInteger();
        this._privateKey.fromRadix(param1, param2 | 0);
        this._publicKey = this._SafeStr_6858.modPow(this._privateKey, this._prime);
        return true;
    }

    public generateSharedKey(param1: string, param2: number = 16): string {
        this._serverPublicKey = new BigInteger();
        this._serverPublicKey.fromRadix(param1, param2 | 0);
        this._sharedKey = this._serverPublicKey.modPow(this._privateKey, this._prime);
        return this.getSharedKey(param2);
    }

    public getPublicKey(param1: number = 16): string {
        return this._publicKey.toRadix(param1);
    }

    public getSharedKey(param1: number = 16): string {
        return this._sharedKey.toRadix(param1);
    }

    public isValidServerPublicKey(): boolean {
        return this._serverPublicKey.compareTo(this._minimumPublicKey) >= 0;
    }

    public isValidSharedKey(): boolean {
        return this._sharedKey.compareTo(this._SafeStr_6612) >= 0;
    }
}
