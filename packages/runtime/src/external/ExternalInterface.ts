/**
 * Calls into a hosting web page. The client was a desktop application with no host page, so this
 * container is not available — the client checks `available` and skips its page integration —
 * and calling anyway fails the way it did there.
 */
export class ExternalInterface {
    static readonly available = false;
    static marshallExceptions = false;
    static readonly objectID: string | null = null;

    static call(functionName: string, ...args: any[]): any {
        void args;
        throw new Error(`ExternalInterface is not available in this container (call to ${functionName}).`);
    }

    static addCallback(functionName: string, closure: (...args: any[]) => any): void {
        void closure;
        throw new Error(`ExternalInterface is not available in this container (callback ${functionName}).`);
    }
}
