import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFlexAsset } from '@/mx/core/IFlexAsset';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class ByteArrayAsset extends ByteArray implements IFlexAsset {
    static { registerClassName(this, 'mx.core::ByteArrayAsset'); }

    public static readonly VERSION: string = "4.1.0.16076";

    constructor() {
        super();
    }
}
