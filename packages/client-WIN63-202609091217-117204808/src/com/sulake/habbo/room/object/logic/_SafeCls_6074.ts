import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxLogicConfig } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicConfig';

export class _SafeCls_6074 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::_SafeCls_6074'); }

    private _SafeStr_3869: UtilsMap = new UtilsMap();
    private _SafeStr_2273: number = 0;
    private _disposed: boolean = false;

    constructor() {
    }

    public upsertConfig(param1: VariableFxLogicConfig): void {
        param1.updateId = ++this._SafeStr_2273;
        if (this._SafeStr_3869.hasKey(param1.configId)) {
            this._SafeStr_3869.replace(param1.configId, param1);
        } else {
            this._SafeStr_3869.add(param1.configId, param1);
        }
    }

    public getConfig(param1: number): VariableFxLogicConfig {
        return asInstanceOf(this._SafeStr_3869.getValue(param1), VariableFxLogicConfig);
    }

    public removeConfig(param1: number): void {
        if (this._SafeStr_3869.remove(param1) != null) {
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
    }

    public clear(): void {
        if (this._SafeStr_3869.length > 0) {
            this._SafeStr_2273 = this._SafeStr_2273 + 1;
        }
        this._SafeStr_3869.reset();
    }

    public get updateId(): number {
        return this._SafeStr_2273;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.clear();
        this._SafeStr_3869.dispose();
        this._SafeStr_3869 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }
}
