import { stopTimer } from '@habbo-pixi/runtime/runtime/clock';

/** clearInterval */
export function clearInterval(id: number): void {
    stopTimer(id);
}
