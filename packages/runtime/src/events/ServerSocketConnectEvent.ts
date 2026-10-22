import type { Socket } from '@habbo-pixi/runtime/net/Socket';
import { Event } from './Event';

/** A server socket accepted a connection (`socket`). */
export class ServerSocketConnectEvent extends Event {
    static readonly CONNECT: string = 'connect';

    socket: Socket | null;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, socket: Socket = null) {
        super(type, bubbles, cancelable);
        this.socket = socket;
    }

    override clone(): Event {
        return new ServerSocketConnectEvent(this.type, this.bubbles, this.cancelable, this.socket);
    }
}
