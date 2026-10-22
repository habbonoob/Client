import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PickupObjectMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::PickupObjectMessageComposer'); }

    constructor(param1: number, param2: number, param3: boolean = false) {
        this._objectId = param1;
        this._objectCategory = param2;
        this._SafeStr_6493 = param3;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _objectCategory: number;
    static { (this.prototype as any)._objectCategory = 0; }

    declare private _SafeStr_6493: boolean;
    static { (this.prototype as any)._SafeStr_6493 = false; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        let _loc1_: number = 0;
        switch (this._objectCategory - 10) {
            case 0:
                _loc1_ = 2;
                break;
            case 10:
                _loc1_ = 1;
                break;
            default:
                return [];
        }
        return [_loc1_, this._objectId, this._SafeStr_6493];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
