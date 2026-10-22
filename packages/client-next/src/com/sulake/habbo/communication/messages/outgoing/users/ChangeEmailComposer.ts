import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ChangeEmailComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::ChangeEmailComposer'); }

    declare private _SafeStr_6926: string;

    constructor(param1: string) {
        this._SafeStr_6926 = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_6926];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
