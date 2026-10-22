import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { GameLevelData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLevelData';
import type { KeyboardControl } from '@/com/sulake/habbo/game/snowwar/KeyboardControl';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HumanGameObject, SnowBallGameObject, SnowWarEngine, SnowWarGameArena, SnowWarGameStage, SnowWarUI, SnowballMachineGameObject, SnowballPileGameObject, Tile, TreeGameObject } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { isISynchronizedGameObject } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameObject';
import { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';
import { isIRoomCreator } from '@/com/sulake/habbo/room/IRoomCreator';
import { isIRoomEngineServices } from '@/com/sulake/habbo/room/IRoomEngineServices';
import { RoomPlaneParser } from '@/com/sulake/habbo/room/object/RoomPlaneParser';
import { RoomEngine } from '@/com/sulake/habbo/room/RoomEngine';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { isIRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class GameArenaView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.ui::GameArenaView'); }

    private static readonly GAME_ROOM_ID: number = 1;
    private static readonly TILE_CURSOR_STATE_TEAM_1: number = 3;
    private static readonly TILE_CURSOR_STATE_TEAM_2: number = 2;
    private static readonly TILE_CURSOR_STATE_TEAM_3: number = 4;
    private static readonly TILE_CURSOR_STATE_TEAM_4: number = 5;
    private static readonly EFFECT_RED_TEAM: number = 95;
    private static readonly EFFECT_BLUE_TEAM: number = 96;
    private static readonly EFFECT_CROSSHAIR: number = 98;
    private static readonly SPLASH_LIFE_SPAN_TIME: number = 500;

    constructor(param1: SnowWarEngine) {
        this._gameEngine = param1;
        this._gameEngine.roomEngine.addObjectUpdateCategory(202);
    }

    declare private _gameEngine: SnowWarEngine;

    private _SafeStr_3789: any[] = [];
    private _SafeStr_3812: any[] = [];
    private _SafeStr_4350: any[] = [];

    declare private _SafeStr_4457: KeyboardControl;

    private _disposed: boolean = false;

    declare private _SafeStr_2253: SnowWarUI;

    declare private _SafeStr_4388: boolean;
    static { (this.prototype as any)._SafeStr_4388 = false; }

    declare private _SafeStr_2427: Stage;

    declare private _SafeStr_7422: boolean;
    static { (this.prototype as any)._SafeStr_7422 = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._gameEngine.roomEngine.disposeRoom(1);
        this._gameEngine.roomEngine.removeObjectUpdateCategory(202);
        if (this._SafeStr_4457) {
            this._SafeStr_4457.dispose();
            this._SafeStr_4457 = null;
        }
        if (this._SafeStr_2427 != null) {
            this._SafeStr_2427.removeEventListener("mouseMove", this.onMouseMove);
            this._SafeStr_2427 = null;
        }
        this._gameEngine = null;
        this._SafeStr_3789 = null;
        this._SafeStr_3812 = null;
        if (this._SafeStr_2253) {
            this._SafeStr_2253.dispose();
            this._SafeStr_2253 = null;
        }
        this._disposed = true;
    }

    public init(): void {
        let _loc11_: number = 0;
        let _loc10_: number = 0;
        let _loc12_: number = NaN;
        let _loc1_: Vector3d = null;
        let _loc5_: Vector3d = null;
        let _loc13_: number = 0;
        let _loc9_: IStuffData = null;
        let _loc14_: number = 0;
        let _loc6_: number = NaN;
        this._gameEngine.roomEngine.isGameMode = true;
        let _loc7_: SnowWarGameStage = asInstanceOf(this._gameEngine.gameArena.getCurrentStage(), SnowWarGameStage);
        let _loc2_: GameLevelData = _loc7_.gameLevelData;
        let _loc8_: any[] = _loc7_.getTiles();
        let _loc3_: RoomPlaneParser = new RoomPlaneParser();
        _loc3_.initializeTileMap(_loc2_.width, _loc2_.height);
        _loc11_ = 0;
        while (_loc11_ < _loc2_.height) {
            _loc10_ = 0;
            while (_loc10_ < _loc2_.width) {
                _loc3_.setTileHeight(_loc10_, _loc11_, _loc8_[_loc11_][_loc10_] == null ? -100 : 0);
                _loc10_++;
            }
            _loc11_++;
        }
        _loc3_.initializeFromTileData();
        this._gameEngine.roomEngine.initializeRoom(1, _loc3_.getXML());
        (asGuarded(this._gameEngine.roomEngine, isIRoomCreator)).updateObjectRoomVisibilities(1, false);
        _loc3_.dispose();
        for (const _loc4_ of _loc7_.gameLevelData.fuseObjects ?? []) {
            _loc12_ = _loc4_.altitude / Tile.TILE_HALFWIDTH;
            _loc1_ = new Vector3d(Number(_loc4_.x), Number(_loc4_.y), _loc12_);
            _loc5_ = new Vector3d(_loc4_.direction * 45);
            _loc13_ = this._gameEngine.roomEngine.getFurnitureTypeId(stringOrNull(_loc4_.name));
            _loc9_ = _loc4_.stuffData;
            _loc14_ = 0;
            _loc6_ = parseInt(_loc9_.getLegacyString());
            if (!isNaN(_loc6_)) {
                _loc14_ = _loc6_ | 0;
            }
            this._gameEngine.roomEngine.addObjectFurniture(1, _loc4_.id | 0, _loc13_, _loc1_, _loc5_, _loc14_, _loc9_);
        }
        this._gameEngine.roomUI.visible = false;
        this._SafeStr_2427 = this._gameEngine.context.displayObjectContainer.stage;
        this._SafeStr_2427.addEventListener("mouseMove", this.onMouseMove);
    }

    public initGameUI(param1: number): void {
        this._SafeStr_2253 = new SnowWarUI(this._gameEngine);
        this._SafeStr_2253.init();
        this.initCountDown();
    }

    public removeGameUI(): void {
        if (this._SafeStr_2253) {
            this._SafeStr_2253.dispose();
            this._SafeStr_2253 = null;
        }
    }

    public update(param1: number, param2: boolean = false): void {
        let _loc11_: Direction8 = null;
        let _loc25_: HumanGameObject = null;
        let _loc16_: number = NaN;
        let _loc13_: number = NaN;
        let _loc9_: number = 0;
        let _loc18_: number = 0;
        let _loc5_: number = 0;
        let _loc17_: IRoomObject = null;
        let _loc22_: IVector3d = null;
        let _loc21_: number = 0;
        let _loc26_: any = undefined;
        let _loc7_: HumanGameObject = null;
        let _loc4_: any = false;
        let _loc19_: number = 0;
        let _loc24_: SnowBallGameObject = null;
        let _loc6_: SnowballMachineGameObject = null;
        let _loc8_: SnowballPileGameObject = null;
        let _loc20_: TreeGameObject = null;
        if (param2 && this._SafeStr_4457) {
            _loc11_ = this._SafeStr_4457.direction;
            if (_loc11_) {
                _loc25_ = asInstanceOf(this._gameEngine.gameArena.getCurrentStage().getGameObject(this._gameEngine.ownId), HumanGameObject);
                _loc16_ = _loc25_.currentLocation.x / 3200;
                _loc13_ = _loc25_.currentLocation.y / 3200;
                _loc16_ += _loc11_.getUnitVectorXcomponent() * 2;
                _loc13_ += _loc11_.getUnitVectorYcomponent() * 2;
                this._gameEngine.moveOwnAvatarTo(_loc16_ | 0, _loc13_ | 0);
            }
        }
        let _loc23_: number = getTimer();
        for (const _loc12_ of this._gameEngine.gameArena.getCurrentStage().resetRemovedGameObjects() ?? []) {
            _loc9_ = _loc12_.gameObjectId | 0;
            _loc18_ = this._SafeStr_3789.indexOf(_loc9_);
            if (_loc18_ > -1) {
                this._gameEngine.roomEngine.disposeObjectUser(1, _loc9_);
                this._SafeStr_3789.splice(_loc18_, 1);
            }
            _loc5_ = this._SafeStr_3812.indexOf(_loc9_);
            if (_loc5_ > -1) {
                _loc17_ = this._gameEngine.roomEngine.getRoomObject(1, _loc9_, 201);
                _loc22_ = _loc17_.getLocation();
                this._gameEngine.roomEngine.disposeObjectSnowWar(1, _loc9_, 201);
                this._SafeStr_3812.splice(_loc5_, 1);
                if (!castGuarded(_loc12_, isISynchronizedGameObject, "com.sulake.habbo.game.snowwar.arena.ISynchronizedGameObject").isActive) {
                    this._gameEngine.roomEngine.addObjectSnowWar(1, _loc9_, _loc22_, 202);
                    this._SafeStr_4350.push({ "id": _loc9_, "time": _loc23_, "category": 202 });
                }
            }
        }
        _loc21_ = this._SafeStr_4350.length - 1;
        while (_loc21_ > -1) {
            _loc26_ = this._SafeStr_4350[_loc21_];
            if (_loc23_ - _loc26_.time >= 500) {
                this._gameEngine.roomEngine.disposeObjectSnowWar(1, _loc26_.id | 0, _loc26_.category | 0);
                this._SafeStr_4350.splice(_loc21_, 1);
            }
            _loc21_--;
        }
        let _loc10_: any[] = this._gameEngine.gameArena.getCurrentStage().getGameObjects();
        let _loc15_: boolean = false;
        for (const _loc3_ of _loc10_ ?? []) {
            _loc7_ = _loc3_ instanceof HumanGameObject ? _loc3_ : null;
            if (_loc7_) {
                _loc4_ = _loc7_.posture == "swrun";
                _loc15_ ||= _loc4_;
                this.updateHumanGameObject(_loc7_);
                if (_loc7_.gameObjectId == this._gameEngine.ownId) {
                    _loc19_ = (asInstanceOf(this._gameEngine.gameArena.getExtension(), SnowWarGameArena)).getPulseInterval();
                    this._SafeStr_2253.timer = this._gameEngine.stageLength - this._gameEngine.currentSubTurn * _loc19_ / 1000 | 0;
                    this._SafeStr_2253.ownScore = _loc7_.score;
                    this._SafeStr_2253.snowballs = _loc7_.snowballs;
                    this._SafeStr_2253.hitPoints = _loc7_.hitPoints;
                }
            }
            _loc24_ = _loc3_ instanceof SnowBallGameObject ? _loc3_ : null;
            if (_loc24_) {
                this.updateSnowballGameObject(_loc24_);
            }
            _loc6_ = _loc3_ instanceof SnowballMachineGameObject ? _loc3_ : null;
            if (_loc6_) {
                this.updateSnowballMachineGameObject(_loc6_);
            }
            _loc8_ = _loc3_ instanceof SnowballPileGameObject ? _loc3_ : null;
            if (_loc8_) {
                this.updateSnowballPileGameObject(_loc8_);
            }
            _loc20_ = _loc3_ instanceof TreeGameObject ? _loc3_ : null;
            if (_loc20_) {
                this.updateTreeGameObject(_loc20_);
            }
        }
        if (this._SafeStr_2253) {
            this._SafeStr_2253.update(param1);
        }
        if (_loc15_ && !this._SafeStr_4388) {
            this._SafeStr_4388 = true;
            SnowWarEngine.playSound("HBSTG_snowwar_walk", 2147483647);
        } else if (!_loc15_ && this._SafeStr_4388) {
            this._SafeStr_4388 = false;
            SnowWarEngine.stopSound("HBSTG_snowwar_walk");
        }
        let _loc14_: HumanGameObject = this._gameEngine.getCurrentPlayer();
        this._gameEngine.roomEngine.updateObjectUserEffect(1, _loc14_.gameObjectId, _loc14_.team == 1 ? 96 : 95);
    }

    public showChecksumError(param1: number): void {
        this._SafeStr_2253.showChecksumError(param1);
    }

    public updateTileCursor(param1: number): void {
        let _loc2_: number = 0;
        switch (param1 - 1) {
            case 0:
                _loc2_ = 3;
                break;
            case 1:
                _loc2_ = 2;
                break;
            case 2:
                _loc2_ = 4;
                break;
            case 3:
                _loc2_ = 5;
                break;
            default:
                _loc2_ = 0;
        }
        this._gameEngine.roomEngine.setTileCursorState(1, _loc2_);
    }

    public stopWaitingForSnowball(): void {
        if (this._SafeStr_2253) {
            this._SafeStr_2253.stopWaitingForSnowball();
        }
    }

    public startWaitingForSnowball(): void {
        if (this._SafeStr_2253) {
            this._SafeStr_2253.startWaitingForSnowball();
        }
    }

    public flashOwnScore(param1: boolean): void {
        if (this._SafeStr_2253) {
            this._SafeStr_2253.flashOwnScore(param1);
        }
    }

    private updateHumanGameObject(param1: HumanGameObject): void {
        let _loc3_: IAvatarFigureContainer = null;
        let _loc9_: boolean = false;
        let _loc12_: IRoomObjectSpriteVisualization = null;
        let _loc6_: any = false;
        let _loc7_: number = param1.currentLocation.x / 3200;
        let _loc4_: number = param1.currentLocation.y / 3200;
        let _loc5_: number = param1.gameObjectId;
        let _loc10_: number = param1.getBodyDirection();
        let _loc8_: number = Direction360.direction8ToDirection360Value(Direction8.getDirection8(_loc10_));
        let _loc2_: IVector3d = new Vector3d(_loc8_, 0, 0);
        if (this._SafeStr_3789.indexOf(_loc5_) == -1) {
            _loc3_ = this._gameEngine.avatarManager.createFigureContainer(param1.figure);
            switch (param1.team - 1) {
                case 0:
                    _loc3_.updatePart("ch", 20000, [1]);
                    break;
                case 1:
                    _loc3_.updatePart("ch", 20001, [1]);
                    break;
                default:
                    _loc3_.updatePart("ch", 20000, [1]);
            }
            _loc3_.removePart("cc");
            this._gameEngine.roomEngine.addObjectUser(1, _loc5_, new Vector3d(_loc7_, _loc4_, 0), _loc2_, _loc8_, 1, _loc3_.getFigureString());
            this._gameEngine.roomEngine.updateObjectUserPosture(1, _loc5_, "std");
            this._gameEngine.roomEngine.updateObjectUserAction(1, _loc5_, "figure_is_playing_game", 1);
            this._SafeStr_3789.push(_loc5_);
            switch (param1.visualizationMode - 1) {
                case 0:
                    this.visualizeAsGhost(this.getRoomUserObject(_loc5_));
                    break;
                case 1:
                    this.hideVisualization(this.getRoomUserObject(_loc5_));
            }
        } else {
            this._gameEngine.roomEngine.updateObjectUser(1, _loc5_, new Vector3d(_loc7_, _loc4_, 0), new Vector3d(_loc7_, _loc4_, 0), false, 0, _loc2_, _loc8_);
            this._gameEngine.roomEngine.updateObjectUserPosture(1, _loc5_, param1.posture);
            _loc9_ = param1.posture != "swdieback" && param1.posture != "swdiefront";
            this._gameEngine.roomEngine.updateObjectUserAction(1, _loc5_, "figure_is_playing_game", Number(_loc9_) | 0);
        }
        let _loc11_: IRoomObject = this.getRoomUserObject(_loc5_);
        if (_loc11_ != null) {
            _loc12_ = asGuarded(_loc11_.getVisualization(), isIRoomObjectSpriteVisualization);
            _loc12_.getSprite(0).alpha = param1.invincible ? 100 : 255;
            _loc6_ = param1.team != this._gameEngine.getCurrentPlayer().team;
            if (_loc6_) {
                if ((asGuarded(this._gameEngine.roomEngine, isIRoomEngineServices)).playerUnderCursor == _loc5_ && !param1.invincible && !param1.isStunned()) {
                    this._gameEngine.roomEngine.updateObjectUserEffect(1, _loc5_, 98);
                } else {
                    this._gameEngine.roomEngine.updateObjectUserEffect(1, _loc5_, 0);
                }
            }
        }
    }

    private updateSnowballGameObject(param1: SnowBallGameObject): void {
        let _loc5_: number = param1.location3D.x / 3200;
        let _loc3_: number = param1.location3D.y / 3200;
        let _loc4_: number = param1.location3D.z / Tile.TILE_HALFWIDTH;
        let _loc2_: Vector3d = new Vector3d(_loc5_, _loc3_, _loc4_);
        let _loc6_: number = param1.gameObjectId;
        if (this._SafeStr_3812.indexOf(_loc6_) == -1) {
            this._gameEngine.roomEngine.addObjectSnowWar(1, _loc6_, _loc2_, 201);
            this._SafeStr_3812.push(_loc6_);
        } else {
            this._gameEngine.roomEngine.updateObjectSnowWar(1, _loc6_, _loc2_, 201);
        }
    }

    private updateSnowballMachineGameObject(param1: SnowballMachineGameObject): void {
        let _loc3_: RoomEngine = asInstanceOf(this._gameEngine.roomEngine, RoomEngine);
        let _loc2_: IRoomObjectController = asGuarded(_loc3_.getRoomObject(1, param1.fuseObjectId, 10), isIRoomObjectController);
        if (_loc2_.getState(0) != param1.snowballCount) {
            _loc3_.updateObjectFurniture(1, param1.fuseObjectId, null, null, param1.snowballCount, null);
            _loc2_.setState(param1.snowballCount, 0);
        }
    }

    private updateSnowballPileGameObject(param1: SnowballPileGameObject): void {
        let _loc3_: RoomEngine = asInstanceOf(this._gameEngine.roomEngine, RoomEngine);
        let _loc2_: IRoomObjectController = asGuarded(_loc3_.getRoomObject(1, param1.fuseObjectId, 10), isIRoomObjectController);
        let _loc4_: number = param1.maxSnowballs - param1.snowballCount;
        if (_loc2_ && _loc2_.getState(0) != _loc4_) {
            _loc3_.updateObjectFurniture(1, param1.fuseObjectId, null, null, _loc4_, null);
            _loc2_.setState(_loc4_, 0);
        }
    }

    private updateTreeGameObject(param1: TreeGameObject): void {
        let _loc3_: RoomEngine = asInstanceOf(this._gameEngine.roomEngine, RoomEngine);
        let _loc2_: IRoomObjectController = asGuarded(_loc3_.getRoomObject(1, param1.fuseObjectId, 10), isIRoomObjectController);
        if (_loc2_ && _loc2_.getState(0) != param1.hits) {
            _loc3_.updateObjectFurniture(1, param1.fuseObjectId, null, null, param1.hits, null);
            _loc2_.setState(param1.hits, 0);
        }
    }

    private getRoomUserObject(param1: number): IRoomObject {
        return this._gameEngine.roomEngine.getRoomObject(1, param1, 100);
    }

    private visualizeAsGhost(param1: IRoomObject): void {
        let _loc2_: IRoomObjectSpriteVisualization = null;
        let _loc4_: number = 0;
        let _loc3_: IRoomObjectSprite = null;
        if (param1) {
            _loc2_ = asGuarded(param1.getVisualization(), isIRoomObjectSpriteVisualization);
            _loc4_ = 0;
            while (_loc4_ < _loc2_.spriteCount) {
                _loc3_ = _loc2_.getSprite(_loc4_);
                _loc3_.blendMode = "hardlight";
                _loc4_++;
            }
        }
    }

    private hideVisualization(param1: IRoomObject): void {
        let _loc2_: IRoomObjectSpriteVisualization = null;
        let _loc4_: number = 0;
        let _loc3_: IRoomObjectSprite = null;
        if (param1) {
            _loc2_ = asGuarded(param1.getVisualization(), isIRoomObjectSpriteVisualization);
            _loc4_ = 0;
            while (_loc4_ < _loc2_.spriteCount) {
                _loc3_ = _loc2_.getSprite(_loc4_);
                _loc3_.visible = false;
                _loc4_++;
            }
        }
    }

    private initCountDown(): void {
        this._SafeStr_2253.initCounter();
        this._SafeStr_2253.update(1000);
    }

    private onMouseMove = (param1: MouseEvent): void => {
        this._SafeStr_7422 = param1.altKey || param1.shiftKey;
    };

    get [IDisposable](): true {
        return true;
    }
}
