import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetConversionPointMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetConversionPointMessage'); }

    public static readonly _SafeStr_7748: string = "RWCPM_CONVERSION_POINT";

    declare private _category: string;

    declare private _SafeStr_5976: string;

    declare private _action: string;

    declare private _extraString: string;

    declare private _extraInt: number;
    static { (this.prototype as any)._extraInt = 0; }

    constructor(param1: string, param2: string, param3: string, param4: string, param5: string = "", param6: number = 0) {
        super(param1);
        this._category = param2;
        this._SafeStr_5976 = param3;
        this._action = param4;
        this._extraString = param5 ? param5 : "";
        this._extraInt = param6 ? param6 : 0;
    }

    public get category(): string {
        return this._category;
    }

    public get pointType(): string {
        return this._SafeStr_5976;
    }

    public get action(): string {
        return this._action;
    }

    public get extraString(): string {
        return this._extraString;
    }

    public get extraInt(): number {
        return this._extraInt;
    }
}
