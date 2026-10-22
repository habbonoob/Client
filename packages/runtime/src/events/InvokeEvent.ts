import { Event } from './Event';

/** The application was invoked (with command-line style arguments). */
export class InvokeEvent extends Event {
    static readonly INVOKE: string = 'invoke';

    readonly #arguments: any[];
    readonly #currentDirectory: any;
    readonly #reason: string;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, dir: any = null, argv: any[] = null, reason: string = 'standard') {
        super(type, bubbles, cancelable);
        this.#currentDirectory = dir;
        this.#arguments = argv ?? [];
        this.#reason = reason;
    }

    get arguments(): any[] {
        return this.#arguments;
    }

    get currentDirectory(): any {
        return this.#currentDirectory;
    }

    get reason(): string {
        return this.#reason;
    }

    override clone(): Event {
        return new InvokeEvent(this.type, this.bubbles, this.cancelable, this.#currentDirectory, this.#arguments, this.#reason);
    }
}
