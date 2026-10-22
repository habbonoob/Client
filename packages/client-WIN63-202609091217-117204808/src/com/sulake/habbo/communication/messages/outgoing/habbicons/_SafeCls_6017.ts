import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class _SafeCls_6017 implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.habbicons::_SafeCls_6017'); }

    constructor() {
    }

    public getMessageArray(): any[] {
        return [];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
