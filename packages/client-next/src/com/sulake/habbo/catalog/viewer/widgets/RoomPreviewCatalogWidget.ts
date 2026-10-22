import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IDragAndDropDoneReceiver } from '@/com/sulake/habbo/catalog/viewer/IDragAndDropDoneReceiver';
import type { CatalogWidgetUpdateRoomPreviewEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetUpdateRoomPreviewEvent';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetInitPurchaseEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetInitPurchaseEvent';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomPreviewCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener, IDragAndDropDoneReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::RoomPreviewCatalogWidget'); }

    private _imageResultIdRoom: number = -1;
    private _SafeStr_5230: number = -1;
    private _SafeStr_2640: BitmapData = null;
    private _SafeStr_2697: BitmapData = null;

    declare private _SafeStr_2694: any;

    declare private _offer: IPurchasableOffer;

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    public override dispose(): void {
        if (this._SafeStr_2640 != null) {
            this._SafeStr_2640.dispose();
            this._SafeStr_2640 = null;
        }
        if (this._SafeStr_2697 != null) {
            this._SafeStr_2697.dispose();
            this._SafeStr_2697 = null;
        }
        this.events.removeEventListener("UPDATE_ROOM_PREVIEW", this.onUpdateRoomPreview);
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        let _loc1_: IBitmapWrapperWindow = asGuarded(this.window.getChildByName("catalog_floor_preview_example"), isIBitmapWrapperWindow);
        _loc1_.procedure = this.eventProc;
        this.events.addEventListener("UPDATE_ROOM_PREVIEW", this.onUpdateRoomPreview);
        this.events.addEventListener("SELECT_PRODUCT", this.onPreviewProduct);
        return true;
    }

    private onPreviewProduct = (param1: SelectProductEvent): void => {
        if (param1 == null) {
            return;
        }
        this._offer = param1.offer;
    };

    private eventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_UP") {
            this._SafeStr_2694 = null;
        } else if (param1.type == "WME_DOWN") {
            if (param2 == null) {
                return;
            }
            this._SafeStr_2694 = param2;
        } else if (param1.type == "WME_OUT" && this._SafeStr_2694 != null && this._SafeStr_2694 == param2) {
            if (this._offer) {
                (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).requestSelectedItemToMover(this, this._offer);
                this._SafeStr_2694 = null;
            }
        } else if (param1.type == "WME_UP") {
            this._SafeStr_2694 == null;
        } else if (param1.type == "WME_CLICK") {
            this._SafeStr_2694 == null;
        } else if (param1.type == "WME_DOUBLE_CLICK") {
            this._SafeStr_2694 = null;
        }
    };

    public onDragAndDropDone(param1: boolean, param2: string): void {
        if (this.disposed) {
            return;
        }
        if (param1) {
            this.events.dispatchEvent(new CatalogWidgetInitPurchaseEvent(false, param2));
        }
    }

    public stopDragAndDrop(): void {
    }

    private onUpdateRoomPreview = (param1: CatalogWidgetUpdateRoomPreviewEvent): void => {
        let _loc4_: BitmapData = null;
        let _loc2_: BitmapData = null;
        let _loc6_: string = "window_double_default";
        let _loc3_: ImageResult = this.page.viewer.roomEngine.getRoomImage(param1.floorType, param1.wallType, param1.landscapeType, param1.tileSize, this, _loc6_);
        let _loc5_: ImageResult = this.page.viewer.roomEngine.getGenericRoomObjectImage(_loc6_, "", new Vector3d(180, 0, 0), param1.tileSize, this);
        if (_loc3_ != null && _loc5_ != null) {
            this._imageResultIdRoom = _loc3_.id;
            this._SafeStr_5230 = _loc5_.id;
            _loc4_ = _loc3_.data instanceof BitmapData ? _loc3_.data : null;
            _loc2_ = _loc5_.data instanceof BitmapData ? _loc5_.data : null;
            if (this._SafeStr_2640 != null) {
                this._SafeStr_2640.dispose();
            }
            if (this._SafeStr_2697 != null) {
                this._SafeStr_2697.dispose();
            }
            this._SafeStr_2640 = _loc4_;
            this._SafeStr_2697 = _loc2_;
            this.setRoomImage(_loc4_, _loc2_);
        }
    };

    private setRoomImage(param1: BitmapData, param2: BitmapData): void {
        let _loc3_: IBitmapWrapperWindow = null;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc8_: number = 0;
        if (param1 != null && param2 != null && !this.window.disposed) {
            _loc3_ = asGuarded(this.window.getChildByName("catalog_floor_preview_example"), isIBitmapWrapperWindow);
            if (_loc3_ != null) {
                if (_loc3_.bitmap == null) {
                    _loc3_.bitmap = new BitmapData(_loc3_.width, _loc3_.height, true, 16777215);
                }
                _loc5_ = -45;
                _loc4_ = 20;
                _loc3_.bitmap.fillRect(_loc3_.bitmap.rect, 16777215);
                _loc6_ = (_loc3_.width - param1.width) / 2 + _loc5_ | 0;
                _loc7_ = (_loc3_.height - param1.height) / 2 + _loc4_ | 0;
                _loc3_.bitmap.copyPixels(param1, param1.rect, new Point(_loc6_, _loc7_), null, null, true);
                _loc9_ = _loc3_.width / 2 + _loc5_ | 0;
                _loc8_ = _loc3_.height / 2 + _loc4_ - param2.height | 0;
                _loc9_ += 1;
                _loc8_ += 44;
                _loc3_.bitmap.copyPixels(param2, param2.rect, new Point(_loc9_, _loc8_), null, null, true);
                _loc3_.invalidate();
            }
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed) {
            return;
        }
        switch (param1) {
            case this._imageResultIdRoom:
                this._imageResultIdRoom = 0;
                if (this._SafeStr_2640 != null) {
                    this._SafeStr_2640.dispose();
                }
                this._SafeStr_2640 = param2;
                break;
            case this._SafeStr_5230:
                this._SafeStr_5230 = 0;
                if (this._SafeStr_2697 != null) {
                    this._SafeStr_2697.dispose();
                }
                this._SafeStr_2697 = param2;
        }
        if (this._SafeStr_2640 != null && this._SafeStr_2697 != null) {
            this.setRoomImage(this._SafeStr_2640, this._SafeStr_2697);
        }
    }

    public imageFailed(param1: number): void {
    }

    get [IGetImageListener](): true {
        return true;
    }
}
