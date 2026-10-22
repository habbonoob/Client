import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ActionDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/ActionDefinition';

export class WiredFurniActionMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredFurniActionMessageParser'); }

    constructor() {
    }

    declare private _def: ActionDefinition;

    public get def(): ActionDefinition {
        return this._def;
    }

    public flush(): boolean {
        this._def = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._def = new ActionDefinition(param1);
        return true;
    }
}
