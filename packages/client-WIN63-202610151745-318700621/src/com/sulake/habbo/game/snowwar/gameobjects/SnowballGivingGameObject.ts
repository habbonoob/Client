import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowBallGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowBallGameObject';
import type { SnowWarGameStage } from '@/com/sulake/habbo/game/snowwar/SnowWarGameStage';
import type { Tile } from '@/com/sulake/habbo/game/snowwar/Tile';
import type { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import type { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { SnowWarGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowWarGameObject';

export class SnowballGivingGameObject extends SnowWarGameObject {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.gameobjects::SnowballGivingGameObject'); }

    declare protected _fuseObjectId: number;
    static { (this.prototype as any)._fuseObjectId = 0; }

    declare protected _SafeStr_2325: number;
    static { (this.prototype as any)._SafeStr_2325 = 0; }

    declare protected _SafeStr_2223: Tile;

    constructor(param1: number, param2: number, param3: Tile, param4: number) {
        super(param1, false);
        this._active = true;
        this._SafeStr_2325 = param2;
        this._SafeStr_2223 = param3;
        this._fuseObjectId = param4;
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_2223 = null;
    }

    public override get direction360(): Direction360 {
        return null;
    }

    public override get boundingType(): number {
        return 2;
    }

    public override get location3D(): Location3D {
        return this._SafeStr_2223.location;
    }

    public get fuseObjectId(): number {
        return this._fuseObjectId;
    }

    public get snowballCount(): number {
        return this._SafeStr_2325;
    }

    public override subturn(param1: SynchronizedGameStage): void {
    }

    public pickupSnowballs(param1: number): number {
        if (this._SafeStr_2325 < param1) {
            param1 = this._SafeStr_2325;
        }
        this._SafeStr_2325 -= param1;
        this.onSnowballPickup();
        return param1;
    }

    public override onSnowBallHit(param1: SnowWarGameStage, param2: SnowBallGameObject): void {
    }

    protected onSnowballPickup(): void {
    }
}
