import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class HeightMapMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::HeightMapMessageParser'); }

    private _SafeStr_5686: number = 16384;
    private _SafeStr_6312: number = 16383;

    declare private _data: number[];

    private _width: number = 0;
    private _height: number = 0;

    constructor() {
    }

    public static decodeTileHeight(param1: number, param2: number): number {
        return param1 == -1 ? -1 : (param1 & param2) / 256;
    }

    public static decodeIsStackingBlocked(param1: number, param2: number): boolean {
        return Boolean(param1 & param2);
    }

    public static decodeIsRoomTile(param1: number): boolean {
        return param1 != -1;
    }

    public decodeTileHeight(param1: number): number {
        return HeightMapMessageParser.decodeTileHeight(param1, this._SafeStr_6312);
    }

    public decodeIsStackingBlocked(param1: number): boolean {
        return HeightMapMessageParser.decodeIsStackingBlocked(param1, this._SafeStr_5686);
    }

    public set stackingBlockedMaskBit(param1: number) {
        this._SafeStr_5686 = 1 << param1;
        this._SafeStr_6312 = this._SafeStr_5686 - 1;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public getTileHeight(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return -1;
        }
        return this.decodeTileHeight(this._data[param2 * this._width + param1]);
    }

    public getStackingBlocked(param1: number, param2: number): boolean {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return true;
        }
        return this.decodeIsStackingBlocked(this._data[param2 * this._width + param1]);
    }

    public isRoomTile(param1: number, param2: number): boolean {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return false;
        }
        return HeightMapMessageParser.decodeIsRoomTile(this._data[param2 * this._width + param1]);
    }

    public flush(): boolean {
        this._data = null;
        this._width = 0;
        this._height = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        if (param1 == null) {
            return false;
        }
        this._width = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        this._height = _loc3_ / this._width | 0;
        this._data = new Array<number>(_loc3_ >>> 0).fill(0);
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._data[_loc2_] = param1.readShort();
            _loc2_++;
        }
        return true;
    }
}
