import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PlayListEditorWidget } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class MusicInventoryStatusView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::MusicInventoryStatusView'); }

    public static readonly BUY_MORE: string = "MISV_BUY_MORE";
    public static readonly PREVIEW_PLAYING: string = "MISV_PREVIEW_PLAYING";

    constructor(param1: PlayListEditorWidget, param2: IWindowContainer) {
        this._container = param2;
        this._widget = param1;
        this.createWindows();
        this.hide();
    }

    declare private _container: IWindowContainer;

    private _SafeStr_2896: UtilsMap = new UtilsMap();

    declare private _widget: PlayListEditorWidget;

    declare private _SafeStr_2182: string;

    declare private _SafeStr_5658: ITextWindow;

    declare private _SafeStr_5600: ITextWindow;

    public set songName(param1: string) {
        if (this._SafeStr_5658 == null) {
            return;
        }
        this._SafeStr_5658.text = param1;
    }

    public set authorName(param1: string) {
        if (this._SafeStr_5600 == null) {
            return;
        }
        this._SafeStr_5600.text = param1;
    }

    public destroy(): void {
        for (const _loc1_ of this._SafeStr_2896.getValues() ?? []) {
            _loc1_.destroy();
        }
        this._SafeStr_2896 = null;
    }

    public show(): void {
        this._container.visible = true;
    }

    public hide(): void {
        this._container.visible = false;
    }

    public selectView(param1: string): void {
        this._container.removeChildAt(0);
        this._container.addChildAt(asGuarded(this._SafeStr_2896[param1], isIWindowContainer), 0);
        this._SafeStr_2182 = param1;
    }

    public setPreviewPlayingBackgroundImage(param1: BitmapData, param2: boolean = true): void {
        this.blitBackgroundImage("MISV_PREVIEW_PLAYING", "preview_play_background_image", param1);
        if (param2 && param1 != null) {
            param1.dispose();
        }
    }

    public setGetMoreMusicBackgroundImage(param1: BitmapData, param2: boolean = true): void {
        this.blitBackgroundImage("MISV_BUY_MORE", "get_more_music_background_image", param1);
        if (param2 && param1 != null) {
            param1.dispose();
        }
    }

    private createWindows(): void {
        let _loc3_: IWindowContainer = null;
        let _loc2_: XmlAsset = null;
        let _loc1_: IButtonWindow = null;
        let _loc4_: IButtonWindow = null;
        _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_inventory_subwindow_play_preview"), XmlAsset);
        _loc3_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (_loc3_ != null) {
            this._SafeStr_2896.add("MISV_PREVIEW_PLAYING", _loc3_);
            this._SafeStr_5658 = asGuarded(_loc3_.getChildByName("preview_play_track_name"), isITextWindow);
            this._SafeStr_5600 = asGuarded(_loc3_.getChildByName("preview_play_author_name"), isITextWindow);
            _loc1_ = asGuarded(_loc3_.getChildByName("stop_preview_button"), isIButtonWindow);
            _loc1_.addEventListener("WME_CLICK", this.onStopPreviewClicked);
            this.setPreviewPlayingBackgroundImage(this._widget.getImageGalleryAssetBitmap("background_preview_playing"));
            this.assignAssetByNameToElement("jb_icon_disc", asGuarded(_loc3_.getChildByName("song_name_icon_bitmap"), isIBitmapWrapperWindow));
            this.assignAssetByNameToElement("jb_icon_composer", asGuarded(_loc3_.getChildByName("author_name_icon_bitmap"), isIBitmapWrapperWindow));
        }
        _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_inventory_subwindow_get_more_music"), XmlAsset);
        _loc3_ = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (_loc3_ != null) {
            this._SafeStr_2896.add("MISV_BUY_MORE", _loc3_);
            _loc4_ = asGuarded(_loc3_.getChildByName("open_catalog_button"), isIButtonWindow);
            _loc4_.addEventListener("WME_CLICK", this.onOpenCatalogButtonClicked);
            this.setGetMoreMusicBackgroundImage(this._widget.getImageGalleryAssetBitmap("background_get_more_music"));
        }
    }

    private blitBackgroundImage(param1: string, param2: string, param3: BitmapData): void {
        let _loc5_: BitmapData = null;
        let _loc6_: IWindowContainer = asGuarded(this._SafeStr_2896[param1], isIWindowContainer);
        if (_loc6_ == null) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(_loc6_.getChildByName(param2), isIBitmapWrapperWindow);
        if (_loc4_ == null) {
            return;
        }
        if (param3 != null) {
            _loc5_ = new BitmapData(_loc4_.width, _loc4_.height, false, 4294967295);
            _loc5_.copyPixels(param3, param3.rect, new Point(0, 0));
            _loc4_.bitmap = _loc5_;
        }
    }

    private assignAssetByNameToElement(param1: string, param2: IBitmapWrapperWindow): void {
        let _loc3_: BitmapData = null;
        let _loc4_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc4_ != null) {
            if (param2 != null && _loc4_.content != null) {
                _loc3_ = asInstanceOf(_loc4_.content, BitmapData);
                param2.bitmap = _loc3_.clone();
            }
        }
    }

    private onOpenCatalogButtonClicked = (param1: WindowMouseEvent): void => {
        this._widget.openSongDiskShopCataloguePage();
    };

    private onStopPreviewClicked = (param1: WindowMouseEvent): void => {
        this._widget.stopUserSong();
    };
}
