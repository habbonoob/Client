import { packetTaps, type IncomingPacket, type OutgoingPacket } from '@habbo-pixi/runtime/net/packetTaps';
import type { RoomCopy, RoomCopyVariable, RoomCopyWired } from './RoomCopy';
import { RoomState } from './RoomState';
import { WiredReader } from './WiredReader';
import { FurniNames, hotelOf } from './hotels';

export type { RoomCopy } from './RoomCopy';

/** A box asked for every so often, and given this long to answer (as the G-Earth copier). */
const ASK_EVERY_MS = 400;
const ANSWER_WITHIN_MS = 3000;
const BOX_PREFIXES = ['wf_trg_', 'wf_act_', 'wf_cnd_', 'wf_slc_', 'wf_xtra_', 'wf_var_'];

/**
 * Copies the room the client is in, for the Habbo server's room import: say `:copy` in the room (or `:copy wired`,
 * which also reads the wired boxes' settings). Neither is said out loud. The copy goes to the relay
 * (Habbo.Relay's /roomcopy), which saves it where the G-Earth copier saves its own; a whisper only you see says what
 * was copied.
 *
 * It reads the room from the packets the client is sent, as the client's parsers read them (the game connection's
 * packet taps), so it needs nothing of the client but the packet-taps patch. `:copy` only reads; `:copy wired` opens
 * each box as a double click would, one every 0.4 seconds, and keeps the dialogs from showing.
 *
 * @param relay the relay: a port on this machine (8791) or its URL
 */
export function startRoomCopier(relay: string): () => void {
    return new RoomCopier(/^\d+$/.test(relay) ? `http://localhost:${relay}` : relay.replace(/\/+$/, '')).start();
}

class RoomCopier {
    readonly #room = new RoomState();
    readonly #wired = new WiredReader();
    #names: FurniNames | null = null;
    #namesLoading = false;
    #copying = false;

    readonly relay: string;

    constructor(relay: string) {
        this.relay = relay;
    }

    start(): () => void {
        console.info(`[RoomCopier] say :copy (or :copy wired) in a room; copies go to ${this.relay}`);
        return packetTaps.add({
            incoming: packet => this.#incoming(packet),
            outgoing: packet => this.#outgoing(packet),
        });
    }

    #incoming(packet: IncomingPacket): boolean {
        this.#loadNames();
        if (this.#wired.take(packet)) return true;
        this.#room.read(packet);
        return false;
    }

    /** :copy and :copy wired are for the copier, not said out loud. */
    #outgoing(packet: OutgoingPacket): boolean {
        if (packet.name !== 'ChatMessageComposer' && packet.name !== 'ShoutMessageComposer') return false;
        const said = String(packet.values[0] ?? '').trim().toLowerCase();
        if (said !== ':copy' && said !== ':copy wired') return false;
        void this.#start(said === ':copy wired');
        return true;
    }

    /** The furni's class names, which the Flash client is not sent: they name the copy's furni and find its wired.
     * Loaded once the connection says which hotel this is. */
    #loadNames(): void {
        const port = packetTaps.port;
        if (this.#names || this.#namesLoading || !port?.host) return;
        this.#namesLoading = true;
        FurniNames.load(hotelOf(port.host).web)
            .then(names => {
                this.#names = names;
                console.info(`[RoomCopier] furnidata loaded: ${names.size} furni`);
            })
            .catch(e => console.warn('[RoomCopier] could not load the furnidata, so copies have no class names and no wired:', e))
            .finally(() => { this.#namesLoading = false; });
    }

    async #start(withWired: boolean): Promise<void> {
        if (this.#copying) {
            this.#tell('Still copying the last one.');
            return;
        }
        this.#copying = true;
        try {
            await this.#copy(withWired);
        } catch (e) {
            console.warn('[RoomCopier] the copy failed:', e);
            this.#tell(`The copy failed: ${e instanceof Error ? e.message : String(e)}`);
        } finally {
            this.#copying = false;
        }
    }

    async #copy(withWired: boolean): Promise<void> {
        const room = this.#room;
        if (!room.inRoom) {
            this.#tell('Enter a room first, then copy it.');
            return;
        }
        let wired = new Map<number, RoomCopyWired>();
        let variables: RoomCopyVariable[] | null = null;
        let note = '';
        if (withWired) ({ wired, variables, note } = await this.#readWired());
        if (room.oldFormatWallItems > 0) note += ` (${room.oldFormatWallItems} wall items in the old format left out)`;

        const copy = this.#record(wired, variables);
        const response = await fetch(`${this.relay}/roomcopy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copy),
        });
        if (!response.ok) throw new Error(`the relay did not take it: ${response.status} ${await response.text()}`);
        const { file } = await response.json() as { file: string };
        this.#tell(`Room copied: ${copy.FloorItems.length} floor and ${copy.WallItems.length} wall items`
            + `${withWired ? `, ${wired.size} wired boxes` : ''}${note}, saved as ${file}`);
    }

    /** Each wired box opened in turn, its dialog read instead of shown; then the room's variables, which the boxes use
     * by ids the import must find again. */
    async #readWired(): Promise<{ wired: Map<number, RoomCopyWired>; variables: RoomCopyVariable[] | null; note: string }> {
        const read = new Map<number, RoomCopyWired>();
        const names = this.#names;
        const port = packetTaps.port;
        if (!names) return { wired: read, variables: null, note: " (no wired: the furnidata didn't load)" };
        if (this.#room.canReadWired === false) return { wired: read, variables: null, note: " (no wired: this room doesn't let you read it)" };
        if (!port) return { wired: read, variables: null, note: ' (no wired: not connected)' };

        const boxes = [...this.#room.floorItems.values()]
            .filter(item => BOX_PREFIXES.some(prefix => (item.className ?? names.floor(item.type) ?? '').startsWith(prefix)))
            .map(item => item.id);
        this.#tell(`Reading ${boxes.length} wired boxes, about ${Math.ceil(boxes.length * ASK_EVERY_MS / 1000)} seconds...`);

        let unanswered = 0;
        for (const id of boxes) {
            const answer = this.#wired.expect(id, ANSWER_WITHIN_MS);
            if (!port.send('OpenMessageComposer', [id])) {
                return { wired: read, variables: null, note: ' (no wired: the client could not ask for the boxes)' };
            }
            const settings = await answer;
            if (settings) read.set(id, settings);
            else unanswered++;
            await new Promise(resolve => setTimeout(resolve, ASK_EVERY_MS));
        }
        let note = unanswered > 0 ? ` (${unanswered} didn't answer)` : '';

        // every variable of the room, asked for as a client holding none of them
        const answer = this.#wired.expectVariables(ANSWER_WITHIN_MS);
        const variables = port.send('WiredGetAllVariablesDiffsMessageComposer', [0]) ? await answer : null;
        if (variables === null && [...read.values()].some(box => box.VariableIds.length > 0)) {
            note += " (the variables didn't come, so the boxes lose theirs)";
        }
        return { wired: read, variables, note };
    }

    #record(wired: Map<number, RoomCopyWired>, variables: RoomCopyVariable[] | null): RoomCopy {
        const room = this.#room;
        const names = this.#names;
        return {
            Format: 3,
            Hotel: hotelOf(packetTaps.port?.host ?? '').domain,
            SourceRoomId: room.roomId,
            Name: room.name.length > 0 ? room.name : `Room ${room.roomId}`,
            Description: room.description,
            CopiedAt: new Date().toISOString(),
            Heightmap: room.heightmap ?? '',
            DoorX: room.door.x,
            DoorY: room.door.y,
            DoorDirection: room.door.direction,
            FixedWallsHeight: room.fixedWallsHeight,
            UseSmallScale: room.useSmallScale,
            WallThickness: room.wallThickness,
            FloorThickness: room.floorThickness,
            WallsHidden: room.wallsHidden,
            Wallpaper: room.wallpaper,
            Floor: room.floor,
            Landscape: room.landscape,
            FloorItems: [...room.floorItems.values()].map(item => ({
                ClassId: item.type,
                ClassName: item.className ?? names?.floor(item.type) ?? null,
                X: item.x,
                Y: item.y,
                Z: item.z,
                Direction: item.direction,
                Data: item.data,
                SourceId: item.id,
                Wired: wired.get(item.id) ?? null,
            })),
            WallItems: [...room.wallItems.values()].map(item => ({
                ClassId: item.type,
                ClassName: names?.wall(item.type) ?? null,
                Location: item.location,
                State: item.state,
                SourceId: item.id,
            })),
            Variables: variables,
        };
    }

    /** A whisper only this client sees, from the player themselves; the console when their avatar isn't known. */
    #tell(message: string): void {
        console.info(`[RoomCopier] ${message}`);
        const index = this.#room.selfIndex;
        // a ChatMessageParser's layout: the avatar, the text, gesture, style (34, a whisper's), no links, tracking id
        if (index !== null) packetTaps.port?.inject('WhisperMessageEvent', [index, message, 0, 34, 0, -1]);
    }
}
