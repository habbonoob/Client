import { Event } from './Event';

/** The application was invoked from a web page. */
export class BrowserInvokeEvent extends Event {
    static readonly BROWSER_INVOKE: string = 'browserInvoke';

    readonly #arguments: any[];
    readonly #sandboxType: string;
    readonly #securityDomain: string;
    readonly #isHTTPS: boolean;
    readonly #isUserEvent: boolean;

    constructor(type: string, bubbles: boolean, cancelable: boolean, args: any[], sandboxType: string, securityDomain: string, isHTTPS: boolean, isUserEvent: boolean) {
        super(type, bubbles, cancelable);
        this.#arguments = args ?? [];
        this.#sandboxType = sandboxType;
        this.#securityDomain = securityDomain;
        this.#isHTTPS = isHTTPS;
        this.#isUserEvent = isUserEvent;
    }

    get arguments(): any[] {
        return this.#arguments;
    }

    get sandboxType(): string {
        return this.#sandboxType;
    }

    get securityDomain(): string {
        return this.#securityDomain;
    }

    get isHTTPS(): boolean {
        return this.#isHTTPS;
    }

    get isUserEvent(): boolean {
        return this.#isUserEvent;
    }

    override clone(): Event {
        return new BrowserInvokeEvent(this.type, this.bubbles, this.cancelable, this.#arguments, this.#sandboxType, this.#securityDomain, this.#isHTTPS, this.#isUserEvent);
    }
}
