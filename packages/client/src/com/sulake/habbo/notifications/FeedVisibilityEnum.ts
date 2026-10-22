import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FeedVisibilityEnum {
    static { registerClassName(this, 'com.sulake.habbo.notifications::FeedVisibilityEnum'); }

    public static readonly VIEW_STATE_HIDDEN: number = 0;
    public static readonly VIEW_STATE_MINIMIZED: number = 1;
    public static readonly VIEW_STATE_MAXIMIZED: number = 2;

    constructor() {
    }
}
