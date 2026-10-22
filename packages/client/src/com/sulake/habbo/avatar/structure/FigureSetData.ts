import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { IPalette } from '@/com/sulake/habbo/avatar/structure/figure/IPalette';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';
import type { IFigureSetData } from '@/com/sulake/habbo/avatar/structure/IFigureSetData';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Palette } from '@/com/sulake/habbo/avatar/structure/figure/Palette';
import { SetType } from '@/com/sulake/habbo/avatar/structure/figure/SetType';
import { IStructureData } from '@/com/sulake/habbo/avatar/structure/IStructureData';

export class FigureSetData implements IStructureData, IFigureSetData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure::FigureSetData'); }

    constructor() {
        this._palettes = new Dictionary();
        this._setTypes = new Dictionary();
    }

    declare private _palettes: Map<any, any>;

    declare private _setTypes: Map<any, any>;

    public dispose(): void {
    }

    public parse(param1: XML): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc2_ of param1.child("colors").child("palette") ?? []) {
            this._palettes.set(String(_loc2_.attribute("id")), new Palette(_loc2_));
        }
        for (const _loc3_ of param1.child("sets").child("settype") ?? []) {
            this._setTypes.set(String(_loc3_.attribute("type")), new SetType(_loc3_));
        }
        return true;
    }

    public injectXML(param1: XML): void {
        let _loc2_: SetType = null;
        for (const _loc3_ of param1.child("sets").child("settype") ?? []) {
            _loc2_ = this._setTypes.get(String(_loc3_.attribute("type")));
            if (_loc2_ != null) {
                _loc2_.cleanUp(_loc3_);
            } else {
                this._setTypes.set(String(_loc3_.attribute("type")), new SetType(_loc3_));
            }
        }
        this.appendXML(param1);
    }

    public appendXML(param1: XML): boolean {
        let _loc3_: Palette = null;
        let _loc4_: SetType = null;
        if (param1 == null) {
            return false;
        }
        for (const _loc2_ of param1.child("colors").child("palette") ?? []) {
            _loc3_ = this._palettes.get(String(_loc2_.attribute("id")));
            if (_loc3_ == null) {
                this._palettes.set(String(_loc2_.attribute("id")), new Palette(_loc2_));
            } else {
                _loc3_.append(_loc2_);
            }
        }
        for (const _loc5_ of param1.child("sets").child("settype") ?? []) {
            _loc4_ = this._setTypes.get(String(_loc5_.attribute("type")));
            if (_loc4_ == null) {
                this._setTypes.set(String(_loc5_.attribute("type")), new SetType(_loc5_));
            } else {
                _loc4_.append(_loc5_);
            }
        }
        return false;
    }

    public getMandatorySetTypeIds(param1: string, param2: number): any[] {
        let _loc3_: any[] = [];
        for (const _loc4_ of this._setTypes?.values() ?? []) {
            if (_loc4_ && _loc4_.isMandatory(param1, param2)) {
                _loc3_.push(_loc4_.type);
            }
        }
        return _loc3_;
    }

    public getDefaultPartSet(param1: string, param2: string): IFigurePartSet {
        let _loc3_: SetType = asInstanceOf(this._setTypes.get(param1), SetType);
        if (_loc3_) {
            return _loc3_.getDefaultPartSet(param2);
        }
        return null;
    }

    public getSetType(param1: string): ISetType {
        return this._setTypes.get(param1);
    }

    public getPalette(param1: number): IPalette {
        return this._palettes.get(String(param1));
    }

    public getFigurePartSet(param1: number): IFigurePartSet {
        let _loc2_: IFigurePartSet = null;
        for (const _loc3_ of this._setTypes?.values() ?? []) {
            _loc2_ = _loc3_.getPartSet(param1);
            if (_loc2_ != null) {
                return _loc2_;
            }
        }
        return null;
    }

    get [IStructureData](): true {
        return true;
    }
}
