import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PlayListEditorWidget } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class PlayListStatusView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::PlayListStatusView'); }

    public static readonly ADD_SONGS: string = "PLSV_ADD_SONGS";
    public static readonly START_PLAYBACK: string = "PLSV_START_PLAYBACK";
    public static readonly NOW_PLAYING: string = "PLSV_NOW_PLAYING";

    declare private _container: IWindowContainer;

    private _windows: UtilsMap = new UtilsMap();

    declare private _widget: PlayListEditorWidget;

    declare private _SafeStr_2182: string;

    constructor(param1: PlayListEditorWidget, param2: IWindowContainer) {
        this._container = param2;
        this._widget = param1;
        this.createWindows();
    }

    public destroy(): void {
        for (const _loc1_ of this._windows.getValues() ?? []) {
            _loc1_.destroy();
        }
        this._windows = null;
    }

    public selectView(param1: string): void {
        this._container.removeChildAt(0);
        this._container.addChildAt(asGuarded(this._windows[param1], isIWindowContainer), 0);
        this._SafeStr_2182 = param1;
    }

    public set nowPlayingTrackName(param1: string) {
        if (this._SafeStr_2182 != "PLSV_NOW_PLAYING") {
            return;
        }
        let _loc2_: IWindowContainer = this._windows[this._SafeStr_2182];
        let _loc3_: ITextWindow = asGuarded(_loc2_.getChildByName("now_playing_track_name"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.text = param1;
        }
    }

    public set nowPlayingAuthorName(param1: string) {
        if (this._SafeStr_2182 != "PLSV_NOW_PLAYING") {
            return;
        }
        let _loc2_: IWindowContainer = this._windows[this._SafeStr_2182];
        let _loc3_: ITextWindow = asGuarded(_loc2_.getChildByName("now_playing_author_name"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.text = param1;
        }
    }

    public set addSongsBackgroundImage(param1: BitmapData) {
        if (param1 == null) {
            return;
        }
        let _loc2_: IWindowContainer = this._windows["PLSV_ADD_SONGS"];
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(_loc2_.getChildByName("background_image"), isIBitmapWrapperWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.bitmap = param1.clone();
        _loc3_.width = param1.width;
        _loc3_.height = param1.height;
    }

    private createWindows(): void {
        let _loc3_: IWindowContainer = null;
        let _loc2_: XmlAsset = null;
        let _loc4_: IButtonWindow = null;
        let _loc1_: IContainerButtonWindow = null;
        _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_playlist_subwindow_add_songs"), XmlAsset);
        _loc3_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (_loc3_ != null) {
            this._windows.add("PLSV_ADD_SONGS", _loc3_);
        }
        _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_playlist_subwindow_play_now"), XmlAsset);
        _loc3_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (_loc3_ != null) {
            this._windows.add("PLSV_START_PLAYBACK", _loc3_);
            _loc4_ = asGuarded(_loc3_.getChildByName("play_now_button"), isIButtonWindow);
            _loc4_.addEventListener("WME_CLICK", this.onPlayPauseClicked);
        }
        _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_playlist_subwindow_nowplaying"), XmlAsset);
        _loc3_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (_loc3_ != null) {
            this._windows.add("PLSV_NOW_PLAYING", _loc3_);
            _loc1_ = asGuarded(_loc3_.getChildByName("button_pause"), isIContainerButtonWindow);
            _loc1_.addEventListener("WME_CLICK", this.onPlayPauseClicked);
            this.assignAssetToElement("icon_pause_large", asGuarded(_loc1_.getChildByName("pause_image"), isIBitmapWrapperWindow));
            this.assignAssetToElement("jb_icon_disc", asGuarded(_loc3_.getChildByName("song_name_icon_bitmap"), isIBitmapWrapperWindow));
            this.assignAssetToElement("jb_icon_composer", asGuarded(_loc3_.getChildByName("author_name_icon_bitmap"), isIBitmapWrapperWindow));
        }
    }

    private assignAssetToElement(param1: string, param2: IBitmapWrapperWindow): void {
        let _loc3_: BitmapData = null;
        let _loc4_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc4_ != null) {
            if (param2 != null && _loc4_.content != null) {
                _loc3_ = asInstanceOf(_loc4_.content, BitmapData);
                param2.bitmap = _loc3_.clone();
            }
        }
    }

    private onPlayPauseClicked = (param1: WindowMouseEvent): void => {
        this._widget.sendTogglePlayPauseStateMessage();
    };
}
