import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { HeightMapMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/HeightMapMessageParser';

export class HeightMapUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::HeightMapUpdateMessageParser'); }

    constructor() {
    }

    declare private _data: IMessageDataWrapper;

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    private _SafeStr_5686: number = 16384;
    private _SafeStr_6312: number = 16383;

    public set stackingBlockedMaskBit(param1: number) {
        this._SafeStr_5686 = 1 << param1;
        this._SafeStr_6312 = this._SafeStr_5686 - 1;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get tileHeight(): number {
        return HeightMapMessageParser.decodeTileHeight(this._value, this._SafeStr_6312);
    }

    public get isStackingBlocked(): boolean {
        return HeightMapMessageParser.decodeIsStackingBlocked(this._value, this._SafeStr_5686);
    }

    public get isRoomTile(): boolean {
        return HeightMapMessageParser.decodeIsRoomTile(this._value);
    }

    public next(): boolean {
        if (this._count == 0) {
            return false;
        }
        this._count = this._count - 1;
        this._SafeStr_2126 = this._data.readByte();
        this._y = this._data.readByte();
        this._value = this._data.readShort();
        return true;
    }

    public flush(): boolean {
        this._count = 0;
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._data = param1;
        this._count = param1.readByte();
        return true;
    }
}
