import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IThemeManager } from '@/com/sulake/core/window/theme/IThemeManager';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';

const preSuperInteractiveController: ((self: InteractiveController) => void)[] = [];

export class InteractiveController extends WindowController implements IInteractiveWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::InteractiveController'); }

    declare protected _toolTipDelay: number;

    declare protected _toolTipCaption: string;

    declare protected _toolTipIsDynamic: boolean;

    declare protected _interactiveCursorDisabled: boolean;

    declare private _SafeStr_3616: UtilsMap;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        let _loc12_: IThemeManager;
        param4 |= 1;
        _loc12_ = param5.getWindowFactory().getThemeManager();
        preSuperInteractiveController.push((self: InteractiveController) => {
            self._toolTipDelay = (_loc12_.getPropertyDefaults(param3)._SafeStr_2119("tool_tip_delay").value | 0) >>> 0;
            self._toolTipCaption = String(_loc12_.getPropertyDefaults(param3)._SafeStr_2119("tool_tip_caption").value);
            self._toolTipIsDynamic = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("tool_tip_is_dynamic").value;
            self._interactiveCursorDisabled = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("interactive_cursor_disabled").value;
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public static processInteractiveWindowEvents(param1: IInteractiveWindow, param2: WindowEvent): void {
        if (param1.toolTipIsDynamic) {
            if (param2.type == "WME_OVER") {
                param1.context.getWindowServices().getToolTipAgentService().begin(param1);
            } else if (param2.type == "WME_MOVE") {
                param1.context.getWindowServices().getToolTipAgentService().updateCaption(param1);
            } else if (param2.type == "WME_OUT") {
                param1.context.getWindowServices().getToolTipAgentService().end(param1);
            }
        } else if (param1.toolTipCaption != null && param1.toolTipCaption.length > 0) {
            if (param2.type == "WME_OVER") {
                param1.context.getWindowServices().getToolTipAgentService().begin(param1);
            } else if (param2.type == "WME_OUT") {
                param1.context.getWindowServices().getToolTipAgentService().end(param1);
            }
        }
    }

    public static readInteractiveWindowProperties(param1: IInteractiveWindow, param2: any[]): void {
        for (const _loc3_ of param2 ?? []) {
            switch (_loc3_.key) {
                case "tool_tip_caption":
                    if (_loc3_.value != param1.toolTipCaption) {
                        param1.toolTipCaption = typeof _loc3_.value === "string" ? _loc3_.value : null;
                    }
                    break;
                case "tool_tip_delay":
                    if (_loc3_.value != param1.toolTipDelay) {
                        param1.toolTipDelay = typeof _loc3_.value === "number" && _loc3_.value >>> 0 === _loc3_.value ? _loc3_.value : null;
                    }
                    break;
                case "tool_tip_is_dynamic":
                    if (_loc3_.value != param1.toolTipIsDynamic) {
                        param1.toolTipIsDynamic = typeof _loc3_.value === "boolean" ? _loc3_.value : null;
                    }
                    break;
                case "interactive_cursor_disabled":
                    if (_loc3_.value != param1.interactiveCursorDisabled) {
                        param1.interactiveCursorDisabled = typeof _loc3_.value === "boolean" ? _loc3_.value : null;
                    }
            }
        }
    }

    public static writeInteractiveWindowProperties(param1: IInteractiveWindow, param2: any[]): any[] {
        param2.push(param1.createProperty("tool_tip_caption", param1.toolTipCaption));
        param2.push(param1.createProperty("tool_tip_delay", param1.toolTipDelay));
        param2.push(param1.createProperty("tool_tip_is_dynamic", param1.toolTipIsDynamic));
        param2.push(param1.createProperty("interactive_cursor_disabled", param1.interactiveCursorDisabled));
        return param2;
    }

    public set toolTipCaption(param1: string) {
        this._toolTipCaption = param1 == null ? String(this.getDefaultProperty("tool_tip_caption").value) : param1;
    }

    public get toolTipCaption(): string {
        return this._toolTipCaption;
    }

    public set toolTipDelay(param1: number) {
        this._toolTipDelay = param1;
    }

    public get toolTipDelay(): number {
        return this._toolTipDelay;
    }

    public setMouseCursorForState(param1: number, param2: number): number {
        if (this.testStateFlag(32)) {
            return 1;
        }
        if (!this._SafeStr_3616) {
            this._SafeStr_3616 = new UtilsMap();
        }
        let _loc3_: number = this._SafeStr_3616[param1] >>> 0;
        if (param2 == 0 || param2 == -1) {
            this._SafeStr_3616.remove(param1);
        } else {
            this._SafeStr_3616[param1] = param2;
        }
        return _loc3_;
    }

    public getMouseCursorByState(param1: number): number {
        if (!this._SafeStr_3616) {
            return 0;
        }
        return this._SafeStr_3616.getValue(param1) >>> 0;
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        if (param1 == this) {
            InteractiveController.processInteractiveWindowEvents(this, param2);
        }
        return super.update(param1, param2);
    }

    public showToolTip(param1: IToolTipWindow): void {
    }

    public hideToolTip(): void {
    }

    public override get properties(): any[] {
        return InteractiveController.writeInteractiveWindowProperties(this, super.properties);
    }

    public override set properties(param1: any[]) {
        InteractiveController.readInteractiveWindowProperties(this, param1);
        super.properties = param1;
    }

    public set toolTipIsDynamic(param1: boolean) {
        this._toolTipIsDynamic = param1;
    }

    public get toolTipIsDynamic(): boolean {
        return this._toolTipIsDynamic;
    }

    public get interactiveCursorDisabled(): boolean {
        return this._interactiveCursorDisabled;
    }

    public set interactiveCursorDisabled(param1: boolean) {
        this._interactiveCursorDisabled = param1;
    }

    protected override initInstanceFields(): void {
        this._toolTipDelay = 0;
        this._toolTipIsDynamic = false;
        this._interactiveCursorDisabled = false;
        preSuperInteractiveController.pop()!(this);
        super.initInstanceFields();
    }

    get [IInteractiveWindow](): true {
        return true;
    }
}
