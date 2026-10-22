import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VideoPlayerStateEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.video::VideoPlayerStateEnum'); }

    public static readonly _SafeStr_8265: number = -1;
    public static readonly _SafeStr_8118: number = 0;
    public static readonly PLAYING: number = 1;
    public static readonly PAUSED: number = 2;
    public static readonly BUFFERING: number = 3;
    public static readonly CUED: number = 5;

    constructor() {
    }
}
