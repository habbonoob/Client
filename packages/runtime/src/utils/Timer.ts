import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { startTimer, stopTimer } from '@habbo-pixi/runtime/runtime/clock';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';

/**
 * Dispatches TimerEvent.TIMER every `delay` ms, `repeatCount` times (0 = forever),
 * then TimerEvent.TIMER_COMPLETE. Changing `delay` while running restarts the interval. Kept on
 * time in a hidden page (runtime/clock.ts).
 */
export class Timer extends EventDispatcher {
    #delay: number;
    #repeatCount: number;
    #currentCount = 0;
    #handle: number | null = null;

    constructor(delay: number, repeatCount: number = 0) {
        super();
        Timer.#check(delay, repeatCount);
        this.#delay = delay;
        this.#repeatCount = repeatCount | 0;
    }

    get delay(): number {
        return this.#delay;
    }

    set delay(value: number) {
        Timer.#check(value, this.#repeatCount);
        this.#delay = value;
        if (this.running) {
            this.#clear();
            this.#schedule();
        }
    }

    get repeatCount(): number {
        return this.#repeatCount;
    }

    /** Lowering it to the current count or below stops the timer. */
    set repeatCount(value: number) {
        this.#repeatCount = value | 0;
        if (this.running && this.#repeatCount > 0 && this.#currentCount >= this.#repeatCount) this.stop();
    }

    get currentCount(): number {
        return this.#currentCount;
    }

    get running(): boolean {
        return this.#handle !== null;
    }

    start(): void {
        if (!this.running) this.#schedule();
    }

    /** Stops without resetting currentCount. */
    stop(): void {
        this.#clear();
    }

    /** Stops and sets currentCount back to 0. */
    reset(): void {
        this.#clear();
        this.#currentCount = 0;
    }

    #schedule(): void {
        this.#handle = startTimer(this.#delay, true, () => runGuarded(() => this.#tick()));
    }

    #clear(): void {
        if (this.#handle !== null) stopTimer(this.#handle);
        this.#handle = null;
    }

    #tick(): void {
        this.#currentCount++;
        const complete = this.#repeatCount > 0 && this.#currentCount >= this.#repeatCount;
        if (complete) this.#clear();
        this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
        if (complete) this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE));
    }

    static #check(delay: number, repeatCount: number): void {
        if (!(delay >= 0) || !Number.isFinite(delay) || repeatCount < 0) {
            throw new RangeError('The Timer delay specified is out of range.');
        }
    }

    override toString(): string {
        return '[object Timer]';
    }
}
