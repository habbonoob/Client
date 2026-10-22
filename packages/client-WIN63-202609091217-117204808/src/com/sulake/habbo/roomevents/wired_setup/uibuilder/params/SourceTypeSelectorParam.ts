import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';

export class SourceTypeSelectorParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::SourceTypeSelectorParam'); }

    declare private _ids: any[];

    declare private _currentSelection: number;
    static { (this.prototype as any)._currentSelection = 0; }

    declare private _SafeStr_2333: SourceTypePickedListener;

    constructor(param1: any[], param2: SourceTypePickedListener, param3: number = 0) {
        this._ids = param1;
        this._currentSelection = param3;
        this._SafeStr_2333 = param2;
    }

    public get ids(): any[] {
        return this._ids;
    }

    public get currentSelection(): number {
        return this._currentSelection;
    }

    public get listener(): SourceTypePickedListener {
        return this._SafeStr_2333;
    }
}
