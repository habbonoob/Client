import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ConditionDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/ConditionDefinition';

export class WiredFurniConditionMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredFurniConditionMessageParser'); }

    constructor() {
    }

    declare private _def: ConditionDefinition;

    public get def(): ConditionDefinition {
        return this._def;
    }

    public flush(): boolean {
        this._def = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._def = new ConditionDefinition(param1);
        return true;
    }
}
