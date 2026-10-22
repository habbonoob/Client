import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class AnimationData {
    static { registerClassName(this, 'com.sulake.habbo.help.guidehelp::AnimationData'); }

    constructor(param1: IStaticBitmapWrapperWindow, param2: string, param3: number) {
        this.window = param1;
        this.asset = param2;
        this.frameCount = param3;
    }

    declare public window: IStaticBitmapWrapperWindow;

    declare public asset: string;

    declare public frameCount: number;
    static { (this.prototype as any).frameCount = 0; }
}
