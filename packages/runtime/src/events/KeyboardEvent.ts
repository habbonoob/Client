import { requestRedraw } from '@habbo-pixi/runtime/display/renderHooks';
import { Event } from './Event';

/** KeyboardEvent */
export class KeyboardEvent extends Event {
    static readonly KEY_DOWN: string = 'keyDown';
    static readonly KEY_UP: string = 'keyUp';

    charCode: number;
    keyCode: number;
    keyLocation: number;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    controlKey: boolean;
    commandKey: boolean;

    constructor(
        type: string, bubbles: boolean = true, cancelable: boolean = false, charCodeValue: number = 0, keyCodeValue: number = 0,
        keyLocationValue: number = 0, ctrlKeyValue: boolean = false, altKeyValue: boolean = false, shiftKeyValue: boolean = false,
        controlKeyValue: boolean = false, commandKeyValue: boolean = false,
    ) {
        super(type, bubbles, cancelable);
        this.charCode = charCodeValue;
        this.keyCode = keyCodeValue;
        this.keyLocation = keyLocationValue;
        this.ctrlKey = ctrlKeyValue;
        this.altKey = altKeyValue;
        this.shiftKey = shiftKeyValue;
        this.controlKey = controlKeyValue;
        this.commandKey = commandKeyValue;
    }

    /** Request a redraw after the handler; the renderer already redraws every frame, so there is nothing to do. */
    /** Show what the handler changed on the next screen refresh rather than the next frame. */
    updateAfterEvent(): void {
        requestRedraw();
    }

    override clone(): Event {
        return new KeyboardEvent(this.type, this.bubbles, this.cancelable, this.charCode, this.keyCode, this.keyLocation,
            this.ctrlKey, this.altKey, this.shiftKey, this.controlKey, this.commandKey);
    }

    override toString(): string {
        return this.formatToString('KeyboardEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'charCode', 'keyCode', 'keyLocation', 'ctrlKey', 'altKey', 'shiftKey');
    }
}
