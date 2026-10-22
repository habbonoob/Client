import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetPetInfoMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.pets::GetPetInfoMessageComposer'); }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    constructor(param1: number) {
        this._petId = param1;
    }

    public getMessageArray(): any[] {
        return [this._petId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
