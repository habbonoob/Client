import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';

export class SharedVariable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.variables::SharedVariable'); }

    constructor(param1: IMessageDataWrapper) {
        this._roomId = param1.readInteger();
        this._roomName = param1.readString();
        this._wiredVariable = new WiredVariable(param1);
    }

    declare private _wiredVariable: WiredVariable;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _roomName: string;

    public get roomName(): string {
        return this._roomName;
    }

    public get wiredVariable(): WiredVariable {
        return this._wiredVariable;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
