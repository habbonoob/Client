import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PlayListEditorLoadableAssets {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::PlayListEditorLoadableAssets'); }

    public static readonly MY_MUSIC_TITLE_LOADABLE_ASSET: string = "title_mymusic";
    public static readonly PLAYLIST_TITLE_LOADABLE_ASSET: string = "title_playlist";
    public static readonly PREVIEW_BACKGROUND_LOADABLE_ASSET: string = "background_preview_playing";
    public static readonly GET_MORE_MUSIC_BACKGROUND_LOADABLE_ASSET: string = "background_get_more_music";
    public static readonly ADD_SONGS_BACKGROUND_LOADABLE_ASSET: string = "background_add_songs";
}
