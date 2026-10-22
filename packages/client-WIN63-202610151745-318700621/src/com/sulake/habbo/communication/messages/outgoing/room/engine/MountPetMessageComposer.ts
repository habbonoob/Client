import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class MountPetMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::MountPetMessageComposer'); }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _SafeStr_6176: boolean;
    static { (this.prototype as any)._SafeStr_6176 = false; }

    constructor(param1: number, param2: boolean) {
        this._petId = param1;
        this._SafeStr_6176 = param2;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._petId, this._SafeStr_6176];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
