import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { _SafeCls_6074 } from '@/com/sulake/habbo/room/object/logic/_SafeCls_6074';

export class _SafeCls_6067 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::_SafeCls_6067'); }

    private _SafeStr_14443: _SafeCls_6074 = new _SafeCls_6074();

    constructor() {
    }

    public get variableFxLogicManager(): _SafeCls_6074 {
        return this._SafeStr_14443;
    }

    public dispose(): void {
        if (this._SafeStr_14443 != null) {
            this._SafeStr_14443.dispose();
            this._SafeStr_14443 = null;
        }
    }
}
