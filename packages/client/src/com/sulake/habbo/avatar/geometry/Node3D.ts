import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Matrix4x4 } from '@/com/sulake/habbo/avatar/geometry/Matrix4x4';
import { Vector3D } from '@/com/sulake/habbo/avatar/geometry/Vector3D';

export class Node3D {
    static { registerClassName(this, 'com.sulake.habbo.avatar.geometry::Node3D'); }

    constructor(param1: number, param2: number, param3: number) {
        this._location = new Vector3D(param1, param2, param3);
        if (param1 != 0 || param2 != 0 || param3 != 0) {
            this._SafeStr_6223 = true;
        }
    }

    declare private _location: Vector3D;

    private _transformedLocation: Vector3D = new Vector3D();
    private _SafeStr_6223: boolean = false;

    public get location(): Vector3D {
        return this._location;
    }

    public get transformedLocation(): Vector3D {
        return this._transformedLocation;
    }

    public applyTransform(param1: Matrix4x4): void {
        if (this._SafeStr_6223) {
            this._transformedLocation = param1.vectorMultiplication(this._location);
        }
    }
}
