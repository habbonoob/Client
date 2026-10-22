import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomEntryTileMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.layout::RoomEntryTileMessageParser'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _dir: number;
    static { (this.prototype as any)._dir = 0; }

    constructor() {
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get dir(): number {
        return this._dir;
    }

    public flush(): boolean {
        this._SafeStr_2126 = 0;
        this._y = 0;
        this._dir = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_2126 = param1.readInteger();
        this._y = param1.readInteger();
        this._dir = param1.readInteger() >>> 0;
        return true;
    }
}
