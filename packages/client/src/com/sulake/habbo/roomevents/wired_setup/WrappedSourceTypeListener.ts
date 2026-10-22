import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';

export class WrappedSourceTypeListener implements SourceTypePickedListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::WrappedSourceTypeListener'); }

    constructor(param1: DefaultElement, param2: number) {
        this._element = param1;
        this._id = param2;
    }

    declare private _element: DefaultElement;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    public set sourceType(param1: number) {
        this._element.roomEvents.wiredCtrl.setMergedSourceType(this._id, param1);
    }
}
