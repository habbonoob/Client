import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { GenericEventQueue } from '@/com/sulake/core/window/utils/GenericEventQueue';

export class MouseEventQueue extends GenericEventQueue {
    static { registerClassName(this, 'com.sulake.core.window.utils::MouseEventQueue'); }

    constructor(param1: IEventDispatcher) {
        super(param1);
        this._mousePosition = new Point();
        this._SafeStr_2546.addEventListener("click", this.mouseEventListener, false);
        this._SafeStr_2546.addEventListener("doubleClick", this.mouseEventListener, false);
        this._SafeStr_2546.addEventListener("mouseDown", this.mouseEventListener, false);
        this._SafeStr_2546.addEventListener("mouseMove", this.mouseEventListener, false);
        this._SafeStr_2546.addEventListener("mouseUp", this.mouseEventListener, false);
        this._SafeStr_2546.addEventListener("mouseWheel", this.mouseEventListener, false);
    }

    declare protected _mousePosition: Point;

    public get mousePosition(): Point {
        return this._mousePosition;
    }

    public override dispose(): void {
        if (!this._disposed) {
            this._SafeStr_2546.removeEventListener("click", this.mouseEventListener, false);
            this._SafeStr_2546.removeEventListener("doubleClick", this.mouseEventListener, false);
            this._SafeStr_2546.removeEventListener("mouseDown", this.mouseEventListener, false);
            this._SafeStr_2546.removeEventListener("mouseMove", this.mouseEventListener, false);
            this._SafeStr_2546.removeEventListener("mouseUp", this.mouseEventListener, false);
            this._SafeStr_2546.removeEventListener("mouseWheel", this.mouseEventListener, false);
            super.dispose();
        }
    }

    private mouseEventListener = (param1: MouseEvent): void => {
        this._mousePosition.x = param1.stageX;
        this._mousePosition.y = param1.stageY;
        this._eventArray.push(param1);
    };
}
