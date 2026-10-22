import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { NodeData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NodeData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CatalogIndexMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/CatalogIndexMessageParser';

export class CatalogIndexMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::CatalogIndexMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CatalogIndexMessageParser);
    }

    public getParser(): CatalogIndexMessageParser {
        return this._parser instanceof CatalogIndexMessageParser ? this._parser : null;
    }

    public get root(): NodeData {
        return this.getParser().root;
    }

    public get newAdditionsAvailable(): boolean {
        return this.getParser().newAdditionsAvailable;
    }

    public get catalogType(): string {
        return this.getParser().catalogType;
    }
}
