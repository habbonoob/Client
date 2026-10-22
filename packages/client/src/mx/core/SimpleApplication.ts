import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MovieClip } from '@habbo-pixi/runtime/display/MovieClip';

export class SimpleApplication extends MovieClip {
    static { registerClassName(this, 'mx.core::SimpleApplication'); }

    public static readonly VERSION: string = "4.6.0.23201";

    constructor() {
        super();
    }
}
