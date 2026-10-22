import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureChestVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureChestVisualization'); }

    private static readonly WIRED_EMBLEM_SPRITE_TAG: string = "wired_emblem";

    constructor() {
        super();
    }

    declare private _SafeStr_5834: boolean;

    protected override updateModel(param1: number): boolean {
        let _loc2_: boolean = super.updateModel(param1);
        let _loc3_: any = this.object.getModel().getNumber("furniture_chest_is_wired_enabled") == 1;
        if (_loc3_ != this._SafeStr_5834) {
            this._SafeStr_5834 = _loc3_;
            _loc2_ = true;
        }
        return _loc2_;
    }

    protected override getSpriteAlpha(param1: number, param2: number, param3: number): number {
        let _loc4_: string = this.getSpriteTag(param1, param2, param3);
        if (!this._SafeStr_5834 && _loc4_ == "wired_emblem") {
            return 0;
        }
        return super.getSpriteAlpha(param1, param2, param3);
    }

    protected override initInstanceFields(): void {
        this._SafeStr_5834 = false;
        super.initInstanceFields();
    }
}
