import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class DisconnectMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::DisconnectMessageComposer'); }

    private static readonly EMPTY: any[] = [];

    constructor() {
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return DisconnectMessageComposer.EMPTY;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
