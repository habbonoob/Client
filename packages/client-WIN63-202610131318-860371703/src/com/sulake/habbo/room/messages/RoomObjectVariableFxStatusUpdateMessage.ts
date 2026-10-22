import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectVariableFxStatusUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectVariableFxStatusUpdateMessage'); }

    declare private _SafeStr_14649: number;
    static { (this.prototype as any)._SafeStr_14649 = 0; }

    declare private _SafeStr_7039: string;

    declare private _value: number;
    static { (this.prototype as any)._value = NaN; }

    declare private _overrideMinValue: any;

    declare private _overrideMaxValue: any;

    declare private _extra: UtilsMap;

    declare private _SafeStr_14804: boolean;
    static { (this.prototype as any)._SafeStr_14804 = false; }

    constructor(param1: number, param2: string, param3: number, param4: any, param5: any, param6: UtilsMap, param7: boolean) {
        super(null, null);
        this._SafeStr_14649 = param1;
        this._SafeStr_7039 = param2;
        this._value = param3;
        this._overrideMinValue = param4;
        this._overrideMaxValue = param5;
        this._extra = param6;
        this._SafeStr_14804 = param7;
    }

    public get configId(): number {
        return this._SafeStr_14649;
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public get value(): number {
        return this._value;
    }

    public get overrideMinValue(): any {
        return this._overrideMinValue;
    }

    public get overrideMaxValue(): any {
        return this._overrideMaxValue;
    }

    public get extra(): UtilsMap {
        return this._extra;
    }

    public get initialize(): boolean {
        return this._SafeStr_14804;
    }
}
