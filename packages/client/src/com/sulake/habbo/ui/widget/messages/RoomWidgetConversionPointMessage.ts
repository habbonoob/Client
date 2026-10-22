import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetConversionPointMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetConversionPointMessage'); }

    public static readonly _SafeStr_7748: string = "RWCPM_CONVERSION_POINT";

    constructor(param1: string, param2: string, param3: string, param4: string, param5: string = "", param6: number = 0) {
        super(param1);
        this._category = param2;
        this._pointType = param3;
        this._action = param4;
        this._extraString = param5 ? param5 : "";
        this._extraInt = param6 ? param6 : 0;
    }

    declare private _category: string;

    declare private _pointType: string;

    declare private _extraInt: number;
    static { (this.prototype as any)._extraInt = 0; }

    declare private _action: string;

    public get action(): string {
        return this._action;
    }

    declare private _extraString: string;

    public get extraString(): string {
        return this._extraString;
    }

    public get category(): string {
        return this._category;
    }

    public get pointType(): string {
        return this._pointType;
    }

    public get extraInt(): number {
        return this._extraInt;
    }
}
