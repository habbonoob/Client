import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { _SafeCls_6074 } from '@/com/sulake/habbo/room/object/logic/_SafeCls_6074';

export class _SafeCls_6068 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::_SafeCls_6068'); }

    private _SafeStr_14442: _SafeCls_6074 = new _SafeCls_6074();

    constructor() {
    }

    public get variableFxLogicManager(): _SafeCls_6074 {
        return this._SafeStr_14442;
    }

    public dispose(): void {
        if (this._SafeStr_14442 != null) {
            this._SafeStr_14442.dispose();
            this._SafeStr_14442 = null;
        }
    }
}
