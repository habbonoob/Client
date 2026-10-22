import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IThumbListDataProvider } from '@/com/sulake/habbo/inventory/common/IThumbListDataProvider';
import type { Effect } from '@/com/sulake/habbo/inventory/effects/Effect';
import type { EffectsModel } from '@/com/sulake/habbo/inventory/effects/EffectsModel';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ThumbListManager } from '@/com/sulake/habbo/inventory/common/ThumbListManager';

export class EffectsView implements IInventoryView {
    static { registerClassName(this, 'com.sulake.habbo.inventory.effects::EffectsView'); }

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2134: EffectsModel;

    declare private _SafeStr_3508: ThumbListManager;

    declare private _SafeStr_3351: ThumbListManager;

    private _disposed: boolean = false;

    constructor(param1: EffectsModel, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: IThumbListDataProvider, param6: IThumbListDataProvider) {
        this._SafeStr_2134 = param1;
        this._SafeStr_3052 = param3;
        this._windowManager = param2;
        let _loc9_: IAsset = this._SafeStr_3052.getAssetByName("inventory_effects_xml");
        let _loc7_: XmlAsset = castTo(_loc9_, XmlAsset);
        this._view = castGuarded(this._windowManager.buildFromXML(XML.from(_loc7_.content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._view.visible = false;
        this._view.procedure = this.windowEventProc;
        this._SafeStr_3508 = new ThumbListManager(this._SafeStr_3052, param5, "thumb_bg_png", "thumb_bg_selected_png", this.getActiveThumbListImageWidth(), this.getActiveThumbListImageHeight());
        this._SafeStr_3351 = new ThumbListManager(this._SafeStr_3052, param6, "thumb_bg_png", "thumb_bg_selected_png", this.getActiveThumbListImageWidth(), this.getActiveThumbListImageHeight());
        let _loc10_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("active_items_image"), isIBitmapWrapperWindow);
        _loc10_.procedure = this.activeThumbListEventProc;
        let _loc8_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("inactive_items_image"), isIBitmapWrapperWindow);
        _loc8_.procedure = this.inactiveThumbListEventProc;
        this._view.procedure = this.windowEventProc;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._windowManager = null;
            this._SafeStr_2134 = null;
            this._view = null;
            if (this._SafeStr_3508 != null) {
                this._SafeStr_3508.dispose();
                this._SafeStr_3508 = null;
            }
            if (this._SafeStr_3351 != null) {
                this._SafeStr_3351.dispose();
                this._SafeStr_3351 = null;
            }
            this._disposed = true;
        }
    }

    public getActiveThumbListImageWidth(): number {
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("active_items_image"), isIBitmapWrapperWindow);
        if (_loc1_ == null) {
            return 0;
        }
        return _loc1_.width;
    }

    public getActiveThumbListImageHeight(): number {
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("active_items_image"), isIBitmapWrapperWindow);
        if (_loc1_ == null) {
            return 0;
        }
        return _loc1_.height;
    }

    public getInactiveThumbListImageWidth(): number {
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("inactive_items_image"), isIBitmapWrapperWindow);
        if (_loc1_ == null) {
            return 0;
        }
        return _loc1_.width;
    }

    public getInactiveThumbListImageHeight(): number {
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("inactive_items_image"), isIBitmapWrapperWindow);
        if (_loc1_ == null) {
            return 0;
        }
        return _loc1_.height;
    }

    public getWindowContainer(): IWindowContainer {
        if (this._view == null) {
            return null;
        }
        if (this._view.disposed) {
            return null;
        }
        return this._view;
    }

    public updateListViews(): void {
        if (this._view == null) {
            return;
        }
        if (this._view.disposed) {
            return;
        }
        this._SafeStr_3351.updateImageFromList();
        this._SafeStr_3508.updateImageFromList();
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("inactive_items_image"), isIBitmapWrapperWindow);
        let _loc4_: BitmapData = this._SafeStr_3351.getListImage();
        _loc2_.bitmap = _loc4_;
        _loc2_.width = _loc4_.width;
        _loc2_.height = _loc4_.height;
        _loc2_.invalidate();
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("active_items_image"), isIBitmapWrapperWindow);
        let _loc1_: BitmapData = this._SafeStr_3508.getListImage();
        _loc3_.bitmap = _loc1_;
        _loc3_.width = _loc1_.width;
        _loc3_.height = _loc1_.height;
        _loc3_.invalidate();
    }

    public updateActionView(): void {
        if (this._view == null) {
            return;
        }
        if (this._view.disposed) {
            return;
        }
        let _loc2_: IButtonWindow = asGuarded(this._view.findChildByName("activateEffect_button"), isIButtonWindow);
        let _loc3_: ITextWindow = asGuarded(this._view.findChildByName("effectDescriptionText"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        if (_loc3_ == null) {
            return;
        }
        let _loc1_: Effect = this._SafeStr_2134.getSelectedEffect(-1);
        if (_loc1_ == null) {
            _loc2_.disable();
            this.setEffectDescriptionImage(null);
            _loc3_.text = "${inventory.effects.defaultdescription}";
        } else if (_loc1_.isActive) {
            _loc2_.disable();
            this.setEffectDescriptionImage(_loc1_.iconImage);
            _loc3_.text = "${inventory.effects.active}";
            this._windowManager.registerLocalizationParameter("inventory.effects.active", "timeleft", this.convertSecondsToTime(_loc1_.secondsLeft));
            this._windowManager.registerLocalizationParameter("inventory.effects.active", "duration", this.convertSecondsToTime(_loc1_.duration));
            this._windowManager.registerLocalizationParameter("inventory.effects.active", "itemcount", String(_loc1_.amountInInventory));
        } else {
            _loc2_.enable();
            this.setEffectDescriptionImage(_loc1_.iconImage);
            _loc3_.text = "${inventory.effects.inactive}";
            this._windowManager.registerLocalizationParameter("inventory.effects.inactive", "duration", this.convertSecondsToTime(_loc1_.duration));
            this._windowManager.registerLocalizationParameter("inventory.effects.inactive", "itemcount", String(_loc1_.amountInInventory));
        }
    }

    private setEffectDescriptionImage(param1: BitmapData): void {
        if (this._view == null) {
            return;
        }
        if (this._view.disposed) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("effectDescriptionImage"), isIBitmapWrapperWindow);
        if (_loc3_ == null) {
            return;
        }
        if (_loc3_.bitmap == null) {
            _loc3_.bitmap = new BitmapData(_loc3_.width, _loc3_.height, false);
        }
        if (param1 == null) {
            param1 = new BitmapData(_loc3_.width, _loc3_.height);
        }
        let _loc2_: Point = new Point((_loc3_.width - param1.width) / 2, (_loc3_.height - param1.height) / 2);
        _loc3_.bitmap.copyPixels(param1, param1.rect, _loc2_, null, null, false);
        _loc3_.invalidate();
    }

    private convertSecondsToTime(param1: number): string {
        let _loc2_: number = Math.floor(param1 / 60 / 60) | 0;
        let _loc4_: number = Math.floor((param1 - _loc2_ * 60 * 60) / 60) | 0;
        let _loc3_: number = param1 - _loc2_ * 60 * 60 - _loc4_ * 60;
        let _loc5_: string = "";
        if (_loc2_ > 0) {
            _loc5_ = _loc2_ + ":";
        }
        _loc5_ = _loc4_ < 10 ? _loc5_ + "0" + _loc4_ : _loc5_ + _loc4_;
        _loc5_ = _loc5_ + ":";
        return _loc3_ < 10 ? _loc5_ + "0" + _loc3_ : _loc5_ + _loc3_;
    }

    private activeThumbListEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: Point = null;
        let _loc5_: number = 0;
        let _loc4_: Effect = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = new Point(castTo(param1, WindowMouseEvent).localX, castTo(param1, WindowMouseEvent).localY);
            _loc5_ = this._SafeStr_3508.resolveIndexFromImageLocation(_loc3_);
            _loc4_ = this._SafeStr_2134.getItemInIndex(_loc5_, 1);
            if (_loc4_ != null) {
                this._SafeStr_2134.toggleEffectSelected(_loc4_.type);
            }
        }
    };

    private inactiveThumbListEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: Point = null;
        let _loc5_: number = 0;
        let _loc4_: Effect = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = new Point(castTo(param1, WindowMouseEvent).localX, castTo(param1, WindowMouseEvent).localY);
            _loc5_ = this._SafeStr_3351.resolveIndexFromImageLocation(_loc3_);
            _loc4_ = this._SafeStr_2134.getItemInIndex(_loc5_, 0);
            if (_loc4_ != null) {
                this._SafeStr_2134.toggleEffectSelected(_loc4_.type);
            }
        }
    };

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: Effect = null;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "activateEffect_button") {
                _loc3_ = this._SafeStr_2134.getSelectedEffect(0);
                if (_loc3_ != null) {
                    this._SafeStr_2134.requestEffectActivated(_loc3_.type);
                }
            }
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
