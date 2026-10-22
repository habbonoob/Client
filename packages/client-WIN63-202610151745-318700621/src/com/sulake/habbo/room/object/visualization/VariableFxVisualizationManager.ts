import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import { VariableFxConfigRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigRendererPrebake';

export class VariableFxVisualizationManager {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization::VariableFxVisualizationManager'); }

    private _SafeStr_3869: UtilsMap = new UtilsMap();
    private _SafeStr_14649: UtilsMap = new UtilsMap();
    private _SafeStr_2273: number = 0;
    private _disposed: boolean = false;

    constructor() {
    }

    public upsertConfig(param1: number, param2: VariableFxConfigData): void {
        let _loc3_: VariableFxConfigData = asInstanceOf(this._SafeStr_3869.getValue(param1), VariableFxConfigData);
        let _loc4_: number = ++this._SafeStr_2273;
        if (_loc3_ != null && _loc3_ !== param2) {
            this.disposeConfig(_loc3_);
        }
        if (this._SafeStr_3869.hasKey(param1)) {
            this._SafeStr_3869.replace(param1, param2);
        } else {
            this._SafeStr_3869.add(param1, param2);
        }
        this._SafeStr_14649[param1] = _loc4_;
    }

    public removeConfig(param1: number): void {
        let _loc2_: VariableFxConfigData = asInstanceOf(this._SafeStr_3869.remove(param1), VariableFxConfigData);
        if (_loc2_ != null) {
            this.disposeConfig(_loc2_);
            this._SafeStr_14649.remove(param1);
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public getConfig(param1: number): VariableFxConfigData {
        return asInstanceOf(this._SafeStr_3869.getValue(param1), VariableFxConfigData);
    }

    public getConfigUpdateId(param1: number): number {
        return this._SafeStr_14649.getValue(param1) | 0;
    }

    public clear(): void {
        if (this._SafeStr_3869.length > 0) {
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
        for (const _loc1_ of this._SafeStr_3869.getValues() ?? []) {
            this.disposeConfig(_loc1_);
        }
        this._SafeStr_3869.reset();
        this._SafeStr_14649.reset();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.clear();
        this._SafeStr_3869.dispose();
        this._SafeStr_3869 = null;
        this._SafeStr_14649.dispose();
        this._SafeStr_14649 = null;
        this._disposed = true;
    }

    public get updateId(): number {
        return this._SafeStr_2273;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private disposeConfig(param1: VariableFxConfigData): void {
        VariableFxConfigRendererPrebake.disposeConfigPrebake(param1);
    }
}
