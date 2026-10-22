import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BuildersClubPlacementWarningMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::BuildersClubPlacementWarningMessageParser'); }

    public static _SafeStr_7421: number = 0;
    public static _SafeStr_8598: number = 1;

    constructor() {
    }

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _extraParam: string;

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _direction: number;
    static { (this.prototype as any)._direction = 0; }

    declare private _wallLocation: string;

    declare private _typeCode: number;
    static { (this.prototype as any)._typeCode = 0; }

    public get typeCode(): number {
        return this._typeCode;
    }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public get offerId(): number {
        return this._offerId;
    }

    public get pageId(): number {
        return this._pageId;
    }

    public get extraParam(): string {
        return this._extraParam;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get direction(): number {
        return this._direction;
    }

    public get wallLocation(): string {
        return this._wallLocation;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._typeCode = param1.readInteger();
        this._pageId = param1.readInteger();
        this._offerId = param1.readInteger();
        this._extraParam = param1.readString();
        if (this._typeCode == BuildersClubPlacementWarningMessageParser._SafeStr_7421) {
            this._SafeStr_2126 = param1.readInteger();
            this._y = param1.readInteger();
            this._direction = param1.readInteger();
        } else {
            this._wallLocation = param1.readString();
        }
        return true;
    }
}
