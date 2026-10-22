import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RenderMode {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::RenderMode'); }

    public static readonly TOOL: string = "tool";
    public static readonly COMPONENT: string = "component";
    public static readonly _SafeStr_8216: string = "online_tool";
    public static readonly LOCAL: string = "local_only";

    constructor() {
    }
}
