import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFigurePart } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePart';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { FigurePart } from '@/com/sulake/habbo/avatar/structure/figure/FigurePart';

export class FigurePartSet implements IFigurePartSet {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.figure::FigurePartSet'); }

    constructor(param1: XML, param2: string) {
        let _loc3_: FigurePart = null;
        let _loc5_: number = 0;
        this._type = param2;
        this._id = parseInt(param1.attribute("id").toString()) | 0;
        this._gender = String(param1.attribute("gender"));
        this._clubLevel = parseInt(param1.attribute("club").toString()) | 0;
        this._isColorable = Boolean(parseInt(param1.attribute("colorable").toString()));
        this._isSelectable = Boolean(parseInt(param1.attribute("selectable").toString()));
        this._isPreSelectable = Boolean(parseInt(param1.attribute("preselectable").toString()));
        this._isSellable = Boolean(parseInt(param1.attribute("sellable").toString()));
        this._parts = [];
        this._hiddenLayers = [];
        for (const _loc4_ of param1.child("part") ?? []) {
            _loc3_ = new FigurePart(_loc4_);
            _loc5_ = this.indexOfPartType(_loc3_);
            if (_loc5_ != -1) {
                this._parts.splice(_loc5_, 0, _loc3_);
            } else {
                this._parts.push(_loc3_);
            }
        }
        for (const _loc6_ of param1.child("hiddenlayers").child("layer") ?? []) {
            this._hiddenLayers.push(String(_loc6_.attribute("parttype")));
        }
    }

    declare private _type: string;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _gender: string;

    declare private _clubLevel: number;
    static { (this.prototype as any)._clubLevel = 0; }

    declare private _isColorable: boolean;
    static { (this.prototype as any)._isColorable = false; }

    declare private _isSelectable: boolean;
    static { (this.prototype as any)._isSelectable = false; }

    declare private _parts: any[];

    declare private _isPreSelectable: boolean;
    static { (this.prototype as any)._isPreSelectable = false; }

    declare private _isSellable: boolean;
    static { (this.prototype as any)._isSellable = false; }

    declare private _hiddenLayers: any[];

    public get hiddenLayers(): any[] {
        return this._hiddenLayers;
    }

    public get type(): string {
        return this._type;
    }

    public get id(): number {
        return this._id;
    }

    public get gender(): string {
        return this._gender;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get isColorable(): boolean {
        return this._isColorable;
    }

    public get isSelectable(): boolean {
        return this._isSelectable;
    }

    public get parts(): any[] {
        return this._parts;
    }

    public get isPreSelectable(): boolean {
        return this._isPreSelectable;
    }

    public get isSellable(): boolean {
        return this._isSellable;
    }

    public dispose(): void {
        for (const _loc1_ of this._parts ?? []) {
            _loc1_.dispose();
        }
        this._parts = null;
        this._hiddenLayers = null;
    }

    public getPart(param1: string, param2: number): IFigurePart {
        for (const _loc3_ of this._parts ?? []) {
            if (_loc3_.type == param1 && _loc3_.id == param2) {
                return _loc3_;
            }
        }
        return null;
    }

    private indexOfPartType(param1: FigurePart): number {
        let _loc3_: number = 0;
        let _loc2_: FigurePart = null;
        _loc3_ = 0;
        while (_loc3_ < this._parts.length) {
            _loc2_ = this._parts[_loc3_];
            if (_loc2_.type == param1.type && _loc2_.index < param1.index) {
                return _loc3_;
            }
            _loc3_++;
        }
        return -1;
    }
}
