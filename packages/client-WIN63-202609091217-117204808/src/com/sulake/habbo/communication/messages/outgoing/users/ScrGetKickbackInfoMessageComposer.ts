import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ScrGetKickbackInfoMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::ScrGetKickbackInfoMessageComposer'); }

    constructor() {
    }

    public getMessageArray(): any[] {
        return null;
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
