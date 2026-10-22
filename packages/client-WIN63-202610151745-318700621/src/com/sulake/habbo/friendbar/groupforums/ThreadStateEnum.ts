import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ThreadStateEnum {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::ThreadStateEnum'); }

    public static readonly DEFAULT_STATE: number = 0;
    public static readonly RESTORED_BY_ADMIN: number = 1;
    public static readonly HIDDEN_BY_ADMIN: number = 10;
    public static readonly PERMANENTLY_HIDDEN_BY_MOD: number = 20;

    constructor() {
    }
}
