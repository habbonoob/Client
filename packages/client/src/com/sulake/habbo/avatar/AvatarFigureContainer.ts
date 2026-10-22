import { asGuarded, asInstanceOf, isInt, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';

export class AvatarFigureContainer implements IAvatarFigureContainer {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarFigureContainer'); }

    constructor(param1: string) {
        this._parts = new UtilsMap();
        this.parseFigureString(param1);
    }

    declare private _parts: UtilsMap;

    public getPartTypeIds(): any[] {
        return this.getParts().getKeys();
    }

    public hasPartType(param1: string): boolean {
        return this.getParts().getValue(param1) != null;
    }

    public getPartSetId(param1: string): number {
        let _loc2_: UtilsMap = asInstanceOf(this.getParts().getValue(param1), UtilsMap);
        if (_loc2_ != null) {
            return asGuarded(_loc2_.getValue("setid"), isInt);
        }
        return 0;
    }

    public getPartColorIds(param1: string): any[] {
        let _loc2_: UtilsMap = asInstanceOf(this.getParts().getValue(param1), UtilsMap);
        if (_loc2_ != null) {
            return asGuarded(_loc2_.getValue("colorids"), Array.isArray);
        }
        return null;
    }

    public updatePart(param1: string, param2: number, param3: any[]): void {
        let _loc4_: UtilsMap = new UtilsMap();
        _loc4_.add("type", param1);
        _loc4_.add("setid", param2);
        _loc4_.add("colorids", param3);
        let _loc5_: UtilsMap = this.getParts();
        _loc5_.remove(param1);
        _loc5_.add(param1, _loc4_);
    }

    public removePart(param1: string): void {
        this.getParts().remove(param1);
    }

    public getFigureString(): string {
        let _loc3_: any[] = null;
        let _loc1_: any[] = [];
        for (const _loc2_ of this.getParts().getKeys() ?? []) {
            _loc3_ = [];
            _loc3_.push(_loc2_);
            _loc3_.push(this.getPartSetId(stringOrNull(_loc2_)));
            _loc3_ = _loc3_.concat(this.getPartColorIds(stringOrNull(_loc2_)));
            _loc1_.push(_loc3_.join("-"));
        }
        return _loc1_.join(".");
    }

    private getParts(): UtilsMap {
        if (this._parts == null) {
            this._parts = new UtilsMap();
        }
        return this._parts;
    }

    private parseFigureString(param1: string): void {
        let _loc3_: any[] = null;
        let _loc6_: string = null;
        let _loc4_: number = 0;
        let _loc2_: any[] = null;
        let _loc5_: number = 0;
        if (param1 == null) {
            param1 = "";
        }
        for (const _loc7_ of param1.split(".") ?? []) {
            _loc3_ = _loc7_.split("-");
            if (_loc3_.length >= 2) {
                _loc6_ = String(_loc3_[0]);
                _loc4_ = parseInt(stringOrNull(_loc3_[1])) | 0;
                _loc2_ = [];
                _loc5_ = 2;
                while (_loc5_ < _loc3_.length) {
                    _loc2_.push(parseInt(stringOrNull(_loc3_[_loc5_])));
                    _loc5_++;
                }
                this.updatePart(_loc6_, _loc4_, _loc2_);
            }
        }
    }

    get [IAvatarFigureContainer](): true {
        return true;
    }
}
