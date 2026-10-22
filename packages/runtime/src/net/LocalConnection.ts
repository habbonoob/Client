import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';

/** The hosting site's domain (for site checks). */
export class LocalConnection extends EventDispatcher {
    /** The domain of the page the client runs on. */
    get domain(): string {
        return location.hostname || 'localhost';
    }
}
