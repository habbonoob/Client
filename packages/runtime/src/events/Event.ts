/** Internal to the events package: how EventDispatcher moves an event through its phases. */
export let eventState: {
    begin(e: Event, target: object): void;
    at(e: Event, currentTarget: object, phase: number): void;
    stopLevel(e: Event): number;
    end(e: Event): void;
};

/**
 * The base event. `target`, `currentTarget` and `eventPhase` are set by the
 * dispatcher (see EventDispatcher) and are read-only to everyone else.
 */
export class Event {
    static readonly ACTIVATE: string = 'activate';
    static readonly ADDED: string = 'added';
    static readonly ADDED_TO_STAGE: string = 'addedToStage';
    static readonly CANCEL: string = 'cancel';
    static readonly CHANGE: string = 'change';
    static readonly CLEAR: string = 'clear';
    static readonly CLOSE: string = 'close';
    static readonly CLOSING: string = 'closing';
    static readonly COMPLETE: string = 'complete';
    static readonly CONNECT: string = 'connect';
    static readonly COPY: string = 'copy';
    static readonly CUT: string = 'cut';
    static readonly DEACTIVATE: string = 'deactivate';
    static readonly DISPLAYING: string = 'displaying';
    static readonly ENTER_FRAME: string = 'enterFrame';
    static readonly EXIT_FRAME: string = 'exitFrame';
    static readonly EXITING: string = 'exiting';
    static readonly FRAME_CONSTRUCTED: string = 'frameConstructed';
    static readonly FULLSCREEN: string = 'fullScreen';
    static readonly INIT: string = 'init';
    static readonly MOUSE_LEAVE: string = 'mouseLeave';
    static readonly NETWORK_CHANGE: string = 'networkChange';
    static readonly OPEN: string = 'open';
    static readonly PASTE: string = 'paste';
    static readonly REMOVED: string = 'removed';
    static readonly REMOVED_FROM_STAGE: string = 'removedFromStage';
    static readonly RENDER: string = 'render';
    static readonly RESIZE: string = 'resize';
    static readonly SCROLL: string = 'scroll';
    static readonly SELECT: string = 'select';
    static readonly SELECT_ALL: string = 'selectAll';
    static readonly SOUND_COMPLETE: string = 'soundComplete';
    static readonly TAB_CHILDREN_CHANGE: string = 'tabChildrenChange';
    static readonly TAB_ENABLED_CHANGE: string = 'tabEnabledChange';
    static readonly TAB_INDEX_CHANGE: string = 'tabIndexChange';
    static readonly UNLOAD: string = 'unload';
    static readonly USER_IDLE: string = 'userIdle';
    static readonly USER_PRESENT: string = 'userPresent';

    readonly #type: string;
    readonly #bubbles: boolean;
    readonly #cancelable: boolean;
    #target: object | null = null;
    #currentTarget: object | null = null;
    #eventPhase = 0;
    #defaultPrevented = false;
    #stop = 0;   // 1: stopPropagation, 2: stopImmediatePropagation

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        this.#type = type;
        this.#bubbles = bubbles;
        this.#cancelable = cancelable;
    }

    get type(): string {
        return this.#type;
    }

    get bubbles(): boolean {
        return this.#bubbles;
    }

    get cancelable(): boolean {
        return this.#cancelable;
    }

    get target(): any {
        return this.#target;
    }

    get currentTarget(): any {
        return this.#currentTarget;
    }

    /** EventPhase.CAPTURING_PHASE (1), AT_TARGET (2) or BUBBLING_PHASE (3); 0 when not being dispatched. */
    get eventPhase(): number {
        return this.#eventPhase;
    }

    /** A copy for re-dispatching; subclasses with extra state override this. */
    clone(): Event {
        return new Event(this.#type, this.#bubbles, this.#cancelable);
    }

    /** Stop the event reaching further nodes; the current node's remaining listeners still run. */
    stopPropagation(): void {
        if (this.#stop < 1) this.#stop = 1;
    }

    /** Stop the event immediately, including the current node's remaining listeners. */
    stopImmediatePropagation(): void {
        this.#stop = 2;
    }

    /** Cancel the default behaviour; only has an effect on cancelable events. */
    preventDefault(): void {
        if (this.#cancelable) this.#defaultPrevented = true;
    }

    isDefaultPrevented(): boolean {
        return this.#defaultPrevented;
    }

    /** `[ClassName prop=value …]`, with string values quoted. */
    formatToString(className: string, ...args: string[]): string {
        const parts = args.map(name => {
            const value = (this as unknown as Record<string, unknown>)[name];
            return `${name}=${typeof value === 'string' ? `"${value}"` : String(value)}`;
        });
        return `[${[className, ...parts].join(' ')}]`;
    }

    toString(): string {
        return this.formatToString('Event', 'type', 'bubbles', 'cancelable', 'eventPhase');
    }

    // ---- dispatcher access (EventDispatcher lives in the same package) ----

    static {
        eventState = {
            begin: (e, target) => { e.#target = target; e.#stop = 0; },
            at: (e, currentTarget, phase) => { e.#currentTarget = currentTarget; e.#eventPhase = phase; },
            stopLevel: e => e.#stop,
            end: e => { e.#currentTarget = null; e.#eventPhase = 0; },
        };
    }
}
