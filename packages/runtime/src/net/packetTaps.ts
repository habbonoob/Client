/**
 * The game connection's packets, for tools that run beside the client (the room copier): a tap sees every packet
 * the client sends and receives, by its class name in the client, and may hold one back; the connection's port
 * sends packets of the tap's own and hands the client packets as if the server had sent them.
 *
 * The client's SocketConnection fills this in (its packet-taps patch); nothing here knows the client's classes, so
 * a tool written against it works with every client release that has the patch. With no tap added the connection
 * does nothing extra.
 */

/** A packet the server sent, after the client's parser read it and before the client acts on it. */
export interface IncomingPacket {
    readonly id: number;
    /** The event's class name in the client (ObjectsMessageEvent). */
    readonly name: string;
    /** The parser that read it, with what it read (ObjectsMessageParser). */
    readonly parser: unknown;
    /** The packet's body as it came (its length and id cut off). */
    readonly body: Uint8Array;
}

/** A packet the client is about to send. */
export interface OutgoingPacket {
    readonly id: number;
    /** The composer's class name in the client (ChatMessageComposer). */
    readonly name: string;
    /** What the composer sends, in order (ints, strings, booleans). */
    readonly values: readonly unknown[];
}

export interface PacketTap {
    /** True keeps the packet from the client: it never acts on it. */
    incoming?(packet: IncomingPacket): boolean | void;
    /** True keeps the packet from the server: it is never sent. */
    outgoing?(packet: OutgoingPacket): boolean | void;
}

/** The game connection, as a tap may use it. */
export interface PacketPort {
    /** The game server's host the connection was opened to (game-us.habbo.com). */
    readonly host: string;
    /** Sends a packet by its composer's class name; false when the client has no such composer or is not connected. */
    send(name: string, values: readonly unknown[]): boolean;
    /** Has the client take in a packet by its event's class name as if the server had sent it; false when the client
     * has no such event. */
    inject(name: string, values: readonly unknown[]): boolean;
}

const taps: PacketTap[] = [];
let port: PacketPort | null = null;

export const packetTaps = {
    /** Whether any tap listens: the connection only looks at packets for them when one does. */
    get active(): boolean {
        return taps.length > 0;
    },

    add(tap: PacketTap): () => void {
        taps.push(tap);
        return () => {
            const at = taps.indexOf(tap);
            if (at >= 0) taps.splice(at, 1);
        };
    },

    /** The connection, once the client opened one; null before. */
    get port(): PacketPort | null {
        return port;
    },

    /** Called by the client's connection. */
    setPort(value: PacketPort | null): void {
        port = value;
    },

    /** Called by the client's connection for each packet it received; true when a tap kept it. A tap that throws is
     * reported and passed over, so a tool can never break the game connection. */
    incoming(packet: IncomingPacket): boolean {
        let kept = false;
        for (const tap of [...taps]) {
            try {
                if (tap.incoming?.(packet) === true) kept = true;
            } catch (e) {
                console.warn(`[packetTaps] a tap failed on ${packet.name}:`, e);
            }
        }
        return kept;
    },

    /** Called by the client's connection for each packet it is about to send; true when a tap kept it. */
    outgoing(packet: OutgoingPacket): boolean {
        let kept = false;
        for (const tap of [...taps]) {
            try {
                if (tap.outgoing?.(packet) === true) kept = true;
            } catch (e) {
                console.warn(`[packetTaps] a tap failed on ${packet.name}:`, e);
            }
        }
        return kept;
    },
};
