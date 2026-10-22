import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomWallData {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomWallData'); }

    static #staticsReady = false;

    public static get WALL_DIRECTION_VECTORS(): any[] {
        RoomWallData.#initStatics();
        return RoomWallData.WALL_DIRECTION_VECTORS;
    }
    public static set WALL_DIRECTION_VECTORS(value: any[]) {
        RoomWallData.#initStatics();
        RoomWallData.WALL_DIRECTION_VECTORS = value;
    }

    public static get WALL_NORMAL_VECTORS(): any[] {
        RoomWallData.#initStatics();
        return RoomWallData.WALL_NORMAL_VECTORS;
    }
    public static set WALL_NORMAL_VECTORS(value: any[]) {
        RoomWallData.#initStatics();
        RoomWallData.WALL_NORMAL_VECTORS = value;
    }

    constructor() {
    }

    private _corners: any[] = [];
    private _SafeStr_3897: any[] = [];
    private _directions: any[] = [];
    private _SafeStr_3309: any[] = [];
    private _SafeStr_5229: any[] = [];
    private _borders: any[] = [];
    private _hideWalls: any[] = [];
    private _SafeStr_5373: any[] = [];
    private _SafeStr_5072: any[] = [];
    private _addDuplicates: boolean = false;
    private _count: number = 0;

    public get count(): number {
        return this._count;
    }

    public addWall(param1: Point, param2: number, param3: number, param4: boolean, param5: boolean): void {
        if (this._addDuplicates || this.checkIsNotDuplicate(param1, param2, param3, param4, param5)) {
            this._corners.push(param1);
            this._directions.push(param2);
            this._SafeStr_3309.push(param3);
            this._borders.push(param4);
            this._SafeStr_5229.push(param5);
            this._hideWalls.push(false);
            this._SafeStr_5373.push(false);
            this._SafeStr_5072.push(false);
            this._count = this._count + 1;
        }
    }

    public getCorner(param1: number): Point {
        return this._corners[param1];
    }

    public getEndPoint(param1: number): Point {
        this.calculateWallEndPoints();
        return this._SafeStr_3897[param1];
    }

    public getLength(param1: number): number {
        return this._SafeStr_3309[param1] | 0;
    }

    public getDirection(param1: number): number {
        return this._directions[param1] | 0;
    }

    public getBorder(param1: number): boolean {
        return this._borders[param1];
    }

    public getHideWall(param1: number): boolean {
        return this._hideWalls[param1];
    }

    public getLeftTurn(param1: number): boolean {
        return this._SafeStr_5229[param1];
    }

    public getManuallyLeftCut(param1: number): boolean {
        return this._SafeStr_5373[param1];
    }

    public getManuallyRightCut(param1: number): boolean {
        return this._SafeStr_5072[param1];
    }

    public setHideWall(param1: number, param2: boolean): void {
        this._hideWalls[param1] = param2;
    }

    public setLength(param1: number, param2: number): void {
        if (param2 < this._SafeStr_3309[param1]) {
            this._SafeStr_3309[param1] = param2;
            this._SafeStr_5072[param1] = true;
        }
    }

    public moveCorner(param1: number, param2: number): void {
        let _loc3_: IVector3d = null;
        if (param2 > 0 && param2 < this._SafeStr_3309[param1]) {
            _loc3_ = RoomWallData.WALL_DIRECTION_VECTORS[this.getDirection(param1)];
            this._corners[param1] = this._corners[param1].add(new Point(param2 * _loc3_.x, param2 * _loc3_.y));
            this._SafeStr_3309[param1] -= param2;
            this._SafeStr_5373[param1] = true;
        }
    }

    private checkIsNotDuplicate(param1: Point, param2: number, param3: number, param4: boolean, param5: boolean): boolean {
        let _loc6_: number = 0;
        _loc6_ = 0;
        while (_loc6_ < this._count) {
            if (this._corners[_loc6_].x == param1.x && this._corners[_loc6_].y == param1.y && this._directions[_loc6_] == param2 && this._SafeStr_3309[_loc6_] == param3 && this._borders[_loc6_] == param4 && this._SafeStr_5229[_loc6_] == param5) {
                return false;
            }
            _loc6_++;
        }
        return true;
    }

    private calculateWallEndPoints(): void {
        let _loc5_: number = 0;
        let _loc3_: Point = null;
        let _loc1_: Point = null;
        let _loc2_: IVector3d = null;
        let _loc4_: number = 0;
        if (this._SafeStr_3897.length != this.count) {
            this._SafeStr_3897 = [];
            _loc5_ = 0;
            while (_loc5_ < this.count) {
                _loc3_ = this.getCorner(_loc5_);
                _loc1_ = new Point(_loc3_.x, _loc3_.y);
                _loc2_ = RoomWallData.WALL_DIRECTION_VECTORS[this.getDirection(_loc5_)];
                _loc4_ = this.getLength(_loc5_);
                _loc1_.x += _loc2_.x * _loc4_;
                _loc1_.y += _loc2_.y * _loc4_;
                this._SafeStr_3897.push(_loc1_);
                _loc5_++;
            }
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomWallData.#staticsReady) return;
        RoomWallData.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomWallData, name, { value, writable: true, configurable: true, enumerable: true });
        set("WALL_DIRECTION_VECTORS", null);
        set("WALL_NORMAL_VECTORS", null);
        set("WALL_DIRECTION_VECTORS", []);
        set("WALL_NORMAL_VECTORS", []);
        RoomWallData.WALL_DIRECTION_VECTORS.push(new Vector3d(1, 0, 0));
        RoomWallData.WALL_DIRECTION_VECTORS.push(new Vector3d(0, 1, 0));
        RoomWallData.WALL_DIRECTION_VECTORS.push(new Vector3d(-1, 0, 0));
        RoomWallData.WALL_DIRECTION_VECTORS.push(new Vector3d(0, -1, 0));
        RoomWallData.WALL_NORMAL_VECTORS.push(new Vector3d(0, 1, 0));
        RoomWallData.WALL_NORMAL_VECTORS.push(new Vector3d(-1, 0, 0));
        RoomWallData.WALL_NORMAL_VECTORS.push(new Vector3d(0, -1, 0));
        RoomWallData.WALL_NORMAL_VECTORS.push(new Vector3d(1, 0, 0));
    }
}
