import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurniturePlanetSystemVisualizationPlanetObject {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurniturePlanetSystemVisualizationPlanetObject'); }

    private static readonly SYSTEM_TEMPO: number = 30;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: number, param6: number) {
        this._name = param1;
        this._index = param2;
        this._radius = param3;
        this._SafeStr_6518 = param4 * 3.141592653589793 * 2 / 360;
        this._arcOffset = param5 * 3.141592653589793 * 2 / 360;
        this._height = param6;
        this._position = 0;
    }

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _radius: number;
    static { (this.prototype as any)._radius = NaN; }

    declare private _SafeStr_6518: number;
    static { (this.prototype as any)._SafeStr_6518 = NaN; }

    declare private _arcOffset: number;
    static { (this.prototype as any)._arcOffset = NaN; }

    declare private _height: number;
    static { (this.prototype as any)._height = NaN; }

    declare private _position: number;
    static { (this.prototype as any)._position = NaN; }

    private _SafeStr_3756: Vector3d = new Vector3d(0, 0, 0);
    private _children: any[] = [];

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public dispose(): void {
        let _loc1_: FurniturePlanetSystemVisualizationPlanetObject = null;
        while (this._children.length > 0) {
            _loc1_ = this._children.shift();
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
        }
    }

    public update(param1: any[], param2: Vector3d, param3: number): void {
        let _loc4_: FurniturePlanetSystemVisualizationPlanetObject = null;
        let _loc5_: number = 0;
        this._position += this._SafeStr_6518 / 30;
        param1[this._index] = this.getPositionVector(param2, param3);
        _loc5_ = 0;
        while (_loc5_ < this._children.length) {
            _loc4_ = this._children[_loc5_];
            _loc4_.update(param1, this._SafeStr_3756, param3);
            _loc5_++;
        }
    }

    public getPositionVector(param1: Vector3d, param2: number): Vector3d {
        let _loc3_: number = this._radius * Math.cos(this._position + this._arcOffset);
        let _loc4_: number = this._radius * Math.sin(this._position + this._arcOffset);
        let _loc5_: number = this._height;
        this._SafeStr_3756.x = (_loc3_ - _loc4_) * (param2 / 2);
        this._SafeStr_3756.y = (_loc4_ + _loc3_) * (param2 / 2) * 0.5 - this._height * (param2 / 2);
        this._SafeStr_3756.z = -(4 * (_loc3_ + _loc4_) - 0.7 | 0);
        if (param1 != null) {
            this._SafeStr_3756.add(param1);
        }
        return this._SafeStr_3756;
    }

    public addChild(param1: FurniturePlanetSystemVisualizationPlanetObject): void {
        if (this._children.indexOf(param1) < 0) {
            this._children.push(param1);
        }
    }

    public hasChild(param1: string): boolean {
        let _loc2_: FurniturePlanetSystemVisualizationPlanetObject = null;
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._children.length) {
            _loc2_ = this._children[_loc3_];
            if (_loc2_.name == param1) {
                return true;
            }
            if (_loc2_.hasChild(param1)) {
                return true;
            }
            _loc3_++;
        }
        return false;
    }

    public getChild(param1: string): FurniturePlanetSystemVisualizationPlanetObject {
        let _loc2_: FurniturePlanetSystemVisualizationPlanetObject = null;
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._children.length) {
            _loc2_ = this._children[_loc3_];
            if (_loc2_.name == param1) {
                return _loc2_;
            }
            if (_loc2_.hasChild(param1)) {
                return _loc2_.getChild(param1);
            }
            _loc3_++;
        }
        return null;
    }
}
