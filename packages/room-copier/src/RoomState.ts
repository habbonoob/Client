import type { IncomingPacket } from '@habbo-pixi/runtime/net/packetTaps';
import type { RoomCopyItemData } from './RoomCopy';

/** A floor item as the client was told it (its ObjectMessageData). */
export interface FloorItem {
    id: number;
    type: number;
    x: number;
    y: number;
    z: number;
    /** 0 to 7. */
    direction: number;
    data: RoomCopyItemData;
    /** The class name the client is sent for some items (staticClass), when it is. */
    className: string | null;
    /** The number Habbo sends everyone with each floor item: for a teleport, the id of the teleport it is linked to. */
    extra: number;
}

/** A wall item as the client was told it (its ItemMessageData). */
export interface WallItem {
    id: number;
    type: number;
    location: string;
    state: string;
}

/** The parsers the room is read from: the client's own (their getters keep the names the port gives them), so a
 * packet whose layout Habbo changes is read as the client release reads it. Anything is `any` here: the tool knows
 * no client classes. */
type Parser = any;

/**
 * The room the client is in, kept from the packets it is sent, after its parsers read them: the floor plan, door,
 * walls and floor, and every furni as it is added, moved, changed and taken away. A packet that can't be read is
 * reported and passed over.
 */
export class RoomState {
    roomId = -1;
    name = '';
    description = '';
    heightmap: string | null = null;
    useSmallScale = false;
    fixedWallsHeight = -1;
    door = { x: 0, y: 0, direction: 0 };
    wallsHidden = false;
    wallThickness = 0;
    floorThickness = 0;
    wallpaper = '';
    floor = '';
    landscape = '';
    /** Whether the room lets the player read its wired boxes' settings; null until told. */
    canReadWired: boolean | null = null;
    /** Wall items in the client's old location format, which a copy can't place: left out and counted. */
    oldFormatWallItems = 0;

    /** The player's own id and, in the room, their avatar's index: for a whisper only they see. */
    selfId = -1;
    selfIndex: number | null = null;

    readonly floorItems = new Map<number, FloorItem>();
    readonly wallItems = new Map<number, WallItem>();

    /** Whether the room's furni came yet: the avatar sent alone after them is the one entering. */
    #furniCame = false;

    readonly #readers: Record<string, (p: Parser, packet: IncomingPacket) => void> = {
        UserObjectEvent: p => { this.selfId = p.id; },
        OpenConnectionMessageEvent: p => this.#enter(p.flatId),
        CloseConnectionMessageEvent: () => this.#enter(-1),
        GetGuestRoomResultEvent: p => {
            const data = p.data;
            if (data && data.flatId === this.roomId) {
                this.name = data.roomName ?? '';
                this.description = data.description ?? '';
            }
        },
        FloorHeightMapMessageEvent: (p, packet) => {
            // the small-scale flag is the body's first byte; the parser keeps only its effect
            this.useSmallScale = packet.body.length > 0 && packet.body[0] !== 0;
            this.fixedWallsHeight = p.fixedWallsHeight;
            this.heightmap = p.text;
        },
        WiredPermissionsEvent: p => { this.canReadWired = !!(p.canModify || p.canRead); },
        RoomEntryTileMessageEvent: p => { this.door = { x: p.x, y: p.y, direction: p.dir }; },
        RoomVisualizationSettingsEvent: p => {
            this.wallsHidden = !!p.wallsHidden;
            // the parser keeps 2 to the step's power
            this.wallThickness = Math.round(Math.log2(p.wallThicknessMultiplier));
            this.floorThickness = Math.round(Math.log2(p.floorThicknessMultiplier));
        },
        RoomPropertyMessageEvent: (_p, packet) => {
            // the parser keeps the last value of every key, so a room's own come from the body: key, value
            const r = new BodyReader(packet.body);
            const key = r.string();
            const value = r.string();
            if (key === 'wallpaper') this.wallpaper = value;
            else if (key === 'floor') this.floor = value;
            else if (key === 'landscape') this.landscape = value;
        },

        ObjectsMessageEvent: p => {
            this.#furniCame = true;
            this.floorItems.clear();
            for (let i = 0; i < p.getObjectCount(); i++) this.#keepFloor(p.getObject(i));
        },
        ObjectAddMessageEvent: p => this.#keepFloor(p.data),
        ObjectUpdateMessageEvent: p => this.#keepFloor(p.data),
        ObjectRemoveMessageEvent: p => { this.floorItems.delete(p.id); },
        ObjectRemoveMultipleMessageEvent: p => { for (const id of p.ids ?? []) this.floorItems.delete(id); },
        ObjectDataUpdateMessageEvent: p => this.#updateFloorData(p.id, p.data),
        ObjectsDataUpdateMessageEvent: p => {
            for (let i = 0; i < p.objectCount; i++) {
                const o = p.getObjectData(i);
                if (o) this.#updateFloorData(o.id, o.data);
            }
        },
        ItemsMessageEvent: p => {
            this.wallItems.clear();
            this.oldFormatWallItems = 0;
            for (let i = 0; i < p.getItemCount(); i++) this.#keepWall(p.getItem(i));
        },
        ItemAddMessageEvent: p => this.#keepWall(p.data),
        ItemUpdateMessageEvent: p => this.#keepWall(p.data),
        ItemRemoveMessageEvent: p => { this.wallItems.delete(p.itemId); },
        ItemRemoveMultipleMessageEvent: p => { for (const id of p.itemIds ?? []) this.wallItems.delete(id); },
        ItemDataUpdateMessageEvent: p => this.#updateWallState(p.id, p.itemData),
        ItemsStateUpdateMessageEvent: p => {
            for (let i = 0; i < p.itemCount; i++) {
                const item = p.getItemData(i);
                if (item) this.#updateWallState(item.id, item.itemData);
            }
        },

        UsersMessageEvent: p => {
            const count: number = p.getUserCount();
            for (let i = 0; i < count; i++) {
                const user = p.getUser(i);
                if (user && user.webID === this.selfId) this.selfIndex = user.roomIndex;
            }
            // Habbo sends the one entering on their own, after the furniture (UserObject, which names them, comes
            // only at login)
            if (this.selfIndex === null && this.#furniCame && count === 1) {
                const user = p.getUser(0);
                this.selfIndex = user.roomIndex;
                this.selfId = user.webID;
            }
        },
    };

    get inRoom(): boolean {
        return this.roomId >= 0 && this.heightmap !== null;
    }

    /** Takes in a packet the client was sent; one it doesn't know is left. */
    read(packet: IncomingPacket): void {
        const read = this.#readers[packet.name];
        if (!read) return;
        try {
            read(packet.parser, packet);
        } catch (e) {
            console.warn(`[RoomCopier] could not read ${packet.name}:`, e);
        }
    }

    #enter(roomId: number): void {
        this.roomId = roomId;
        this.name = this.description = '';
        this.heightmap = null;
        this.selfIndex = null;
        this.#furniCame = false;
        this.useSmallScale = this.wallsHidden = false;
        this.fixedWallsHeight = -1;
        this.door = { x: 0, y: 0, direction: 0 };
        this.wallThickness = this.floorThickness = 0;
        this.wallpaper = this.floor = this.landscape = '';
        this.canReadWired = null;
        this.oldFormatWallItems = 0;
        this.floorItems.clear();
        this.wallItems.clear();
    }

    #keepFloor(o: Parser): void {
        if (!o) return;
        this.floorItems.set(o.id, {
            id: o.id,
            type: o.type,
            x: o.x,
            y: o.y,
            z: o.z,
            // the parser keeps degrees
            direction: Math.round(o.dir / 45) % 8,
            data: itemData(o.data),
            className: o.staticClass || null,
            extra: Number.isFinite(o.extra) ? o.extra : 0,
        });
    }

    #updateFloorData(id: number, data: unknown): void {
        const item = this.floorItems.get(id);
        if (item && data) item.data = itemData(data);
    }

    #keepWall(o: Parser): void {
        if (!o) return;
        if (o.isOldFormat) {
            this.oldFormatWallItems++;
            return;
        }
        this.wallItems.set(o.id, {
            id: o.id,
            type: o.type,
            // as the client was sent it: ":w=x,y l=x,y r"
            location: `:w=${o.wallX},${o.wallY} l=${o.localX},${o.localY} ${o.dir}`,
            state: o.data ?? '',
        });
    }

    #updateWallState(id: number, state: string): void {
        const item = this.wallItems.get(id);
        if (item) item.state = state ?? '';
    }
}

/**
 * What a floor item shows, from the client's stuff data object (the room's own classes, *StuffData): which layout it
 * is comes from the class's FORMAT_KEY, its values from its fields. Limited-edition numbers are left behind: a copy
 * is not one of the run.
 */
export function itemData(d: any): RoomCopyItemData {
    const type: number = d?.constructor?.FORMAT_KEY ?? 0;
    const data: RoomCopyItemData = {
        Type: type, State: String(d?.getLegacyString?.() ?? ''), Map: null, Strings: null, Ints: null, VoteResult: null,
        ScoreType: null, ClearType: null, HighScores: null, Hits: null, Target: null,
    };
    switch (type) {
        case 1: { // map: a mannequin's figure, a background's colours
            const map: Record<string, string> = {};
            const values = d._data;
            for (const key of values?.getKeys?.() ?? []) map[String(key)] = String(values.getValue(key));
            return { ...data, State: null, Map: map };
        }
        case 2: // string array
            return { ...data, State: null, Strings: [...(d._data ?? [])].map(String) };
        case 5: // int array
            return { ...data, State: null, Ints: [...(d._data ?? [])].map(Number) };
        case 3: // vote result
            return { ...data, VoteResult: d.result ?? 0 };
        case 6: // high scores
            return {
                ...data,
                ScoreType: d.scoreType,
                ClearType: d.clearType,
                HighScores: (d.entries ?? []).map((e: any) => ({ Score: e.score, Users: [...(e.users ?? [])].map(String) })),
            };
        case 7: // crackable
            return { ...data, Hits: d.hits ?? 0, Target: d.target ?? 0 };
        default: // plain (0) and empty (4)
            return data;
    }
}

/** Reads a packet's body in the game's wire format (big-endian, strings as a 16-bit length and UTF-8). */
export class BodyReader {
    readonly body: Uint8Array;
    #view: DataView;
    #at = 0;

    constructor(body: Uint8Array) {
        this.body = body;
        this.#view = new DataView(body.buffer, body.byteOffset, body.byteLength);
    }

    int(): number {
        const v = this.#view.getInt32(this.#at);
        this.#at += 4;
        return v;
    }

    bool(): boolean {
        return this.#view.getUint8(this.#at++) !== 0;
    }

    string(): string {
        const length = this.#view.getUint16(this.#at);
        this.#at += 2;
        const text = new TextDecoder().decode(this.body.subarray(this.#at, this.#at + length));
        this.#at += length;
        return text;
    }
}
