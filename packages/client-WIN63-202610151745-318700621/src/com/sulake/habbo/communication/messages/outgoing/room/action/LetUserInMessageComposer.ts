import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class LetUserInMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::LetUserInMessageComposer'); }

    declare private _message: any[];

    constructor(param1: string, param2: boolean) {
        this._message = [param1, param2];
    }

    public dispose(): void {
        this._message = null;
    }

    public getMessageArray(): any[] {
        return this._message;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
