import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { ElementPointerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/ElementPointerMessageEvent';

export class ElementPointerHandler {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::ElementPointerHandler'); }

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _SafeStr_5897: ElementPointerMessageEvent;

    constructor(param1: HabboWindowManagerComponent) {
        this._windowManager = param1;
        if (this._windowManager.communication != null) {
            this._SafeStr_5897 = new ElementPointerMessageEvent(this.onElementPointerMessage);
            this._windowManager.communication.addHabboConnectionMessageEvent(this._SafeStr_5897);
        }
    }

    private onElementPointerMessage = (param1: ElementPointerMessageEvent): void => {
        let _loc2_: string = param1.getParser().key;
        if (_loc2_ == null || _loc2_ == "") {
            this._windowManager.hideHint();
        } else {
            this._windowManager.showHint(_loc2_);
        }
    };

    public dispose(): void {
        if (this._windowManager.communication != null) {
            this._windowManager.communication.removeHabboConnectionMessageEvent(this._SafeStr_5897);
        }
        this._windowManager = null;
    }
}
