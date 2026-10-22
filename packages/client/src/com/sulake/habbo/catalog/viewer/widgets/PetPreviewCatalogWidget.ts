import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { PetColorResult } from '@/com/sulake/habbo/room/PetColorResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { PetCustomPart } from '@/com/sulake/habbo/avatar/pets/PetCustomPart';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class PetPreviewCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::PetPreviewCatalogWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        PetPreviewCatalogWidget.#initStatics();
        return PetPreviewCatalogWidget._log;
    }

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    declare protected _gridItemLayout: XML;

    private PET_TYPE_ID: number = 15;
    private BREED: number = 1;
    private COLOR: number = 16777215;
    private PALETTE_ID: number = 2;
    private PART_ID: number = -1;

    declare private _productName: IWindow;

    declare private _productDescription: IWindow;

    declare private _previewImage: IBitmapWrapperWindow;

    declare private _previewOffset: Point;

    declare private _previewCallbackId: number;
    static { (this.prototype as any)._previewCallbackId = 0; }

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2857: IWindow;

    public override dispose(): void {
        this._catalog = null;
        this._SafeStr_2857 = null;
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this._productName = this._window.findChildByName("ctlg_product_name");
        this._productName.caption = "";
        this._productDescription = this._window.findChildByName("ctlg_description");
        this._productDescription.caption = "";
        this._previewImage = asGuarded(this._window.findChildByName("ctlg_teaserimg_1"), isIBitmapWrapperWindow);
        this._previewOffset = new Point(this._previewImage.x, this._previewImage.y);
        let _loc1_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("gridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(_loc1_.content, XML);
        let _loc2_: ImageResult = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).roomEngine.getPetImage(this.PET_TYPE_ID, this.PALETTE_ID, this.COLOR, new Vector3d(90), 64, this, true, 0);
        if (_loc2_ != null) {
            this.setPreviewImage(_loc2_.data, true, new Point(0, 0));
            this._previewCallbackId = _loc2_.id;
        }
        this.events.addEventListener("SELECT_PRODUCT", this.onPreviewProduct);
        return true;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed || this.page == null || this.page.offers == null) {
            return;
        }
        if (this._previewCallbackId == param1) {
            this.setPreviewImage(param2, true);
            this._previewCallbackId = 0;
        } else {
            for (const _loc3_ of this.page.offers ?? []) {
                if (_loc3_.previewCallbackId == param1) {
                    this.setPreviewImage(param2, true);
                    _loc3_.previewCallbackId = 0;
                    break;
                }
            }
        }
    }

    public imageFailed(param1: number): void {
    }

    private setPreviewImage(param1: BitmapData, param2: boolean, param3: Point = null): void {
        let _loc4_: Point = null;
        if (this._previewImage != null && !this.window.disposed) {
            if (param1 == null) {
                param1 = new BitmapData(1, 1);
                param2 = true;
            }
            if (this._previewImage.bitmap == null) {
                this._previewImage.bitmap = new BitmapData(this._previewImage.width, this._previewImage.height, true, 16777215);
            }
            this._previewImage.bitmap.fillRect(this._previewImage.bitmap.rect, 16777215);
            _loc4_ = new Point((this._previewImage.width - param1.width) / 2, (this._previewImage.height - param1.height) / 2);
            this._previewImage.bitmap.copyPixels(param1, param1.rect, _loc4_, null, null, true);
            this._previewImage.invalidate();
            this._previewImage.x = this._previewOffset.x | 0;
            this._previewImage.y = this._previewOffset.y | 0;
            if (param3 != null) {
                this._previewImage.x += param3.x;
                this._previewImage.y += param3.y;
            }
        }
        if (param2) {
            param1.dispose();
        }
    }

    private onPreviewProduct = (param1: SelectProductEvent): void => {
        let _loc30_: string = null;
        let _loc24_: string = null;
        let _loc31_: BitmapData = null;
        let _loc18_: IProduct = null;
        let _loc4_: ImageResult = null;
        let _loc11_: IFurnitureData = null;
        let _loc21_: string = null;
        let _loc2_: any[] = null;
        let _loc29_: number = 0;
        let _loc14_: any[] = null;
        let _loc26_: any[] = null;
        let _loc12_: any[] = null;
        let _loc15_: any[] = null;
        let _loc23_: number = 0;
        let _loc13_: string = null;
        let _loc6_: any[] = null;
        let _loc19_: number = 0;
        let _loc5_: number = 0;
        let _loc17_: number = 0;
        let _loc10_: PetColorResult = null;
        let _loc9_: PetColorResult = null;
        let _loc16_: number = 0;
        let _loc27_: number = 0;
        let _loc8_: PetCustomPart = null;
        let _loc22_: PetCustomPart = null;
        if (param1 == null) {
            return;
        }
        let _loc7_: IPurchasableOffer = param1.offer;
        let _loc25_: IProductData = this.page.viewer.catalog.getProductData(_loc7_.localizationId);
        if (_loc25_ != null) {
            _loc30_ = "${" + _loc25_.name + "}";
            _loc24_ = "${" + _loc25_.description + "}";
        } else {
            _loc30_ = "${" + _loc7_.localizationId + "}";
            _loc24_ = "${" + _loc7_.localizationId + "}";
        }
        this._productName.caption = _loc30_;
        this._productDescription.caption = _loc24_;
        this._productDescription.y = this._productName.y + this._productName.height + 5;
        this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(param1.offer, this._window, this._SafeStr_2857, this._previewImage, -6, true, 6);
        let _loc20_: Point = new Point(0, 0);
        let _loc28_: IRoomEngine = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).roomEngine;
        switch (_loc7_.pricingModel) {
            case "pricing_model_single":
            case "pricing_model_multi":
                _loc18_ = _loc7_.product;
                _loc11_ = _loc18_.furnitureData;
                if (_loc11_ == null || _loc11_.customParams == null) {
                    PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Unsupported product: " + _loc18_.productType);
                    break;
                }
                _loc21_ = _loc11_.customParams;
                _loc2_ = _loc21_.split(" ");
                if (_loc2_.length < 1) {
                    PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Invalid custom params: " + _loc18_.productType);
                    break;
                }
                _loc29_ = _loc2_[0] | 0;
                _loc15_ = [];
                switch (_loc11_.category - 13) {
                    case 0:
                        if (_loc2_.length < 2) {
                            PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Invalid custom params: " + _loc18_.productType);
                            break;
                        }
                        _loc13_ = stringOrNull(_loc2_[1]);
                        _loc6_ = _loc28_.getPetColorsByTag(_loc29_, _loc13_);
                        for (const _loc3_ of _loc6_ ?? []) {
                            if (_loc3_.breed == this.BREED) {
                                _loc19_ = _loc3_.id | 0;
                                break;
                            }
                        }
                        switch (_loc29_ - 15) {
                            case 0:
                                _loc5_ = 2;
                                _loc17_ = 3;
                                _loc10_ = _loc28_.getPetDefaultPalette(_loc29_, "hair");
                                _loc9_ = _loc28_.getPetDefaultPalette(_loc29_, "tail");
                                _loc16_ = (_loc10_ ? parseInt(_loc10_.id) : -1) | 0;
                                _loc27_ = (_loc9_ ? parseInt(_loc9_.id) : -1) | 0;
                                _loc8_ = new PetCustomPart(_loc5_, -1, _loc16_);
                                _loc22_ = new PetCustomPart(_loc17_, -1, _loc27_);
                                _loc15_ = [_loc8_, _loc22_];
                        }
                        _loc4_ = _loc28_.getPetImage(_loc29_, _loc19_, this.COLOR, new Vector3d(90), 64, this, true, 0, _loc15_);
                        break;
                    case 1:
                        if (_loc2_.length < 4) {
                            PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Invalid custom params: " + _loc18_.productType);
                            break;
                        }
                        _loc14_ = (asGuarded(_loc2_[1], isString)).split(",");
                        _loc26_ = (asGuarded(_loc2_[2], isString)).split(",");
                        _loc12_ = (asGuarded(_loc2_[3], isString)).split(",");
                        _loc23_ = 0;
                        while (_loc23_ < _loc14_.length) {
                            _loc15_.push(new PetCustomPart(_loc14_[_loc23_] | 0, _loc26_[_loc23_] | 0, _loc12_[_loc23_] | 0));
                            _loc23_++;
                        }
                        _loc4_ = _loc28_.getPetImage(_loc29_, this.PALETTE_ID, this.COLOR, new Vector3d(90), 64, this, true, 0, _loc15_);
                        break;
                    case 2:
                        if (_loc2_.length < 3) {
                            PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Invalid custom params: " + _loc18_.productType);
                            break;
                        }
                        _loc14_ = (asGuarded(_loc2_[1], isString)).split(",");
                        _loc12_ = (asGuarded(_loc2_[2], isString)).split(",");
                        _loc23_ = 0;
                        while (_loc23_ < _loc14_.length) {
                            _loc15_.push(new PetCustomPart(_loc14_[_loc23_] | 0, this.PART_ID, _loc12_[_loc23_] | 0));
                            _loc23_++;
                        }
                        _loc4_ = _loc28_.getPetImage(_loc29_, this.PALETTE_ID, this.COLOR, new Vector3d(90), 64, this, true, 0, _loc15_);
                        break;
                    case 3:
                        if (_loc2_.length < 4) {
                            PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Invalid custom params: " + _loc18_.productType);
                        }
                        _loc15_.push(new PetCustomPart(_loc2_[1] | 0, _loc2_[2] | 0, _loc2_[3] | 0));
                        _loc4_ = _loc28_.getPetImage(_loc29_, this.PALETTE_ID, this.COLOR, new Vector3d(90), 64, this, true, 0, _loc15_);
                        break;
                    default:
                        PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Unsupported Product Type: " + _loc18_.productType);
                }
                if (_loc4_ != null) {
                    _loc7_.previewCallbackId = _loc4_.id;
                    _loc31_ = _loc4_.data;
                }
                break;
            default:
                PetPreviewCatalogWidget._log.warn("[Pet Preview Catalog Widget] Unknown pricing model" + _loc7_.pricingModel);
        }
        this.setPreviewImage(_loc31_, true, _loc20_);
        this._window.invalidate();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PetPreviewCatalogWidget.#staticsReady) return;
        PetPreviewCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PetPreviewCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.widgets.PetPreviewCatalogWidget"));
    }

    get [IGetImageListener](): true {
        return true;
    }
}
