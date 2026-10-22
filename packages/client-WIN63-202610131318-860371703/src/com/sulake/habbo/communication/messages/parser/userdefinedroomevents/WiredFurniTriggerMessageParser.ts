import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TriggerDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/TriggerDefinition';

export class WiredFurniTriggerMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredFurniTriggerMessageParser'); }

    declare private _def: TriggerDefinition;

    constructor() {
    }

    public flush(): boolean {
        this._def = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._def = new TriggerDefinition(param1);
        return true;
    }

    public get def(): TriggerDefinition {
        return this._def;
    }
}
