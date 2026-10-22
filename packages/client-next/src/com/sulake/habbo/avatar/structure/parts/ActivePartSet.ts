import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class ActivePartSet {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.parts::ActivePartSet'); }

    declare private _id: string;

    declare private _parts: any[];

    constructor(param1: XML) {
        this._id = String(param1.attribute("id"));
        this._parts = [];
        for (const _loc2_ of param1.child("activePart") ?? []) {
            this._parts.push(String(_loc2_.attribute("set-type")));
        }
    }

    public get parts(): any[] {
        return this._parts;
    }
}
