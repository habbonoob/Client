import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialogWithLink } from '@/com/sulake/core/window/utils/IAlertDialogWithLink';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { AlertDialog } from '@/com/sulake/habbo/window/utils/AlertDialog';

export class AlertDialogWithLink extends AlertDialog implements IAlertDialogWithLink {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::AlertDialogWithLink'); }

    constructor(param1: IHabboWindowManager, param2: XML, param3: string, param4: string, param5: string, param6: string, param7: number, param8: (...args: any[]) => any) {
        super(param1, param2, param3, param4, param7, param8, false);
        this.linkTitle = param5;
        this.linkUrl = param6;
    }

    declare protected _linkUrl: string;

    declare protected _linkTitle: string;

    public get linkTitle(): string {
        return this._linkTitle;
    }

    public set linkTitle(param1: string) {
        this._linkTitle = param1;
        if (this._window) {
            castGuarded(this._window.findChildByTag("LINK"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow").caption = this._linkTitle;
        }
    }

    public get linkUrl(): string {
        return this._linkUrl;
    }

    public set linkUrl(param1: string) {
        this._linkUrl = param1;
    }

    protected override dialogEventProc(param1: WindowEvent, param2: IWindow): void {
        if (param1.type == "WME_CLICK") {
            let _loc3_: any = param2.name;
            if ("_alert_button_link" === _loc3_) {
                HabboWebTools.navigateToURL(this._linkUrl, "_empty");
                return;
            }
        }
        super.dialogEventProc(param1, param2);
    }

    protected override initInstanceFields(): void {
        this._linkUrl = "";
        this._linkTitle = "";
        super.initInstanceFields();
    }
}
