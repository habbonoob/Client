import type { Container } from 'pixi.js';
import { DisplayObject } from './DisplayObject';

/** A display object that can receive mouse and keyboard input. */
export class InteractiveObject extends DisplayObject {
    /** Whether this object can be the target of mouse events. */
    mouseEnabled = true;
    /** Whether two quick clicks produce a doubleClick event (otherwise two click events). */
    doubleClickEnabled = false;
    tabEnabled = false;
    tabIndex = -1;
    focusRect: any = null;

    constructor(node?: Container) {
        super(node);
    }
}
