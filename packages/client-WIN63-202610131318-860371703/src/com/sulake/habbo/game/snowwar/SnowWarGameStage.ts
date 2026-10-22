import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FuseObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/FuseObjectData';
import type { GameLevelData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLevelData';
import type { SynchronizedGameArena } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameArena';
import type { SnowWarGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowWarGameObject';
import type { ICollidable } from '@/com/sulake/habbo/game/snowwar/utils/ICollidable';
import type { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { SynchronizedGameStage, Tile } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';

export class SnowWarGameStage extends SynchronizedGameStage {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar::SnowWarGameStage'); }

    public static readonly SCREEN_CENTER_TILE_X: number = 25;
    public static readonly SCREEN_CENTER_TILE_Y: number = 25;
    private static readonly INFINITE_HEIGHT: number = 100000;
    private _tiles: any[] = [];

    constructor() {
        super();
    }

    public static calculateDirectionTowardsCenter(param1: Tile): Direction8 {
        return Direction360.direction360ValueToDirection8(Direction360.getAngleFromComponents(25 - param1.fuseLocation[0] | 0, 25 - param1.fuseLocation[1] | 0));
    }

    public override dispose(): void {
        let _loc3_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: Tile = null;
        super.dispose();
        if (this._tiles && this._tiles.length > 0) {
            _loc3_ = 0;
            while (_loc3_ < this._tiles.length) {
                _loc1_ = 0;
                while (_loc1_ < (asGuarded(this._tiles[0], Array.isArray)).length) {
                    _loc2_ = this._tiles[_loc3_][_loc1_];
                    if (_loc2_) {
                        _loc2_.dispose();
                    }
                    _loc1_++;
                }
                _loc3_++;
            }
        }
        this._tiles = [];
    }

    public override initialize(param1: SynchronizedGameArena, param2: GameLevelData): void {
        super.initialize(param1, param2);
        if (this._gameObjects == null) {
            this._gameObjects = new UtilsMap();
        }
        this.linkTiles(param2);
        this.addFuseObjectsAndHeights(param2.fuseObjects);
    }

    private addFuseObjectsAndHeights(param1: any[]): void {
        let _loc2_: Tile = null;
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = this.getTileAt(_loc3_.x | 0, _loc3_.y | 0);
            if (_loc2_) {
                _loc2_.addFuseObject(_loc3_);
                this.checkAndAdjustNeighbouringTiles(_loc3_);
            }
        }
    }

    private checkAndAdjustNeighbouringTiles(param1: FuseObjectData): void {
        let _loc5_: Tile = null;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = param1.direction;
        let _loc3_: number = param1.xDimension;
        let _loc4_: number = param1.yDimension;
        if (_loc7_ == Direction8.E.intValue() || _loc7_ == Direction8.W.intValue()) {
            _loc2_ = _loc3_;
            _loc3_ = _loc4_;
            _loc4_ = _loc2_;
        }
        _loc6_ = 1;
        while (_loc6_ < _loc3_) {
            _loc5_ = this.getTileAt(param1.x + _loc6_, param1.y);
            if (_loc5_) {
                _loc5_.addToHeight(param1.height);
                if (!param1.canStandOn) {
                    _loc5_.blocked = true;
                }
            }
            _loc6_++;
        }
        _loc6_ = 1;
        while (_loc6_ < _loc4_) {
            _loc5_ = this.getTileAt(param1.x, param1.y + _loc6_);
            if (_loc5_) {
                _loc5_.addToHeight(param1.height);
                if (!param1.canStandOn) {
                    _loc5_.blocked = true;
                }
            }
            _loc6_++;
        }
    }

    public addGameObjectToTile(param1: SnowWarGameObject): void {
        let _loc3_: Location3D = param1.location3D;
        let _loc2_: Tile = this.getTileAt(Tile.convertToTileX(_loc3_.x), Tile.convertToTileY(_loc3_.y));
        if (_loc2_) {
            _loc2_.addGameObject(param1);
        }
    }

    private linkTiles(param1: GameLevelData): void {
        let _loc7_: Tile = null;
        let _loc10_: number = 0;
        let _loc8_: number = 0;
        let _loc11_: Tile = null;
        let _loc6_: Tile = null;
        let _loc2_: Tile = null;
        let _loc3_: Tile = null;
        let _loc5_: any[] = this.parseHeightMap(param1.heightMap, param1.width, param1.height);
        let _loc9_: number = param1.height;
        let _loc4_: number = param1.width;
        this._tiles = [];
        _loc10_ = 0;
        while (_loc10_ < _loc9_) {
            this._tiles[_loc10_] = [];
            _loc8_ = 0;
            while (_loc8_ < _loc4_) {
                this._tiles[_loc10_][_loc8_] = null;
                if (_loc5_[_loc10_][_loc8_] != 100000) {
                    _loc7_ = new Tile(_loc8_, _loc10_);
                    this._tiles[_loc10_][_loc8_] = _loc7_;
                    _loc11_ = this.getTileAt(_loc8_ + 1, _loc10_ - 1);
                    if (_loc11_ != null) {
                        _loc7_.linkTile(_loc11_, Direction8.NE);
                    }
                    _loc6_ = this.getTileAt(_loc8_, _loc10_ - 1);
                    if (_loc6_ != null) {
                        _loc7_.linkTile(_loc6_, Direction8.N);
                    }
                    _loc2_ = this.getTileAt(_loc8_ - 1, _loc10_ - 1);
                    if (_loc2_ != null) {
                        _loc7_.linkTile(_loc2_, Direction8.NW);
                    }
                    _loc3_ = this.getTileAt(_loc8_ - 1, _loc10_);
                    if (_loc3_ != null) {
                        _loc7_.linkTile(_loc3_, Direction8.W);
                    }
                }
                _loc8_++;
            }
            _loc10_++;
        }
    }

    public getTiles(): any[] {
        return this._tiles;
    }

    public testCollisionWithGround(param1: ICollidable): boolean {
        if (param1.location3D.z < 1) {
            return true;
        }
        let _loc3_: number = Tile.convertToTileX(param1.location3D.x);
        let _loc4_: number = Tile.convertToTileY(param1.location3D.y);
        let _loc2_: Tile = this.getTileAt(_loc3_, _loc4_);
        if (_loc2_) {
            return param1.location3D.z < _loc2_.height;
        }
        return false;
    }

    public positionIsWalkable(param1: number, param2: number): boolean {
        let _loc4_: number = Tile.convertToTileX(param1);
        let _loc5_: number = Tile.convertToTileY(param2);
        let _loc3_: Tile = this.getTileAt(_loc4_, _loc5_);
        if (_loc3_) {
            return _loc3_.canMoveTo(null);
        }
        return false;
    }

    public getTileAt(param1: number, param2: number): Tile {
        if (param1 < 0 || param1 >= this._tiles[0].length || param2 < 0 || param2 >= this._tiles.length) {
            return null;
        }
        return this._tiles[param2][param1];
    }

    private parseHeightMap(param1: string, param2: number, param3: number): any[] {
        let _loc7_: number = 0;
        let _loc6_: string = null;
        let _loc8_: number = 0;
        let _loc4_: string = null;
        let _loc11_: number = 0;
        let _loc9_: number = 0;
        let _loc10_: any[] = param1.split("\r");
        let _loc5_: any[] = [];
        _loc7_ = 0;
        while (_loc7_ < _loc10_.length) {
            _loc6_ = stringOrNull(_loc10_[_loc7_]);
            _loc5_[_loc7_] = [];
            _loc8_ = _loc6_.length - 1;
            while (_loc8_ >= 0) {
                _loc4_ = _loc6_.charAt(_loc8_);
                _loc11_ = parseInt(_loc4_) | 0;
                if (!isNaN(parseInt(_loc4_))) {
                    _loc5_[_loc7_][_loc8_] = _loc11_;
                } else if (_loc4_ == "x") {
                    _loc5_[_loc7_][_loc8_] = 100000;
                } else {
                    _loc5_[_loc7_][_loc8_] = 10 + (_loc4_.charCodeAt(0) - "a".charCodeAt(0));
                }
                if (_loc5_[_loc7_][_loc8_] > _loc9_ && _loc5_[_loc7_][_loc8_] != 100000) {
                    _loc9_ = _loc5_[_loc7_][_loc8_] | 0;
                }
                _loc8_--;
            }
            _loc7_++;
        }
        return _loc5_;
    }

    public resetTiles(): void {
        let _loc3_: number = 0;
        let _loc1_: number = 0;
        let _loc2_: Tile = null;
        if (this._tiles && this._tiles.length > 0) {
            _loc3_ = 0;
            while (_loc3_ < this._tiles.length) {
                _loc1_ = 0;
                while (_loc1_ < (asGuarded(this._tiles[0], Array.isArray)).length) {
                    _loc2_ = this._tiles[_loc3_][_loc1_];
                    if (_loc2_) {
                        _loc2_.removeGameObject();
                    }
                    _loc1_++;
                }
                _loc3_++;
            }
        }
    }
}
