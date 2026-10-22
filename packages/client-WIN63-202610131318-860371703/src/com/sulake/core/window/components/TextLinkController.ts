import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IThemeManager } from '@/com/sulake/core/window/theme/IThemeManager';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { InteractiveController, TextController } from '@/com/sulake/core/window/Classes.group';
import { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { ITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';

const preSuperTextLinkController: ((self: TextLinkController) => void)[] = [];

export class TextLinkController extends TextController implements ITextLinkWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::TextLinkController'); }

    declare private _toolTipDelay: number;

    declare private _toolTipCaption: string;

    declare private _toolTipIsDynamic: boolean;

    declare protected _interactiveCursorDisabled: boolean;

    declare protected _SafeStr_3616: UtilsMap;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        let _loc12_: IThemeManager;
        _loc12_ = param5.getWindowFactory().getThemeManager();
        preSuperTextLinkController.push((self: TextLinkController) => {
            self._toolTipDelay = (_loc12_.getPropertyDefaults(param3)._SafeStr_2119("tool_tip_delay").value | 0) >>> 0;
            self._toolTipCaption = String(_loc12_.getPropertyDefaults(param3)._SafeStr_2119("tool_tip_caption").value);
            self._toolTipIsDynamic = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("tool_tip_is_dynamic").value;
            self._interactiveCursorDisabled = _loc12_.getPropertyDefaults(param3)._SafeStr_2119("interactive_cursor_disabled").value;
        });
        super(param1, param2, param3, ((param4 | 1) & ~0x10) >>> 0, param5, param6, param7, param8, param9, param10, param11);
        this.immediateClickMode = true;
        this.mouseThreshold = 0;
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: boolean = super.update(param1, param2);
        if (param1 == this) {
            InteractiveController.processInteractiveWindowEvents(this, param2);
        }
        return _loc3_;
    }

    public set mouseCursorType(param1: number) {
    }

    public get mouseCursorType(): number {
        return 0;
    }

    public set toolTipCaption(param1: string) {
        this._toolTipCaption = param1 == null ? "" : param1;
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

    public showToolTip(param1: IToolTipWindow): void {
        throw new Error("Unimplemented method!");
    }

    public hideToolTip(): void {
        throw new Error("Unimplemented method!");
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
        preSuperTextLinkController.pop()!(this);
        super.initInstanceFields();
    }

    get [ITextLinkWindow](): true {
        return true;
    }

    get [IInteractiveWindow](): true {
        return true;
    }
}
