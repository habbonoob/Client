import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class TogglePetBreedingPermissionMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::TogglePetBreedingPermissionMessageComposer'); }

    constructor(param1: number) {
        this._petId = param1;
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._petId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
