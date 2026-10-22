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

export class PlayListEditorItem {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::PlayListEditorItem'); }

    public static readonly ICON_STATE_NORMAL: string = "PLEI_ICON_STATE_NORMAL";
    public static readonly ICON_STATE_PLAYING: string = "PLEI_ICON_STATE_PLAYING";
    private static readonly BG_COLOR_SELECTED: number = 14283002;
    private static readonly BG_COLOR_UNSELECTED: number = 15856113;

    declare private _widget: PlayListEditorWidget;

    declare private _window: IWindowContainer;

    private _removeButton: IContainerButtonWindow = null;

    declare private _colorTransform: ColorTransform;

    constructor(param1: PlayListEditorWidget, param2: string, param3: string, param4: ColorTransform) {
        this._widget = param1;
        this._colorTransform = param4;
        this.createWindow();
        this.setIconState("PLEI_ICON_STATE_NORMAL");
        this.deselect();
        this.trackName = param2;
        this.trackAuthor = param3;
        this.diskColor = param4;
    }

    public get window(): IWindow {
        return isIWindow(this._window) ? this._window : null;
    }

    public get removeButton(): IContainerButtonWindow {
        return this._removeButton;
    }

    private createWindow(): void {
        let _loc3_: BitmapDataAsset = null;
        if (this._widget == null) {
            return;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("playlisteditor_playlist_item"), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        _loc3_ = asInstanceOf(this._widget.assets.getAssetByName("icon_arrow_left"), BitmapDataAsset);
        if (_loc3_ != null) {
            if (_loc3_.content != null) {
                this.buttonRemoveBitmap = asInstanceOf(_loc3_.content, BitmapData);
            }
        }
        this.assignAssetByNameToElement("jb_icon_disc", asGuarded(this._window.getChildByName("song_name_icon_bitmap"), isIBitmapWrapperWindow));
        this.assignAssetByNameToElement("jb_icon_composer", asGuarded(this._window.getChildByName("author_name_icon_bitmap"), isIBitmapWrapperWindow));
        let _loc1_: IWindowContainer = asGuarded(this._window.getChildByName("action_buttons"), isIWindowContainer);
        if (_loc1_ != null) {
            _loc1_ = asGuarded(_loc1_.getChildByName("button_border"), isIWindowContainer);
            if (_loc1_ != null) {
                this._removeButton = asGuarded(_loc1_.getChildByName("button_remove_from_playlist"), isIContainerButtonWindow);
            }
        }
    }

    public select(): void {
        let _loc2_: IBorderWindow = asGuarded(this._window.getChildByName("background"), isIBorderWindow);
        if (_loc2_ != null) {
            _loc2_.color = 14283002;
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

    public setIconState(param1: string): void {
        let _loc3_: BitmapDataAsset = null;
        let _loc2_: BitmapData = null;
        switch (param1) {
            case "PLEI_ICON_STATE_NORMAL":
                this.diskColor = this._colorTransform;
                break;
            case "PLEI_ICON_STATE_PLAYING":
                _loc3_ = asInstanceOf(this._widget.assets.getAssetByName("icon_notes_small"), BitmapDataAsset);
                if (_loc3_ == null) {
                    return;
                }
                if (_loc3_.content != null) {
                    _loc2_ = asInstanceOf(_loc3_.content, BitmapData);
                    this.diskIconBitmap = _loc2_.clone();
                }
        }
    }

    public set diskColor(param1: ColorTransform) {
        let _loc2_: BitmapData = null;
        let _loc4_: BitmapData = null;
        let _loc3_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName("icon_cd_small"), BitmapDataAsset);
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

    public set trackName(param1: string) {
        let _loc2_: ITextWindow = asGuarded(this._window.getChildByName("song_title_text"), isITextWindow);
        if (_loc2_ != null) {
            _loc2_.text = param1;
        }
    }

    public set trackAuthor(param1: string) {
        let _loc2_: ITextWindow = asGuarded(this._window.getChildByName("song_author_text"), isITextWindow);
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

    private set buttonRemoveBitmap(param1: BitmapData) {
        if (param1 == null) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._window.getChildByName("action_buttons"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        _loc2_ = asGuarded(_loc2_.getChildByName("button_border"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        _loc2_ = asGuarded(_loc2_.getChildByName("button_remove_from_playlist"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(_loc2_.getChildByName("button_remove_from_playlist_image"), isIBitmapWrapperWindow);
        if (_loc3_ != null) {
            _loc3_.bitmap = param1.clone();
            _loc3_.width = param1.width;
            _loc3_.height = param1.height;
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
