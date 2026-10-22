import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class EventLogMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.tracking::EventLogMessageComposer'); }

    constructor(param1: string, param2: string, param3: string, param4: string = "", param5: number = 0) {
        this._category = param1 ? param1 : "";
        this._type = param2 ? param2 : "";
        this._action = param3 ? param3 : "";
        this._extraString = param4 ? param4 : "";
        this._extraInt = param5 ? param5 : 0;
    }

    declare private _category: string;

    declare private _type: string;

    declare private _action: string;

    declare private _extraString: string;

    declare private _extraInt: number;
    static { (this.prototype as any)._extraInt = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._category, this._type, this._action, this._extraString, this._extraInt];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
