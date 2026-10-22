import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';

export class WiredAllVariablesDiffsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredAllVariablesDiffsMessageParser'); }

    declare private _allVariablesHash: number;
    static { (this.prototype as any)._allVariablesHash = 0; }

    declare private _isLastChunk: boolean;
    static { (this.prototype as any)._isLastChunk = false; }

    declare private _removedVariables: string[];

    declare private _addedOrUpdated: Map<any, any>;

    constructor() {
    }

    public flush(): boolean {
        this._allVariablesHash = 0;
        this._isLastChunk = false;
        this._removedVariables = null;
        this._addedOrUpdated = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: WiredVariable = null;
        this._allVariablesHash = param1.readInteger();
        this._isLastChunk = param1.readBoolean();
        let _loc2_: number = param1.readInteger();
        this._removedVariables = [];
        _loc5_ = 0;
        while (_loc5_ < _loc2_) {
            this._removedVariables.push(param1.readString());
            _loc5_++;
        }
        let _loc3_: number = param1.readInteger();
        this._addedOrUpdated = new Dictionary();
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc6_ = param1.readInteger();
            _loc4_ = new WiredVariable(param1);
            this._addedOrUpdated.set(_loc4_, _loc6_);
            _loc5_++;
        }
        return true;
    }

    public get isLastChunk(): boolean {
        return this._isLastChunk;
    }

    public get removedVariables(): string[] {
        return this._removedVariables;
    }

    public get addedOrUpdated(): Map<any, any> {
        return this._addedOrUpdated;
    }

    public get allVariablesHash(): number {
        return this._allVariablesHash;
    }
}
