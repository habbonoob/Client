import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class AvatarEffectSelectedComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.avatareffect::AvatarEffectSelectedComposer'); }

    constructor(param1: number) {
        this._type = param1;
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._type);
        return _loc1_;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
