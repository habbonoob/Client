import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';

/**
 * A native extension (platform code packaged with a desktop application, such as Discord rich
 * presence). None are installed in the browser, and creating a context for a missing extension
 * gives null, which the client checks for.
 */
export class ExtensionContext extends EventDispatcher {
    static createExtensionContext(extensionID: string, contextType: string): ExtensionContext | null {
        void extensionID;
        void contextType;
        return null;
    }

    /** Only reachable through a context, and there are none. */
    call(functionName: string, ...args: any[]): any {
        void args;
        throw new Error(`Native extension function ${functionName} is not available.`);
    }

    dispose(): void {}
}
