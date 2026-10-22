/** Whole milliseconds since the runtime started. */
export function getTimer(): number {
    return Math.floor(performance.now());
}
