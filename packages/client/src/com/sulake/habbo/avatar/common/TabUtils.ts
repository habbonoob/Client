import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class TabUtils {
    static { registerClassName(this, 'com.sulake.habbo.avatar.common::TabUtils'); }

    public static setElementImage(param1: IStaticBitmapWrapperWindow, param2: boolean): void {
        let _loc3_: string = param1.assetUri.replace("_off", "");
        param1.assetUri = param2 ? _loc3_ : _loc3_ + "_off";
    }

    constructor() {
    }
}
