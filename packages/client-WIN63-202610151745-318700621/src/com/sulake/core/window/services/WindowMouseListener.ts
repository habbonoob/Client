import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IMouseListenerService } from '@/com/sulake/core/window/services/IMouseListenerService';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { WindowMouseOperator } from '@/com/sulake/core/window/Classes.group';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';

export class WindowMouseListener extends WindowMouseOperator implements IMouseListenerService {
    static { registerClassName(this, 'com.sulake.core.window.services::WindowMouseListener'); }

    private _eventTypes: any[] = [];
    private _areaLimit: number = 0;

    constructor(param1: DisplayObject) {
        super(param1);
    }

    public get eventTypes(): any[] {
        return this._eventTypes;
    }

    public get areaLimit(): number {
        return this._areaLimit;
    }

    public set areaLimit(param1: number) {
        this._areaLimit = param1;
    }

    public override end(param1: IWindow): IWindow {
        let _loc2_: number = 0;
        _loc2_ = this._eventTypes.length | 0;
        while (_loc2_ > 0) {
            this._eventTypes.pop();
            _loc2_--;
        }
        return super.end(param1);
    }

    protected override handler(param1: Event): void {
        let _loc2_: boolean = false;
        if (this._working && !this._window.disposed) {
            if (this._eventTypes.indexOf(param1.type) >= 0) {
                if (param1 instanceof WindowMouseEvent) {
                    _loc2_ = this._window.hitTestGlobalPoint(new Point(castTo(param1, WindowMouseEvent).stageX, castTo(param1, WindowMouseEvent).stageY));
                    if (this._areaLimit == 1 && !_loc2_) {
                        return;
                    }
                    if (this._areaLimit == 3 && _loc2_) {
                        return;
                    }
                }
                this._window.update(null, castTo(param1, WindowMouseEvent));
            }
        }
    }

    public override operate(param1: number, param2: number): void {
    }
}
