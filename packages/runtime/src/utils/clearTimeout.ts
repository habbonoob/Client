import { stopTimer } from '@habbo-pixi/runtime/runtime/clock';

/** clearTimeout */
export function clearTimeout(id: number): void {
    stopTimer(id);
}
