import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ChangeMottoMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.avatar::ChangeMottoMessageComposer'); }

    declare private _motto: string;

    constructor(param1: string) {
        this._motto = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._motto];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
