import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PlayListEditorWidget } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class MusicInventoryGridItem {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::MusicInventoryGridItem'); }

    public static readonly _SafeStr_8683: number = 0;
    public static readonly _SafeStr_7795: number = 1;
    public static readonly BUTTON_STATE_DOWNLOAD: number = 2;
    private static readonly BG_COLOR_SELECTED: number = 14612159;
    private static readonly BG_COLOR_UNSELECTED: number = 15856113;

    declare private _widget: PlayListEditorWidget;

    private _window: IWindowContainer = null;

    declare private _SafeStr_6249: number;
    static { (this.prototype as any)._SafeStr_6249 = 0; }

    declare private _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    private _toPlayListButton: IContainerButtonWindow = null;

    declare private _playButtonState: number;
    static { (this.prototype as any)._playButtonState = 0; }

    constructor(param1: PlayListEditorWidget, param2: number, param3: number, param4: string, param5: ColorTransform) {
        this._widget = param1;
        this._SafeStr_6249 = param2;
        this._SafeStr_4873 = param3;
        this.createWindow();
        this.deselect();
        if (param4 != null && param5 != null) {
            this.trackName = param4;
            this.diskColor = param5;
        }
    }

    public get window(): IWindow {
        return isIWindow(this._window) ? this._window : null;
    }

    public get diskId(): number {
        return this._SafeStr_6249;
    }

    public get songId(): number {
        return this._SafeStr_4873;
    }

    public get toPlayListButton(): IContainerButtonWindow {
        return this._toPlayListButton;
    }

    public get playButtonState(): number {
        return this._playButtonState;
    }

    public update(param1: number, param2: string, param3: ColorTransform): void {
        if (param1 == this._SafeStr_4873) {
            this.trackName = param2;
            this.diskColor = param3;
        }
    }

    public destroy(): void {
        if (this._window) {
            this._window.destroy();
        }
    }

    private createWindow(): void {
        let _loc3_: BitmapDataAsset = null;
        if (this._widget == null) {
            return;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_music_inventory_item"), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        let _loc1_: IWindowContainer = asGuarded(this._window.getChildByName("action_buttons"), isIWindowContainer);
        if (_loc1_ != null) {
            this._toPlayListButton = asGuarded(_loc1_.getChildByName("button_to_playlist"), isIContainerButtonWindow);
        }
        this.assignAssetByNameToElement("title_fader", asGuarded(this._window.getChildByName("title_fader_bitmap"), isIBitmapWrapperWindow));
        _loc3_ = asInstanceOf(this._widget.assets.getAssetByName("icon_arrow"), BitmapDataAsset);
        if (_loc3_ != null) {
            if (_loc3_.content != null) {
                this.buttonToPlaylistBitmap = asInstanceOf(_loc3_.content, BitmapData);
            }
        }
        this.playButtonState = 0;
    }

    public select(): void {
        let _loc2_: IBorderWindow = asGuarded(this._window.getChildByName("background"), isIBorderWindow);
        if (_loc2_ != null) {
            _loc2_.color = 14612159;
        }
        let _loc3_: IWindowContainer = asGuarded(this._window.getChildByName("action_buttons"), isIWindowContainer);
        if (_loc3_ != null) {
            _loc3_.visible = true;
        }
        let _loc1_: IBorderWindow = asGuarded(this._window.getChildByName("selected"), isIBorderWindow);
        if (_loc1_ != null) {
            _loc1_.visible = true;
        }
    }

    public deselect(): void {
        let _loc2_: IBorderWindow = asGuarded(this._window.getChildByName("background"), isIBorderWindow);
        if (_loc2_ != null) {
            _loc2_.color = 15856113;
        }
        let _loc3_: IWindowContainer = asGuarded(this._window.getChildByName("action_buttons"), isIWindowContainer);
        if (_loc3_ != null) {
            _loc3_.visible = false;
        }
        let _loc1_: IBorderWindow = asGuarded(this._window.getChildByName("selected"), isIBorderWindow);
        if (_loc1_ != null) {
            _loc1_.visible = false;
        }
    }

    public set diskColor(param1: ColorTransform) {
        let _loc2_: BitmapData = null;
        let _loc4_: BitmapData = null;
        let _loc3_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName("icon_cd_big"), BitmapDataAsset);
        if (_loc3_ == null) {
            return;
        }
        if (_loc3_.content != null) {
            _loc2_ = asInstanceOf(_loc3_.content, BitmapData);
            _loc4_ = _loc2_.clone();
            if (_loc4_ != null) {
                _loc4_.colorTransform(_loc2_.rect, param1);
                this.diskIconBitmap = _loc4_;
            }
        }
    }

    public set playButtonState(param1: number) {
        let _loc2_: BitmapDataAsset = null;
        if (param1 == 0) {
            _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("icon_play"), BitmapDataAsset);
        } else if (param1 == 1) {
            _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("icon_pause"), BitmapDataAsset);
        } else if (param1 == 2) {
            _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("icon_download"), BitmapDataAsset);
        }
        if (_loc2_ != null) {
            if (_loc2_.content != null) {
                this.buttonPlayPauseBitmap = asInstanceOf(_loc2_.content, BitmapData);
            }
        }
        this._playButtonState = param1;
    }

    public set trackName(param1: string) {
        let _loc2_: ITextWindow = asGuarded(this._window.getChildByName("song_title_text"), isITextWindow);
        if (_loc2_ != null) {
            _loc2_.text = param1;
        }
    }

    private set diskIconBitmap(param1: BitmapData) {
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.getChildByName("disk_image"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc2_.bitmap = param1;
        }
    }

    private set buttonToPlaylistBitmap(param1: BitmapData) {
        this.assignBitmapDataToButton("button_to_playlist", "image_button_to_playlist", param1);
    }

    private set buttonPlayPauseBitmap(param1: BitmapData) {
        this.assignBitmapDataToButton("button_play_pause", "image_button_play_pause", param1);
    }

    private assignBitmapDataToButton(param1: string, param2: string, param3: BitmapData): void {
        if (param3 == null) {
            return;
        }
        let _loc4_: IWindowContainer = asGuarded(this._window.getChildByName("action_buttons"), isIWindowContainer);
        if (_loc4_ == null) {
            return;
        }
        _loc4_ = asGuarded(_loc4_.getChildByName(param1), isIWindowContainer);
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: IBitmapWrapperWindow = asGuarded(_loc4_.getChildByName(param2), isIBitmapWrapperWindow);
        if (_loc5_ != null) {
            _loc5_.bitmap = param3.clone();
            _loc5_.width = param3.width;
            _loc5_.height = param3.height;
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
}
