import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ChangeMottoMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.avatar::ChangeMottoMessageComposer'); }

    constructor(param1: string) {
        this._motto = param1;
    }

    declare private _motto: string;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._motto];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
