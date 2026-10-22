import { startTimer } from '@habbo-pixi/runtime/runtime/clock';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';

/** Call `closure(...args)` once after `delay` ms; returns an id for clearTimeout. (Kept on time in a hidden page: runtime/clock.ts.) */
export function setTimeout(closure: (...args: any[]) => void, delay: number, ...args: any[]): number {
    return startTimer(delay, false, () => runGuarded(() => closure(...args)));
}
