import { asGuarded, asInstanceOf, isInt } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IPlayListController } from '@/com/sulake/habbo/sound/IPlayListController';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetPlayListEditorEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPlayListEditorEvent';
import type { RoomWidgetPlayListEditorNowPlayingEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPlayListEditorNowPlayingEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { RoomWidgetPlayListModificationMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPlayListModificationMessage';
import { RoomWidgetPlayListPlayStateMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPlayListPlayStateMessage';
import { RoomWidgetPlayListUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPlayListUserActionMessage';
import { MainWindowHandler } from '@/com/sulake/habbo/ui/widget/playlisteditor/MainWindowHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class PlayListEditorWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::PlayListEditorWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        PlayListEditorWidget.#initStatics();
        return PlayListEditorWidget._log;
    }

    private static readonly DISK_COLOR_RED_MIN: number = 130;
    private static readonly DISK_COLOR_RED_RANGE: number = 100;
    private static readonly DISK_COLOR_GREEN_MIN: number = 130;
    private static readonly DISK_COLOR_GREEN_RANGE: number = 100;
    private static readonly DISK_COLOR_BLUE_MIN: number = 130;
    private static readonly DISK_COLOR_BLUE_RANGE: number = 100;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IHabboSoundManager, param4: IAssetLibrary, param5: IHabboLocalizationManager, param6: ICoreConfiguration, param7: IHabboCatalog) {
        super(param1, param2, param4, param5);
        this._soundManager = param3;
        this._configuration = param6;
        this._catalog = param7;
        this._SafeStr_2133 = null;
    }

    declare private _catalog: IHabboCatalog;

    declare private _configuration: ICoreConfiguration;

    declare private _soundManager: IHabboSoundManager;

    declare private _SafeStr_2133: MainWindowHandler;

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    public override get mainWindow(): IWindow {
        if (this._SafeStr_2133 == null) {
            return null;
        }
        return this._SafeStr_2133.window;
    }

    public get mainWindowHandler(): MainWindowHandler {
        return this._SafeStr_2133;
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_2133) {
                this._SafeStr_2133.destroy();
                this._SafeStr_2133 = null;
            }
            this._soundManager = null;
            super.dispose();
        }
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        param1.addEventListener("RWPLEE_SHOW_PLAYLIST_EDITOR", this.onShowPlayListEditorEvent);
        param1.addEventListener("RWPLEE_HIDE_PLAYLIST_EDITOR", this.onHidePlayListEditorEvent);
        param1.addEventListener("RWPLEE_INVENTORY_UPDATED", this.onInventoryUpdatedEvent);
        param1.addEventListener("RWPLEE_SONG_DISK_INVENTORY_UPDATED", this.onSongDiskInventoryUpdatedEvent);
        param1.addEventListener("RWPLEE_PLAY_LIST_UPDATED", this.onPlayListUpdatedEvent);
        param1.addEventListener("RWPLEE_PLAY_LIST_FULL", this.onPlayListFullEvent);
        param1.addEventListener("RWPLENPE_SONG_CHANGED", this.onNowPlayingChangedEvent);
        param1.addEventListener("RWPLENPE_USER_PLAY_SONG", this.onNowPlayingChangedEvent);
        param1.addEventListener("RWPLENPW_USER_STOP_SONG", this.onNowPlayingChangedEvent);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        param1.removeEventListener("RWPLEE_SHOW_PLAYLIST_EDITOR", this.onShowPlayListEditorEvent);
        param1.removeEventListener("RWPLEE_HIDE_PLAYLIST_EDITOR", this.onHidePlayListEditorEvent);
        param1.removeEventListener("RWPLEE_INVENTORY_UPDATED", this.onInventoryUpdatedEvent);
        param1.removeEventListener("RWPLEE_SONG_DISK_INVENTORY_UPDATED", this.onSongDiskInventoryUpdatedEvent);
        param1.removeEventListener("RWPLEE_PLAY_LIST_UPDATED", this.onPlayListUpdatedEvent);
        param1.removeEventListener("RWPLEE_PLAY_LIST_FULL", this.onPlayListFullEvent);
        param1.removeEventListener("RWPLENPE_SONG_CHANGED", this.onNowPlayingChangedEvent);
        param1.removeEventListener("RWPLENPE_USER_PLAY_SONG", this.onNowPlayingChangedEvent);
        param1.removeEventListener("RWPLENPW_USER_STOP_SONG", this.onNowPlayingChangedEvent);
    }

    public getDiskColorTransformFromSongData(param1: string): ColorTransform {
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < param1.length) {
            switch (_loc5_ % 3) {
                case 0:
                    _loc2_ += asGuarded(param1.charCodeAt(_loc5_) * 37, isInt);
                    break;
                case 1:
                    _loc4_ += asGuarded(param1.charCodeAt(_loc5_) * 37, isInt);
                    break;
                case 2:
                    _loc3_ += asGuarded(param1.charCodeAt(_loc5_) * 37, isInt);
            }
            _loc5_++;
        }
        _loc2_ = _loc2_ % 100 + 130 >>> 0;
        _loc4_ = _loc4_ % 100 + 130 >>> 0;
        _loc3_ = _loc3_ % 100 + 130 >>> 0;
        return new ColorTransform(_loc2_ / 255, _loc4_ / 255, _loc3_ / 255);
    }

    public sendAddToPlayListMessage(param1: number): void {
        let _loc3_: number = 0;
        let _loc4_: RoomWidgetPlayListModificationMessage = null;
        let _loc2_: IPlayListController = this._soundManager.musicController.getRoomItemPlaylist();
        if (_loc2_ != null) {
            _loc3_ = _loc2_.length;
            _loc4_ = new RoomWidgetPlayListModificationMessage("RWPLAM_ADD_TO_PLAYLIST", _loc3_, param1);
            if (this.messageListener != null) {
                this.messageListener.processWidgetMessage(_loc4_);
            }
        }
    }

    public sendRemoveFromPlayListMessage(param1: number): void {
        let _loc2_: RoomWidgetPlayListModificationMessage = new RoomWidgetPlayListModificationMessage("RWPLAM_REMOVE_FROM_PLAYLIST", param1);
        if (this.messageListener != null) {
            this.messageListener.processWidgetMessage(_loc2_);
        }
    }

    public sendTogglePlayPauseStateMessage(): void {
        let _loc1_: number = 0;
        if (this._SafeStr_2133 != null && this._SafeStr_2133.playListEditorView != null) {
            _loc1_ = this._SafeStr_2133.playListEditorView.selectedItemIndex != -1 ? this._SafeStr_2133.playListEditorView.selectedItemIndex : 0;
        }
        let _loc2_: RoomWidgetPlayListPlayStateMessage = new RoomWidgetPlayListPlayStateMessage("RWPLPS_TOGGLE_PLAY_PAUSE", this._furniId, _loc1_);
        if (this.messageListener != null) {
            this.messageListener.processWidgetMessage(_loc2_);
        }
    }

    public playUserSong(param1: number): void {
        let _loc2_: ISongInfo = null;
        let _loc3_: number = this._soundManager.musicController.getSongIdPlayingAtPriority(0);
        if (_loc3_ != -1) {
            _loc2_ = this._soundManager.musicController.getSongInfo(_loc3_);
            if (_loc2_.soundObject != null) {
                _loc2_.soundObject.fadeOutSeconds = 0;
            }
        }
        this._soundManager.musicController.playSong(param1, 2, 0, 0, 0, 0);
    }

    public stopUserSong(): void {
        this._soundManager.musicController.stop(2);
    }

    public getImageGalleryAssetBitmap(param1: string): BitmapData {
        let _loc2_: BitmapData = null;
        let _loc3_: BitmapDataAsset = asInstanceOf(this.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc3_ == null) {
            return null;
        }
        _loc2_ = asInstanceOf(_loc3_.content, BitmapData);
        return _loc2_.clone();
    }

    public retrieveWidgetImage(param1: string): void {
        let _loc4_: string = this._configuration.getProperty("image.library.playlist.url");
        let _loc5_: string = _loc4_ + param1 + ".gif";
        PlayListEditorWidget._log.info("[PlayListEditorWidget]  : " + _loc5_);
        let _loc2_: URLRequest = new URLRequest(_loc5_);
        let _loc3_: AssetLoaderStruct = this.assets.loadAssetFromFile(param1, _loc2_, "image/gif");
        _loc3_.addEventListener("AssetLoaderEventComplete", this.onWidgetImageReady);
    }

    public openSongDiskShopCataloguePage(): void {
        let _loc1_: RoomWidgetPlayListUserActionMessage = new RoomWidgetPlayListUserActionMessage("RWPLUA_OPEN_CATALOGUE_BUTTON_PRESSED");
        if (this.messageListener != null) {
            this.messageListener.processWidgetMessage(_loc1_);
        }
        this._catalog.openCatalogPage("trax_songs");
    }

    public alertPlayListFull(): void {
        this.windowManager.alert("${playlist.editor.alert.playlist.full.title}", "${playlist.editor.alert.playlist.full}", 0, this.alertHandler);
    }

    private alertHandler = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private onShowPlayListEditorEvent = (param1: RoomWidgetPlayListEditorEvent): void => {
        let _loc2_: IPlayListController = null;
        this._furniId = param1.furniId;
        if (!this._SafeStr_2133) {
            this._SafeStr_2133 = new MainWindowHandler(this, this._soundManager.musicController);
            this._SafeStr_2133.window.visible = false;
        }
        if (!this._SafeStr_2133.window.visible) {
            this._SafeStr_2133.show();
            this._soundManager.musicController.requestUserSongDisks();
            _loc2_ = this._soundManager.musicController.getRoomItemPlaylist();
            if (_loc2_ != null) {
                _loc2_.requestPlayList();
            }
        }
    };

    private onHidePlayListEditorEvent = (param1: RoomWidgetPlayListEditorEvent): void => {
        if (this._SafeStr_2133 != null) {
            if (this._SafeStr_2133.window.visible) {
                this._SafeStr_2133.hide();
            }
        }
    };

    private onInventoryUpdatedEvent = (param1: RoomWidgetPlayListEditorEvent): void => {
        if (!this._SafeStr_2133) {
            return;
        }
        if (this._SafeStr_2133.window.visible) {
            this._soundManager.musicController.requestUserSongDisks();
        }
    };

    private onWidgetImageReady = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = null;
        if (param1.type == "AssetLoaderEventComplete") {
            _loc2_ = asInstanceOf(param1.target, AssetLoaderStruct);
            if (_loc2_ != null) {
                if (this._SafeStr_2133 != null) {
                    this._SafeStr_2133.refreshLoadableAsset(_loc2_.assetName);
                }
            }
        }
    };

    private onSongDiskInventoryUpdatedEvent = (param1: RoomWidgetPlayListEditorEvent): void => {
        if (this._SafeStr_2133) {
            this._SafeStr_2133.onSongDiskInventoryReceived();
        }
    };

    private onPlayListUpdatedEvent = (param1: RoomWidgetPlayListEditorEvent): void => {
        if (this._SafeStr_2133) {
            this._SafeStr_2133.onPlayListUpdated();
        }
    };

    private onPlayListFullEvent = (param1: RoomWidgetPlayListEditorEvent): void => {
        this.alertPlayListFull();
    };

    private onNowPlayingChangedEvent = (param1: RoomWidgetPlayListEditorNowPlayingEvent): void => {
        if (this._SafeStr_2133) {
            this._SafeStr_2133.onNowPlayingChanged(param1);
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PlayListEditorWidget.#staticsReady) return;
        PlayListEditorWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PlayListEditorWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.playlisteditor.PlayListEditorWidget"));
    }
}
