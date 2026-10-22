import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { CatalogWidgetApproveNameResultEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetApproveNameResultEvent';
import type { CatalogWidgetColourIndexEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColourIndexEvent';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { CatalogWidgetSellablePetPalettesEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSellablePetPalettesEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { PetColorResult } from '@/com/sulake/habbo/room/PetColorResult';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { PetCustomPart } from '@/com/sulake/habbo/avatar/pets/PetCustomPart';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetMultiColoursEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetMultiColoursEvent';
import { CatalogWidgetPurchaseOverrideEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetPurchaseOverrideEvent';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { SellablePetPaletteData } from '@/com/sulake/habbo/communication/messages/parser/catalog/SellablePetPaletteData';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class NewPetsCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::NewPetsCatalogWidget'); }

    private static readonly MAX_PALETTES: number = 20;
    private static readonly NORMAL_SIZE_PETS: any[] = [15];

    declare private _offers: UtilsMap;

    declare private _SafeStr_2135: IWindow;

    private _SafeStr_2530: number = -1;
    private _SafeStr_2634: number = -1;

    declare private _selectedProductCode: string;

    private _SafeStr_3195: boolean = false;
    private _disposed_NewPetsCatalogWidget: boolean = false;
    private _availablePalettes: any[] = null;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2857: IWindow;

    private _SafeStr_5993: number = -1;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override dispose(): void {
        if (this._disposed_NewPetsCatalogWidget) {
            return;
        }
        this._SafeStr_3195 = false;
        if (this._offers != null) {
            this._offers.dispose();
            this._offers = null;
        }
        this._availablePalettes = null;
        this._catalog = null;
        this._SafeStr_2857 = null;
        super.dispose();
        this._disposed_NewPetsCatalogWidget = true;
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._SafeStr_3195 = false;
        this._SafeStr_2135 = this.window.findChildByName("name_input_text");
        if (this._SafeStr_2135 == null) {
            return false;
        }
        this._SafeStr_2135.caption = "";
        this._offers = new UtilsMap();
        if (this.page.offers.length == 0) {
            return false;
        }
        let _loc1_: IPurchasableOffer = this.page.offers[0];
        this._SafeStr_2530 = this.getPetTypeIndexFromProduct(_loc1_.localizationId);
        if (this._SafeStr_2530 < 8) {
            return false;
        }
        this._selectedProductCode = _loc1_.localizationId;
        this.updateAvailablePalettes(_loc1_.localizationId);
        if (this._availablePalettes != null && this._availablePalettes.length > 0) {
            this._SafeStr_2634 = 0;
        } else {
            this._SafeStr_2634 = -1;
        }
        this._offers.add(this._SafeStr_2530, _loc1_);
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.addEventListener("COLOUR_INDEX", this.onColourIndex);
        this.events.addEventListener("CWE_APPROVE_RESULT", this.onApproveNameResult);
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        this.events.addEventListener("SELLABLE_PET_PALETTES", this.onSellablePetPalettes);
        return true;
    }

    private onWidgetsInitialized = (param1: CatalogWidgetEvent = null): void => {
        if (this._disposed_NewPetsCatalogWidget) {
            return;
        }
        this.events.dispatchEvent(new CatalogWidgetPurchaseOverrideEvent(this.onPurchase));
        let _loc2_: IPurchasableOffer = this._offers.getWithIndex(0);
        if (_loc2_ != null) {
            this.events.dispatchEvent(new SelectProductEvent(_loc2_));
        }
        this.initializePaletteSelection();
    };

    private initializePaletteSelection(): void {
        let _loc4_: any[] = null;
        let _loc2_: number = 0;
        let _loc1_: SellablePetPaletteData = null;
        let _loc3_: PetColorResult = null;
        if (this._availablePalettes != null) {
            _loc4_ = [];
            _loc2_ = 0;
            while (_loc2_ < 20 && _loc2_ < this._availablePalettes.length) {
                _loc1_ = this._availablePalettes[_loc2_];
                _loc3_ = this._catalog.roomEngine.getPetColor(this._SafeStr_2530, _loc1_.paletteId);
                if (_loc3_ != null) {
                    if (_loc3_.primaryColor == _loc3_.secondaryColor) {
                        _loc4_.push([_loc3_.primaryColor]);
                    } else {
                        _loc4_.push([_loc3_.primaryColor, _loc3_.secondaryColor]);
                    }
                }
                _loc2_++;
            }
            this.events.dispatchEvent(new CatalogWidgetMultiColoursEvent(_loc4_, "ctlg_clr_27x22_1", "ctlg_clr_27x22_2", "ctlg_clr_27x22_3"));
        }
    }

    private onColourIndex = (param1: CatalogWidgetColourIndexEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: number = param1.index;
        this.selectedPalette(_loc2_);
    };

    private selectedPalette(param1: number): void {
        if (this._availablePalettes != null && this._availablePalettes.length > 0) {
            if (param1 < 0 || param1 > this._availablePalettes.length) {
                param1 = 0;
            }
            this._SafeStr_2634 = param1;
            this.updateImage();
        }
    }

    private getPetLocalization(): string {
        let _loc1_: SellablePetPaletteData = null;
        if (this._SafeStr_2634 < 0) {
            return "";
        }
        if (this.page != null && this.page.viewer != null) {
            if (this._catalog != null && this._catalog.localization != null) {
                _loc1_ = asInstanceOf(this._availablePalettes[this._SafeStr_2634], SellablePetPaletteData);
                return this._catalog.localization.getLocalization(this.getRaceLocalizationKey(this._SafeStr_2530, _loc1_.breedId), this.getRaceLocalizationKey(this._SafeStr_2530, _loc1_.breedId));
            }
        }
        _loc1_ = this._availablePalettes[this._SafeStr_2634];
        return this.getRaceLocalizationKey(this._SafeStr_2530, _loc1_.breedId);
    }

    private onPurchase = (param1: WindowEvent): void => {
        if (this._SafeStr_3195) {
            Logger.log("* Cannot buy a pet, pending previous name approval.");
        }
        if (this.getPurchaseParameters() == "") {
            return;
        }
        let _loc2_: string = this._SafeStr_2135.caption;
        this._SafeStr_3195 = true;
        this._catalog.approveName(_loc2_, 1);
    };

    private onSelectProduct = (param1: SelectProductEvent): void => {
        if (param1 == null) {
            return;
        }
        this.updateImage();
    };

    private onApproveNameResult = (param1: CatalogWidgetApproveNameResultEvent): void => {
        let nameValidationInfo: string;
        let extraParameter: string;
        let event: CatalogWidgetApproveNameResultEvent = param1;
        if (event == null || !this._SafeStr_3195) {
            return;
        }
        this._SafeStr_3195 = false;
        nameValidationInfo = event.nameValidationInfo;
        if (event.result != 0) {
            this._catalog.purchaseWillBeGift(false);
        }
        switch (event.result - 1) {
            case 0:
                this._catalog.windowManager.alert("${catalog.alert.purchaseerror.title}", this.constructErrorMessage("long", nameValidationInfo), 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                return;
            case 1:
                this._catalog.windowManager.alert("${catalog.alert.purchaseerror.title}", this.constructErrorMessage("short", nameValidationInfo), 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                return;
            case 2:
                this._catalog.windowManager.alert("${catalog.alert.purchaseerror.title}", this.constructErrorMessage("chars", nameValidationInfo), 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                return;
            case 3:
                this._catalog.windowManager.alert("${catalog.alert.purchaseerror.title}", this.constructErrorMessage("bobba", nameValidationInfo), 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                   param1.dispose();
               });
                return;
            default:
                extraParameter = this.getPurchaseParameters();
                if (extraParameter == "") {
                    Logger.log("* Not enough information to buy a pet!");
                    return;
                }
                Logger.log("* Will buy pet as " + extraParameter);
                this._catalog.showPurchaseConfirmation(this._offers.getWithIndex(0), this.page.pageId, extraParameter, 1, null, null, true, this.getPetImage());
                return;
        }
    };

    private constructErrorMessage(param1: string, param2: string): string {
        let _loc4_: IHabboLocalizationManager = this._catalog.localization;
        let _loc3_: string = "catalog.alert.petname." + param1;
        let _loc6_: string = _loc3_ + ".additionalInfo";
        _loc4_.registerParameter(_loc6_, "additional_info", param2);
        let _loc7_: string = _loc4_.getLocalization(_loc3_);
        let _loc5_: string = _loc4_.getLocalization(_loc6_);
        if (param2 != null && param2.length > 0 && _loc5_ != null && _loc5_.length > 0) {
            _loc7_ = _loc5_;
        }
        return _loc7_;
    }

    private onSellablePetPalettes = (param1: CatalogWidgetSellablePetPalettesEvent): void => {
        if (param1.productCode == this._selectedProductCode) {
            this._availablePalettes = this.parseSellablePalettes(param1.sellablePalettes);
            this.initializePaletteSelection();
            this.selectedPalette(0);
            this.updateImage();
        }
    };

    private parseSellablePalettes(param1: any[]): any[] {
        if (!param1) {
            return null;
        }
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.type == this._SafeStr_2530 && _loc3_.sellable) {
                _loc2_.push(_loc3_);
            }
        }
        return _loc2_;
    }

    private getPetImage(): BitmapData {
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        let _loc13_: PetColorResult = null;
        let _loc12_: PetColorResult = null;
        let _loc1_: number = 0;
        let _loc14_: number = 0;
        let _loc11_: PetCustomPart = null;
        let _loc5_: PetCustomPart = null;
        let _loc10_: IPurchasableOffer = this._offers.getWithIndex(0);
        if (_loc10_ == null || this._SafeStr_2634 < 0) {
            return null;
        }
        let _loc6_: number = this._SafeStr_2530;
        let _loc3_: SellablePetPaletteData = this._availablePalettes[this._SafeStr_2634];
        let _loc7_: number = _loc3_.paletteId;
        let _loc9_: number = 16777215;
        let _loc16_: IRoomEngine = this._catalog.roomEngine;
        let _loc8_: boolean = NewPetsCatalogWidget.NORMAL_SIZE_PETS.indexOf(_loc6_) == -1;
        let _loc18_: Vector3d = _loc8_ ? new Vector3d(135) : new Vector3d(90);
        let _loc17_: any[] = [];
        switch (_loc6_ - 15) {
            case 0:
                _loc4_ = _loc16_.getPetLayerIdForTag(_loc6_, "hair");
                _loc2_ = _loc16_.getPetLayerIdForTag(_loc6_, "tail");
                _loc13_ = _loc16_.getPetDefaultPalette(_loc6_, "hair");
                _loc12_ = _loc16_.getPetDefaultPalette(_loc6_, "tail");
                _loc1_ = (_loc13_ ? parseInt(_loc13_.id) : -1) | 0;
                _loc14_ = (_loc12_ ? parseInt(_loc12_.id) : -1) | 0;
                _loc11_ = new PetCustomPart(_loc4_, -1, _loc1_);
                _loc5_ = new PetCustomPart(_loc2_, -1, _loc14_);
                _loc17_ = [_loc11_, _loc5_];
        }
        let _loc15_: ImageResult = _loc16_.getPetImage(_loc6_, _loc7_, _loc9_, _loc18_, 64, this, true, 0, _loc17_);
        if (_loc15_ != null) {
            this._SafeStr_5993 = _loc15_.id;
            return _loc15_.data;
        }
        return null;
    }

    private updateImage(): void {
        let _loc1_: IPurchasableOffer = this._offers.getWithIndex(0);
        if (_loc1_ == null || this._SafeStr_2634 < 0) {
            return;
        }
        let _loc2_: BitmapData = this.getPetImage();
        if (_loc2_ != null) {
            this.setPreviewImage(_loc2_, true);
        }
        let _loc4_: IWindow = this.window.findChildByName("ctlg_teaserimg_1");
        this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(_loc1_, this._window, this._SafeStr_2857, _loc4_, -6, false, 6);
        let _loc3_: IWindow = this._window.findChildByName("pet_breed_text");
        if (_loc3_) {
            _loc3_.caption = this.getPetLocalization();
        }
    }

    private getPurchaseParameters(): string {
        let color: number = 0;
        let data: SellablePetPaletteData;
        let p: string;
        let name: string = this._SafeStr_2135.caption;
        if (name == null || name.length == 0) {
            this._catalog.windowManager.alert("${catalog.alert.purchaseerror.title}", "${catalog.alert.petname.empty}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
            return "";
        }
        if (this._SafeStr_2634 < 0) {
            return "";
        }
        color = 16777215;
        data = this._availablePalettes[this._SafeStr_2634];
        p = name + String.fromCharCode(10) + data.paletteId + String.fromCharCode(10) + this.addZeroPadding(color.toString(16).toUpperCase(), 6);
        return p;
    }

    private setPreviewImage(param1: BitmapData, param2: boolean): void {
        let _loc6_: IBitmapWrapperWindow = null;
        let _loc5_: number = 0;
        let _loc3_: BitmapData = null;
        let _loc4_: Point = null;
        if (!this.window.disposed) {
            if (param1 == null) {
                param1 = new BitmapData(1, 1);
                param2 = true;
            }
            _loc6_ = asGuarded(this.window.findChildByName("ctlg_teaserimg_1"), isIBitmapWrapperWindow);
            if (_loc6_ != null) {
                if (_loc6_.bitmap == null) {
                    _loc6_.bitmap = new BitmapData(_loc6_.width, _loc6_.height, true, 16777215);
                }
                _loc6_.bitmap.fillRect(_loc6_.bitmap.rect, 16777215);
                _loc5_ = 1;
                if (NewPetsCatalogWidget.NORMAL_SIZE_PETS.indexOf(this._SafeStr_2530) == -1) {
                    _loc5_ = 2;
                }
                _loc3_ = new BitmapData(param1.width * _loc5_, param1.height * _loc5_, true, 16777215);
                _loc3_.draw(param1, new Matrix(_loc5_, 0, 0, _loc5_));
                _loc4_ = new Point((_loc6_.width - _loc3_.width) / 2, (_loc6_.height - _loc3_.height) / 2);
                _loc6_.bitmap.copyPixels(_loc3_, _loc3_.rect, _loc4_, null, null, true);
                _loc6_.invalidate();
                _loc3_.dispose();
            }
        }
        if (param2) {
            param1.dispose();
        }
    }

    private getPetTypeIndexFromProduct(param1: string): number {
        if (param1.length == 0) {
            return 0;
        }
        let _loc2_: number = 0;
        _loc2_ = param1.length - 1;
        while (_loc2_ >= 0) {
            if (isNaN(parseInt(param1.charAt(_loc2_)))) {
                break;
            }
            _loc2_--;
        }
        if (_loc2_ > 0) {
            return Number(param1.substring(_loc2_ + 1)) | 0;
        }
        return -1;
    }

    private getRaceLocalizationKey(param1: number, param2: number): string {
        return "pet.breed." + param1 + "." + param2;
    }

    private addZeroPadding(param1: string, param2: number): string {
        while (param1.length < param2) {
            param1 = "0" + param1;
        }
        return param1;
    }

    private updateAvailablePalettes(param1: string): void {
        let _loc2_: any[] = null;
        if (this._availablePalettes == null) {
            _loc2_ = this._catalog.getSellablePetPalettes(param1);
            this._availablePalettes = this.parseSellablePalettes(_loc2_);
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed) {
            return;
        }
        if (param1 == this._SafeStr_5993) {
            this.setPreviewImage(param2, true);
            this.onWidgetsInitialized();
        }
    }

    public imageFailed(param1: number): void {
    }

    get [IGetImageListener](): true {
        return true;
    }
}
