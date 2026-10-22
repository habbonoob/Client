import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPurseUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPurseUpdateEvent'); }

    public static readonly CREDIT_BALANCE: string = "RWPUE_CREDIT_BALANCE";
    public static readonly _SafeStr_7685: string = "RWPUE_PIXEL_BALANCE";
    public static readonly SHELL_BALANCE: string = "RWPUE_SHELL_BALANCE";

    declare private _balance: number;
    static { (this.prototype as any)._balance = 0; }

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._balance = param2;
    }

    public get balance(): number {
        return this._balance;
    }
}
