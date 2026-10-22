import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAvatarEffectListener } from '@/com/sulake/habbo/avatar/IAvatarEffectListener';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';

export class AvatarVisualizationData implements IRoomObjectVisualizationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar::AvatarVisualizationData'); }

    constructor() {
    }

    private _avatarRenderer: IAvatarRenderManager = null;

    public get avatarRenderer(): IAvatarRenderManager {
        return this._avatarRenderer;
    }

    public set avatarRenderer(param1: IAvatarRenderManager) {
        this._avatarRenderer = param1;
    }

    public initialize(param1: XML): boolean {
        return true;
    }

    public dispose(): void {
        this._avatarRenderer = null;
    }

    public getAvatar(param1: string, param2: number, param3: string = null, param4: IAvatarImageListener = null, param5: IAvatarEffectListener = null, param6: boolean = false): IAvatarImage {
        let _loc8_: IAvatarImage = null;
        let _loc7_: string = null;
        if (this._avatarRenderer != null) {
            _loc7_ = param2 > 48 ? "h" : "h_50";
            if (param6) {
                _loc8_ = this._avatarRenderer.createBlockedAvatarImage(param1, _loc7_);
            } else {
                _loc8_ = this._avatarRenderer.createAvatarImage(param1, _loc7_, param3, param4, param5);
            }
            return _loc8_;
        }
        return null;
    }

    public getLayerCount(param1: string): number {
        return 0;
    }

    public getAvatarRendererAsset(param1: string): IAsset {
        if (this._avatarRenderer == null) {
            return null;
        }
        return this._avatarRenderer.assets.getAssetByName(param1);
    }

    get [IRoomObjectVisualizationData](): true {
        return true;
    }
}
