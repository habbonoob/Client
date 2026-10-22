import { Event } from './Event';

/** FocusEvent */
export class FocusEvent extends Event {
    static readonly FOCUS_IN: string = 'focusIn';
    static readonly FOCUS_OUT: string = 'focusOut';
    static readonly KEY_FOCUS_CHANGE: string = 'keyFocusChange';
    static readonly MOUSE_FOCUS_CHANGE: string = 'mouseFocusChange';

    relatedObject: any;
    shiftKey: boolean;
    keyCode: number;
    direction: string;

    constructor(type: string, bubbles: boolean = true, cancelable: boolean = false, relatedObject: any = null, shiftKey: boolean = false, keyCode: number = 0, direction: string = 'none') {
        super(type, bubbles, cancelable);
        this.relatedObject = relatedObject;
        this.shiftKey = shiftKey;
        this.keyCode = keyCode;
        this.direction = direction;
    }

    override clone(): Event {
        return new FocusEvent(this.type, this.bubbles, this.cancelable, this.relatedObject, this.shiftKey, this.keyCode, this.direction);
    }

    override toString(): string {
        return this.formatToString('FocusEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'relatedObject', 'shiftKey', 'keyCode');
    }
}
