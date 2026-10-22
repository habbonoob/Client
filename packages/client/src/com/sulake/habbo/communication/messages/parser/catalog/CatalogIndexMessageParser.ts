import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { NodeData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NodeData';

export class CatalogIndexMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::CatalogIndexMessageParser'); }

    constructor() {
    }

    declare private _root: NodeData;

    declare private _newAdditionsAvailable: boolean;
    static { (this.prototype as any)._newAdditionsAvailable = false; }

    declare private _catalogType: string;

    public get root(): NodeData {
        return this._root;
    }

    public get newAdditionsAvailable(): boolean {
        return this._newAdditionsAvailable;
    }

    public get catalogType(): string {
        return this._catalogType;
    }

    public flush(): boolean {
        this._root = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._root = new NodeData(param1);
        this._newAdditionsAvailable = param1.readBoolean();
        this._catalogType = param1.readString();
        return true;
    }
}
