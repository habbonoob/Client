import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MathUtil } from '@/com/sulake/habbo/game/snowwar/utils/MathUtil';

export class Direction8 {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::Direction8'); }

    static #staticsReady = false;

    public static ALL_DIRECTIONS: any[] = [];

    public static get N(): Direction8 {
        Direction8.#initStatics();
        return Direction8.N;
    }

    public static get NE(): Direction8 {
        Direction8.#initStatics();
        return Direction8.NE;
    }

    public static get E(): Direction8 {
        Direction8.#initStatics();
        return Direction8.E;
    }

    public static get SE(): Direction8 {
        Direction8.#initStatics();
        return Direction8.SE;
    }

    public static get S(): Direction8 {
        Direction8.#initStatics();
        return Direction8.S;
    }

    public static get SW(): Direction8 {
        Direction8.#initStatics();
        return Direction8.SW;
    }

    public static get W(): Direction8 {
        Direction8.#initStatics();
        return Direction8.W;
    }

    public static get NW(): Direction8 {
        Direction8.#initStatics();
        return Direction8.NW;
    }

    public static get DEFAULT_ITEM_DIRECTION_8(): Direction8 {
        Direction8.#initStatics();
        return Direction8.DEFAULT_ITEM_DIRECTION_8;
    }

    public static get DEFAULT_AVATAR_DIRECTION_8(): Direction8 {
        Direction8.#initStatics();
        return Direction8.DEFAULT_AVATAR_DIRECTION_8;
    }

    private static componentToAngleArray: any[] = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 35, 36, 36, 36, 36, 36, 36, 36, 37, 37, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 40, 40, 41, 41, 41, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44, 45, 45, 45, 45, 45];

    declare private _direction: number;
    static { (this.prototype as any)._direction = 0; }

    declare private _SafeStr_7354: number;
    static { (this.prototype as any)._SafeStr_7354 = 0; }

    declare private _SafeStr_7348: number;
    static { (this.prototype as any)._SafeStr_7348 = 0; }

    declare private _SafeStr_7024: string;

    constructor(param1: number, param2: string, param3: number, param4: number) {
        this._direction = param1;
        this._SafeStr_7024 = param2;
        this._SafeStr_7354 = param3;
        this._SafeStr_7348 = param4;
        Direction8.ALL_DIRECTIONS[param1] = this;
    }

    public static getDirection8(param1: number): Direction8 {
        if (param1 < 0 || param1 > 7) {
            return null;
        }
        return Direction8.ALL_DIRECTIONS[param1];
    }

    public static validateDirection8Value(param1: number): number {
        return param1 & 7;
    }

    public static compatibleCalculateDirectionTo(param1: number, param2: number, param3: number, param4: number): Direction8 {
        let _loc5_: number = param3 - param1;
        let _loc6_: number = param4 - param2;
        if (_loc5_ == 0 && _loc6_ < 0) {
            return Direction8.N;
        }
        if (_loc5_ == 0 && _loc6_ > 0) {
            return Direction8.S;
        }
        if (_loc5_ > 0 && _loc6_ < 0) {
            return Direction8.NE;
        }
        if (_loc5_ > 0 && _loc6_ == 0) {
            return Direction8.E;
        }
        if (_loc5_ > 0 && _loc6_ > 0) {
            return Direction8.SE;
        }
        if (_loc5_ < 0 && _loc6_ < 0) {
            return Direction8.NW;
        }
        if (_loc5_ < 0 && _loc6_ == 0) {
            return Direction8.W;
        }
        if (_loc5_ < 0 && _loc6_ > 0) {
            return Direction8.SW;
        }
        return null;
    }

    private static validateDirection360Value(param1: number): number {
        if (param1 > 359) {
            param1 %= 360;
        } else if (param1 < 0) {
            param1 = 360 + param1 % 360;
        }
        return param1;
    }

    private static getAngleFromComponents(param1: number, param2: number): number {
        let _loc3_: number = 0;
        if (Math.abs(param1) <= Math.abs(param2)) {
            if (param2 == 0) {
                param2 = 1;
            }
            param1 *= 256;
            _loc3_ = MathUtil.javaDiv(param1 / param2);
            if (_loc3_ < 0) {
                _loc3_ = -_loc3_;
            }
            if (_loc3_ > 255) {
                _loc3_ = 255;
            }
            if (param2 < 0) {
                if (param1 > 0) {
                    return Direction8.componentToAngleArray[_loc3_] | 0;
                }
                return 360 - Direction8.componentToAngleArray[_loc3_] | 0;
            }
            if (param1 > 0) {
                return 180 - Direction8.componentToAngleArray[_loc3_] | 0;
            }
            return 180 + Direction8.componentToAngleArray[_loc3_] | 0;
        }
        if (param1 == 0) {
            param1 = 1;
        }
        param2 *= 256;
        _loc3_ = MathUtil.javaDiv(param2 / param1);
        if (_loc3_ < 0) {
            _loc3_ = -_loc3_;
        }
        if (_loc3_ > 255) {
            _loc3_ = 255;
        }
        if (param2 < 0) {
            if (param1 > 0) {
                return 90 - Direction8.componentToAngleArray[_loc3_] | 0;
            }
            return 270 + Direction8.componentToAngleArray[_loc3_] | 0;
        }
        if (param1 > 0) {
            return 90 + Direction8.componentToAngleArray[_loc3_] | 0;
        }
        return 270 - Direction8.componentToAngleArray[_loc3_] | 0;
    }

    public intValue(): number {
        return this._direction;
    }

    public oppositeDirection(): Direction8 {
        return this.rotateDirection(4);
    }

    public rotateDirection45Degrees(param1: boolean): Direction8 {
        return this.rotateDirection(param1 ? 1 : -1);
    }

    public rotateDirection90Degrees(param1: boolean): Direction8 {
        return this.rotateDirection(param1 ? 2 : -2);
    }

    public isDiagonal(): boolean {
        return this._direction % 2 == 0;
    }

    public hashCode(): number {
        return this._direction;
    }

    public rotateDirection(param1: number): Direction8 {
        let _loc2_: number = this._direction + param1;
        _loc2_ = Direction8.validateDirection8Value(_loc2_);
        return Direction8.ALL_DIRECTIONS[_loc2_];
    }

    public toString(): string {
        return this._SafeStr_7024 + "(" + this._direction.toString() + ")";
    }

    public directionString(): string {
        return this._SafeStr_7024;
    }

    public getUnitVectorXcomponent(): number {
        return this._SafeStr_7354;
    }

    public getUnitVectorYcomponent(): number {
        return this._SafeStr_7348;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Direction8.#staticsReady) return;
        Direction8.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Direction8, name, { value, writable: true, configurable: true, enumerable: true });
        set("N", null);
        set("NE", null);
        set("E", null);
        set("SE", null);
        set("S", null);
        set("SW", null);
        set("W", null);
        set("NW", null);
        set("DEFAULT_ITEM_DIRECTION_8", null);
        set("DEFAULT_AVATAR_DIRECTION_8", null);
        set("N", new Direction8(0, "N", 0, -1));
        set("NE", new Direction8(1, "NE", 1, -1));
        set("E", new Direction8(2, "E", 1, 0));
        set("SE", new Direction8(3, "SE", 1, 1));
        set("S", new Direction8(4, "S", 0, 1));
        set("SW", new Direction8(5, "SW", -1, 1));
        set("W", new Direction8(6, "W", -1, 0));
        set("NW", new Direction8(7, "NW", -1, -1));
        set("DEFAULT_ITEM_DIRECTION_8", Direction8.S);
        set("DEFAULT_AVATAR_DIRECTION_8", Direction8.SW);
    }
}
