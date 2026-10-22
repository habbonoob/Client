import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { PropertyStruct } from '@/com/sulake/core/window/utils/PropertyStruct';

export class GradientController extends WindowController {
    static { registerClassName(this, 'com.sulake.core.window.components::GradientController'); }

    public static readonly MODE_LINEAR: string = "linear";
    public static readonly MODE_RADIAL: string = "radial";
    public static readonly _SafeStr_15091: string = "up_left";
    public static readonly DIRECTION_UP_RIGHT: string = "up_right";
    public static readonly _SafeStr_15092: string = "down_left";
    public static readonly DIRECTION_DOWN_RIGHT: string = "down_right";
    private static readonly DEFAULT_COLOR1: number = 4294967295;
    private static readonly DEFAULT_COLOR2: number = 4278190080;
    private static readonly DEFAULT_MODE: string = "linear";
    private static readonly DEFAULT_DIRECTION: string = "down";
    public static readonly MODES: any[] = ["linear", "radial"];
    public static readonly _SafeStr_3917: any[] = ["up", "down", "left", "right", "up_left", "up_right", "down_left", "down_right"];

    declare private _color1: number;

    declare private _color2: number;

    declare private _mode: string;

    declare private _direction: string;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public static normalizeMode(param1: string): string {
        return param1 == "radial" ? "radial" : "linear";
    }

    public static normalizeDirection(param1: string): string {
        return GradientController._SafeStr_3917.indexOf(param1) >= 0 ? param1 : "down";
    }

    public get color1(): number {
        return this._color1;
    }

    public set color1(param1: number) {
        if (this._color1 != param1) {
            this._color1 = param1;
            this.invalidate();
        }
    }

    public get color2(): number {
        return this._color2;
    }

    public set color2(param1: number) {
        if (this._color2 != param1) {
            this._color2 = param1;
            this.invalidate();
        }
    }

    public get mode(): string {
        return this._mode;
    }

    public set mode(param1: string) {
        let _loc2_: string = GradientController.normalizeMode(param1);
        if (this._mode != _loc2_) {
            this._mode = _loc2_;
            this.invalidate();
        }
    }

    public get direction(): string {
        return this._direction;
    }

    public set direction(param1: string) {
        let _loc2_: string = GradientController.normalizeDirection(param1);
        if (this._direction != _loc2_) {
            this._direction = _loc2_;
            this.invalidate();
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("color1", this._color1));
        _loc1_.push(this.createProperty("color2", this._color2));
        _loc1_.push(this.createProperty("mode", this._mode));
        _loc1_.push(new PropertyStruct("direction", this._direction, "String", this._direction != "down", GradientController._SafeStr_3917));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        let _loc3_: string = null;
        let _loc4_: boolean = false;
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "color1":
                    if (this._color1 != _loc2_.value >>> 0) {
                        this._color1 = _loc2_.value >>> 0;
                        _loc4_ = true;
                    }
                    break;
                case "color2":
                    if (this._color2 != _loc2_.value >>> 0) {
                        this._color2 = _loc2_.value >>> 0;
                        _loc4_ = true;
                    }
                    break;
                case "mode":
                    _loc3_ = GradientController.normalizeMode(String(_loc2_.value));
                    if (this._mode != _loc3_) {
                        this._mode = _loc3_;
                        _loc4_ = true;
                    }
                    break;
                case "direction":
                    _loc3_ = GradientController.normalizeDirection(String(_loc2_.value));
                    if (this._direction != _loc3_) {
                        this._direction = _loc3_;
                        _loc4_ = true;
                    }
            }
        }
        if (_loc4_) {
            this.invalidate();
        }
        super.properties = param1;
    }

    protected override initInstanceFields(): void {
        this._color1 = 4294967295;
        this._color2 = 4278190080;
        this._mode = "linear";
        this._direction = "down";
        super.initInstanceFields();
    }
}
