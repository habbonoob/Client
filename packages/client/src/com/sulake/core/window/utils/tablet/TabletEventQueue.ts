import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { GenericEventQueue } from '@/com/sulake/core/window/utils/GenericEventQueue';

export class TabletEventQueue extends GenericEventQueue {
    static { registerClassName(this, 'com.sulake.core.window.utils.tablet::TabletEventQueue'); }

    constructor(param1: IEventDispatcher) {
        super(param1);
        this._touchPosition = new Point();
    }

    declare protected _touchPosition: Point;

    public get touchPosition(): Point {
        return this._touchPosition;
    }

    public override dispose(): void {
        if (!this._disposed) {
            super.dispose();
        }
    }
}
