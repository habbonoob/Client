import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { VariableInfoAndHolders } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableInfoAndHolders';

export class WiredAllVariableHoldersMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredAllVariableHoldersMessageParser'); }

    constructor() {
    }

    declare private _variableInfoAndHolders: VariableInfoAndHolders;

    public get variableInfoAndHolders(): VariableInfoAndHolders {
        return this._variableInfoAndHolders;
    }

    public flush(): boolean {
        this._variableInfoAndHolders = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        param1.readInteger();
        this._variableInfoAndHolders = new VariableInfoAndHolders(param1);
        return true;
    }
}
