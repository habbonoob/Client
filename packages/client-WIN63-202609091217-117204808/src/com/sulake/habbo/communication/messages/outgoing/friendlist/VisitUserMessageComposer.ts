import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class VisitUserMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.friendlist::VisitUserMessageComposer'); }

    declare private _username: string;

    constructor(param1: string) {
        this._username = param1;
    }

    public getMessageArray(): any[] {
        return [this._username];
    }

    public dispose(): void {
        this._username = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
