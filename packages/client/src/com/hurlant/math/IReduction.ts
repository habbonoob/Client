import type { BigInteger } from '@/com/hurlant/math/BigInteger';

export interface IReduction {
    convert(param1: BigInteger): BigInteger;
    revert(param1: BigInteger): BigInteger;
    reduce(param1: BigInteger): void;
    mulTo(param1: BigInteger, param2: BigInteger, param3: BigInteger): void;
    sqrTo(param1: BigInteger, param2: BigInteger): void;
}
