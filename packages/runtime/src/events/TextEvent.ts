import { Event } from './Event';

/** TextEvent */
export class TextEvent extends Event {
    static readonly LINK: string = 'link';
    static readonly TEXT_INPUT: string = 'textInput';

    text: string;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, text: string = '') {
        super(type, bubbles, cancelable);
        this.text = text;
    }

    override clone(): Event {
        return new TextEvent(this.type, this.bubbles, this.cancelable, this.text);
    }

    override toString(): string {
        return this.formatToString('TextEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'text');
    }
}
