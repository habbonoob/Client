import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarEffectListener } from '@/com/sulake/habbo/avatar/IAvatarEffectListener';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import { AvatarVisualizationData } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualizationData';
import { FurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualizationData';

export class AvatarFurnitureVisualizationData extends FurnitureVisualizationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::AvatarFurnitureVisualizationData'); }

    declare private _SafeStr_4216: AvatarVisualizationData;

    constructor() {
        super();
        this._SafeStr_4216 = new AvatarVisualizationData();
    }

    public set avatarRenderer(param1: IAvatarRenderManager) {
        this._SafeStr_4216.avatarRenderer = param1;
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_4216.dispose();
        this._SafeStr_4216 = null;
    }

    public getAvatar(param1: string, param2: number, param3: string = null, param4: IAvatarImageListener = null, param5: IAvatarEffectListener = null): IAvatarImage {
        return this._SafeStr_4216.getAvatar(param1, param2, param3, param4, param5);
    }
}
