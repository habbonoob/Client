import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BigInteger } from '@/com/hurlant/math/BigInteger';
import type { IReduction } from '@/com/hurlant/math/IReduction';

export class NullReduction implements IReduction {
    static { registerClassName(this, 'com.hurlant.math::NullReduction'); }

    constructor() {
    }

    public revert(param1: BigInteger): BigInteger {
        return param1;
    }

    public mulTo(param1: BigInteger, param2: BigInteger, param3: BigInteger): void {
        param1.multiplyTo(param2, param3);
    }

    public sqrTo(param1: BigInteger, param2: BigInteger): void {
        param1.squareTo(param2);
    }

    public convert(param1: BigInteger): BigInteger {
        return param1;
    }

    public reduce(param1: BigInteger): void {
    }
}
