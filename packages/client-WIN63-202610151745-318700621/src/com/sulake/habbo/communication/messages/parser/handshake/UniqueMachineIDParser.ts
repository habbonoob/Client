import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UniqueMachineIDParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::UniqueMachineIDParser'); }

    declare private _machineID: string;

    constructor() {
        this._machineID = "";
    }

    public flush(): boolean {
        this._machineID = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._machineID = param1.readString();
        return true;
    }

    public get machineID(): string {
        return this._machineID;
    }
}
