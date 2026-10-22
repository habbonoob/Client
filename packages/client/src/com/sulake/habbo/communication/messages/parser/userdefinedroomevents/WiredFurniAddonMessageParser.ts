import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AddonDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/AddonDefinition';

export class WiredFurniAddonMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredFurniAddonMessageParser'); }

    constructor() {
    }

    declare private _def: AddonDefinition;

    public get def(): AddonDefinition {
        return this._def;
    }

    public flush(): boolean {
        this._def = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._def = new AddonDefinition(param1);
        return true;
    }
}
