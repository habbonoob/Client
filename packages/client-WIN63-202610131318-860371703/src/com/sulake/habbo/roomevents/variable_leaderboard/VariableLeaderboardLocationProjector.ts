import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { VariableLeaderboardLocation } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardLocation';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class VariableLeaderboardLocationProjector {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard::VariableLeaderboardLocationProjector'); }

    static #staticsReady = false;

    private static readonly _SafeStr_14278: number = 64;
    private static readonly _SafeStr_14279: number = -32;
    private static readonly MAX_OFFSET_X: number = 32;

    private static get X_AXIS(): Vector3d {
        VariableLeaderboardLocationProjector.#initStatics();
        return VariableLeaderboardLocationProjector.X_AXIS;
    }

    private static get Y_AXIS(): Vector3d {
        VariableLeaderboardLocationProjector.#initStatics();
        return VariableLeaderboardLocationProjector.Y_AXIS;
    }

    constructor() {
    }

    public static project(param1: IRoomEngine, param2: number, param3: VariableLeaderboardLocation, param4: number, param5: number, param6: number = -1): Point {
        if (param1 == null || param3 == null) {
            return null;
        }
        let _loc8_: IRoomGeometry = param1.getRoomCanvasGeometry(param2, param6);
        if (_loc8_ == null) {
            return null;
        }
        let _loc9_: Point = VariableLeaderboardLocationProjector.projectTileCenter(param1, param2, param3.tileX, param3.tileY, param4, param5, param6);
        if (_loc9_ == null) {
            return null;
        }
        let _loc7_: number = VariableLeaderboardLocationProjector.getScale(param1, param2, param6);
        _loc9_.x += param3.offsetX * _loc7_;
        _loc9_.y -= param3.altitude * _loc7_;
        return _loc9_;
    }

    public static getWindowPosition(param1: Point, param2: number, param3: number): Point {
        if (param1 == null) {
            return null;
        }
        return new Point(param1.x - param2 / 2, param1.y - param3);
    }

    public static getScreenAnchor(param1: Point, param2: number, param3: number): Point {
        if (param1 == null) {
            return null;
        }
        return new Point(param1.x + param2 / 2, param1.y + param3);
    }

    public static unproject(param1: IRoomEngine, param2: number, param3: Point, param4: number, param5: number, param6: number = -1): VariableLeaderboardLocation {
        let _loc10_: Point = null;
        let _loc13_: Point = null;
        let _loc17_: number = NaN;
        let _loc21_: number = NaN;
        let _loc20_: boolean = false;
        let _loc15_: number = NaN;
        let _loc19_: number = 0;
        if (param1 == null || param3 == null) {
            return null;
        }
        let _loc22_: IRoomGeometry = param1.getRoomCanvasGeometry(param2, param6);
        if (_loc22_ == null) {
            return null;
        }
        let _loc9_: number = VariableLeaderboardLocationProjector.getScale(param1, param2, param6);
        if (_loc9_ == 0) {
            return null;
        }
        let _loc16_: number = param1.getRoomCanvasScale(param2, param6);
        let _loc11_: Point = param1.getRoomCanvasScreenOffset(param2, param6);
        if (_loc16_ == 0 || _loc11_ == null) {
            return null;
        }
        let _loc18_: Point = new Point((param3.x - _loc11_.x) / _loc16_ - param4 / 2, (param3.y - _loc11_.y) / _loc16_ - param5 / 2);
        let _loc8_: Point = _loc22_.getPlanePosition(_loc18_, new Vector3d(0, 0, 0), VariableLeaderboardLocationProjector.X_AXIS, VariableLeaderboardLocationProjector.Y_AXIS);
        if (_loc8_ == null) {
            return null;
        }
        let _loc24_: number = Math.floor(_loc8_.x) | 0;
        let _loc25_: number = Math.floor(_loc8_.y) | 0;
        let _loc14_: Point = VariableLeaderboardLocationProjector.projectTileCenter(param1, param2, _loc24_, _loc25_, param4, param5, param6);
        if (_loc14_ == null) {
            return null;
        }
        let _loc23_: number = (param3.x - _loc14_.x) / _loc9_;
        let _loc12_: number = Math.round(_loc23_) | 0;
        if (_loc12_ < -32 || _loc12_ > 32) {
            _loc10_ = VariableLeaderboardLocationProjector.projectTileCenter(param1, param2, _loc24_ + 1, _loc25_, param4, param5, param6);
            _loc13_ = VariableLeaderboardLocationProjector.projectTileCenter(param1, param2, _loc24_, _loc25_ + 1, param4, param5, param6);
            if (_loc10_ == null || _loc13_ == null) {
                return null;
            }
            _loc17_ = (_loc10_.x - _loc14_.x) / _loc9_;
            _loc21_ = (_loc13_.x - _loc14_.x) / _loc9_;
            _loc20_ = Math.abs(_loc17_) >= Math.abs(_loc21_);
            _loc15_ = _loc20_ ? _loc17_ : _loc21_;
            if (_loc15_ == 0) {
                return null;
            }
            _loc19_ = Math.round(_loc23_ / _loc15_) | 0;
            if (_loc19_ == 0) {
                _loc19_ = _loc23_ * _loc15_ > 0 ? 1 : -1;
            }
            if (_loc20_) {
                _loc24_ += _loc19_;
            } else {
                _loc25_ += _loc19_;
            }
            _loc14_ = VariableLeaderboardLocationProjector.projectTileCenter(param1, param2, _loc24_, _loc25_, param4, param5, param6);
            if (_loc14_ == null) {
                return null;
            }
            _loc12_ = Math.round((param3.x - _loc14_.x) / _loc9_) | 0;
        }
        let _loc7_: number = Math.round((_loc14_.y - param3.y) / _loc9_) | 0;
        return new VariableLeaderboardLocation(_loc24_, _loc25_, _loc12_, _loc7_);
    }

    private static projectTileCenter(param1: IRoomEngine, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number): Point {
        let _loc9_: IRoomGeometry = param1.getRoomCanvasGeometry(param2, param7);
        let _loc10_: Point = param1.getRoomCanvasScreenOffset(param2, param7);
        if (_loc9_ == null || _loc10_ == null) {
            return null;
        }
        let _loc11_: Point = _loc9_.getScreenPoint(new Vector3d(param3 + 0.5, param4 + 0.5, 0));
        if (_loc11_ == null) {
            return null;
        }
        let _loc8_: number = param1.getRoomCanvasScale(param2, param7);
        _loc11_.x = (_loc11_.x + param5 / 2) * _loc8_ + _loc10_.x;
        _loc11_.y = (_loc11_.y + param6 / 2) * _loc8_ + _loc10_.y;
        return _loc11_;
    }

    public static getScale(param1: IRoomEngine, param2: number, param3: number = -1): number {
        let _loc4_: IRoomGeometry = param1.getRoomCanvasGeometry(param2, param3);
        return _loc4_.scale / 64 * Math.abs(param1.getRoomCanvasScale(param2, param3));
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (VariableLeaderboardLocationProjector.#staticsReady) return;
        VariableLeaderboardLocationProjector.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(VariableLeaderboardLocationProjector, name, { value, writable: true, configurable: true, enumerable: true });
        set("X_AXIS", null);
        set("Y_AXIS", null);
        set("X_AXIS", new Vector3d(1, 0, 0));
        set("Y_AXIS", new Vector3d(0, 1, 0));
    }
}
