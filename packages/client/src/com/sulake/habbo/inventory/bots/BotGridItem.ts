import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BotData } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotData';
import type { BotsView } from '@/com/sulake/habbo/inventory/bots/BotsView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class BotGridItem {
    static { registerClassName(this, 'com.sulake.habbo.inventory.bots::BotGridItem'); }

    private static readonly THUMB_COLOR_NORMAL: number = 13421772;
    private static readonly THUMB_COLOR_UNSEEN: number = 10275685;

    constructor(param1: BotsView, param2: BotData, param3: IHabboWindowManager, param4: IAssetLibrary, param5: boolean) {
        if (param1 == null || param2 == null || param3 == null || param4 == null) {
            return;
        }
        this._assets = param4;
        this._view = param1;
        this._data = param2;
        this._isUnseen = param5;
        let _loc7_: XmlAsset = asInstanceOf(param4.getAssetByName("inventory_thumb_xml"), XmlAsset);
        if (_loc7_ == null || _loc7_.content == null) {
            return;
        }
        this._window = asGuarded(param3.buildFromXML(asInstanceOf(_loc7_.content, XML)), isIWindowContainer);
        this._window.procedure = this.eventHandler;
        let _loc6_: BitmapData = param1.getGridItemImage(param2);
        this.setImage(_loc6_);
        this.updateStatusGraphics();
    }

    declare private _data: BotData;

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_3024: IWindow;

    declare private _isSelected: boolean;
    static { (this.prototype as any)._isSelected = false; }

    declare private _view: BotsView;

    private _imageDownloadId: number = -1;

    declare private _SafeStr_4147: boolean;
    static { (this.prototype as any)._SafeStr_4147 = false; }

    declare private _isUnseen: boolean;
    static { (this.prototype as any)._isUnseen = false; }

    declare private _window: IWindowContainer;

    public get window(): IWindow {
        return this._window;
    }

    public get data(): BotData {
        return this._data;
    }

    public dispose(): void {
        this._assets = null;
        this._view = null;
        this._data = null;
        this._SafeStr_3024 = null;
        this._imageDownloadId = -1;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    public setImage(param1: BitmapData): void {
        if (!this._window) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow);
        let _loc2_: BitmapData = new BitmapData(_loc3_.width, _loc3_.height);
        _loc2_.fillRect(_loc2_.rect, 0);
        _loc2_.copyPixels(param1, param1.rect, new Point(_loc2_.width / 2 - param1.width / 2, _loc2_.height / 2 - param1.height / 2));
        if (_loc3_.bitmap) {
            _loc3_.bitmap.dispose();
        }
        _loc3_.bitmap = _loc2_;
    }

    public setUnseen(param1: boolean): void {
        if (this._isUnseen != param1) {
            this._isUnseen = param1;
            this.updateStatusGraphics();
        }
    }

    public setSelected(param1: boolean): void {
        if (this._isSelected != param1) {
            this._isSelected = param1;
            if (!this._window || !this._SafeStr_3024) {
                return;
            }
            this.updateStatusGraphics();
        }
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        switch (param1.type) {
            case "WME_DOWN":
                this._view.setSelectedGridItem(this);
                this._SafeStr_4147 = true;
                break;
            case "WME_UP":
                this._SafeStr_4147 = false;
                break;
            case "WME_OUT":
                if (this._SafeStr_4147) {
                    this._SafeStr_4147 = false;
                    this._view.placeItemToRoom(this._data.id, true);
                }
        }
    };

    private updateStatusGraphics(): void {
        let _loc1_: IWindow = this._window.findChildByName("outline");
        if (_loc1_ != null) {
            _loc1_.visible = this._isSelected;
        }
        if (!this._SafeStr_3024) {
            this._SafeStr_3024 = this._window.findChildByTag("BG_COLOR");
        }
        this._SafeStr_3024.color = (this._isUnseen ? 10275685 : 13421772) >>> 0;
    }
}
