import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SnowballMachineGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowballMachineGameObjectData';
import type { SnowWarGameStage } from '@/com/sulake/habbo/game/snowwar/SnowWarGameStage';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { Tile } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowballGivingGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowballGivingGameObject';
import { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';

export class SnowballMachineGameObject extends SnowballGivingGameObject {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.gameobjects::SnowballMachineGameObject'); }

    public static BOUNDING_DATA: any[] = [1200];

    constructor(param1: SnowballMachineGameObjectData, param2: SnowWarGameStage) {
        super(param1.id, param1.snowballCount, param2.getTileAt(Tile.convertToTileX(param1.locationX3D), Tile.convertToTileY(param1.locationY3D)), param1.fuseObjectId);
        this._maxSnowballs = param1.maxSnowballs;
        this._currentDirection = Direction8.getDirection8(param1.direction);
        param2.addGameObjectToTile(this);
    }

    declare private _maxSnowballs: number;
    static { (this.prototype as any)._maxSnowballs = 0; }

    declare private _currentDirection: Direction8;

    public override get numberOfVariables(): number {
        return 8;
    }

    public override get boundingData(): any[] {
        return SnowballMachineGameObject.BOUNDING_DATA;
    }

    public override dispose(): void {
        super.dispose();
        this._currentDirection = null;
    }

    public override getVariable(param1: number): number {
        switch (param1) {
            case 0:
                return 4;
            case 1:
                return this._gameObjectId;
            case 2:
                return this._SafeStr_2223.location.x;
            case 3:
                return this._SafeStr_2223.location.y;
            case 4:
                return this._currentDirection.intValue();
            case 5:
                return this._maxSnowballs;
            case 6:
                return this._SafeStr_2325;
            case 7:
                return this._fuseObjectId;
            default:
                throw new Exception("No such variable:" + param1);
        }
    }

    public createSnowball(): void {
        if (this._SafeStr_2325 < this._maxSnowballs) {
            this._SafeStr_2325 = this._SafeStr_2325 + 1;
        }
    }
}
