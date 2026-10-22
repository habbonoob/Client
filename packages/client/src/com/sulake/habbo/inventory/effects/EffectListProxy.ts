import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IThumbListDataProvider } from '@/com/sulake/habbo/inventory/common/IThumbListDataProvider';
import type { EffectsModel } from '@/com/sulake/habbo/inventory/effects/EffectsModel';

export class EffectListProxy implements IThumbListDataProvider {
    static { registerClassName(this, 'com.sulake.habbo.inventory.effects::EffectListProxy'); }

    constructor(param1: EffectsModel, param2: number) {
        this._SafeStr_2134 = param1;
        this._filter = param2;
    }

    declare private _SafeStr_2134: EffectsModel;

    declare private _filter: number;
    static { (this.prototype as any)._filter = 0; }

    public dispose(): void {
        this._SafeStr_2134 = null;
    }

    public getDrawableList(): any[] {
        return this._SafeStr_2134.getEffects(this._filter);
    }
}
