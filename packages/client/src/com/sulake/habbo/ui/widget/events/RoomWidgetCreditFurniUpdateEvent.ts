import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetCreditFurniUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetCreditFurniUpdateEvent'); }

    public static readonly UPDATE_CREDIT_FURNI: string = "RWCFUE_CREDIT_FURNI_UPDATE";

    constructor(param1: string, param2: number, param3: number, param4: boolean, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._creditValue = param3;
        this._objectId = param2;
        this._isNftCredit = param4;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _creditValue: number;
    static { (this.prototype as any)._creditValue = NaN; }

    declare private _isNftCredit: boolean;
    static { (this.prototype as any)._isNftCredit = false; }

    public get isNftCredit(): boolean {
        return this._isNftCredit;
    }

    public get creditValue(): number {
        return this._creditValue;
    }

    public get objectId(): number {
        return this._objectId;
    }
}
