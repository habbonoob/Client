import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { TreeGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/TreeGameObjectData';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowWarGameStage } from '@/com/sulake/habbo/game/snowwar/SnowWarGameStage';
import type { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { SnowBallGameObject, Tile } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowWarGameObject';
import { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';

export class TreeGameObject extends SnowWarGameObject {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.gameobjects::TreeGameObject'); }

    static #staticsReady = false;

    private static readonly NO_BOUNDING_DATA: any[] = [0];

    private static get BOUNDING_DATA(): any[] {
        TreeGameObject.#initStatics();
        return TreeGameObject.BOUNDING_DATA;
    }

    declare private _fuseObjectId: number;
    static { (this.prototype as any)._fuseObjectId = 0; }

    declare private _tile: Tile;

    declare private _direction8: Direction8;

    declare private _direction360: Direction360;

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _maxHits: number;
    static { (this.prototype as any)._maxHits = 0; }

    declare private _hits: number;
    static { (this.prototype as any)._hits = 0; }

    constructor(param1: TreeGameObjectData, param2: SnowWarGameStage) {
        super(param1.id, false);
        this.isActive = true;
        this._tile = param2.getTileAt(Tile.convertToTileX(param1.locationX3D), Tile.convertToTileY(param1.locationY3D));
        this._direction8 = Direction8.getDirection8(param1.direction);
        this._direction360 = new Direction360(Direction360.direction8ToDirection360Value(this._direction8));
        this._fuseObjectId = param1.fuseObjectId;
        this._height = param1.height;
        this._hits = param1.hits;
        this._maxHits = param1.maxHits;
        if (this._hits < this._maxHits) {
            param2.addGameObjectToTile(this);
        }
        this._tile.addToHeight(-this._height);
        this._tile.blocked = true;
    }

    public override get numberOfVariables(): number {
        return 9;
    }

    public override getVariable(param1: number): number {
        switch (param1) {
            case 0:
                return 2;
            case 1:
                return this.gameObjectId;
            case 2:
                return this._tile.location.x;
            case 3:
                return this._tile.location.y;
            case 4:
                return this._direction8.intValue();
            case 5:
                return this._height;
            case 6:
                return this._fuseObjectId;
            case 7:
                return this._maxHits;
            case 8:
                return this._hits;
            default:
                throw new Exception("No such variable:" + param1);
        }
    }

    public override get boundingType(): number {
        return 2;
    }

    public override subturn(param1: SynchronizedGameStage): void {
    }

    public override get boundingData(): any[] {
        if (this._hits < this._maxHits) {
            return TreeGameObject.BOUNDING_DATA;
        }
        return TreeGameObject.NO_BOUNDING_DATA;
    }

    public override get location3D(): Location3D {
        return this._tile.location;
    }

    public override get direction360(): Direction360 {
        return this._direction360;
    }

    public override onSnowBallHit(param1: SnowWarGameStage, param2: SnowBallGameObject): void {
        if (this._hits < this._maxHits) {
            this._hits = this._hits + 1;
        }
        if (this._hits >= this._maxHits) {
            this._tile.removeGameObject();
        }
    }

    public get maxHits(): number {
        return this._maxHits;
    }

    public get hits(): number {
        return this._hits;
    }

    public get fuseObjectId(): number {
        return this._fuseObjectId;
    }

    public override get collisionHeight(): number {
        return this._height;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TreeGameObject.#staticsReady) return;
        TreeGameObject.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TreeGameObject, name, { value, writable: true, configurable: true, enumerable: true });
        set("BOUNDING_DATA", null);
        set("BOUNDING_DATA", [3200 - SnowBallGameObject.BOUNDING_DATA[0] - 1]);
    }
}
