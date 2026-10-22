import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HumanGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/HumanGameObjectData';
import type { SynchronizedGameArena } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameArena';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowBallGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowBallGameObject';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { HabboGamesCom, SnowWarEngine, SnowWarGameArena, SnowWarGameStage, Tile } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowWarGameObject';
import { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';
import { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { MathUtil } from '@/com/sulake/habbo/game/snowwar/utils/MathUtil';

export class HumanGameObject extends SnowWarGameObject {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.gameobjects::HumanGameObject'); }

    public static readonly _SafeStr_8516: number = 534;
    public static readonly INITIAL_SNOWBALL_COUNT: number = 5;
    public static readonly MAXIMUM_SNOWBALL_COUNT: number = 5;
    public static readonly INITIAL_HIT_POINTS: number = 5;
    public static readonly SNOWBALL_CREATE_TIME: number = 20;
    public static readonly STUN_TIME: number = 100;
    public static readonly INVINCIBLE_AFTER_STUN_TIME: number = 60;
    public static readonly ACTIVITY_STATE_NORMAL: number = 0;
    public static readonly ACTIVITY_STATE_MAKING_SNOWBALL: number = 1;
    public static readonly ACTIVITY_STATE_STUNNED: number = 2;
    public static readonly ACTIVITY_STATE_INVINCIBLE_AFTER_STUN: number = 3;
    public static readonly SNOWBALL_THROW_INTERVAL: number = 5;
    public static readonly PLAYER_HEIGHT: number = 5000;
    private static readonly SCORE_ON_KNOCK_DOWN: number = 5;
    private static readonly SCORE_ON_HIT: number = 1;
    public static readonly BOUNDING_DATA: any[] = [1600];

    declare private _SafeStr_2223: Tile;

    declare private _SafeStr_2148: Tile;

    declare private _isMoving: boolean;
    static { (this.prototype as any)._isMoving = false; }

    private _SafeStr_2232: Location3D = new Location3D(0, 0, 0);
    private _SafeStr_2412: Location3D = new Location3D(0, 0, 0);
    private _bodyDirection: Direction8 = Direction8.SE;

    declare private _hitPoints: number;
    static { (this.prototype as any)._hitPoints = 0; }

    declare private _SafeStr_2325: number;
    static { (this.prototype as any)._SafeStr_2325 = 0; }

    declare protected _SafeStr_5904: number;
    static { (this.prototype as any)._SafeStr_5904 = 0; }

    declare private _SafeStr_2398: number;
    static { (this.prototype as any)._SafeStr_2398 = 0; }

    declare private _SafeStr_2201: number;
    static { (this.prototype as any)._SafeStr_2201 = 0; }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    declare private _team: number;
    static { (this.prototype as any)._team = 0; }

    declare private _SafeStr_3187: number;
    static { (this.prototype as any)._SafeStr_3187 = 0; }

    declare private _name: string;

    declare private _SafeStr_5398: string;

    declare private _figure: string;

    declare private _sex: string;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _visualizationMode: number = 0;

    declare private _gameEngine: SnowWarEngine;

    declare private _SafeStr_4218: UtilsMap;

    constructor(param1: SnowWarGameStage, param2: HumanGameObjectData, param3: boolean, param4: SnowWarEngine) {
        super(param2.id, param3);
        this._sex = param2.sex;
        this._name = param2.name;
        this._SafeStr_5398 = param2.mission;
        this._figure = param2.figure;
        this._team = param2.team;
        this._userId = param2.userId;
        this._SafeStr_2201 = param2.activityState;
        this._SafeStr_2398 = param2.activityTimer;
        this._SafeStr_2232.change2DLocation(param2.currentLocationX, param2.currentLocationY);
        this._bodyDirection = Direction8.getDirection8(param2.bodyDirection);
        this._hitPoints = param2.hitPoints;
        this._SafeStr_2412.change2DLocation(param2.moveTargetX, param2.moveTargetY);
        this._SafeStr_2325 = param2.snowBallCount;
        this._score = param2.score;
        this._SafeStr_2223 = param1.getTileAt(param2.currentTileX, param2.currentTileY);
        this._SafeStr_2223.addGameObject(this);
        let _loc5_: Tile = param1.getTileAt(param2.nextTileX, param2.nextTileY);
        if (_loc5_ != this._SafeStr_2223) {
            this._SafeStr_2148 = _loc5_;
            this._SafeStr_2148.addGameObject(this);
            this._SafeStr_2223.removeOccupyingHuman();
            this._isMoving = true;
        }
        this._gameEngine = param4;
        this._SafeStr_4218 = new UtilsMap();
    }

    public get visualizationMode(): number {
        return this._visualizationMode;
    }

    public set visualizationMode(param1: number) {
        this._visualizationMode = param1;
    }

    public get invincible(): boolean {
        return this._SafeStr_2201 == 3;
    }

    public override dispose(): void {
        super.dispose();
        this._sex = "";
        this._name = "";
        this._SafeStr_5398 = "";
        this._figure = "";
        this._team = 0;
        this._userId = 0;
        this._SafeStr_2232 = null;
        this._bodyDirection = null;
        this._SafeStr_2412 = null;
        this._SafeStr_2325 = 0;
        this._score = 0;
        this._isMoving = false;
        this._gameEngine = null;
        this._SafeStr_4218 = null;
    }

    public override get numberOfVariables(): number {
        return 19;
    }

    public override getVariable(param1: number): number {
        switch (param1) {
            case 0:
                return 5;
            case 1:
                return this._gameObjectId;
            case 2:
                return this._SafeStr_2232.x;
            case 3:
                return this._SafeStr_2232.y;
            case 4:
                return this._SafeStr_2223.fuseLocation[0] | 0;
            case 5:
                return this._SafeStr_2223.fuseLocation[1] | 0;
            case 6:
                return this._bodyDirection.intValue();
            case 7:
                return this._hitPoints;
            case 8:
                return this._SafeStr_2325;
            case 9:
                return this._SafeStr_5904;
            case 10:
                return this._SafeStr_2398;
            case 11:
                return this._SafeStr_2201;
            case 12:
                return Number(this._SafeStr_2148 != null ? this._SafeStr_2148.fuseLocation[0] : this._SafeStr_2223.fuseLocation[0]) | 0;
            case 13:
                return Number(this._SafeStr_2148 != null ? this._SafeStr_2148.fuseLocation[1] : this._SafeStr_2223.fuseLocation[1]) | 0;
            case 14:
                return this._SafeStr_2412.x;
            case 15:
                return this._SafeStr_2412.y;
            case 16:
                return this._score;
            case 17:
                return this._team;
            case 18:
                return this._userId;
            default:
                throw new Exception("No such variable:" + param1);
        }
    }

    public reinitGhost(param1: HumanGameObject): void {
        this._SafeStr_2232.change2DLocation(param1._SafeStr_2232.x, param1._SafeStr_2232.y);
        this._SafeStr_2223 = param1._SafeStr_2223;
        this._bodyDirection = param1._bodyDirection;
        this._hitPoints = param1._hitPoints;
        this._SafeStr_2325 = param1._SafeStr_2325;
        this._SafeStr_5904 = param1._SafeStr_5904;
        this._SafeStr_2398 = param1._SafeStr_2398;
        this._SafeStr_2201 = param1._SafeStr_2201;
        this._SafeStr_2148 = param1._SafeStr_2148;
        this._SafeStr_2412.change2DLocation(param1._SafeStr_2412.x, param1._SafeStr_2412.y);
        this._score = param1._score;
        this._team = param1._team;
        this._userId = param1._userId;
    }

    public isInGhostDistance(param1: number, param2: Location3D): boolean {
        let _loc3_: Location3D = this._SafeStr_4218[param1];
        if (_loc3_) {
            return _loc3_.isInDistance(param2, Tile.TILE_ONEANDHALFWIDTH);
        }
        return false;
    }

    public addGhostLocation(param1: number): void {
        let _loc2_: Location3D = new Location3D(0, 0, 0);
        _loc2_.change2DLocation(this._SafeStr_2232.x, this._SafeStr_2232.y);
        this._SafeStr_4218[param1] = _loc2_;
    }

    public removeGhostLocation(param1: number): void {
        this._SafeStr_4218.remove(param1);
    }

    public setBodyDirection(param1: Direction8): void {
        this._bodyDirection = param1;
    }

    public override get boundingType(): number {
        return 2;
    }

    public override get boundingData(): any[] {
        return HumanGameObject.BOUNDING_DATA;
    }

    public override get location3D(): Location3D {
        return this._SafeStr_2232;
    }

    public override get direction360(): Direction360 {
        return null;
    }

    public override onRemove(): void {
        if (this._SafeStr_2223 && this._SafeStr_2223.occupyingHuman == this) {
            this._SafeStr_2223.removeOccupyingHuman();
        }
        if (this._SafeStr_2148 && this._SafeStr_2148.occupyingHuman == this) {
            this._SafeStr_2148.removeOccupyingHuman();
        }
        this._isMoving = false;
    }

    public activityTimerTriggered(): void {
        if (this._SafeStr_2201 == 2) {
            this._hitPoints = 5;
            this._SafeStr_2201 = 3;
            this._SafeStr_2398 = 60;
            return;
        }
        if (this._SafeStr_2201 == 1) {
            this._SafeStr_2325 = this._SafeStr_2325 + 1;
        }
        this._SafeStr_2201 = 0;
        this._gameEngine.stopWaitingForSnowball(this.gameObjectId);
    }

    public override subturn(param1: SynchronizedGameStage): void {
        let _loc2_: number = 0;
        let _loc3_: Direction8 = null;
        let _loc4_: SnowWarGameStage = param1 instanceof SnowWarGameStage ? param1 : null;
        if (this._SafeStr_2398 > 0) {
            if (this._SafeStr_2398 == 1) {
                this.activityTimerTriggered();
            }
            this._SafeStr_2398 = this._SafeStr_2398 - 1;
        }
        if (this._SafeStr_3187 > 0) {
            this._SafeStr_3187 = this._SafeStr_3187 - 1;
        }
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log(this.gameObjectId + " currentTile:" + this._SafeStr_2223 + " nextTile:" + this._SafeStr_2148);
        }
        if (this.canMove() && this._SafeStr_2223 != null) {
            if (this._SafeStr_2148 != null) {
                if (HabboGamesCom.logEnabled) {
                    HabboGamesCom.log(this.gameObjectId + " Moving towards next tile:" + this._SafeStr_2148 + " _currentLocation:" + this._SafeStr_2232);
                }
                this.moveTowardsNextTile();
            } else if (!this._SafeStr_2223.locationIsInTileRange(this._SafeStr_2412)) {
                _loc2_ = Direction360.getAngleFromComponents(this._SafeStr_2412.x - this._SafeStr_2223.location.x, this._SafeStr_2412.y - this._SafeStr_2223.location.y);
                _loc3_ = Direction360.direction360ValueToDirection8(_loc2_);
                this._SafeStr_2148 = this._SafeStr_2223.getTileInDirection(_loc3_);
                if (this._SafeStr_2148 == null || !this._SafeStr_2148.canMoveTo(this)) {
                    if (this._SafeStr_2148 != null && !this._SafeStr_2148.canMoveTo(this)) {
                        if (this._SafeStr_2412.equals(this._SafeStr_2148.location)) {
                            this._SafeStr_2148 = null;
                            this.stopMovement();
                            return;
                        }
                    }
                    _loc3_ = _loc3_.rotateDirection(-1);
                    this._SafeStr_2148 = this._SafeStr_2223.getTileInDirection(_loc3_);
                    if (this._SafeStr_2148 == null || !this._SafeStr_2148.canMoveTo(this)) {
                        _loc3_ = _loc3_.rotateDirection(2);
                        this._SafeStr_2148 = this._SafeStr_2223.getTileInDirection(_loc3_);
                        if (this._SafeStr_2148 != null && !this._SafeStr_2148.canMoveTo(this)) {
                            this._SafeStr_2148 = null;
                        }
                    }
                }
                if (this._SafeStr_2148 != null) {
                    if (!this.isGhost) {
                        this._SafeStr_2223.removeOccupyingHuman();
                        this._SafeStr_2148.addGameObject(this);
                    }
                    this.setBodyDirection(_loc3_);
                    this.moveTowardsNextTile();
                } else {
                    this._isMoving = false;
                }
                if (HabboGamesCom.logEnabled) {
                    HabboGamesCom.log(this.gameObjectId + " Starting to move to next tile in direction360:" + _loc2_ + ", nextTile is now " + this._SafeStr_2148 + "_currentLocationn:" + this._SafeStr_2232 + ", moveTarget:" + this._SafeStr_2412);
                }
            } else {
                this._isMoving = false;
            }
        } else {
            this._isMoving = false;
        }
    }

    private moveTowardsNextTile(): void {
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log(this.gameObjectId + " [MoveTowardsNextTile], currentX: " + this._SafeStr_2232.x + " currentY: " + this._SafeStr_2232.y);
        }
        let _loc5_: number = this._SafeStr_2148.location.x;
        let _loc1_: number = this._SafeStr_2232.x;
        let _loc2_: number = _loc1_ - _loc5_;
        if (_loc2_ != 0) {
            if (_loc2_ < 0) {
                if (_loc2_ > -534) {
                    _loc1_ = _loc5_;
                } else {
                    _loc1_ += 534;
                }
            } else if (_loc2_ < 534) {
                _loc1_ = _loc5_;
            } else {
                _loc1_ -= 534;
            }
        }
        let _loc3_: number = this._SafeStr_2148.location.y;
        let _loc6_: number = this._SafeStr_2232.y;
        let _loc4_: number = _loc6_ - _loc3_;
        if (_loc4_ != 0) {
            if (_loc4_ < 0) {
                if (_loc4_ > -534) {
                    _loc6_ = _loc3_;
                } else {
                    _loc6_ += 534;
                }
            } else if (_loc4_ < 534) {
                _loc6_ = _loc3_;
            } else {
                _loc6_ -= 534;
            }
        }
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log(this.gameObjectId + " [MoveTowardsNextTile], nextX: " + _loc1_ + " nextY: " + _loc6_);
        }
        this._SafeStr_2232.change2DLocation(_loc1_, _loc6_);
        if (this._SafeStr_2232.distanceTo(this._SafeStr_2148.location) < MathUtil.javaDiv(534 / 2)) {
            this._SafeStr_2223 = this._SafeStr_2148;
            this._SafeStr_2148 = null;
        }
        this._isMoving = true;
    }

    public changeMoveTarget(param1: number, param2: number): void {
        if (this._SafeStr_2201 == 1) {
            this._SafeStr_2201 = 0;
            this._SafeStr_2398 = 0;
            this._gameEngine.stopWaitingForSnowball(this.gameObjectId);
        }
        if (this._SafeStr_2201 == 0 || this._SafeStr_2201 == 3) {
            this._SafeStr_2412.change2DLocation(param1, param2);
        }
    }

    public get currentLocation(): Location3D {
        return this._SafeStr_2232;
    }

    public playerIsHitBySnowball(param1: SnowWarGameStage, param2: HumanGameObject, param3: number): void {
        if (this._isGhost) {
            return;
        }
        if (this._team == param2.team && param1.gameArena.numberOfTeams != 1) {
            return;
        }
        if (this._hitPoints > 0) {
            if (this._hitPoints == 1) {
                this.playerFallsDown(param3);
                param2.onKnockDownHuman(param1, this);
                SnowWarEngine.playSound("HBSTG_snowwar_hit3");
            }
            this._hitPoints = this._hitPoints - 1;
            this._gameEngine.registerHit(this, param2);
        }
    }

    public onHitHuman(param1: SnowWarGameStage, param2: HumanGameObject): void {
        if (!param2.isGhost && (this.team != param2.team || Boolean(castTo(param1.gameArena.getExtension(), SnowWarGameArena).isDeathMatch()))) {
            this.addScore(param1.gameArena, 1);
        }
    }

    public onKnockDownHuman(param1: SnowWarGameStage, param2: HumanGameObject): void {
        if (!param2.isGhost && (this.team != param2.team || Boolean(castTo(param1.gameArena.getExtension(), SnowWarGameArena).isDeathMatch()))) {
            this.addScore(param1.gameArena, 5);
        }
    }

    public addScore(param1: SynchronizedGameArena, param2: number): void {
        this._score += param2;
        param1.addTeamScore(this.team, param2);
    }

    public playerFallsDown(param1: number): void {
        this._SafeStr_2201 = 2;
        this._SafeStr_2398 = 100;
        this.setBodyDirection(Direction360.direction360ValueToDirection8(param1).oppositeDirection());
        this.stopMovement();
        this._gameEngine.stopWaitingForSnowball(this.gameObjectId);
    }

    public stopMovement(): void {
        if (this._SafeStr_2148 == null) {
            this._SafeStr_2412.changeLocationToLocation(this._SafeStr_2223.location);
            this._SafeStr_2232.changeLocationToLocation(this._SafeStr_2223.location);
        } else {
            this._SafeStr_2223 = this._SafeStr_2148;
            this._SafeStr_2232.changeLocationToLocation(this._SafeStr_2148.location);
            this._SafeStr_2412.changeLocationToLocation(this._SafeStr_2148.location);
            this._SafeStr_2148 = null;
        }
        this._isMoving = false;
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log("Stopped. dir:" + this._bodyDirection + "_currentTilee:" + this._SafeStr_2223 + "_nextTilee:" + this._SafeStr_2148 + "_currentLocationn:" + this._SafeStr_2232 + "_moveTargett:" + this._SafeStr_2412);
        }
    }

    public getBodyDirection(): number {
        return this._bodyDirection.intValue();
    }

    public canThrowSnowballs(): boolean {
        return this._SafeStr_2325 > 0 && this._SafeStr_3187 < 1 && (this._SafeStr_2201 == 0 || this._SafeStr_2201 == 3);
    }

    public startThrowTimer(): void {
        this._SafeStr_3187 = 5;
    }

    public throwSnowball(param1: number, param2: number): boolean {
        if (this._SafeStr_2325 < 1) {
            return false;
        }
        this.stopMovement();
        let _loc4_: number = Direction360.getAngleFromComponents(param1 - this._SafeStr_2232.x, param2 - this._SafeStr_2232.y);
        let _loc3_: number = Direction360.direction360ValueToDirection8(_loc4_).intValue();
        this.setBodyDirection(Direction8.getDirection8(_loc3_));
        if (HabboGamesCom.logEnabled) {
            HabboGamesCom.log("Turning to:" + _loc3_ + " 360 value:" + _loc4_ + " target:" + param1 + "," + param2 + " location:" + this._SafeStr_2232.x + "," + this._SafeStr_2232.y);
        }
        this._SafeStr_2325 = this._SafeStr_2325 - 1;
        return true;
    }

    public canMove(): boolean {
        return this._SafeStr_2201 == 0 || this._SafeStr_2201 == 3;
    }

    public canMakeSnowballs(): boolean {
        return (this._SafeStr_2201 == 0 || this._SafeStr_2201 == 3) && (this._SafeStr_2325 < 5 || this.isGhost);
    }

    public startMakingSnowball(): void {
        if (this.canMakeSnowballs()) {
            this._SafeStr_2201 = 1;
            this._SafeStr_2398 = 20;
            this.stopMovement();
        }
    }

    public getRemainingSnowballCapacity(): number {
        return 5 - this._SafeStr_2325;
    }

    public addSnowballs(param1: number): void {
        this._SafeStr_2325 += param1;
    }

    public isStunned(): boolean {
        return this._SafeStr_2201 == 2;
    }

    public get name(): string {
        return this._name;
    }

    public get mission(): string {
        return this._SafeStr_5398;
    }

    public get figure(): string {
        return this._figure;
    }

    public get sex(): string {
        return this._sex;
    }

    public get score(): number {
        return this._score;
    }

    public get team(): number {
        return this._team;
    }

    public get snowballs(): number {
        return this._SafeStr_2325;
    }

    public get hitPoints(): number {
        return this._hitPoints;
    }

    public get posture(): string {
        if (this._SafeStr_3187 > 0) {
            return "swthrow";
        }
        switch (this._SafeStr_2201 - 1) {
            case 0:
                return "swpick";
            case 1:
                return "swdieback";
            default:
                if (this._isMoving) {
                    return "swrun";
                }
                return "std";
        }
    }

    public get action(): string {
        switch (this._SafeStr_2201 - 3) {
            case 0:
                return "figure_dance";
            default:
                return "figure_dance";
        }
    }

    public get parameter(): number {
        if (this._SafeStr_3187 > 1) {
            return 1;
        }
        if (this._SafeStr_3187 == 1) {
            return 0;
        }
        switch (this._SafeStr_2201 - 3) {
            case 0:
                return 1;
            default:
                return 0;
        }
    }

    public override testSnowBallCollision(param1: SnowBallGameObject): boolean {
        if (!this._isGhost && this._SafeStr_2201 != 2 && this._SafeStr_2201 != 3 && param1.throwingHuman != this && Boolean(super.testSnowBallCollision(param1))) {
            return true;
        }
        return false;
    }

    public override onSnowBallHit(param1: SnowWarGameStage, param2: SnowBallGameObject): void {
        let _loc3_: HumanGameObject = param2.throwingHuman;
        this.playerIsHitBySnowball(param1, _loc3_, param2.direction360.intValue());
        _loc3_.onHitHuman(param1, this);
        SnowWarEngine.playSound("HBSTG_snowwar_hit1");
    }

    public override get collisionHeight(): number {
        return 5000;
    }

    public toString(): string {
        return " ref:" + this._gameObjectId + "_name:" + this._name;
    }
}
