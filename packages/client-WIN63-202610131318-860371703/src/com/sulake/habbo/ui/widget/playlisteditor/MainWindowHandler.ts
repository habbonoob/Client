import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboMusicController } from '@/com/sulake/habbo/sound/IHabboMusicController';
import type { IPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { RoomWidgetPlayListEditorNowPlayingEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPlayListEditorNowPlayingEvent';
import type { PlayListEditorWidget } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MusicInventoryGridView } from '@/com/sulake/habbo/ui/widget/playlisteditor/MusicInventoryGridView';
import { MusicInventoryStatusView } from '@/com/sulake/habbo/ui/widget/playlisteditor/MusicInventoryStatusView';
import { PlayListEditorItemListView } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorItemListView';
import { PlayListStatusView } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListStatusView';

export class MainWindowHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::MainWindowHandler'); }

    private static readonly SHOW_BUY_MORE_MUSIC_DISK_COUNT: number = 6;
    private static readonly MY_MUSIC_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT: number = 9;
    private static readonly PLAYLIST_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT: number = 5;

    declare private _widget: PlayListEditorWidget;

    declare private _musicController: IHabboMusicController;

    declare private _SafeStr_2133: IWindowContainer;

    declare private _SafeStr_4001: IBorderWindow;

    declare private _SafeStr_4184: IBorderWindow;

    declare private _musicInventoryView: MusicInventoryGridView;

    declare private _playListEditorView: PlayListEditorItemListView;

    declare private _SafeStr_2515: MusicInventoryStatusView;

    declare private _SafeStr_2666: PlayListStatusView;

    declare private _SafeStr_5828: IScrollbarWindow;

    declare private _SafeStr_5643: IScrollbarWindow;

    constructor(param1: PlayListEditorWidget, param2: IHabboMusicController) {
        let _loc3_: BitmapData = null;
        this._widget = param1;
        this._musicController = param2;
        let _loc5_: any[] = ["title_mymusic", "title_playlist", "background_preview_playing", "background_get_more_music", "background_add_songs"];
        for (const _loc4_ of _loc5_ ?? []) {
            _loc3_ = this._widget.getImageGalleryAssetBitmap(stringOrNull(_loc4_));
            if (_loc3_ != null) {
                _loc3_.dispose();
            } else {
                this._widget.retrieveWidgetImage(stringOrNull(_loc4_));
            }
        }
        this.createWindow();
        this._musicInventoryView = new MusicInventoryGridView(param1, this.getMusicInventoryGrid(), param2);
        this._playListEditorView = new PlayListEditorItemListView(param1, this.getPlayListEditorItemList());
        this._SafeStr_2515 = new MusicInventoryStatusView(param1, this.getMusicInventoryStatusContainer());
        this._SafeStr_2666 = new PlayListStatusView(param1, this.getPlayListStatusContainer());
        this.refreshLoadableAsset();
    }

    public get window(): IWindow {
        return this._SafeStr_2133;
    }

    public get musicInventoryView(): MusicInventoryGridView {
        return this._musicInventoryView;
    }

    public get playListEditorView(): PlayListEditorItemListView {
        return this._playListEditorView;
    }

    public destroy(): void {
        if (this._musicController) {
            this._musicController.stop(2);
            this._musicController = null;
        }
        if (this._musicInventoryView) {
            this._musicInventoryView.destroy();
            this._musicInventoryView = null;
        }
        if (this._playListEditorView) {
            this._playListEditorView.destroy();
            this._playListEditorView = null;
        }
        if (this._SafeStr_2666) {
            this._SafeStr_2666.destroy();
            this._SafeStr_2666 = null;
        }
        if (this._SafeStr_2515) {
            this._SafeStr_2515.destroy();
            this._SafeStr_2515 = null;
        }
        this._SafeStr_2133.destroy();
        this._SafeStr_2133 = null;
    }

    public hide(): void {
        this._SafeStr_2133.visible = false;
        if (this._widget != null) {
            this._widget.stopUserSong();
        }
    }

    public show(): void {
        this._musicController.requestUserSongDisks();
        let _loc1_: IPlayListController = this._musicController.getRoomItemPlaylist();
        if (_loc1_ != null) {
            _loc1_.requestPlayList();
            this.selectPlayListStatusViewByFurniPlayListState();
        }
        this._SafeStr_2133.visible = true;
    }

    public refreshLoadableAsset(param1: string = ""): void {
        if (param1 == "" || param1 == "title_mymusic") {
            this.assignWindowBitmapByAsset(this._SafeStr_4001, "music_inventory_splash_image", "title_mymusic");
        }
        if (param1 == "" || param1 == "title_playlist") {
            this.assignWindowBitmapByAsset(this._SafeStr_4184, "playlist_editor_splash_image", "title_playlist");
        }
        if (param1 == "" || param1 == "background_preview_playing") {
            this._SafeStr_2515.setPreviewPlayingBackgroundImage(this._widget.getImageGalleryAssetBitmap("background_preview_playing"));
        }
        if (param1 == "" || param1 == "background_get_more_music") {
            this._SafeStr_2515.setGetMoreMusicBackgroundImage(this._widget.getImageGalleryAssetBitmap("background_get_more_music"));
        }
        if (param1 == "" || param1 == "background_add_songs") {
            this._SafeStr_2666.addSongsBackgroundImage = this._widget.getImageGalleryAssetBitmap("background_add_songs");
        }
    }

    private assignWindowBitmapByAsset(param1: IWindowContainer, param2: string, param3: string): void {
        let _loc4_: BitmapData = null;
        let _loc5_: IBitmapWrapperWindow = asGuarded(param1.getChildByName(param2), isIBitmapWrapperWindow);
        if (_loc5_ != null) {
            _loc4_ = this._widget.getImageGalleryAssetBitmap(param3);
            if (_loc4_ != null) {
                _loc5_.bitmap = _loc4_;
                _loc5_.width = _loc4_.width;
                _loc5_.height = _loc4_.height;
            }
        }
    }

    private createWindow(): void {
        if (this._widget == null) {
            return;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_main_window"), XmlAsset);
        this._SafeStr_2133 = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (this._SafeStr_2133 == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._SafeStr_2133.position = new Point(80, 0);
        let _loc3_: IWindowContainer = asGuarded(this._SafeStr_2133.getChildByName("content_area"), isIWindowContainer);
        if (_loc3_ == null) {
            throw new Error("Window is missing \'content_area\' element");
        }
        this._SafeStr_4001 = asGuarded(_loc3_.getChildByName("my_music_border"), isIBorderWindow);
        this._SafeStr_4184 = asGuarded(_loc3_.getChildByName("playlist_border"), isIBorderWindow);
        if (this._SafeStr_4001 == null) {
            throw new Error("Window content area is missing \'my_music_border\' window element");
        }
        if (this._SafeStr_4184 == null) {
            throw new Error("Window content area is missing \'playlist_border\' window element");
        }
        this._SafeStr_5828 = asGuarded(this._SafeStr_4001.getChildByName("music_inventory_scrollbar"), isIScrollbarWindow);
        this._SafeStr_5643 = asGuarded(this._SafeStr_4184.getChildByName("playlist_scrollbar"), isIScrollbarWindow);
        if (this._SafeStr_5828 == null) {
            throw new Error("Window content area is missing \'music_inventory_scrollbar\' window element");
        }
        if (this._SafeStr_5643 == null) {
            throw new Error("Window content area is missing \'playlist_scrollbar\' window element");
        }
        let _loc1_: IWindow = this._SafeStr_2133.findChildByTag("close");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.onClose);
        }
    }

    private getMusicInventoryGrid(): IItemGridWindow {
        return asGuarded(this._SafeStr_4001.getChildByName("music_inventory_itemgrid"), isIItemGridWindow);
    }

    private getPlayListEditorItemList(): IItemListWindow {
        return asGuarded(this._SafeStr_4184.getChildByName("playlist_editor_itemlist"), isIItemListWindow);
    }

    private getMusicInventoryStatusContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_4001.getChildByName("preview_play_container"), isIWindowContainer);
    }

    private getPlayListStatusContainer(): IWindowContainer {
        return asGuarded(this._SafeStr_4184.getChildByName("now_playing_container"), isIWindowContainer);
    }

    private selectPlayListStatusViewByFurniPlayListState(): void {
        let _loc1_: IPlayListController = this._musicController.getRoomItemPlaylist();
        if (_loc1_ == null) {
            return;
        }
        if (_loc1_.isPlaying) {
            this._SafeStr_2666.selectView("PLSV_NOW_PLAYING");
        } else if (_loc1_.length > 0) {
            this._SafeStr_2666.selectView("PLSV_START_PLAYBACK");
        } else {
            this._SafeStr_2666.selectView("PLSV_ADD_SONGS");
        }
    }

    private selectMusicStatusViewByMusicState(): void {
        if (this.isPreviewPlaying()) {
            this._SafeStr_2515.show();
            this._SafeStr_2515.selectView("MISV_PREVIEW_PLAYING");
        } else if (this._musicController.getSongDiskInventorySize() <= 6) {
            this._SafeStr_2515.show();
            this._SafeStr_2515.selectView("MISV_BUY_MORE");
        } else {
            this._SafeStr_2515.hide();
        }
    }

    private updatePlaylistEditorView(): void {
        let _loc4_: number = 0;
        let _loc5_: ISongInfo = null;
        let _loc2_: IPlayListController = this._musicController.getRoomItemPlaylist();
        let _loc3_: any[] = [];
        let _loc1_: number = -1;
        if (_loc2_ != null) {
            _loc4_ = 0;
            while (_loc4_ < _loc2_.length) {
                _loc5_ = _loc2_.getEntry(_loc4_);
                if (_loc5_ != null) {
                    _loc3_.push(_loc5_);
                }
                _loc4_++;
            }
            _loc1_ = _loc2_.playPosition;
        }
        this._playListEditorView.refresh(_loc3_, _loc1_);
    }

    public onPlayListUpdated(): void {
        let _loc3_: ISongInfo = null;
        this.updatePlaylistEditorView();
        this.selectPlayListStatusViewByFurniPlayListState();
        let _loc1_: IPlayListController = this._musicController.getRoomItemPlaylist();
        if (_loc1_ == null) {
            return;
        }
        let _loc2_: number = _loc1_.nowPlayingSongId;
        if (_loc2_ != -1) {
            _loc3_ = this._musicController.getSongInfo(_loc2_);
            this._SafeStr_2666.nowPlayingTrackName = _loc3_.name;
            this._SafeStr_2666.nowPlayingAuthorName = _loc3_.creator;
        }
        this._SafeStr_5643.visible = _loc1_.length > 5;
    }

    public onSongDiskInventoryReceived(): void {
        this._musicInventoryView.refresh();
        this.selectMusicStatusViewByMusicState();
        this._SafeStr_5828.visible = this._musicInventoryView.itemCount > 9;
    }

    public onNowPlayingChanged(param1: RoomWidgetPlayListEditorNowPlayingEvent): void {
        let _loc3_: ISongInfo = null;
        let _loc2_: ISongInfo = null;
        switch (param1.type) {
            case "RWPLENPE_SONG_CHANGED":
                this.selectPlayListStatusViewByFurniPlayListState();
                this._playListEditorView.setItemIndexPlaying(param1.position);
                if (param1.id != -1) {
                    _loc3_ = this._musicController.getSongInfo(param1.id);
                    this._SafeStr_2666.nowPlayingTrackName = _loc3_ != null ? _loc3_.name : "";
                    this._SafeStr_2666.nowPlayingAuthorName = _loc3_ != null ? _loc3_.creator : "";
                }
                break;
            case "RWPLENPE_USER_PLAY_SONG":
                this._musicInventoryView.setPreviewIconToPause();
                _loc2_ = this._musicController.getSongInfo(param1.id);
                this._SafeStr_2515.songName = _loc2_ != null ? _loc2_.name : "";
                this._SafeStr_2515.songName = _loc2_ != null ? _loc2_.name : "";
                this._SafeStr_2515.authorName = _loc2_ != null ? _loc2_.creator : "";
                this.selectMusicStatusViewByMusicState();
                break;
            case "RWPLENPW_USER_STOP_SONG":
                this._musicInventoryView.setPreviewIconToPlay();
                this.selectMusicStatusViewByMusicState();
        }
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    private isPreviewPlaying(): boolean {
        return this._musicController.getSongIdPlayingAtPriority(2) != -1;
    }
}
