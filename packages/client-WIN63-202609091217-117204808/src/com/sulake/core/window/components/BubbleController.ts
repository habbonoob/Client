import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { FrameController } from '@/com/sulake/core/window/Classes.group';
import { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';

export class BubbleController extends FrameController implements IBubbleWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::BubbleController'); }

    private static readonly TAG_POINTER_UP_ELEMENT: string = "_POINTER_UP";
    private static readonly TAG_POINTER_DOWN_ELEMENT: string = "_POINTER_DOWN";
    private static readonly TAG_POINTER_LEFT_ELEMENT: string = "_POINTER_LEFT";
    private static readonly TAG_POINTER_RIGHT_ELEMENT: string = "_POINTER_RIGHT";

    declare private _direction: string;

    declare private _pointerOffset: number;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public get direction(): string {
        return this._direction;
    }

    public set direction(param1: string) {
        let _loc2_: IWindow = null;
        if (param1 != this._direction) {
            _loc2_ = this.getChildByName(param1);
            if (!_loc2_) {
                throw new Error("Invalid pointer direction: \"" + param1 + "\"!");
            }
            this.getChildByName(this._direction).visible = false;
            _loc2_.visible = true;
            this._direction = param1;
            this.pointerOffset = this._pointerOffset;
        }
    }

    public get pointerOffset(): number {
        return this._pointerOffset;
    }

    public set pointerOffset(param1: number) {
        let _loc2_: IWindow = this.getChildByName(this._direction);
        if (!_loc2_) {
            throw new Error("Invalid pointer direction: \"" + this._direction + "\"!");
        }
        if (this._direction == "up" || this._direction == "down") {
            _loc2_.x = this.width / 2 + param1 | 0;
        } else {
            _loc2_.y = this.height / 2 + param1 | 0;
        }
        this._pointerOffset = param1;
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: boolean = super.update(param1, param2);
        if (this._pointerOffset != 0) {
            if (param1 == this) {
                if (param2.type == "WE_RESIZED") {
                    this.pointerOffset = this._pointerOffset;
                }
            }
        }
        return _loc3_;
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("direction", this._direction));
        _loc1_.push(this.createProperty("pointer_offset", this._pointerOffset));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "direction":
                    this.direction = typeof _loc2_.value === "string" ? _loc2_.value : null;
                    break;
                case "pointer_offset":
                    this.pointerOffset = typeof _loc2_.value === "number" && (_loc2_.value | 0) === _loc2_.value ? _loc2_.value : null;
            }
        }
        super.properties = param1;
    }

    protected override initInstanceFields(): void {
        this._direction = "down";
        this._pointerOffset = 0;
        super.initInstanceFields();
    }

    get [IBubbleWindow](): true {
        return true;
    }
}
