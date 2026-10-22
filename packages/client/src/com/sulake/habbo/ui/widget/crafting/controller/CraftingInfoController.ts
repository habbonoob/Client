import { asGuarded, castGuarded, isInt } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { CraftingWidget } from '@/com/sulake/habbo/ui/widget/crafting/CraftingWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isIFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { CraftingProgressBarController } from '@/com/sulake/habbo/ui/widget/crafting/controller/CraftingProgressBarController';

export class CraftingInfoController implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.crafting.controller::CraftingInfoController'); }

    private static readonly DEBUG_PROGRESSBAR_TESTING_MODE: boolean = false;

    constructor(param1: CraftingWidget) {
        this._widget = param1;
        this._SafeStr_3381 = new CraftingProgressBarController(param1);
    }

    declare private _widget: CraftingWidget;

    declare private _SafeStr_3381: CraftingProgressBarController;

    public get mainWindow(): IWindowContainer {
        return this._widget.window;
    }

    public dispose(): void {
        this._widget = null;
        if (this._SafeStr_3381) {
            this._SafeStr_3381.dispose();
            this._SafeStr_3381 = null;
        }
    }

    public setState(param1: number, ...rest: any[]): void {
        let _loc9_: number = 0;
        let _loc6_: any = undefined;
        let _loc4_: any = null;
        let _loc7_: IFurnitureData = null;
        let _loc10_: ITextWindow = null;
        if (this._widget == null || this._widget.handler == null || this._widget.handler.container == null) {
            return;
        }
        let _loc5_: string = "";
        let _loc8_: string = "";
        if (Array.isArray(rest) && rest.length && Array.isArray(rest[0])) {
            _loc4_ = rest[0];
        } else {
            _loc4_ = rest;
        }
        let _loc3_: IHabboLocalizationManager = this._widget.handler.container.localization;
        switch (param1) {
            case 0:
                _loc5_ = "${crafting.info.start}";
                this.setButtonVisible(false);
                break;
            case 1:
                this.clearIcon();
                _loc5_ = "${crafting.info.mixer.empty}";
                this.disableButtonWith("${crafting.status.mixer.notavailable}");
                break;
            case 6:
                this.clearIcon();
                _loc5_ = "${crafting.info.product.empty}";
                this.setButtonVisible(false);
                break;
            case 3:
                this.clearIcon();
                _loc5_ = "${crafting.info.mixer.hit}";
                this.enableButton();
                break;
            case 4:
                this.clearIcon();
                _loc9_ = asGuarded(_loc4_[0], isInt);
                _loc5_ = _loc3_.getLocalization("crafting.info.mixer.hit.plus.others", "crafting.info.mixer.hit.plus.others");
                _loc5_ = _loc5_.replace("%number%", String(_loc9_));
                this.enableButton();
                break;
            case 5:
                this.clearIcon();
                _loc9_ = asGuarded(_loc4_[0], isInt);
                _loc5_ = _loc3_.getLocalization("crafting.info.mixer.others");
                _loc5_ = _loc5_.replace("%number%", String(_loc9_));
                this.disableButtonWith("${crafting.status.mixer.notavailable}");
                break;
            case 2:
                this.clearIcon();
                _loc5_ = "${crafting.info.mixer.nohit}";
                this.disableButtonWith("${crafting.status.mixer.notavailable}");
                break;
            case 8:
                _loc7_ = asGuarded(_loc4_[0], isIFurnitureData);
                if (!_loc7_) {
                    return;
                }
                this.requestIconFromRoomEngine(_loc7_);
                _loc5_ = _loc3_.getLocalization("crafting.info.product.complete", "crafting.info.product.complete");
                _loc8_ = _loc7_.localizedName;
                this.enableButton();
                break;
            case 7:
                _loc7_ = asGuarded(_loc4_[0], isIFurnitureData);
                if (!_loc7_) {
                    return;
                }
                this.requestIconFromRoomEngine(_loc7_);
                _loc6_ = asGuarded(_loc4_[1], Array.isArray);
                _loc5_ = _loc3_.getLocalization("crafting.info.product.incomplete", "crafting.info.product.incomplete");
                _loc8_ = _loc7_.localizedName;
                this.disableButtonWith("${crafting.status.recipe.incomplete}");
                break;
            case 9:
                _loc7_ = asGuarded(_loc4_[0], isIFurnitureData);
                if (!_loc7_) {
                    return;
                }
                this.requestIconFromRoomEngine(_loc7_);
                _loc5_ = _loc3_.getLocalization("crafting.info.mixer.notininventory", "crafting.info.mixer.notininventory");
                _loc5_ = _loc5_.replace("%product%", _loc7_.localizedName);
                break;
            case 999:
                _loc7_ = asGuarded(_loc4_[0], isIFurnitureData);
                if (!_loc7_) {
                    return;
                }
                this.requestIconFromRoomEngine(_loc7_);
                _loc5_ = _loc3_.getLocalization("crafting.info.result.ok", "crafting.info.result.ok");
                _loc8_ = _loc7_.localizedName;
                this.setButtonVisible(false);
                break;
            case 1000:
                _loc5_ = "${crafting.info.working}";
                this.setButtonVisible(false);
        }
        _loc10_ = asGuarded(this.mainWindow.findChildByName("info_text1"), isITextWindow);
        if (_loc10_) {
            _loc10_.text = _loc5_;
        }
        _loc10_ = asGuarded(this.mainWindow.findChildByName("info_text2"), isITextWindow);
        if (_loc10_) {
            _loc10_.text = _loc8_;
        }
    }

    public craftingSecretRecipesAvailable(param1: number, param2: boolean): void {
        if (param2) {
            if (param1 == 0) {
                this.setState(3);
            } else {
                this.setState(4, param1);
            }
        } else if (param1 > 0) {
            this.setState(5, param1);
        } else {
            this.setState(2);
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        this.setIconBitmapData(param2);
        this.alignElements();
    }

    public imageFailed(param1: number): void {
        this.setIconBitmapData(null);
        this.alignElements();
    }

    public cancelCrafting(): void {
        this._widget.handler.craftingInProgress = false;
        this._SafeStr_3381.hide();
        this.setButtonVisible(true);
    }

    public onProgressBarComplete(): void {
        this._SafeStr_3381.hide();
        this._widget.doCrafting();
    }

    private enableButton(): void {
        this.setButtonVisible(true);
        let _loc1_: IButtonWindow = this.mainWindow ? asGuarded(this.mainWindow.findChildByName("btn_craft"), isIButtonWindow) : null;
        if (_loc1_ == null) {
            return;
        }
        if (this._widget.handler.isOwner) {
            _loc1_.caption = "${crafting.btn.craft}";
            _loc1_.enable();
            _loc1_.procedure = this.onCraftTriggered;
        } else {
            _loc1_.caption = "${crafting.btn.notowner}";
            _loc1_.disable();
        }
    }

    private disableButtonWith(param1: string): void {
        this.setButtonVisible(true);
        let _loc2_: IButtonWindow = this.mainWindow ? asGuarded(this.mainWindow.findChildByName("btn_craft"), isIButtonWindow) : null;
        if (_loc2_ == null) {
            return;
        }
        if (this._widget.handler.isOwner) {
            _loc2_.caption = param1;
        } else {
            _loc2_.caption = "${crafting.btn.notowner}";
        }
        _loc2_.disable();
    }

    private onCraftTriggered = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_DOWN") {
            return;
        }
        this.showProgressBar();
    };

    private clearIcon(): void {
        this.setIconBitmapData(null);
        this.alignElements();
    }

    private requestIconFromRoomEngine(param1: IFurnitureData): void {
        let _loc2_: ImageResult = null;
        switch (param1.type) {
            case "s":
                _loc2_ = this._widget.handler.container.roomEngine.getFurnitureIcon(param1.id, this);
                break;
            case "i":
                _loc2_ = this._widget.handler.container.roomEngine.getWallItemIcon(param1.id, this);
        }
        if (_loc2_.data) {
            this.imageReady(0, _loc2_.data);
        }
    }

    private alignElements(): void {
    }

    private showProgressBar(): void {
        if (this._widget == null || this._widget.handler == null) {
            return;
        }
        this._widget.handler.craftingInProgress = true;
        this.setButtonVisible(false);
        this._SafeStr_3381.show();
    }

    private setIconBitmapData(param1: BitmapData): void {
        let _loc2_: IBitmapWrapperWindow = this.mainWindow ? castGuarded(this.mainWindow.findChildByName("furniture_icon"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow") : null;
        if (!_loc2_) {
            return;
        }
        _loc2_.bitmap = param1;
    }

    private setButtonVisible(param1: boolean): void {
        let _loc2_: IWindow = this.mainWindow ? this.mainWindow.findChildByName("btn_craft") : null;
        if (_loc2_) {
            _loc2_.visible = param1;
        }
    }

    get [IGetImageListener](): true {
        return true;
    }
}
