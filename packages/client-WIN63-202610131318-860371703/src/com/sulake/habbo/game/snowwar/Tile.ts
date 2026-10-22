import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGameObject } from '@/com/sulake/habbo/game/snowwar/arena/IGameObject';
import type { SnowWarGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowWarGameObject';
import type { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';
import type { IAStarNode } from '@/com/sulake/habbo/game/snowwar/utils/IAStarNode';
import { FuseObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/FuseObjectData';
import { HumanGameObject } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { AbstractAStarNode } from '@/com/sulake/habbo/game/snowwar/utils/AbstractAStarNode';
import { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { MathUtil } from '@/com/sulake/habbo/game/snowwar/utils/MathUtil';

export class Tile extends AbstractAStarNode {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar::Tile'); }

    static #staticsReady = false;

    public static readonly TILE_WIDTH: number = 3200;

    public static get TILE_HALFWIDTH(): number {
        Tile.#initStatics();
        return Tile.TILE_HALFWIDTH;
    }

    public static get TILE_ONEANDHALFWIDTH(): number {
        Tile.#initStatics();
        return Tile.TILE_ONEANDHALFWIDTH;
    }

    public static readonly TILE_DIAMETER: number = Math.sqrt(20480000) | 0;

    declare private _location: Location3D;

    declare private _neighbouringTiles: any[];

    declare private _gameObject: SnowWarGameObject;

    declare private _fuseLocation: any[];

    declare private _fuseObjects: any[];

    declare private _blocked: boolean;
    static { (this.prototype as any)._blocked = false; }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    constructor(param1: number, param2: number) {
        super();
        this._neighbouringTiles = [];
        this._fuseLocation = [param1, param2, 0];
        this._location = new Location3D(param1 * 3200, param2 * 3200, 0);
        this._fuseObjects = [];
    }

    public static convertToTileX(param1: number): number {
        return MathUtil.javaDiv((param1 + Tile.TILE_HALFWIDTH) / 3200);
    }

    public static convertToTileY(param1: number): number {
        return MathUtil.javaDiv((param1 + Tile.TILE_HALFWIDTH) / 3200);
    }

    public static convertFromTileX(param1: number): number {
        return param1 * 3200;
    }

    public static convertFromTileY(param1: number): number {
        return param1 * 3200;
    }

    public override dispose(): void {
        super.dispose();
        if (this._location != null) {
            this._location.dispose();
            this._location = null;
        }
        this._neighbouringTiles = [];
        this._gameObject = null;
        this._fuseLocation = [];
        this._fuseObjects = [];
        this._blocked = false;
    }

    public get fuseObjects(): any[] {
        return this._fuseObjects;
    }

    public addFuseObject(param1: FuseObjectData): void {
        this.fuseObjects.push(param1);
        this.addToHeight(param1.height);
    }

    public addToHeight(param1: number): void {
        this._height += param1;
        if (this._height < 0) {
            this._height = 0;
        }
    }

    public get fuseLocation(): any[] {
        return this._fuseLocation;
    }

    public get location(): Location3D {
        return this._location;
    }

    public locationIsInTileRange(param1: Location3D): boolean {
        let _loc2_: number = this._location.x - param1.x;
        if (_loc2_ < 0) {
            _loc2_ = -_loc2_;
        }
        let _loc3_: number = this._location.y - param1.y;
        if (_loc3_ < 0) {
            _loc3_ = -_loc3_;
        }
        return _loc2_ < Tile.TILE_HALFWIDTH && _loc3_ < Tile.TILE_HALFWIDTH;
    }

    public linkTile(param1: Tile, param2: Direction8): void {
        this.createLinkToTile(param1, param2);
        param1.createLinkToTile(this, param2.oppositeDirection());
    }

    private createLinkToTile(param1: Tile, param2: Direction8): void {
        this._neighbouringTiles[param2.intValue()] = param1;
    }

    public getTileInDirection(param1: Direction8): Tile {
        return this._neighbouringTiles[param1.intValue()];
    }

    public canMoveTo(param1: IGameObject): boolean {
        let _loc2_: boolean = false;
        if (param1) {
            _loc2_ = this.occupyingHuman != null && param1.isGhost && this.occupyingHuman.ghostObjectId == param1.gameObjectId;
        }
        let _loc3_: boolean = false;
        if (this.fuseObjects.length == 1) {
            _loc3_ = !(asInstanceOf(this.fuseObjects[0], FuseObjectData)).canStandOn;
        } else if (this.fuseObjects.length > 1) {
            _loc3_ = true;
        }
        return !_loc3_ && (this._gameObject == null || _loc2_) && !this._blocked;
    }

    public addGameObject(param1: SnowWarGameObject): boolean {
        let _loc2_: boolean = false;
        if (!this._gameObject) {
            this._gameObject = param1;
            _loc2_ = true;
        }
        return _loc2_;
    }

    public removeGameObject(): SnowWarGameObject {
        let _loc1_: SnowWarGameObject = null;
        if (this._gameObject) {
            _loc1_ = this._gameObject;
            this._gameObject = null;
        }
        return _loc1_;
    }

    public get gameObject(): SnowWarGameObject {
        return this._gameObject;
    }

    public get occupyingHuman(): HumanGameObject {
        if (this._gameObject && this._gameObject instanceof HumanGameObject) {
            return asInstanceOf(this.gameObject, HumanGameObject);
        }
        return null;
    }

    public removeOccupyingHuman(): HumanGameObject {
        let _loc1_: HumanGameObject = this.occupyingHuman;
        if (_loc1_) {
            this._gameObject = null;
        }
        return _loc1_;
    }

    public override distanceTo(param1: IAStarNode): number {
        let _loc2_: Tile = param1 instanceof Tile ? param1 : null;
        return this._location.distanceTo(_loc2_.location);
    }

    public override directionTo(param1: IAStarNode): Direction8 {
        let _loc2_: Tile = param1 instanceof Tile ? param1 : null;
        return this._location.directionTo(_loc2_.location);
    }

    public override getNodeAt(param1: Direction8): IAStarNode {
        return this._neighbouringTiles[param1.intValue()];
    }

    public override directionIsBlocked(param1: Direction8, param2: IGameObject): boolean {
        return this.canMoveTo(param2);
    }

    public override getPathCost(param1: Direction8, param2: IGameObject): number {
        if (param1.isDiagonal()) {
            return 3200;
        }
        return Tile.TILE_DIAMETER;
    }

    public get height(): number {
        return this._height;
    }

    public toString(): string {
        return " X:" + this._location.x + " Y:" + this._location.y + " Z:" + this._location.z;
    }

    public set blocked(param1: boolean) {
        this._blocked = param1;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Tile.#staticsReady) return;
        Tile.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Tile, name, { value, writable: true, configurable: true, enumerable: true });
        set("TILE_HALFWIDTH", 0);
        set("TILE_ONEANDHALFWIDTH", 0);
        set("TILE_HALFWIDTH", MathUtil.javaDiv(3200 / 2));
        set("TILE_ONEANDHALFWIDTH", 3200 + Tile.TILE_HALFWIDTH);
    }
}
