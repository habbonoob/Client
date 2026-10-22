import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurnitureRecolorPreviewView implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.recolor::FurnitureRecolorPreviewView'); }

    declare private _window: IWindowContainer;

    declare private _roomEngine: IRoomEngine;

    declare private _typeId: number;
    static { (this.prototype as any)._typeId = 0; }

    declare private _direction: IVector3d;

    declare private _extraData: string;

    declare private _stuffData: UtilsMap;

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _SafeStr_14600: number;
    static { (this.prototype as any)._SafeStr_14600 = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: IRoomEngine) {
        this._window = param1;
        this._roomEngine = param2;
        this.previewImage.disposesBitmap = true;
    }

    public open(param1: IRoomObject, param2: number): void {
        this._typeId = param1.getModel().getNumber("furniture_type_id") | 0;
        this._direction = new Vector3d(param1.getDirection().x, param1.getDirection().y, param1.getDirection().z);
        this._extraData = param1.getModel().getString("furniture_extras");
        let _loc3_: UtilsMap = param1.getModel().getStringToStringMap("furniture_data");
        this._stuffData = _loc3_ != null ? _loc3_.clone() : new UtilsMap();
        if (this._stuffData.getValue("state") == null) {
            this._stuffData.add("state", String(param1.getState(0)));
        }
        this._SafeStr_14600 = 0;
        this._color = 4294967295;
        this.previewImage.bitmap = null;
        this.setColor(param2);
    }

    public setColor(param1: number): void {
        if (param1 == this._color) {
            return;
        }
        this._color = param1;
        if (this._SafeStr_14600 == 0) {
            this.render();
        }
    }

    private render(): void {
        let _loc2_: UtilsMap = this._stuffData.clone();
        _loc2_["r"] = String(this._color >> 16 & 0xFF);
        _loc2_["g"] = String(this._color >> 8 & 0xFF);
        _loc2_["b"] = String(this._color & 0xFF);
        let _loc1_: ImageResult = this._roomEngine.getFurnitureImage(this._typeId, this._direction, 64, this, 0, this._extraData, -1, -1, new MapStuffData(_loc2_));
        if (_loc1_ == null) {
            return;
        }
        this._SafeStr_14600 = _loc1_.id > 0 ? _loc1_.id : 0;
        if (_loc1_.data != null) {
            this.showImage(_loc1_.data);
            _loc1_.data.dispose();
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (!this._disposed && param1 == this._SafeStr_14600) {
            this._SafeStr_14600 = 0;
            param2.dispose();
            this.render();
        } else if (param2 != null) {
            param2.dispose();
        }
    }

    public imageFailed(param1: number): void {
        if (param1 == this._SafeStr_14600) {
            this._SafeStr_14600 = 0;
        }
    }

    private showImage(param1: BitmapData): void {
        let _loc2_: BitmapData = this.previewImage.bitmap;
        if (_loc2_ == null) {
            _loc2_ = new BitmapData(this.previewImage.width, this.previewImage.height, true, 0);
        } else {
            _loc2_.fillRect(_loc2_.rect, 0);
        }
        let _loc4_: number = Number(Math.min(1, _loc2_.width / param1.width, _loc2_.height / param1.height));
        let _loc3_: Matrix = new Matrix();
        _loc3_.scale(_loc4_, _loc4_);
        _loc3_.translate(Math.round((_loc2_.width - param1.width * _loc4_) / 2), Math.round((_loc2_.height - param1.height * _loc4_) / 2));
        _loc2_.draw(param1, _loc3_);
        this.previewImage.bitmap = _loc2_;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.previewImage.bitmap = null;
        this._stuffData = null;
        this._direction = null;
        this._roomEngine = null;
        this._window = null;
    }

    private get previewImage(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("preview_image"), isIBitmapWrapperWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
