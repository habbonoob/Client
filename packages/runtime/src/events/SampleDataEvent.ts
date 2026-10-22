import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Event } from './Event';

/** A sound asks for more generated audio: write samples into `data`, starting at sample `position`. */
export class SampleDataEvent extends Event {
    static readonly SAMPLE_DATA: string = 'sampleData';

    position: number;
    data: ByteArray | null;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, theposition: number = 0, thedata: ByteArray = null) {
        super(type, bubbles, cancelable);
        this.position = theposition;
        this.data = thedata;
    }

    override clone(): Event {
        return new SampleDataEvent(this.type, this.bubbles, this.cancelable, this.position, this.data);
    }
}
