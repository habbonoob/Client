import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { PetCustomPart } from '@/com/sulake/habbo/avatar/pets/PetCustomPart';

export class PetFigureData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.pets::PetFigureData'); }

    declare private _typeId: number;
    static { (this.prototype as any)._typeId = 0; }

    declare private _paletteId: number;
    static { (this.prototype as any)._paletteId = 0; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    declare private _customParts: any[];

    declare private _customLayerIds: any[];

    declare private _customPartIds: any[];

    declare private _customPaletteIds: any[];

    declare private _headOnly: boolean;
    static { (this.prototype as any)._headOnly = false; }

    constructor(param1: string) {
        let _loc2_: number = 0;
        this._typeId = this.getTypeId(param1);
        this._paletteId = this.getPaletteId(param1);
        this._color = this.getColor(param1);
        this._headOnly = this.getHeadOnly(param1);
        let _loc3_: any[] = this.getCustomData(param1);
        this._customLayerIds = this.getCustomLayerIds(_loc3_);
        this._customPartIds = this.getCustomPartIds(_loc3_);
        this._customPaletteIds = this.getCustomPaletteIds(_loc3_);
        this._customParts = [];
        _loc2_ = 0;
        while (_loc2_ < this._customLayerIds.length) {
            this._customParts.push(new PetCustomPart(this._customLayerIds[_loc2_] | 0, this._customPartIds[_loc2_] | 0, this._customPaletteIds[_loc2_] | 0));
            _loc2_++;
        }
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get paletteId(): number {
        return this._paletteId;
    }

    public get color(): number {
        return this._color;
    }

    public get customLayerIds(): any[] {
        return this._customLayerIds;
    }

    public get customPartIds(): any[] {
        return this._customPartIds;
    }

    public get customPaletteIds(): any[] {
        return this._customPaletteIds;
    }

    public get customParts(): any[] {
        return this._customParts;
    }

    public getCustomPart(param1: number): PetCustomPart {
        if (this._customParts != null) {
            for (const _loc2_ of this._customParts ?? []) {
                if (_loc2_.layerId == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public get hasCustomParts(): boolean {
        return this._customLayerIds != null && this._customLayerIds.length > 0;
    }

    public get headOnly(): boolean {
        return this._headOnly;
    }

    public get figureString(): string {
        let _loc2_: string = this.typeId + " " + this.paletteId + " " + this.color.toString(16);
        _loc2_ += " " + this.customParts.length;
        for (const _loc1_ of this.customParts ?? []) {
            _loc2_ += " " + _loc1_.layerId + " " + _loc1_.partId + " " + _loc1_.paletteId;
        }
        return _loc2_;
    }

    private getCustomData(param1: string): any[] {
        let _loc7_: any[] = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: any[] = [];
        if (param1 != null) {
            _loc7_ = param1.split(" ");
            _loc4_ = this._headOnly ? 1 : 0;
            _loc5_ = 4 + _loc4_;
            if (_loc7_.length > _loc5_) {
                _loc2_ = 3 + _loc4_;
                _loc6_ = parseInt(stringOrNull(_loc7_[_loc2_])) | 0;
                _loc3_ = _loc7_.slice(_loc5_, _loc5_ + _loc6_ * 3);
            }
        }
        return _loc3_;
    }

    private getCustomLayerIds(param1: any[]): any[] {
        let _loc3_: number = 0;
        let _loc2_: any[] = [];
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_.push(parseInt(stringOrNull(param1[_loc3_ + 0])));
            _loc3_ += 3;
        }
        return _loc2_;
    }

    private getCustomPartIds(param1: any[]): any[] {
        let _loc3_: number = 0;
        let _loc2_: any[] = [];
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_.push(parseInt(stringOrNull(param1[_loc3_ + 1])));
            _loc3_ += 3;
        }
        return _loc2_;
    }

    private getCustomPaletteIds(param1: any[]): any[] {
        let _loc3_: number = 0;
        let _loc2_: any[] = [];
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_.push(parseInt(stringOrNull(param1[_loc3_ + 2])));
            _loc3_ += 3;
        }
        return _loc2_;
    }

    private getTypeId(param1: string): number {
        let _loc2_: any[] = null;
        if (param1 != null) {
            _loc2_ = param1.split(" ");
            if (_loc2_.length >= 1) {
                return parseInt(stringOrNull(_loc2_[0])) | 0;
            }
        }
        return 0;
    }

    private getPaletteId(param1: string): number {
        let _loc2_: any[] = null;
        if (param1 != null) {
            _loc2_ = param1.split(" ");
            if (_loc2_.length >= 2) {
                return parseInt(stringOrNull(_loc2_[1])) | 0;
            }
        }
        return 0;
    }

    private getColor(param1: string): number {
        let _loc2_: any[] = null;
        if (param1 != null) {
            _loc2_ = param1.split(" ");
            if (_loc2_.length >= 3) {
                return parseInt(stringOrNull(_loc2_[2]), 16) | 0;
            }
        }
        return 16777215;
    }

    private getHeadOnly(param1: string): boolean {
        let _loc2_: any[] = null;
        if (param1 != null) {
            _loc2_ = param1.split(" ");
            if (_loc2_.length >= 4) {
                return _loc2_[3] == "head";
            }
        }
        return false;
    }
}
