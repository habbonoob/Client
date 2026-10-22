import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { FigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/FigurePartSet';

export class SetType implements ISetType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.figure::SetType'); }

    constructor(param1: XML) {
        this._type = String(param1.attribute("type"));
        this._paletteID = parseInt(param1.attribute("paletteid").toString()) | 0;
        this._isMandatory = new Dictionary();
        this._isMandatory.set("F", []);
        this._isMandatory.set("M", []);
        this._isMandatory.get("F")[0] = Boolean(parseInt(param1.attribute("mand_f_0").toString()));
        this._isMandatory.get("F")[1] = Boolean(parseInt(param1.attribute("mand_f_1").toString()));
        this._isMandatory.get("M")[0] = Boolean(parseInt(param1.attribute("mand_m_0").toString()));
        this._isMandatory.get("M")[1] = Boolean(parseInt(param1.attribute("mand_m_1").toString()));
        this._partSets = new UtilsMap();
        this.append(param1);
    }

    declare private _partSets: UtilsMap;

    declare private _type: string;

    declare private _paletteID: number;
    static { (this.prototype as any)._paletteID = 0; }

    declare private _isMandatory: Map<any, any>;

    public get type(): string {
        return this._type;
    }

    public get paletteID(): number {
        return this._paletteID;
    }

    public get partSets(): UtilsMap {
        return this._partSets;
    }

    public dispose(): void {
        for (const _loc1_ of this._partSets.getValues() ?? []) {
            _loc1_.dispose();
        }
        this._partSets.dispose();
        this._partSets = null;
    }

    public cleanUp(param1: XML): void {
        let _loc3_: string = null;
        let _loc2_: FigurePartSet = null;
        for (const _loc4_ of param1.child("set") ?? []) {
            _loc3_ = String(_loc4_.attribute("id"));
            _loc2_ = this._partSets.getValue(_loc3_);
            if (_loc2_ != null) {
                _loc2_.dispose();
                this._partSets.remove(_loc3_);
            }
        }
    }

    public append(param1: XML): void {
        for (const _loc2_ of param1.child("set") ?? []) {
            this._partSets.add(String(_loc2_.attribute("id")), new FigurePartSet(_loc2_, this._type));
        }
    }

    public getDefaultPartSet(param1: string): IFigurePartSet {
        let _loc4_: number = 0;
        let _loc2_: IFigurePartSet = null;
        let _loc3_: any[] = this._partSets.getKeys();
        _loc4_ = _loc3_.length - 1;
        while (_loc4_ >= 0) {
            _loc2_ = this._partSets.getValue(_loc3_[_loc4_]);
            if (_loc2_ && _loc2_.clubLevel == 0 && (_loc2_.gender == param1 || _loc2_.gender == "U")) {
                return _loc2_;
            }
            _loc4_--;
        }
        return null;
    }

    public getPartSet(param1: number): IFigurePartSet {
        return this._partSets.getValue(String(param1));
    }

    public isMandatory(param1: string, param2: number): boolean {
        if (param1 == null || param1.length == 0) {
            return false;
        }
        let _loc4_: string = param1.toUpperCase();
        let _loc3_: any[] = asGuarded(this._isMandatory.get(_loc4_), Array.isArray);
        if (_loc3_ == null) {
            return false;
        }
        return _loc3_[Math.min(param2, 1)];
    }

    public optionalFromClubLevel(param1: string): number {
        if (param1 == null || param1.length == 0) {
            return -1;
        }
        let _loc2_: any[] = this._isMandatory.get(param1.toUpperCase());
        if (_loc2_ == null) {
            return -1;
        }
        return _loc2_.indexOf(false);
    }
}
