import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboMusicPrioritiesEnum {
    static { registerClassName(this, 'com.sulake.habbo.sound::HabboMusicPrioritiesEnum'); }

    public static readonly PRIORITY_ROOM_PLAYLIST: number = 0;
    public static readonly PRIORITY_USER_PLAYLIST: number = 1;
    public static readonly PRIORITY_SONG_PLAY: number = 2;
    public static readonly PRIORITY_PURCHASE_PREVIEW: number = 3;
    public static readonly PRIORITY_COUNT: number = 4;

    constructor() {
    }
}
