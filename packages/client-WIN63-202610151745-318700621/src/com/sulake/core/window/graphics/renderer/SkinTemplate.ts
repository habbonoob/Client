import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import { ISkinTemplate } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplate';
import { ChildEntityArray } from '@/com/sulake/core/window/utils/ChildEntityArray';

export class SkinTemplate extends ChildEntityArray implements ISkinTemplate {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::SkinTemplate'); }

    declare protected _name: string;

    declare protected _asset: IAsset;

    constructor(param1: string, param2: IAsset) {
        super();
        this._name = param1;
        this._asset = param2;
    }

    public get id(): number {
        return 0;
    }

    public get name(): string {
        return this._name;
    }

    public get asset(): IAsset {
        return this._asset;
    }

    public dispose(): void {
        let _loc2_: any = 0;
        let _loc1_: number = this.numChildren >>> 0;
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            this.removeChildAt(0);
            _loc2_++;
        }
        this._asset = null;
        this._name = null;
    }

    get [ISkinTemplate](): true {
        return true;
    }
}
