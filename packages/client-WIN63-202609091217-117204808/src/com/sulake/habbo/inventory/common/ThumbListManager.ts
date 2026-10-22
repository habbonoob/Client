import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IThumbListDataProvider } from '@/com/sulake/habbo/inventory/common/IThumbListDataProvider';
import type { IThumbListDrawableItem } from '@/com/sulake/habbo/inventory/IThumbListDrawableItem';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIThumbListDrawableItem } from '@/com/sulake/habbo/inventory/IThumbListDrawableItem';

export class ThumbListManager {
    static { registerClassName(this, 'com.sulake.habbo.inventory.common::ThumbListManager'); }

    declare private _SafeStr_4748: IThumbListDataProvider;

    declare private _SafeStr_2602: number;
    static { (this.prototype as any)._SafeStr_2602 = 0; }

    private _SafeStr_3185: number = 1;

    declare private _SafeStr_2152: BitmapData;

    declare private _SafeStr_8309: number;
    static { (this.prototype as any)._SafeStr_8309 = 0; }

    declare private _listItemWidth: number;
    static { (this.prototype as any)._listItemWidth = 0; }

    declare private _viewWidth: number;
    static { (this.prototype as any)._viewWidth = 0; }

    declare private _SafeStr_4143: number;
    static { (this.prototype as any)._SafeStr_4143 = 0; }

    declare private _thumbWidth: number;
    static { (this.prototype as any)._thumbWidth = 0; }

    declare private _SafeStr_2307: number;
    static { (this.prototype as any)._SafeStr_2307 = 0; }

    declare private _SafeStr_3384: BitmapData;

    declare private _SafeStr_6817: BitmapData;

    constructor(param1: IAssetLibrary, param2: IThumbListDataProvider, param3: string, param4: string, param5: number, param6: number) {
        this._SafeStr_4748 = param2;
        let _loc7_: BitmapDataAsset = castTo(param1.getAssetByName(param3), BitmapDataAsset);
        if (_loc7_ != null) {
            this._SafeStr_3384 = castTo(_loc7_.content, BitmapData);
        }
        let _loc8_: BitmapDataAsset = castTo(param1.getAssetByName(param4), BitmapDataAsset);
        if (_loc8_ != null) {
            this._SafeStr_6817 = castTo(_loc8_.content, BitmapData);
        }
        this._thumbWidth = this._SafeStr_3384.width;
        this._SafeStr_2307 = this._SafeStr_3384.height;
        this._viewWidth = param5;
        this._SafeStr_4143 = param6;
        this._SafeStr_2602 = Math.floor(this._viewWidth / this._thumbWidth) | 0;
        this._SafeStr_2152 = new BitmapData(this._viewWidth, this._SafeStr_4143);
    }

    public dispose(): void {
        this._SafeStr_4748 = null;
        this._SafeStr_2152 = null;
    }

    public updateImageFromList(): void {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: IThumbListDrawableItem = null;
        let _loc2_: BitmapData = null;
        this._SafeStr_3185 = this.resolveRowCountFromList();
        if (this._SafeStr_3185 == 0) {
            this._SafeStr_2152 = new BitmapData(this._viewWidth, this._SafeStr_4143);
            return;
        }
        this._SafeStr_2152 = new BitmapData(Math.max(this._SafeStr_2602 * this._thumbWidth, this._viewWidth) | 0, Math.max(this._SafeStr_3185 * this._SafeStr_2307, this._SafeStr_4143) | 0, true, 16777215);
        this._SafeStr_2152.fillRect(this._SafeStr_2152.rect, 4294967295);
        let _loc6_: number = 0;
        let _loc4_: any[] = this.getList();
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_3185) {
            _loc3_ = 0;
            while (_loc3_ < this._SafeStr_2602) {
                if (_loc6_ < _loc4_.length) {
                    _loc1_ = _loc4_[_loc6_];
                    if (_loc1_ != null) {
                        _loc2_ = this.createThumbImage(_loc1_.iconImage, _loc1_.isSelected);
                        this._SafeStr_2152.copyPixels(_loc2_, _loc2_.rect, new Point(_loc3_ * this._thumbWidth, _loc5_ * this._SafeStr_2307), null, null, true);
                    }
                    _loc6_++;
                }
                _loc3_++;
            }
            _loc5_++;
        }
    }

    public addItemAsFirst(param1: IThumbListDrawableItem): void {
        let _loc2_: BitmapData = null;
        let _loc4_: Rectangle = null;
        if (param1 == null) {
            return;
        }
        let _loc5_: Point = this.resolveLastItemGridLoc();
        if (_loc5_.x == this._SafeStr_2602 && this._SafeStr_2152.height < _loc5_.y * this._SafeStr_2307) {
            _loc2_ = new BitmapData(this._SafeStr_2152.width, this._SafeStr_2152.height + this._SafeStr_2307);
        } else {
            _loc2_ = new BitmapData(this._SafeStr_2152.width, this._SafeStr_2152.height);
        }
        let _loc3_: BitmapData = this.createThumbImage(param1.iconImage, param1.isSelected);
        _loc2_.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0), null, null, true);
        _loc4_ = new Rectangle(0, 0, this._thumbWidth * (this._SafeStr_2602 - 1), this._SafeStr_2307);
        _loc2_.copyPixels(this._SafeStr_2152, _loc4_, new Point(this._thumbWidth, 0), null, null, true);
        _loc4_ = new Rectangle(this._thumbWidth * (this._SafeStr_2602 - 1), 0, this._thumbWidth, this._SafeStr_2152.height);
        _loc2_.copyPixels(this._SafeStr_2152, _loc4_, new Point(0, this._SafeStr_2307), null, null, true);
        _loc4_ = new Rectangle(0, this._SafeStr_2307, this._thumbWidth * (this._SafeStr_2602 - 1), this._SafeStr_2152.height - this._SafeStr_2307);
        _loc2_.copyPixels(this._SafeStr_2152, _loc4_, new Point(this._thumbWidth, this._SafeStr_2307), null, null, true);
        this._SafeStr_2152 = _loc2_;
    }

    public replaceItemImage(param1: number, param2: IThumbListDrawableItem): void {
        if (param2 == null) {
            return;
        }
        let _loc4_: Point = this.resolveGridLocationFromIndex(param1);
        let _loc5_: Point = new Point(_loc4_.x * this._thumbWidth, _loc4_.y * this._SafeStr_2307);
        let _loc3_: BitmapData = this.createThumbImage(param2.iconImage, param2.isSelected);
        this._SafeStr_2152.copyPixels(_loc3_, _loc3_.rect, _loc5_, null, null, true);
    }

    public getListImage(): BitmapData {
        return this._SafeStr_2152;
    }

    public removeItemInIndex(param1: number): void {
        let _loc2_: Point = this.resolveGridLocationFromIndex(param1);
        this.removeItemInImage(_loc2_);
    }

    public removeItemInLocation(param1: Point): void {
        let _loc2_: Point = this.resolveGridLocationFromImage(param1);
        this.removeItemInImage(_loc2_);
    }

    public updateListItem(param1: number): void {
        let _loc2_: IThumbListDrawableItem = this.getDrawableItem(param1);
        this.replaceItemImage(param1, _loc2_);
    }

    private getList(): any[] {
        let _loc1_: any[] = null;
        if (this._SafeStr_4748 != null) {
            _loc1_ = this._SafeStr_4748.getDrawableList();
        }
        return _loc1_ ? _loc1_ : [];
    }

    private getDrawableItem(param1: number): IThumbListDrawableItem {
        let _loc2_: any[] = this.getList();
        if (param1 >= 0 && param1 < _loc2_.length) {
            return asGuarded(_loc2_[param1], isIThumbListDrawableItem);
        }
        return null;
    }

    private resolveRowCountFromList(): number {
        let _loc1_: any[] = this.getList();
        return Math.ceil(_loc1_.length / this._SafeStr_2602) | 0;
    }

    private resolveLastItemGridLoc(): Point {
        let _loc2_: any[] = this.getList();
        return this.resolveGridLocationFromIndex(_loc2_.length - 1);
    }

    public resolveIndexFromImageLocation(param1: Point): number {
        let _loc3_: Point = this.resolveGridLocationFromImage(param1);
        return _loc3_.y * this._SafeStr_2602 + _loc3_.x | 0;
    }

    private resolveGridLocationFromImage(param1: Point): Point {
        let _loc2_: number = Math.floor(param1.y / this._SafeStr_2307) | 0;
        let _loc3_: number = Math.floor(param1.x / this._thumbWidth) | 0;
        return new Point(_loc3_, _loc2_);
    }

    private resolveGridLocationFromIndex(param1: number): Point {
        let _loc2_: number = Math.floor(param1 / this._SafeStr_2602) | 0;
        let _loc3_: number = param1 % this._SafeStr_2602;
        return new Point(_loc3_, _loc2_);
    }

    private removeItemInImage(param1: Point): void {
        let _loc7_: Rectangle = null;
        let _loc3_: Point = null;
        let _loc6_: number = 0;
        let _loc8_: number = 0;
        let _loc2_: BitmapData = null;
        let _loc9_: BitmapData = null;
        let _loc5_: BitmapData = null;
        let _loc12_: BitmapData = null;
        if (param1.x >= this._SafeStr_2602) {
            return;
        }
        if (param1.y >= this._SafeStr_3185) {
            return;
        }
        let _loc11_: number = this._SafeStr_2602 - param1.x - 1 | 0;
        _loc7_ = new Rectangle((param1.x + 1) * this._thumbWidth, param1.y * this._SafeStr_2307, _loc11_ * this._thumbWidth, this._SafeStr_2307);
        _loc3_ = new Point(param1.x * this._thumbWidth, param1.y * this._SafeStr_2307);
        let _loc4_: BitmapData = new BitmapData(_loc7_.width + this._thumbWidth | 0, _loc7_.height | 0);
        _loc4_.fillRect(_loc4_.rect, 4294967295);
        _loc4_.copyPixels(this._SafeStr_2152, _loc7_, new Point(0, 0), null, null, true);
        this._SafeStr_2152.copyPixels(_loc4_, _loc4_.rect, _loc3_, null, null, true);
        if (param1.y < this._SafeStr_3185 - 1) {
            _loc6_ = this._SafeStr_2152.width - this._thumbWidth;
            _loc8_ = this._SafeStr_2152.height - (param1.y + 1) * this._SafeStr_2307 | 0;
            _loc2_ = new BitmapData(_loc6_, _loc8_);
            _loc7_ = new Rectangle(this._thumbWidth, (param1.y + 1) * this._SafeStr_2307, _loc2_.width, _loc2_.height);
            _loc2_.copyPixels(this._SafeStr_2152, _loc7_, new Point(0, 0), null, null, true);
            _loc9_ = new BitmapData(this._thumbWidth, _loc7_.height | 0);
            _loc7_.x = 0;
            _loc7_.width = this._thumbWidth;
            _loc9_.copyPixels(this._SafeStr_2152, _loc7_, new Point(0, 0), null, null, true);
            this._SafeStr_2152.fillRect(new Rectangle(0, this._SafeStr_2152.height - this._SafeStr_2307, this._SafeStr_2152.width, this._SafeStr_2307), 4294967295);
            _loc3_ = new Point(this._SafeStr_2152.width - this._thumbWidth, _loc7_.y - this._SafeStr_2307);
            this._SafeStr_2152.copyPixels(_loc9_, _loc9_.rect, _loc3_, null, null, true);
            _loc3_ = new Point(0, _loc7_.y);
            this._SafeStr_2152.copyPixels(_loc2_, _loc2_.rect, _loc3_, null, null, true);
        }
        let _loc10_: number = this.getList().length - 1;
        if (_loc10_ > 0) {
            param1 = this.resolveGridLocationFromIndex(_loc10_);
            if (param1.x == this._SafeStr_2602 - 1) {
                _loc5_ = new BitmapData(this._SafeStr_2152.width, this._SafeStr_2152.height - this._SafeStr_2307);
                _loc7_ = new Rectangle(0, 0, this._SafeStr_2152.width, this._SafeStr_2152.height - this._SafeStr_2307);
                _loc5_.copyPixels(this._SafeStr_2152, _loc7_, new Point(0, 0), null, null, true);
                this._SafeStr_2152 = _loc5_;
                this._SafeStr_3185 = this._SafeStr_3185 - 1;
            }
        }
        if (this._SafeStr_2152.height < this._SafeStr_4143) {
            _loc12_ = new BitmapData(this._SafeStr_2152.width, this._SafeStr_4143);
            _loc12_.fillRect(_loc12_.rect, 4294967295);
            _loc12_.copyPixels(this._SafeStr_2152, this._SafeStr_2152.rect, new Point(0, 0), null, null, true);
            this._SafeStr_2152 = _loc12_;
        }
    }

    private createThumbImage(param1: BitmapData = null, param2: boolean = false): BitmapData {
        let _loc3_: Point = null;
        let _loc4_: BitmapData = new BitmapData(this._SafeStr_3384.width, this._SafeStr_3384.height);
        if (param2) {
            _loc4_.copyPixels(this._SafeStr_6817, this._SafeStr_3384.rect, new Point(0, 0), null, null, false);
        } else {
            _loc4_.copyPixels(this._SafeStr_3384, this._SafeStr_3384.rect, new Point(0, 0), null, null, false);
        }
        if (param1 != null) {
            _loc3_ = new Point((_loc4_.width - param1.width) / 2, (_loc4_.height - param1.height) / 2);
            _loc4_.copyPixels(param1, param1.rect, _loc3_, null, null, true);
        }
        return _loc4_;
    }
}
