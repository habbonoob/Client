import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CampaignCalendarDoorOpenedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.campaign::CampaignCalendarDoorOpenedMessageParser'); }

    declare private _doorOpened: boolean;
    static { (this.prototype as any)._doorOpened = false; }

    declare private _productName: string;

    declare private _customImage: string;

    declare private _furnitureClassName: string;

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._doorOpened = param1.readBoolean();
        this._productName = param1.readString();
        this._customImage = param1.readString();
        this._furnitureClassName = param1.readString();
        return true;
    }

    public flush(): boolean {
        this._doorOpened = false;
        this._productName = null;
        this._customImage = null;
        this._furnitureClassName = null;
        return true;
    }

    public get doorOpened(): boolean {
        return this._doorOpened;
    }

    public get productName(): string {
        return this._productName;
    }

    public get customImage(): string {
        return this._customImage;
    }

    public get furnitureClassName(): string {
        return this._furnitureClassName;
    }
}
