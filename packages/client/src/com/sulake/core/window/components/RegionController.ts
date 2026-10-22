import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ContainerController, InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { IInteractiveWindow } from '@/com/sulake/core/window/components/IInteractiveWindow';
import { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';

export class RegionController extends ContainerController implements IRegionWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::RegionController'); }

    protected static readonly KEY_TOOLTIP_CAPTION: string = "tool_tip_caption";
    protected static readonly DEF_TOOLTIP_CAPTION: string = "";
    protected static readonly KEY_TOOLTIP_DELAY: string = "tool_tip_delay";
    protected static readonly DEF_TOOLTIP_DELAY: number = 500;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 1;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    declare protected _toolTipDelay: number;

    declare protected _toolTipCaption: string;

    declare protected _toolTipIsDynamic: boolean;

    declare protected _SafeStr_3616: UtilsMap;

    declare private _interactiveCursorDisabled: boolean;

    public override get properties(): any[] {
        return InteractiveController.writeInteractiveWindowProperties(this, super.properties);
    }

    public override set properties(param1: any[]) {
        InteractiveController.readInteractiveWindowProperties(this, param1);
        super.properties = param1;
    }

    public get toolTipCaption(): string {
        return this._toolTipCaption;
    }

    public set toolTipCaption(param1: string) {
        this._toolTipCaption = param1 == null ? "" : param1;
    }

    public get toolTipDelay(): number {
        return this._toolTipDelay;
    }

    public set toolTipDelay(param1: number) {
        this._toolTipDelay = param1;
    }

    public get toolTipIsDynamic(): boolean {
        return this._toolTipIsDynamic;
    }

    public set toolTipIsDynamic(param1: boolean) {
        this._toolTipIsDynamic = param1;
    }

    public get interactiveCursorDisabled(): boolean {
        return this._interactiveCursorDisabled;
    }

    public set interactiveCursorDisabled(param1: boolean) {
        this._interactiveCursorDisabled = param1;
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: boolean = super.update(param1, param2);
        if (param1 == this) {
            InteractiveController.processInteractiveWindowEvents(this, param2);
        }
        return _loc3_;
    }

    public showToolTip(param1: IToolTipWindow): void {
    }

    public hideToolTip(): void {
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
        if (this.testStateFlag(32)) {
            return 1;
        }
        if (!this._SafeStr_3616) {
            return 0;
        }
        return this._SafeStr_3616.getValue(param1) >>> 0;
    }

    protected override initInstanceFields(): void {
        this._toolTipDelay = 500;
        this._toolTipCaption = "";
        this._toolTipIsDynamic = false;
        this._interactiveCursorDisabled = false;
        super.initInstanceFields();
    }

    get [IRegionWindow](): true {
        return true;
    }

    get [IInteractiveWindow](): true {
        return true;
    }
}
