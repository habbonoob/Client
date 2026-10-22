import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { WiredVariableStorageParameter } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredVariableStorageParameter';

export class WiredUserPermanentVariablesList {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredUserPermanentVariablesList'); }

    declare private _entityType: number;
    static { (this.prototype as any)._entityType = 0; }

    declare private _entityId: number;
    static { (this.prototype as any)._entityId = 0; }

    declare private _entityName: string;

    declare private _SafeStr_6525: string;

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _ownerName: string;

    declare private _ownerFigure: string;

    declare private _variableStorage: WiredVariableStorageParameter[];

    declare private _variableIds: Map<any, any>;

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: any = undefined;
        let _loc4_: WiredVariableStorageParameter = null;
        this._entityType = param1.readInteger();
        this._entityId = param1.readInteger();
        this._entityName = param1.readString();
        this._SafeStr_6525 = param1.readString();
        if (this._entityType != 1) {
            this._ownerId = param1.readInteger();
            this._ownerName = param1.readString();
            this._ownerFigure = param1.readString();
        }
        this._variableStorage = [];
        this._variableIds = new Dictionary();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = new WiredVariableStorageParameter(param1, true);
            this._variableStorage.push(_loc4_);
            this._variableIds.set(_loc4_.variableId, true);
            _loc3_++;
        }
    }

    public get entityType(): number {
        return this._entityType;
    }

    public get entityId(): number {
        return this._entityId;
    }

    public get entityName(): string {
        return this._entityName;
    }

    public get entityFigure(): string {
        return this._SafeStr_6525;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public get ownerFigure(): string {
        return this._ownerFigure;
    }

    public get variableStorage(): WiredVariableStorageParameter[] {
        return this._variableStorage;
    }

    public get variableIds(): Map<any, any> {
        return this._variableIds;
    }
}
