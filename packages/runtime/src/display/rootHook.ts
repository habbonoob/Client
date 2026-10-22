// The application's root object is on the stage while its own constructor runs. Stage.createRoot
// sets the stage here; the DisplayObject constructor takes it and has the stage adopt the new object
// (without added/addedToStage events: it was never off the stage). No imports, so neither side
// creates an import cycle.

type Adopt = (stage: unknown, child: unknown) => void;

let pending: unknown = null;
let claimed: ((root: unknown) => void) | null = null;
let adopt: Adopt | null = null;

export const rootHook = {
    /** The next display object created becomes the root on `stage`; `onClaim` hears of it first. */
    offer(stage: unknown, onClaim: ((root: unknown) => void) | null = null): void {
        pending = stage;
        claimed = onClaim;
    },

    /** Called by DisplayObject's constructor: attach `obj` to the stage on offer, if any. */
    claim(obj: unknown): void {
        const stage = pending, onClaim = claimed;
        pending = claimed = null;
        if (!stage) return;
        onClaim?.(obj);
        adopt?.(stage, obj);
    },

    /** DisplayObjectContainer supplies how a container adopts a child silently. */
    setAdopter(fn: Adopt): void {
        adopt = fn;
    },

    clear(): void {
        pending = claimed = null;
    },
};
