import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarEditorEvent {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarEditorEvent'); }

    public static readonly AVATAR_EDITOR_READY: string = "AVATAR_EDITOR_READY";

    constructor() {
    }
}
