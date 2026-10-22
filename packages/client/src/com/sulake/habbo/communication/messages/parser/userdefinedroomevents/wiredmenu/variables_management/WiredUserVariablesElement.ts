import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { WiredVariableStorageParameter } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredVariableStorageParameter';

export class WiredUserVariablesElement {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredUserVariablesElement'); }

    constructor(param1: IMessageDataWrapper) {
        this._entityType = param1.readInteger();
        this._entityId = param1.readInteger();
        this._entityName = param1.readString();
        this._storage = new WiredVariableStorageParameter(param1);
    }

    declare private _entityType: number;
    static { (this.prototype as any)._entityType = 0; }

    declare private _entityId: number;
    static { (this.prototype as any)._entityId = 0; }

    declare private _entityName: string;

    declare private _storage: WiredVariableStorageParameter;

    public get entityType(): number {
        return this._entityType;
    }

    public get entityId(): number {
        return this._entityId;
    }

    public get entityName(): string {
        return this._entityName;
    }

    public get storage(): WiredVariableStorageParameter {
        return this._storage;
    }
}
