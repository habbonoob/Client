import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SnowballGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowballGameObjectData';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { HumanGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/HumanGameObject';
import type { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { HabboGamesCom, SnowWarEngine, SnowWarGameStage, Tile } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowWarGameObject';
import { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { MathUtil } from '@/com/sulake/habbo/game/snowwar/utils/MathUtil';
import { SquareRoot } from '@/com/sulake/habbo/game/snowwar/utils/SquareRoot';

export class SnowBallGameObject extends SnowWarGameObject {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.gameobjects::SnowBallGameObject'); }

    public static readonly TRAJECTORY_QUICK_THROW: number = 0;
    public static readonly TRAJECTORY_SHORT_LOB: number = 1;
    public static readonly TRAJECTORY_LONG_LOB: number = 2;
    public static readonly TRAJECTORY_DEFAULT_THROW: number = 3;
    public static readonly THROW_VELOCITY: number = 2000;
    public static readonly INITIAL_HEIGHT: number = 3000;
    public static readonly _SafeStr_7862: number = 0.0007072135785007072;
    public static readonly SHORT_LOB_TIME_TO_TARGET_COEF: number = 0.000559;
    public static readonly QUICK_THROW_MAX_RANGE: number = 20000;
    public static readonly SHORT_LOB_MAX_RANGE: number = 60000;
    public static readonly LONG_LOB_MAX_RANGE: number = 100000;
    public static readonly DEFAULT_THROW_TO_LOB_CUTOFF_RANGE: number = 42000;
    public static readonly _SafeStr_7629: number = 10;
    public static readonly SHORT_LOB_HEIGHT_SCALING_FACTOR: number = 25;
    public static readonly _SafeStr_8347: number = 50;
    public static readonly _SafeStr_8053: number = 3;
    public static readonly GRAVITY: number = 15;
    public static BOUNDING_DATA: any[] = [400];

    constructor(param1: number) {
        super(param1, false);
    }

    private _movementDirection360: Direction360 = new Direction360(0);

    declare private _trajectory: number;
    static { (this.prototype as any)._trajectory = 0; }

    declare private _SafeStr_2743: number;
    static { (this.prototype as any)._SafeStr_2743 = 0; }

    declare private _SafeStr_2327: number;
    static { (this.prototype as any)._SafeStr_2327 = 0; }

    declare private _throwingHuman: HumanGameObject;

    declare private _parabolaOffset: number;
    static { (this.prototype as any)._parabolaOffset = 0; }

    private _location3D: Location3D = new Location3D(0, 0, 0);

    public override get location3D(): Location3D {
        return this._location3D;
    }

    public override get numberOfVariables(): number {
        return 11;
    }

    public override get direction360(): Direction360 {
        return this._movementDirection360;
    }

    public override get boundingType(): number {
        return 2;
    }

    public override get boundingData(): any[] {
        return SnowBallGameObject.BOUNDING_DATA;
    }

    public get throwingHuman(): HumanGameObject {
        return this._throwingHuman;
    }

    public override dispose(): void {
        super.dispose();
        this._location3D.dispose();
        this._location3D = null;
        this._movementDirection360.dispose();
        this._movementDirection360 = null;
        this._trajectory = 0;
        this._SafeStr_2743 = 0;
        this._SafeStr_2327 = 0;
        this._throwingHuman = null;
        this._parabolaOffset = 0;
    }

    public override getVariable(param1: number): number {
        switch (param1) {
            case 0:
                return 1;
            case 1:
                return this._gameObjectId;
            case 2:
                return this._location3D.x;
            case 3:
                return this._location3D.y;
            case 4:
                return this._location3D.z;
            case 5:
                return this._movementDirection360.intValue();
            case 6:
                return this._trajectory;
            case 7:
                return this._SafeStr_2327;
            case 8:
                return this._throwingHuman.gameObjectId;
            case 9:
                return this._parabolaOffset;
            case 10:
                return this._SafeStr_2743;
            default:
                throw new Exception("No such variable:" + param1);
        }
    }

    public override subturn(param1: SynchronizedGameStage): void {
        let _loc3_: SnowWarGameStage = param1 instanceof SnowWarGameStage ? param1 : null;
        if (!this._active) {
            return;
        }
        this._SafeStr_2327 = this._SafeStr_2327 - 1;
        if (this._trajectory == 0) {
            this.updatePosition(10, true);
        } else if (this._trajectory == 1) {
            this.updatePosition(25, false);
        } else {
            this.updatePosition(50, false);
        }
        let _loc5_: number = Tile.convertToTileX(this._location3D.x);
        let _loc6_: number = Tile.convertToTileY(this._location3D.y);
        let _loc4_: Tile = _loc3_.getTileAt(_loc5_, _loc6_);
        let _loc2_: boolean = this.testCollisions(_loc3_, _loc4_);
        if (!_loc2_) {
            _loc2_ = _loc3_.testCollisionWithGround(this);
            if (_loc2_) {
                SnowWarEngine.playSound("HBSTG_snowwar_miss");
            }
        }
        if (_loc2_) {
            _loc3_.putGameObjectOnDeleteList(this);
        }
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log("Snowball " + this._gameObjectId + " tileX:" + _loc5_ + " tileY:" + _loc6_ + " collision:" + _loc2_);
        }
    }

    public override onSnowBallHit(param1: SnowWarGameStage, param2: SnowBallGameObject): void {
    }

    public initializeFromData(param1: SnowballGameObjectData, param2: HumanGameObject): void {
        this._location3D.changeLocation(param1.locationX3D, param1.locationY3D, param1.locationZ3D);
        this._movementDirection360.setIntValue(param1.movementDirection360);
        this._trajectory = param1.trajectory;
        this._SafeStr_2743 = param1.planarVelocity;
        this._SafeStr_2327 = param1.timeToLive;
        this._throwingHuman = param2;
        this._parabolaOffset = param1.parabolaOffset;
        this._active = true;
    }

    public initialize(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: HumanGameObject): void {
        let _loc10_: number = 0;
        this._active = true;
        this._location3D.changeLocation(param1, param2, param3);
        this._trajectory = param4;
        let _loc8_: number = param5 - param1;
        let _loc9_: number = param6 - param2;
        _loc8_ = MathUtil.javaDiv(_loc8_ / 200);
        _loc9_ = MathUtil.javaDiv(_loc9_ / 200);
        this._movementDirection360.setIntValue(Direction360.getAngleFromComponents(_loc8_, _loc9_));
        _loc10_ = SquareRoot.fast_sqrt(_loc8_ * _loc8_ + _loc9_ * _loc9_) * 200;
        this.initializeTrajectory(param4, _loc10_);
        if (this._trajectory == 0) {
            this._SafeStr_2327 = 20000 / 2000 | 0;
            this._SafeStr_2743 = 2000;
        } else if (this._trajectory == 1) {
            _loc10_ = Math.min(_loc10_, 60000) | 0;
            this._SafeStr_2327 = _loc10_ * 0.000559 | 0;
            this._SafeStr_2743 = this._SafeStr_2327 == 0 ? 0 : MathUtil.javaDiv(_loc10_ / this._SafeStr_2327);
        } else if (this._trajectory == 2) {
            _loc10_ = Math.min(_loc10_, 100000) | 0;
            this._SafeStr_2327 = _loc10_ * 0.0007072135785007072 | 0;
            this._SafeStr_2743 = this._SafeStr_2327 == 0 ? 0 : MathUtil.javaDiv(_loc10_ / this._SafeStr_2327);
        }
        this._parabolaOffset = MathUtil.javaDiv(this._SafeStr_2327 / 2);
        this._throwingHuman = param7;
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log("Snowball created, id=" + this._gameObjectId + " ttl:" + this._SafeStr_2327 + " deltaX:" + _loc8_ + " deltaY:" + _loc9_ + " deltaX/200:" + MathUtil.javaDiv(_loc8_ / 200) + " deltaY/200:" + MathUtil.javaDiv(_loc9_ / 200) + " deltax^2+deltay^2:" + (_loc8_ * _loc8_ + _loc9_ * _loc9_) + " sqrt(deltax^2+deltay^2):" + SquareRoot.fast_sqrt(_loc8_ * _loc8_ + _loc9_ * _loc9_) + " sqrt(deltax^2+deltay^2)*200:" + SquareRoot.fast_sqrt(_loc8_ * _loc8_ + _loc9_ * _loc9_) * 200);
        }
    }

    public toString(): string {
        return " location=(" + this._location3D.x + "," + this._location3D.y + "," + this._location3D.z + ")" + " dir=" + this._movementDirection360 + " paraOffs=" + this._parabolaOffset + " ttl=" + this._SafeStr_2327;
    }

    private initializeTrajectory(param1: number, param2: number): void {
        if (param1 == 3) {
            if (param2 <= 42000) {
                this._trajectory = 0;
            } else if (param2 <= 60000) {
                this._trajectory = 1;
            } else {
                this._trajectory = 2;
            }
        } else {
            this._trajectory = param1;
        }
    }

    private testCollisions(param1: SnowWarGameStage, param2: Tile): boolean {
        let _loc4_: Direction8 = null;
        let _loc3_: boolean = false;
        if (param2) {
            _loc3_ = this.testCollision(param1, param2);
            if (!_loc3_) {
                _loc4_ = this._movementDirection360.direction8Value();
                _loc3_ = this.testCollision(param1, param2.getTileInDirection(_loc4_));
                if (!_loc3_) {
                    _loc3_ = this.testCollision(param1, param2.getTileInDirection(_loc4_.rotateDirection45Degrees(false)));
                    if (!_loc3_) {
                        _loc3_ = this.testCollision(param1, param2.getTileInDirection(_loc4_.rotateDirection45Degrees(true)));
                    }
                }
            }
        }
        return _loc3_;
    }

    private testCollision(param1: SnowWarGameStage, param2: Tile): boolean {
        let _loc3_: SnowWarGameObject = null;
        if (param2) {
            _loc3_ = param2.gameObject;
            if (_loc3_) {
                if (HabboGamesCom.logEnabled) {
                    HabboGamesCom.log("Snowball " + this._gameObjectId + " testing collision with " + _loc3_.gameObjectId);
                }
                if (_loc3_.testSnowBallCollision(this)) {
                    _loc3_.onSnowBallHit(param1, this);
                    return true;
                }
            }
        }
        return false;
    }

    private updatePosition(param1: number, param2: boolean): void {
        let _loc6_: number = this._location3D.x + MathUtil.javaDiv(this._movementDirection360.getBaseVectorXComponent() * this._SafeStr_2743 / 255);
        let _loc5_: number = this._location3D.y + MathUtil.javaDiv(this._movementDirection360.getBaseVectorYComponent() * this._SafeStr_2743 / 255);
        let _loc3_: number = this._SafeStr_2327 - this._parabolaOffset;
        let _loc4_: number = (this._parabolaOffset * this._parabolaOffset - _loc3_ * _loc3_) * param1 + 3000;
        if (param2) {
            _loc4_ = Math.min(_loc4_, 3000) | 0;
        }
        this._location3D.changeLocation(_loc6_, _loc5_, _loc4_);
    }
}
