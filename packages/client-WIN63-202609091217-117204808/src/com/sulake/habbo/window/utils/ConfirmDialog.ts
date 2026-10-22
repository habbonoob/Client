import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { AlertDialog } from '@/com/sulake/habbo/window/utils/AlertDialog';

export class ConfirmDialog extends AlertDialog implements IConfirmDialog {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::ConfirmDialog'); }

    constructor(param1: IHabboWindowManager, param2: XML, param3: string, param4: string, param5: number, param6: (...args: any[]) => any, param7: boolean) {
        super(param1, param2, param3, param4, param5, param6, param7);
    }

    protected override dialogEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc3_: WindowEvent = null;
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "_alert_button_ok":
                    if (this._callback != null) {
                        _loc3_ = WindowEvent.allocate("WE_OK", null, null);
                        this._callback(this, _loc3_);
                        _loc3_.recycle();
                    }
                    break;
                case "_alert_button_cancel":
                case "header_button_close":
                    if (this._callback != null) {
                        _loc3_ = WindowEvent.allocate("WE_CANCEL", null, null);
                        this._callback(this, _loc3_);
                        _loc3_.recycle();
                    }
            }
        }
    }
}
