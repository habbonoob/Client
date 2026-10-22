import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IOError } from '@habbo-pixi/runtime/errors/IOError';

/**
 * A listening TCP socket. Browsers can't accept incoming connections, so this platform has no
 * server sockets: `isSupported` is false and binding throws, as on platforms without them.
 */
export class ServerSocket extends EventDispatcher {
    static readonly isSupported = false;

    get bound(): boolean {
        return false;
    }

    get listening(): boolean {
        return false;
    }

    bind(localPort: number = 0, localAddress: string = '0.0.0.0'): void {
        throw new IOError(`Server sockets are not supported on this platform (bind ${localAddress}:${localPort}).`);
    }

    listen(backlog: number = 0): void {
        void backlog;
        throw new IOError('Server sockets are not supported on this platform.');
    }

    close(): void {}
}
