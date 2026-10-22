import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { VariableFxLogicManager } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicManager';

export class _SafeCls_6117 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::_SafeCls_6117'); }

    private _SafeStr_14774: VariableFxLogicManager = new VariableFxLogicManager();

    constructor() {
    }

    public get variableFxLogicManager(): VariableFxLogicManager {
        return this._SafeStr_14774;
    }

    public dispose(): void {
        if (this._SafeStr_14774 != null) {
            this._SafeStr_14774.dispose();
            this._SafeStr_14774 = null;
        }
    }
}
