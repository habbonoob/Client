import { startTimer } from '@habbo-pixi/runtime/runtime/clock';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';

/** Call `closure(...args)` every `delay` ms; returns an id for clearInterval. (Kept on time in a hidden page: runtime/clock.ts.) */
export function setInterval(closure: (...args: any[]) => void, delay: number, ...args: any[]): number {
    return startTimer(delay, true, () => runGuarded(() => closure(...args)));
}
