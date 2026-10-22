import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import type { IHabboMusicController } from '@/com/sulake/habbo/sound/IHabboMusicController';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { PlayListEditorWidget } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorWidget';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { MusicInventoryGridItem } from '@/com/sulake/habbo/ui/widget/playlisteditor/MusicInventoryGridItem';

export class MusicInventoryGridView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::MusicInventoryGridView'); }

    declare private _musicController: IHabboMusicController;

    declare private _SafeStr_3292: IItemGridWindow;

    private _items: UtilsMap = new UtilsMap();

    declare private _widget: PlayListEditorWidget;

    declare private _selectedItem: MusicInventoryGridItem;

    constructor(param1: PlayListEditorWidget, param2: IItemGridWindow, param3: IHabboMusicController) {
        this._musicController = param3;
        this._SafeStr_3292 = param2;
        this._widget = param1;
        this._selectedItem = null;
        this._musicController.events.addEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
    }

    public get itemCount(): number {
        return this._items.length | 0;
    }

    public destroy(): void {
        if (this._SafeStr_3292 != null) {
            this._SafeStr_3292.destroyGridItems();
            this._SafeStr_3292 = null;
        }
        if (this._musicController != null) {
            if (this._musicController.events != null) {
                this._musicController.events.removeEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
            }
            this._musicController = null;
        }
        if (this._items) {
            this._items.reset();
            this._items = null;
        }
        this._selectedItem = null;
        this._widget = null;
    }

    public refresh(): void {
        let _loc4_: number = 0;
        let _loc9_: number = 0;
        let _loc11_: number = 0;
        let _loc12_: ISongInfo = null;
        let _loc1_: string = null;
        let _loc13_: ColorTransform = null;
        let _loc3_: MusicInventoryGridItem = null;
        let _loc7_: MusicInventoryGridItem = null;
        if (this._SafeStr_3292 == null) {
            return;
        }
        this._SafeStr_3292.removeGridItems();
        let _loc8_: UtilsMap = this._items;
        let _loc2_: UtilsMap = new UtilsMap();
        let _loc5_: any[] = _loc8_.getKeys();
        this._items = new UtilsMap();
        let _loc6_: number = this._musicController.getSongDiskInventorySize();
        _loc4_ = 0;
        while (_loc4_ < _loc6_) {
            _loc9_ = this._musicController.getSongDiskInventoryDiskId(_loc4_);
            _loc11_ = this._musicController.getSongDiskInventorySongId(_loc4_);
            _loc12_ = this._musicController.getSongInfo(_loc11_);
            _loc1_ = null;
            _loc13_ = null;
            if (_loc12_ != null) {
                _loc1_ = _loc12_.name;
                _loc13_ = this._widget.getDiskColorTransformFromSongData(_loc12_.songData);
            }
            if (_loc5_.indexOf(_loc9_) == -1) {
                _loc3_ = new MusicInventoryGridItem(this._widget, _loc9_, _loc11_, _loc1_, _loc13_);
            } else {
                _loc3_ = _loc8_[_loc9_];
                _loc5_.splice(_loc5_.indexOf(_loc9_), 1);
            }
            _loc3_.window.procedure = this.gridItemEventProc;
            _loc3_.toPlayListButton.procedure = this.gridItemEventProc;
            this._SafeStr_3292.addGridItem(_loc3_.window);
            this._items.add(_loc9_, _loc3_);
            _loc4_++;
        }
        for (const _loc10_ of _loc5_ ?? []) {
            _loc7_ = _loc8_[_loc10_];
            _loc7_.destroy();
            _loc8_.remove(_loc10_);
        }
    }

    public setPreviewIconToPause(): void {
        if (this._selectedItem != null) {
            this._selectedItem.playButtonState = 1;
        }
    }

    public setPreviewIconToPlay(): void {
        if (this._selectedItem != null) {
            this._selectedItem.playButtonState = 0;
        }
    }

    public deselectAny(): void {
        if (this._selectedItem != null) {
            this._selectedItem.deselect();
            this._selectedItem = null;
        }
    }

    private gridItemEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: number = 0;
        let _loc5_: MusicInventoryGridItem = null;
        let _loc3_: boolean = param1.type == "WME_DOUBLE_CLICK";
        if (param1.type == "WME_CLICK" || _loc3_) {
            if (param2.name == "button_to_playlist" || _loc3_) {
                if (this._selectedItem != null) {
                    this._selectedItem.deselect();
                    this.stopPreview();
                    this._widget.sendAddToPlayListMessage(this._selectedItem.diskId);
                    this._selectedItem = null;
                }
            } else if (param2.name == "button_play_pause") {
                if (this._selectedItem.playButtonState == 0) {
                    this._selectedItem.playButtonState = 2;
                    this._widget.playUserSong(this._selectedItem.songId);
                } else {
                    this.stopPreview();
                }
            } else {
                _loc4_ = this._SafeStr_3292.getGridItemIndex(param1.window);
                if (_loc4_ != -1) {
                    _loc5_ = this._items.getWithIndex(_loc4_);
                    if (_loc5_ != this._selectedItem) {
                        if (this._selectedItem != null) {
                            this._selectedItem.deselect();
                        }
                        this._selectedItem = _loc5_;
                        this._selectedItem.select();
                        this.stopPreview();
                    }
                    if (this._widget.mainWindowHandler != null) {
                        this._widget.mainWindowHandler.playListEditorView.deselectAny();
                    }
                }
            }
        }
    };

    private stopPreview(): void {
        this._widget.stopUserSong();
        this.setPreviewIconToPlay();
    }

    private onSongInfoReceivedEvent = (param1: SongInfoReceivedEvent): void => {
        let _loc4_: ISongInfo = null;
        let _loc2_: string = null;
        let _loc5_: ColorTransform = null;
        let _loc3_: MusicInventoryGridItem = null;
        if (this._musicController != null) {
            _loc4_ = this._musicController.getSongInfo(param1.id);
            if (_loc4_ != null) {
                _loc2_ = _loc4_.name;
                _loc5_ = this._widget.getDiskColorTransformFromSongData(_loc4_.songData);
                _loc3_ = this._items[param1.id];
                if (_loc3_ != null) {
                    _loc3_.update(param1.id, _loc2_, _loc5_);
                }
            }
        }
    };
}
