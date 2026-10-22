import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ActionDefinition } from '@/com/sulake/habbo/avatar/actions/ActionDefinition';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { IStructureData } from '@/com/sulake/habbo/avatar/structure/IStructureData';
import { ActivePartSet } from '@/com/sulake/habbo/avatar/structure/parts/ActivePartSet';
import { PartDefinition } from '@/com/sulake/habbo/avatar/structure/parts/PartDefinition';

export class PartSetsData implements IStructureData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure::PartSetsData'); }

    declare private _parts: Map<any, any>;

    declare private _activePartSets: Map<any, any>;

    constructor() {
        this._parts = new Dictionary();
        this._activePartSets = new Dictionary();
    }

    public parse(param1: XML): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc3_ of param1.child("partSet").item(0).child("part") ?? []) {
            this._parts.set(String(_loc3_.attribute("set-type")), new PartDefinition(_loc3_));
        }
        for (const _loc2_ of param1.child("activePartSet") ?? []) {
            this._activePartSets.set(String(_loc2_.attribute("id")), new ActivePartSet(_loc2_));
        }
        return true;
    }

    public appendXML(param1: XML): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc3_ of param1.child("partSet").item(0).child("part") ?? []) {
            this._parts.set(String(_loc3_.attribute("set-type")), new PartDefinition(_loc3_));
        }
        for (const _loc2_ of param1.child("activePartSet") ?? []) {
            this._activePartSets.set(String(_loc2_.attribute("id")), new ActivePartSet(_loc2_));
        }
        return false;
    }

    public getActiveParts(param1: IActionDefinition): any[] {
        let _loc2_: ActivePartSet = this._activePartSets.get(param1.activePartSet);
        if (_loc2_ != null) {
            return _loc2_.parts;
        }
        return [];
    }

    public getPartDefinition(param1: string): PartDefinition {
        return asInstanceOf(this._parts.get(param1), PartDefinition);
    }

    public addPartDefinition(param1: XML): PartDefinition {
        let _loc2_: string = String(param1.attribute("set-type"));
        if (this._parts.get(_loc2_) == null) {
            this._parts.set(_loc2_, new PartDefinition(param1));
        }
        return this._parts.get(_loc2_);
    }

    public get parts(): Map<any, any> {
        return this._parts;
    }

    public get activePartSets(): Map<any, any> {
        return this._activePartSets;
    }

    public getActivePartSet(param1: ActionDefinition): ActivePartSet {
        return asInstanceOf(this._activePartSets.get(param1.activePartSet), ActivePartSet);
    }

    get [IStructureData](): true {
        return true;
    }
}
