import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ApproveNameMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::ApproveNameMessageComposer'); }

    declare private _name: string;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    constructor(param1: string, param2: number) {
        this._name = param1;
        this._type = param2;
    }

    public getMessageArray(): any[] {
        return [this._name, this._type];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
