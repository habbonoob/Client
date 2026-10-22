import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { Offer } from '@/com/sulake/habbo/catalog/viewer/Offer';
import type { CatalogWidgetApproveNameResultEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetApproveNameResultEvent';
import type { CatalogWidgetColourIndexEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColourIndexEvent';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { CatalogWidgetSellablePetPalettesEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSellablePetPalettesEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetColoursEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColoursEvent';
import { CatalogWidgetPurchaseOverrideEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetPurchaseOverrideEvent';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { SellablePetPaletteData } from '@/com/sulake/habbo/communication/messages/parser/catalog/SellablePetPaletteData';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class PetsCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::PetsCatalogWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        PetsCatalogWidget.#initStatics();
        return PetsCatalogWidget._log;
    }

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    declare private _offers: UtilsMap;

    private _SafeStr_2530: number = -1;
    private _SafeStr_2634: number = 0;
    private _selectedColorIndex: number = 0;

    declare private _selectedProductCode: string;

    private _SafeStr_3195: boolean = false;

    declare private _availablePalettes: any[];

    declare private _availableColors: any[];

    private _disposed_PetsCatalogWidget: boolean = false;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2857: IWindow;

    private _SafeStr_5993: number = -1;

    declare private _SafeStr_2135: IWindow;

    public override dispose(): void {
        if (this._disposed_PetsCatalogWidget) {
            return;
        }
        this._SafeStr_3195 = false;
        this._offers.dispose();
        this._offers = null;
        this._availablePalettes = null;
        this._availableColors = null;
        this._catalog = null;
        this._SafeStr_2857 = null;
        super.dispose();
        this._disposed_PetsCatalogWidget = true;
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._SafeStr_3195 = false;
        let _loc2_: IWindow = this.window.findChildByName("ctlg_buy_button");
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
        if (this._SafeStr_2530 >= 8) {
            return false;
        }
        this.updateAvailablePalettes(_loc1_.localizationId);
        this._selectedProductCode = _loc1_.localizationId;
        this.updateAvailableColors();
        this._offers.add(this._SafeStr_2530, _loc1_);
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.addEventListener("COLOUR_INDEX", this.onColourIndex);
        this.events.addEventListener("CWE_APPROVE_RESULT", this.onApproveNameResult);
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        this.events.addEventListener("SELLABLE_PET_PALETTES", this.onSellablePetPalettes);
        return true;
    }

    public onDropMenuEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (param1.type == "WE_SELECTED") {
            _loc3_ = castGuarded(param2, isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection;
            if (this._availablePalettes == null || _loc3_ >= this._availablePalettes.length) {
                return;
            }
            this._SafeStr_2634 = _loc3_;
            this.updateImage();
        }
    };

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

    private updateAvailableColors(): void {
        this._availableColors = [];
        if (this._SafeStr_2530 == 0) {
            this._availableColors = [16743226, 16750435, 16764339, 16094464, 16498012, 16704690, 15586304, 16115545, 16513201, 8694111, 11585939, 14413767, 6664599, 9553845, 12971486, 8358322, 10002885, 13292268, 10780600, 12623573, 14403561, 12418717, 14327229, 15517403, 14515069, 15764368, 16366271, 11250603, 13948116, 16777215, 14256481, 14656129, 15848130, 14005087, 14337152, 15918540, 15118118, 15531929, 9764857, 11258085];
        } else if (this._SafeStr_2530 == 1) {
            this._availableColors = [16743226, 16750435, 16764339, 16094464, 16498012, 16704690, 15586304, 16115545, 16513201, 8694111, 11585939, 14413767, 6664599, 9553845, 12971486, 8358322, 10002885, 13292268, 10780600, 12623573, 14403561, 12418717, 14327229, 15517403, 14515069, 15764368, 16366271, 11250603, 13948116, 16777215, 14256481, 14656129, 15848130, 14005087, 14337152, 15918540, 15118118, 15531929, 9764857, 11258085];
        } else if (this._SafeStr_2530 == 2) {
            this._availableColors = [16579283, 15378351, 8830016, 15257125, 9340985, 8949607, 6198292, 8703620, 9889626, 8972045, 12161285, 13162269, 8620113, 12616503, 8628101, 13827840, 9764857];
        } else if (this._SafeStr_2530 == 3) {
            this._availableColors = [16777215, 15658734, 14540253];
        } else if (this._SafeStr_2530 == 4) {
            this._availableColors = [16777215, 16053490, 15464440, 16248792, 15396319, 15007487];
        } else if (this._SafeStr_2530 == 5) {
            this._availableColors = [16777215, 15658734, 14540253];
        } else if (this._SafeStr_2530 == 6) {
            this._availableColors = [16777215, 15658734, 14540253, 16767177, 16770205, 16751331];
        } else if (this._SafeStr_2530 == 7) {
            this._availableColors = [13421772, 11447982, 16751331, 10149119, 16763290, 16743786];
        }
    }

    private onPurchase = (param1: WindowEvent): void => {
        if (this._SafeStr_3195) {
            PetsCatalogWidget._log.warn("* Cannot buy a pet, pending previous name approval.");
        }
        if (this.getPurchaseParameters() == "") {
            return;
        }
        this._SafeStr_3195 = true;
        this._catalog.approveName(this._SafeStr_2135.caption, 1);
    };

    private constructErrorMessage(param1: string, param2: string): string {
        let _loc4_: IHabboLocalizationManager = this._catalog.localization;
        let _loc3_: string = "catalog.alert.petname." + param1;
        let _loc6_: string = _loc3_ + ".additionalInfo";
        _loc4_.registerParameter(_loc6_, "additional_info", param2);
        let _loc7_: any = _loc4_.getLocalization(_loc3_);
        let _loc5_: string = _loc4_.getLocalization(_loc6_);
        if (param2 != null && param2.length > 0 && _loc5_ != null && _loc5_.length > 0) {
            _loc7_ = _loc5_;
        }
        return stringOrNull(_loc7_);
    }

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

    private updatePaletteSelections(): void {
        let _loc4_: number = 0;
        let _loc3_: SellablePetPaletteData = null;
        let _loc1_: IHabboLocalizationManager = this._catalog.localization;
        let _loc2_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < this._availablePalettes.length) {
            _loc3_ = asInstanceOf(this._availablePalettes[_loc4_], SellablePetPaletteData);
            _loc2_.push(_loc1_.getLocalization(this.getRaceLocalizationKey(this._SafeStr_2530, _loc3_.breedId), this.getRaceLocalizationKey(this._SafeStr_2530, _loc3_.breedId)));
            _loc4_++;
        }
        let _loc5_: IDropMenuWindow = asGuarded(this.window.findChildByName("type_drop_menu"), isIDropMenuWindow);
        if (_loc5_ == null) {
            return;
        }
        if (_loc2_.length > 1) {
            _loc5_.populate(_loc2_);
            _loc5_.selection = 0;
            _loc5_.procedure = this.onDropMenuEvent;
            _loc5_.visible = true;
        } else {
            _loc5_.visible = false;
        }
        this.updateImage();
    }

    private getPetImage(): BitmapData {
        let _loc1_: Offer = this._offers.getWithIndex(0);
        if (_loc1_ == null) {
            return null;
        }
        if (this._availablePalettes == null || this._SafeStr_2634 >= this._availablePalettes.length) {
            return null;
        }
        let _loc2_: any = 16777215;
        if (this._selectedColorIndex >= 0 && this._selectedColorIndex < this._availableColors.length) {
            _loc2_ = this._availableColors[this._selectedColorIndex] >>> 0;
        }
        let _loc4_: number = this._SafeStr_2530;
        let _loc3_: SellablePetPaletteData = asInstanceOf(this._availablePalettes[this._SafeStr_2634], SellablePetPaletteData);
        let _loc5_: number = _loc3_.paletteId;
        let _loc6_: ImageResult = this._catalog.roomEngine.getPetImage(_loc4_, _loc5_, _loc2_ | 0, new Vector3d(90, 0, 0), 64, this);
        if (_loc6_ != null) {
            this._SafeStr_5993 = _loc6_.id;
            return _loc6_.data;
        }
        return null;
    }

    private updateImage(): void {
        let _loc1_: Offer = this._offers.getWithIndex(0);
        if (_loc1_ == null || this._SafeStr_2634 < 0) {
            return;
        }
        let _loc2_: BitmapData = this.getPetImage();
        if (_loc2_ != null) {
            this.setPreviewImage(_loc2_, true);
        }
        let _loc3_: IWindow = this.window.findChildByName("ctlg_teaserimg_1");
        this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(_loc1_, this._window, this._SafeStr_2857, _loc3_, -6, false, 6);
    }

    private getPurchaseParameters(): string {
        let color: number = 0;
        let data: SellablePetPaletteData;
        let paletteId: number = 0;
        let p: string;
        let name: string = this._SafeStr_2135.caption;
        if (name == null || name.length == 0) {
            this._catalog.windowManager.alert("${catalog.alert.purchaseerror.title}", "${catalog.alert.petname.empty}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                    param1.dispose();
                });
            return "";
        }
        if (this._availablePalettes == null || this._SafeStr_2634 >= this._availablePalettes.length) {
            return "";
        }
        if (this._selectedColorIndex >= this._availableColors.length) {
            return "";
        }
        color = this._availableColors[this._selectedColorIndex] >>> 0;
        data = asInstanceOf(this._availablePalettes[this._SafeStr_2634], SellablePetPaletteData);
        paletteId = data.paletteId;
        p = name + String.fromCharCode(10) + paletteId + String.fromCharCode(10) + this.addZeroPadding(color.toString(16).toUpperCase(), 6);
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
                _loc5_ = 2;
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
            this._SafeStr_2634 = 0;
            if (this._availablePalettes != null) {
                this.updatePaletteSelections();
            }
        }
    }

    private onWidgetsInitialized = (param1: CatalogWidgetEvent = null): void => {
        if (this._disposed_PetsCatalogWidget) {
            return;
        }
        this.events.dispatchEvent(new CatalogWidgetPurchaseOverrideEvent(this.onPurchase));
        let _loc2_: Offer = this._offers.getWithIndex(0);
        if (_loc2_ != null) {
            this.events.dispatchEvent(new SelectProductEvent(_loc2_));
        }
        let _loc4_: any[] = [];
        for (const _loc3_ of this._availableColors ?? []) {
            _loc4_.push(_loc3_);
        }
        this.events.dispatchEvent(new CatalogWidgetColoursEvent(_loc4_, "ctlg_clr_27x22_1", "ctlg_clr_27x22_2", "ctlg_clr_27x22_3"));
    };

    private onSelectProduct = (param1: SelectProductEvent): void => {
        if (param1 == null) {
            return;
        }
        this.updateImage();
    };

    private onColourIndex = (param1: CatalogWidgetColourIndexEvent): void => {
        if (param1 == null) {
            return;
        }
        this._selectedColorIndex = param1.index;
        if (this._selectedColorIndex < 0 || this._selectedColorIndex > this._availableColors.length) {
            this._selectedColorIndex = 0;
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
                    PetsCatalogWidget._log.warn("* Not enough information to buy a pet!");
                    return;
                }
                PetsCatalogWidget._log.info("* Will buy pet as " + extraParameter);
                this._catalog.showPurchaseConfirmation(this._offers.getWithIndex(0), this.page.pageId, extraParameter, 1, null, null, true, this.getPetImage());
                return;
        }
    };

    private onSellablePetPalettes = (param1: CatalogWidgetSellablePetPalettesEvent): void => {
        if (param1.productCode == this._selectedProductCode) {
            this._availablePalettes = this.parseSellablePalettes(param1.sellablePalettes);
            this._SafeStr_2634 = 0;
            this.updatePaletteSelections();
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PetsCatalogWidget.#staticsReady) return;
        PetsCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PetsCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.widgets.PetsCatalogWidget"));
    }

    get [IGetImageListener](): true {
        return true;
    }
}
