import type { IncomingPacket } from '@habbo-pixi/runtime/net/packetTaps';
import type { RoomCopyVariable, RoomCopyWired } from './RoomCopy';

/** The dialogs the hotel answers with when a wired box is opened, by the client's event names. */
const DIALOGS = new Set([
    'WiredFurniTriggerEvent', 'WiredFurniActionEvent', 'WiredFurniConditionEvent',
    'WiredFurniSelectorEvent', 'WiredFurniAddonEvent', 'WiredFurniVariableEvent',
]);

/** The answer to a request for the room's variables, in chunks, the last one flagged. */
const VARIABLES = 'WiredAllVariablesDiffsEvent';

/**
 * Reads wired boxes' settings from the dialogs the hotel answers with when a box is opened: the copier asks for each
 * box in turn and takes the answer it waits for, which the client then never acts on (no dialog opens). What a box
 * holds is read from the client's own parse of it (the dialog parser's def: its Triggerable and the kind's
 * definition), so the layout is always the client release's.
 */
export class WiredReader {
    readonly #waiting = new Map<number, (wired: RoomCopyWired) => void>();
    #variablesWaiting: ((variables: RoomCopyVariable[]) => void) | null = null;
    #variables: RoomCopyVariable[] = [];

    /** The settings of the box with this id, when its dialog comes within the time given; null otherwise. */
    expect(itemId: number, withinMs: number): Promise<RoomCopyWired | null> {
        return new Promise(resolve => {
            const timer = setTimeout(() => {
                this.#waiting.delete(itemId);
                resolve(null);
            }, withinMs);
            this.#waiting.set(itemId, wired => {
                clearTimeout(timer);
                this.#waiting.delete(itemId);
                resolve(wired);
            });
        });
    }

    /** The room's variables, when the list asked for comes within the time given; null otherwise. */
    expectVariables(withinMs: number): Promise<RoomCopyVariable[] | null> {
        this.#variables = [];
        return new Promise(resolve => {
            const timer = setTimeout(() => {
                this.#variablesWaiting = null;
                resolve(null);
            }, withinMs);
            this.#variablesWaiting = variables => {
                clearTimeout(timer);
                this.#variablesWaiting = null;
                resolve(variables);
            };
        });
    }

    /** Whether the packet is the dialog of a box being waited for, which is then taken: the client never sees it.
     * The variables are read but left to the client: it may have asked for them itself, and a full list only
     * refreshes what it holds. */
    take(packet: IncomingPacket): boolean {
        if (packet.name === VARIABLES) {
            this.#readVariables(packet.parser);
            return false;
        }
        if (!DIALOGS.has(packet.name) || this.#waiting.size === 0) return false;
        const def = (packet.parser as any)?.def;
        const answer = def ? this.#waiting.get(def.id) : undefined;
        if (!answer) return false;
        answer(wired(packet.name, def));
        return true;
    }

    #readVariables(p: any): void {
        if (!this.#variablesWaiting || !p) return;
        // addedOrUpdated holds each variable (a WiredVariable) by its hash
        for (const v of p.addedOrUpdated?.keys() ?? []) {
            this.#variables.push({ Id: String(v.variableId), Kind: v.variableType, Name: String(v.variableName), Target: v.variableTarget });
        }
        if (p.isLastChunk) this.#variablesWaiting([...this.#variables]);
    }
}

/** A box's settings from the client's definition of it. The second furni list has no getter: its field is read. */
function wired(dialog: string, def: any): RoomCopyWired {
    const ints = (list: unknown): number[] => [...((list as unknown[]) ?? [])].map(Number);
    return {
        StuffIds: ints(def.stuffIds),
        StuffIds2: ints(def._stuffIds2),
        StringParam: String(def.stringParam ?? ''),
        IntParams: ints(def.intParams),
        VariableIds: [...(def.variableIds ?? [])].map(String),
        FurniSources: ints(def.furniSourceTypes),
        UserSources: ints(def.userSourceTypes),
        DelayInPulses: dialog === 'WiredFurniActionEvent' ? def.delayInPulses ?? 0 : 0,
        Quantifier: dialog === 'WiredFurniConditionEvent' ? def.quantifierCode ?? 0 : 0,
        IsFilter: dialog === 'WiredFurniSelectorEvent' ? !!def.isFilter : false,
        IsInvert: dialog === 'WiredFurniConditionEvent' || dialog === 'WiredFurniSelectorEvent' ? !!def.isInvert : false,
    };
}
