import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';

export class FurnitureRegionData extends FurnitureLabelData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::FurnitureRegionData'); }

    declare private _description: string;

    declare private _xOffset: number;
    static { (this.prototype as any)._xOffset = 0; }

    declare private _yOffset: number;
    static { (this.prototype as any)._yOffset = 0; }

    declare private _minWidth: number;
    static { (this.prototype as any)._minWidth = 0; }

    declare private _minHeight: number;
    static { (this.prototype as any)._minHeight = 0; }

    declare private _color: string;

    declare private _SafeStr_14809: Rectangle[];

    constructor(param1: number, param2: string, param3: string, param4: number, param5: number, param6: number, param7: number, param8: string, param9: Rectangle[]) {
        super(param1, param2, 1);
        this._description = param3;
        this._xOffset = param4;
        this._yOffset = param5;
        this._minWidth = param6;
        this._minHeight = param7;
        this._color = param8;
        this._SafeStr_14809 = param9 == null ? new Array<Rectangle>(0).fill(null) : param9;
    }

    public get title(): string {
        return this.text;
    }

    public get description(): string {
        return this._description;
    }

    public get xOffset(): number {
        return this._xOffset;
    }

    public get yOffset(): number {
        return this._yOffset;
    }

    public get minWidth(): number {
        return this._minWidth;
    }

    public get minHeight(): number {
        return this._minHeight;
    }

    public get color(): string {
        return this._color;
    }

    public get areas(): Rectangle[] {
        return this._SafeStr_14809;
    }

    public override equals(param1: FurnitureLabelData): boolean {
        let _loc2_: number = 0;
        if (!(param1 instanceof FurnitureRegionData) || !super.equals(param1)) {
            return false;
        }
        let _loc3_: FurnitureRegionData = param1 instanceof FurnitureRegionData ? param1 : null;
        if (_loc3_.description != this._description || _loc3_.xOffset != this._xOffset || _loc3_.yOffset != this._yOffset || _loc3_.minWidth != this._minWidth || _loc3_.minHeight != this._minHeight || _loc3_.color != this._color) {
            return false;
        }
        let _loc4_: Rectangle[] = _loc3_.areas;
        if (_loc4_.length != this._SafeStr_14809.length) {
            return false;
        }
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14809.length) {
            if (!this._SafeStr_14809[_loc2_].equals(_loc4_[_loc2_])) {
                return false;
            }
            _loc2_++;
        }
        return true;
    }
}
