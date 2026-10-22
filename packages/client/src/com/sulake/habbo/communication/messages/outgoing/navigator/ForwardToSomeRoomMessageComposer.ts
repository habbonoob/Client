import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ForwardToSomeRoomMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.navigator::ForwardToSomeRoomMessageComposer'); }

    constructor(param1: string) {
        this._type = param1;
    }

    declare private _type: string;

    public getMessageArray(): any[] {
        return [this._type];
    }

    public dispose(): void {
        this._type = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
