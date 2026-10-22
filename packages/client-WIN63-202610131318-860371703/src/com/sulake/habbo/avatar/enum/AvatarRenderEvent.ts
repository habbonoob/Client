import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarRenderEvent {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarRenderEvent'); }

    public static readonly AVATAR_RENDER_READY: string = "AVATAR_RENDER_READY";

    constructor() {
    }
}
