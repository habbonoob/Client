import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CatalogPublishedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::CatalogPublishedMessageParser'); }

    constructor() {
    }

    declare private _instantlyRefreshCatalogue: boolean;
    static { (this.prototype as any)._instantlyRefreshCatalogue = false; }

    declare private _newFurniDataHash: string;

    public get newFurniDataHash(): string {
        return this._newFurniDataHash;
    }

    public get instantlyRefreshCatalogue(): boolean {
        return this._instantlyRefreshCatalogue;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._instantlyRefreshCatalogue = param1.readBoolean();
        if (param1.bytesAvailable) {
            this._newFurniDataHash = param1.readString();
        }
        return true;
    }
}
