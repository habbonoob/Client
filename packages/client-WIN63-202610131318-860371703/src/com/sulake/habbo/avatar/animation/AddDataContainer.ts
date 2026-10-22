import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class AddDataContainer {
    static { registerClassName(this, 'com.sulake.habbo.avatar.animation::AddDataContainer'); }

    declare private _id: string;

    declare private _align: string;

    declare private _base: string;

    declare private _ink: string;

    private _blend: number = 1;

    constructor(param1: XML) {
        this._id = String(param1.attribute("id"));
        this._align = String(param1.attribute("align"));
        this._base = String(param1.attribute("base"));
        this._ink = String(param1.attribute("ink"));
        let _loc2_: string = String(param1.attribute("blend"));
        if (_loc2_.length > 0) {
            this._blend = Number(_loc2_);
            if (this._blend > 1) {
                this._blend /= 100;
            }
        }
    }

    public get id(): string {
        return this._id;
    }

    public get align(): string {
        return this._align;
    }

    public get base(): string {
        return this._base;
    }

    public get ink(): string {
        return this._ink;
    }

    public get blend(): number {
        return this._blend;
    }

    public get isBlended(): boolean {
        return this._blend != 1;
    }
}
