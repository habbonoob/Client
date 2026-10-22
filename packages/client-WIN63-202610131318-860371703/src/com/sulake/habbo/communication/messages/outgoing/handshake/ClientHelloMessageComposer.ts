import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IPreEncryptionMessage } from '@/com/sulake/core/communication/messages/IPreEncryptionMessage';

export class ClientHelloMessageComposer implements IMessageComposer, IPreEncryptionMessage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::ClientHelloMessageComposer'); }

    private PLATFORM_ID: string = "FLASH31";

    constructor() {
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        let _loc2_: string = "WIN63-202610131318-860371703";
        let _loc1_: number = 0;
        if (Capabilities.os.indexOf("Windows") >= 0) {
            _loc1_ = 6;
        } else if (Capabilities.os.indexOf("Mac") >= 0) {
            _loc1_ = 5;
        } else if (Capabilities.os.indexOf("Linux") >= 0) {
            _loc1_ = 7;
        }
        return [_loc2_, this.PLATFORM_ID, _loc1_, 4];
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IPreEncryptionMessage](): true {
        return true;
    }
}
