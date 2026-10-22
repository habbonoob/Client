import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';
import type { PetsView } from '@/com/sulake/habbo/inventory/pets/PetsView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class PetsGridItem {
    static { registerClassName(this, 'com.sulake.habbo.inventory.pets::PetsGridItem'); }

    private static readonly THUMB_COLOR_NORMAL: number = 13421772;
    private static readonly THUMB_COLOR_UNSEEN: number = 10275685;

    declare private _SafeStr_2395: PetData;

    declare private _window: IWindowContainer;

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_3024: IWindow;

    declare private _isSelected: boolean;
    static { (this.prototype as any)._isSelected = false; }

    declare private _SafeStr_4675: PetsView;

    private _imageDownloadId: number = -1;

    declare private _SafeStr_4147: boolean;
    static { (this.prototype as any)._SafeStr_4147 = false; }

    declare private _isUnseen: boolean;
    static { (this.prototype as any)._isUnseen = false; }

    constructor(param1: PetsView, param2: PetData, param3: IHabboWindowManager, param4: IAssetLibrary, param5: boolean) {
        if (param1 == null || param2 == null || param3 == null || param4 == null) {
            return;
        }
        this._assets = param4;
        this._SafeStr_4675 = param1;
        this._SafeStr_2395 = param2;
        this._isUnseen = param5;
        let _loc8_: XmlAsset = asInstanceOf(param4.getAssetByName("inventory_thumb_xml"), XmlAsset);
        if (_loc8_ == null || _loc8_.content == null) {
            return;
        }
        this._window = asGuarded(param3.buildFromXML(asInstanceOf(_loc8_.content, XML)), isIWindowContainer);
        this._window.procedure = this.eventHandler;
        let _loc7_: number = 64;
        let _loc11_: number = 3;
        let _loc9_: boolean = false;
        let _loc6_: string = null;
        if (param2.typeId == 15) {
            _loc7_ = 32;
            _loc11_ = 2;
            _loc9_ = true;
        } else if (param2.typeId == 35) {
            _loc7_ = 64;
            _loc11_ = 3;
            _loc9_ = true;
        } else if (param2.typeId == 26 || param2.typeId == 27) {
            _loc7_ = 32;
            _loc11_ = 3;
            _loc9_ = true;
        } else if (param2.typeId == 16) {
            _loc7_ = 32;
            _loc11_ = 2;
            _loc9_ = true;
            if (param2.level >= 7) {
                _loc6_ = "std";
            } else {
                _loc6_ = "grw" + param2.level;
            }
        }
        let _loc10_: BitmapData = param1.getPetImage(param2, _loc11_, _loc9_, this, _loc7_, _loc6_);
        this.setPetImage(_loc10_);
        this.updateRarityOverlay();
        this.updateStatusGraphics();
    }

    public dispose(): void {
        this._assets = null;
        this._SafeStr_4675 = null;
        this._SafeStr_2395 = null;
        this._SafeStr_3024 = null;
        this._imageDownloadId = -1;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        switch (param1.type) {
            case "WME_DOWN":
                this._SafeStr_4675.setSelectedGridItem(this);
                this._SafeStr_4147 = true;
                break;
            case "WME_UP":
                this._SafeStr_4147 = false;
                break;
            case "WME_OUT":
                if (this._SafeStr_4147) {
                    this._SafeStr_4147 = false;
                    this._SafeStr_4675.placePetToRoom(this._SafeStr_2395.id, true);
                }
        }
    };

    public setPetImage(param1: BitmapData): void {
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

    private updateRarityOverlay(): void {
        let _loc1_: IRarityItemGridOverlayWidget = null;
        if (this._window == null) {
            return;
        }
        let _loc2_: IWidgetWindow = asGuarded(this._window.findChildByName("rarity_item_overlay_container"), isIWidgetWindow);
        if (_loc2_ == null) {
            return;
        }
        if (this._SafeStr_2395 != null && this._SafeStr_2395.rarityLevel >= 0) {
            _loc1_ = castGuarded(_loc2_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
            _loc1_.rarityLevel = this._SafeStr_2395.rarityLevel;
            _loc2_.visible = true;
        } else {
            _loc2_.visible = false;
        }
    }

    public get window(): IWindow {
        return this._window;
    }

    public get pet(): PetData {
        return this._SafeStr_2395;
    }

    public set imageDownloadId(param1: number) {
        this._imageDownloadId = param1;
    }

    public get imageDownloadId(): number {
        return this._imageDownloadId;
    }
}
