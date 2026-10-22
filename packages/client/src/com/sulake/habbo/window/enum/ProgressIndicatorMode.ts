import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ProgressIndicatorMode {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::ProgressIndicatorMode'); }

    public static readonly _SafeStr_8765: string = "position";
    public static readonly PROGRESS: string = "progress";
    public static readonly ALL: any[] = ["position", "progress"];

    constructor() {
    }
}
