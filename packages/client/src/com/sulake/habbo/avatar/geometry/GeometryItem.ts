import { asGuarded, isBoolean } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Node3D } from '@/com/sulake/habbo/avatar/geometry/Node3D';
import { Vector3D } from '@/com/sulake/habbo/avatar/geometry/Vector3D';

export class GeometryItem extends Node3D {
    static { registerClassName(this, 'com.sulake.habbo.avatar.geometry::GeometryItem'); }

    constructor(param1: XML, param2: boolean = false) {
        super(parseFloat(param1.attribute("x").toString()), parseFloat(param1.attribute("y").toString()), parseFloat(param1.attribute("z").toString()));
        this._id = String(param1.attribute("id"));
        this._radius = parseFloat(param1.attribute("radius").toString());
        this._normal = new Vector3D(parseFloat(param1.attribute("nx").toString()), parseFloat(param1.attribute("ny").toString()), parseFloat(param1.attribute("nz").toString()));
        this._isDoubleSided = asGuarded(parseInt(param1.attribute("double").toString()), isBoolean);
        this._isDynamic = param2;
    }

    declare private _id: string;

    declare private _radius: number;
    static { (this.prototype as any)._radius = NaN; }

    private _isDynamic: boolean = false;

    declare private _normal: Vector3D;

    public get normal(): Vector3D {
        return this._normal;
    }

    private _isDoubleSided: boolean = false;

    public get isDoubleSided(): boolean {
        return this._isDoubleSided;
    }

    public get id(): string {
        return this._id;
    }

    public get isDynamic(): boolean {
        return this._isDynamic;
    }

    public getDistance(param1: Vector3D): number {
        let _loc3_: number = Math.abs(param1.z - this.transformedLocation.z - this._radius);
        let _loc2_: number = Math.abs(param1.z - this.transformedLocation.z + this._radius);
        return Math.min(_loc3_, _loc2_);
    }

    public toString(): string {
        return this._id + ": " + this.location + " - " + this.transformedLocation;
    }
}
