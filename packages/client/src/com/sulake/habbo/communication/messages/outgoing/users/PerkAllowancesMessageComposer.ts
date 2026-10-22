import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PerkAllowancesMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.users::PerkAllowancesMessageComposer'); }

    public getMessageArray(): any[] {
        return [];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
