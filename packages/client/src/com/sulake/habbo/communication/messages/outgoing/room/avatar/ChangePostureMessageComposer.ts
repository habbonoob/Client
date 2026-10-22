import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ChangePostureMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.avatar::ChangePostureMessageComposer'); }

    constructor(param1: number) {
        this._posture = param1;
    }

    declare private _posture: number;
    static { (this.prototype as any)._posture = 0; }

    public getMessageArray(): any[] {
        return [this._posture];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
