import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import { SkinLayoutEntity } from '@/com/sulake/core/window/graphics/renderer/SkinLayoutEntity';
import { ChildEntityArray } from '@/com/sulake/core/window/utils/ChildEntityArray';

export class SkinLayout extends ChildEntityArray implements ISkinLayout {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::SkinLayout'); }

    declare protected _name: string;

    declare protected _width: number;
    static { (this.prototype as any)._width = 0; }

    declare protected _height: number;
    static { (this.prototype as any)._height = 0; }

    declare protected _blendMode: string;

    declare protected _SafeStr_7296: boolean;
    static { (this.prototype as any)._SafeStr_7296 = false; }

    constructor(param1: string, param2: boolean, param3: string) {
        super();
        this._name = param1;
        this._width = 0;
        this._height = 0;
        this._blendMode = param3;
        this._SafeStr_7296 = param2;
    }

    public get name(): string {
        return this._name;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get blendMode(): string {
        return this._blendMode;
    }

    public get transparent(): boolean {
        return this._SafeStr_7296;
    }

    public dispose(): void {
        let _loc2_: any = 0;
        let _loc1_: number = this.numChildren >>> 0;
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            castTo(this.removeChildAt(0), SkinLayoutEntity).dispose();
            _loc2_++;
        }
    }

    public calculateActualRect(param1: Rectangle): void {
        let _loc5_: SkinLayoutEntity = null;
        let _loc3_: any = 0;
        let _loc4_: Rectangle = null;
        let _loc2_: number = this.numChildren >>> 0;
        param1.x = 4294967295;
        param1.y = 4294967295;
        param1.width = 0;
        param1.height = 0;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc5_ = asInstanceOf(this.getChildAt(_loc3_ | 0), SkinLayoutEntity);
            _loc4_ = _loc5_.region;
            if (_loc4_.left < param1.left) {
                param1.left = _loc4_.left;
            }
            if (_loc4_.top < param1.top) {
                param1.top = _loc4_.top;
            }
            if (_loc4_.right > param1.right) {
                param1.right = _loc4_.right;
            }
            if (_loc4_.bottom > param1.bottom) {
                param1.bottom = _loc4_.bottom;
            }
            _loc3_++;
        }
    }

    public isFixedWidth(): boolean {
        let _loc2_: any = 0;
        let _loc1_: number = this.numChildren >>> 0;
        if (_loc1_ == 0) {
            return false;
        }
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            if (castTo(this.getChildAt(_loc2_ | 0), SkinLayoutEntity).scaleH != 0) {
                return false;
            }
            _loc2_++;
        }
        return true;
    }

    public calculateWidth(): number {
        let _loc4_: Rectangle = null;
        let _loc3_: any = 0;
        let _loc2_: number = 0;
        let _loc1_: number = this.numChildren >>> 0;
        _loc3_ = 0;
        while (_loc3_ < _loc1_) {
            _loc4_ = castTo(this.getChildAt(_loc3_ | 0), SkinLayoutEntity).region;
            if (_loc4_.right > _loc2_) {
                _loc2_ = _loc4_.right >>> 0;
            }
            _loc3_++;
        }
        return _loc2_;
    }

    public isFixedHeight(): boolean {
        let _loc2_: any = 0;
        let _loc1_: number = this.numChildren >>> 0;
        if (_loc1_ == 0) {
            return false;
        }
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            if (castTo(this.getChildAt(_loc2_ | 0), SkinLayoutEntity).scaleV != 0) {
                return false;
            }
            _loc2_++;
        }
        return true;
    }

    public calculateHeight(): number {
        let _loc3_: Rectangle = null;
        let _loc2_: any = 0;
        let _loc4_: number = 0;
        let _loc1_: number = this.numChildren >>> 0;
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            _loc3_ = castTo(this.getChildAt(_loc2_ | 0), SkinLayoutEntity).region;
            if (_loc3_.bottom > _loc4_) {
                _loc4_ = _loc3_.bottom >>> 0;
            }
            _loc2_++;
        }
        return _loc4_;
    }

    public getDefaultRegion(param1: string, param2: Rectangle): void {
        let _loc3_: SkinLayoutEntity = asInstanceOf(this.getChildByName(param1), SkinLayoutEntity);
        if (_loc3_ == null) {
            throw new Error("Entity not found: " + param1 + "!");
        }
        param2.x = _loc3_.region.x;
        param2.y = _loc3_.region.y;
        param2.width = _loc3_.region.width;
        param2.height = _loc3_.region.height;
    }

    public override addChild(param1: IChildEntity): IChildEntity {
        let _loc2_: SkinLayoutEntity = castTo(param1, SkinLayoutEntity);
        this._width = (_loc2_.region.right > this._width ? _loc2_.region.right : this._width) >>> 0;
        this._height = (_loc2_.region.bottom > this._height ? _loc2_.region.bottom : this._height) >>> 0;
        return super.addChild(param1);
    }

    public override addChildAt(param1: IChildEntity, param2: number): IChildEntity {
        let _loc3_: SkinLayoutEntity = castTo(param1, SkinLayoutEntity);
        this._width = (_loc3_.region.right > this._width ? _loc3_.region.right : this._width) >>> 0;
        this._height = (_loc3_.region.bottom > this._height ? _loc3_.region.bottom : this._height) >>> 0;
        return super.addChildAt(param1, param2);
    }

    public override removeChild(param1: IChildEntity): IChildEntity {
        super.removeChild(param1);
        this._width = this.calculateWidth();
        this._height = this.calculateHeight();
        return param1;
    }

    public override removeChildAt(param1: number): IChildEntity {
        let _loc2_: IChildEntity = super.removeChildAt(param1);
        this._width = this.calculateWidth();
        this._height = this.calculateHeight();
        return _loc2_;
    }

    get [ISkinLayout](): true {
        return true;
    }
}
