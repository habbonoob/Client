import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SelectorDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/SelectorDefinition';

export class WiredFurniSelectorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredFurniSelectorMessageParser'); }

    constructor() {
    }

    declare private _def: SelectorDefinition;

    public get def(): SelectorDefinition {
        return this._def;
    }

    public flush(): boolean {
        this._def = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._def = new SelectorDefinition(param1);
        return true;
    }
}
