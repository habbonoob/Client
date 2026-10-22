import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PresentOpenedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::PresentOpenedMessageParser'); }

    declare private _itemType: string;

    declare private _classId: number;
    static { (this.prototype as any)._classId = 0; }

    declare private _productCode: string;

    declare private _placedItemId: number;
    static { (this.prototype as any)._placedItemId = 0; }

    declare private _placedItemType: string;

    declare private _placedInRoom: boolean;
    static { (this.prototype as any)._placedInRoom = false; }

    declare private _petFigureString: string;

    constructor() {
    }

    public get itemType(): string {
        return this._itemType;
    }

    public get classId(): number {
        return this._classId;
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get placedItemId(): number {
        return this._placedItemId;
    }

    public get placedItemType(): string {
        return this._placedItemType;
    }

    public get placedInRoom(): boolean {
        return this._placedInRoom;
    }

    public get petFigureString(): string {
        return this._petFigureString;
    }

    public flush(): boolean {
        this._itemType = "";
        this._classId = 0;
        this._productCode = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._itemType = param1.readString();
        this._classId = param1.readInteger();
        this._productCode = param1.readString();
        this._placedItemId = param1.readInteger();
        this._placedItemType = param1.readString();
        this._placedInRoom = param1.readBoolean();
        this._petFigureString = param1.readString();
        return true;
    }
}
