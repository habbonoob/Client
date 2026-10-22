import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SnowballPileGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowballPileGameObjectData';
import type { SnowWarGameStage } from '@/com/sulake/habbo/game/snowwar/SnowWarGameStage';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { Tile } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowballGivingGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowballGivingGameObject';

export class SnowballPileGameObject extends SnowballGivingGameObject {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.gameobjects::SnowballPileGameObject'); }

    private static readonly BOUNDING_DATA_PER_SNOWBALL: number = 100;

    declare private _boundingData: any[];

    declare private _maxSnowballs: number;
    static { (this.prototype as any)._maxSnowballs = 0; }

    constructor(param1: SnowballPileGameObjectData, param2: SnowWarGameStage) {
        super(param1.id, param1.snowballCount, param2.getTileAt(Tile.convertToTileX(param1.locationX3D), Tile.convertToTileY(param1.locationY3D)), param1.fuseObjectId);
        this._maxSnowballs = param1.maxSnowballs;
        if (this._SafeStr_2325 > 0) {
            param2.addGameObjectToTile(this);
        }
        this._boundingData = [this._SafeStr_2325 * 100];
    }

    public override get numberOfVariables(): number {
        return 7;
    }

    public override getVariable(param1: number): number {
        switch (param1) {
            case 0:
                return 3;
            case 1:
                return this._gameObjectId;
            case 2:
                return this._SafeStr_2223.location.x;
            case 3:
                return this._SafeStr_2223.location.y;
            case 4:
                return this._maxSnowballs;
            case 5:
                return this._SafeStr_2325;
            case 6:
                return this._fuseObjectId;
            default:
                throw new Exception("No such variable:" + param1);
        }
    }

    public override get boundingData(): any[] {
        return this._boundingData;
    }

    protected override onSnowballPickup(): void {
        this._boundingData = [this._SafeStr_2325 * 100];
        if (this._SafeStr_2325 <= 0) {
            this._SafeStr_2223.removeGameObject();
        }
    }

    public get maxSnowballs(): number {
        return this._maxSnowballs;
    }
}
