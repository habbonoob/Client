import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class OpenPetPackageMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::OpenPetPackageMessageComposer'); }

    constructor(param1: number, param2: string) {
        this._objectId = param1;
        this._petName = param2;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _petName: string;

    public getMessageArray(): any[] {
        return [this._objectId, this._petName];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
