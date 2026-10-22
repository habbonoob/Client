import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RoomUsersClassificationMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.userclassification::RoomUsersClassificationMessageComposer'); }

    declare private _SafeStr_4954: string;

    constructor(param1: string) {
        this._SafeStr_4954 = param1;
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_4954];
    }

    public dispose(): void {
        this._SafeStr_4954 = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
