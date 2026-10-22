import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IPreEncryptionMessage } from '@/com/sulake/core/communication/messages/IPreEncryptionMessage';

export class ClientHelloMessageComposer implements IMessageComposer, IPreEncryptionMessage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::ClientHelloMessageComposer'); }

    static #staticsReady = false;

    private static readonly CLIENT_ID: string = "WIN63-202603212315-320263584";
    private static readonly PLATFORM_ID: string = "FLASH25";
    private static readonly PROTOCOL_VERSION: number = 4;

    private static get OS_TYPE(): number {
        ClientHelloMessageComposer.#initStatics();
        return ClientHelloMessageComposer.OS_TYPE;
    }

    private static resolveOsType(): number {
        let os: string = Capabilities.os;
        if (os.indexOf("Windows") >= 0)
            return 6;
        if (os.indexOf("Mac") >= 0)
            return 5;
        if (os.indexOf("Linux") >= 0)
            return 7;
        return 0;
    }

    constructor() {
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [ClientHelloMessageComposer.CLIENT_ID, ClientHelloMessageComposer.PLATFORM_ID, ClientHelloMessageComposer.OS_TYPE, ClientHelloMessageComposer.PROTOCOL_VERSION];
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ClientHelloMessageComposer.#staticsReady) return;
        ClientHelloMessageComposer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ClientHelloMessageComposer, name, { value, writable: true, configurable: true, enumerable: true });
        set("OS_TYPE", 0);
        set("OS_TYPE", ClientHelloMessageComposer.resolveOsType());
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IPreEncryptionMessage](): true {
        return true;
    }
}
