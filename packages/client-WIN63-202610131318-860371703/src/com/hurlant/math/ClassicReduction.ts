import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BigInteger } from '@/com/hurlant/math/BigInteger';
import type { IReduction } from '@/com/hurlant/math/IReduction';

export class ClassicReduction implements IReduction {
    static { registerClassName(this, 'com.hurlant.math::ClassicReduction'); }

    declare private m: BigInteger;

    constructor(param1: BigInteger) {
        this.m = param1;
    }

    public convert(param1: BigInteger): BigInteger {
        if (param1.s < 0 || param1.compareTo(this.m) >= 0) {
            return param1.mod(this.m);
        }
        return param1;
    }

    public revert(param1: BigInteger): BigInteger {
        return param1;
    }

    public reduce(param1: BigInteger): void {
        param1.divRemTo(this.m, null, param1);
    }

    public mulTo(param1: BigInteger, param2: BigInteger, param3: BigInteger): void {
        param1.multiplyTo(param2, param3);
        this.reduce(param3);
    }

    public sqrTo(param1: BigInteger, param2: BigInteger): void {
        param1.squareTo(param2);
        this.reduce(param2);
    }
}
