import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { VariableDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/VariableDefinition';

export class WiredFurniVariableMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredFurniVariableMessageParser'); }

    declare private _def: VariableDefinition;

    constructor() {
    }

    public flush(): boolean {
        this._def = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._def = new VariableDefinition(param1);
        return true;
    }

    public get def(): VariableDefinition {
        return this._def;
    }
}
