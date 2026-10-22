import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetMannequinNameComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::SetMannequinNameComposer'); }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _name: string;

    constructor(param1: number, param2: string) {
        this._furniId = param1;
        this._name = param2;
    }

    public getMessageArray(): any[] {
        return [this._furniId, this._name];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
