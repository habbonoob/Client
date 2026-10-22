/** A state of the open layout: its XML, and which element was selected (its index in tree order). */
export interface Snapshot {
    readonly text: string;
    readonly selected: number | null;
}

/** How many steps back undo goes. */
const LIMIT = 300;

/** Undo and redo for the open layout: the states it has been in, each change recorded after it is made. */
export class History {
    #past: Snapshot[] = [];
    #future: Snapshot[] = [];
    #current: Snapshot | null = null;

    /** A layout was opened (or replaced from outside, e.g. reverted): it starts its history. */
    reset(state: Snapshot): void {
        this.#past = [];
        this.#future = [];
        this.#current = state;
    }

    /** A change was made: `state` is the layout after it. */
    record(state: Snapshot): void {
        if (this.#current?.text === state.text) {
            this.#current = state;
            return;
        }
        if (this.#current) this.#past.push(this.#current);
        if (this.#past.length > LIMIT) this.#past.shift();
        this.#future = [];
        this.#current = state;
    }

    /** The state before the last change, which becomes the current one; null when there is none. */
    undo(): Snapshot | null {
        const previous = this.#past.pop();
        if (!previous) return null;
        this.#future.push(this.#current!);
        this.#current = previous;
        return previous;
    }

    redo(): Snapshot | null {
        const next = this.#future.pop();
        if (!next) return null;
        this.#past.push(this.#current!);
        this.#current = next;
        return next;
    }

    get canUndo(): boolean {
        return this.#past.length > 0;
    }

    get canRedo(): boolean {
        return this.#future.length > 0;
    }
}
