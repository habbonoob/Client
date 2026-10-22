import { requestRedraw } from '@habbo-pixi/runtime/display/renderHooks';
import { Event } from './Event';

/** TimerEvent */
export class TimerEvent extends Event {
    static readonly TIMER: string = 'timer';
    static readonly TIMER_COMPLETE: string = 'timerComplete';

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }

    /** Request a redraw after the handler; the renderer already redraws every frame, so there is nothing to do. */
    /** Show what the handler changed on the next screen refresh rather than the next frame. */
    updateAfterEvent(): void {
        requestRedraw();
    }

    override clone(): Event {
        return new TimerEvent(this.type, this.bubbles, this.cancelable);
    }

    override toString(): string {
        return this.formatToString('TimerEvent', 'type', 'bubbles', 'cancelable', 'eventPhase');
    }
}
