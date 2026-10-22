import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ContainerController } from '@/com/sulake/core/window/Classes.group';

export class ShapeController extends ContainerController {
    static { registerClassName(this, 'com.sulake.core.window.components::ShapeController'); }

    public static readonly SHAPE_RECTANGLE: string = "rectangle";
    public static readonly SHAPE_ROUND_RECTANGLE: string = "round_rectangle";
    public static readonly SHAPE_ELLIPSE: string = "ellipse";
    public static readonly SHAPE_RHOMBUS: string = "rhombus";
    public static readonly SHAPES: any[] = ["rectangle", "round_rectangle", "ellipse", "rhombus"];

    declare private _SafeStr_14982: string;

    declare private _radius: number;

    declare private _strokeColor: number;

    declare private _strokeHsvShade: number;

    declare private _strokeThickness: number;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        this._SafeStr_2451 = true;
    }

    public static normalizeShape(param1: string): string {
        return ShapeController.SHAPES.indexOf(param1) >= 0 ? param1 : "rectangle";
    }

    public get shape(): string {
        return this._SafeStr_14982;
    }

    public set shape(param1: string) {
        let _loc2_: string = ShapeController.normalizeShape(param1);
        if (this._SafeStr_14982 != _loc2_) {
            this._SafeStr_14982 = _loc2_;
            this.invalidate();
        }
    }

    public get radius(): number {
        return this._radius;
    }

    public set radius(param1: number) {
        let _loc2_: number = isNaN(param1) ? 0 : Number(Math.max(0, param1));
        if (this._radius != _loc2_) {
            this._radius = _loc2_;
            this.invalidate();
        }
    }

    public get strokeColor(): number {
        return this._strokeColor;
    }

    public set strokeColor(param1: number) {
        if (this._strokeColor != param1) {
            this._strokeColor = param1;
            this.invalidate();
        }
    }

    public get strokeHsvShade(): number {
        return this._strokeHsvShade;
    }

    public set strokeHsvShade(param1: number) {
        let _loc2_: number = isNaN(param1) ? 0 : param1;
        if (this._strokeHsvShade != _loc2_) {
            this._strokeHsvShade = _loc2_;
            this.invalidate();
        }
    }

    public get strokeThickness(): number {
        return this._strokeThickness;
    }

    public set strokeThickness(param1: number) {
        let _loc2_: number = isNaN(param1) ? 0 : Number(Math.max(0, param1));
        if (this._strokeThickness != _loc2_) {
            this._strokeThickness = _loc2_;
            this.invalidate();
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("shape", this._SafeStr_14982));
        _loc1_.push(this.createProperty("radius", this._radius));
        _loc1_.push(this.createProperty("stroke_color", this._strokeColor));
        _loc1_.push(this.createProperty("stroke_hsv_shade", this._strokeHsvShade));
        _loc1_.push(this.createProperty("stroke_thickness", this._strokeThickness));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        let _loc2_: string = null;
        let _loc4_: number = NaN;
        let _loc5_: any = 0;
        let _loc6_: boolean = false;
        for (const _loc3_ of param1 ?? []) {
            switch (_loc3_.key) {
                case "shape":
                    _loc2_ = ShapeController.normalizeShape(String(_loc3_.value));
                    if (this._SafeStr_14982 != _loc2_) {
                        this._SafeStr_14982 = _loc2_;
                        _loc6_ = true;
                    }
                    break;
                case "radius":
                    _loc4_ = Number(_loc3_.value);
                    _loc4_ = isNaN(_loc4_) ? 0 : Number(Math.max(0, _loc4_));
                    if (this._radius != _loc4_) {
                        this._radius = _loc4_;
                        _loc6_ = true;
                    }
                    break;
                case "stroke_color":
                    _loc5_ = _loc3_.value >>> 0;
                    if (this._strokeColor != _loc5_) {
                        this._strokeColor = _loc5_ >>> 0;
                        _loc6_ = true;
                    }
                    break;
                case "stroke_hsv_shade":
                    _loc4_ = Number(_loc3_.value);
                    _loc4_ = isNaN(_loc4_) ? 0 : _loc4_;
                    if (this._strokeHsvShade != _loc4_) {
                        this._strokeHsvShade = _loc4_;
                        _loc6_ = true;
                    }
                    break;
                case "stroke_thickness":
                    _loc4_ = Number(_loc3_.value);
                    _loc4_ = isNaN(_loc4_) ? 0 : Number(Math.max(0, _loc4_));
                    if (this._strokeThickness != _loc4_) {
                        this._strokeThickness = _loc4_;
                        _loc6_ = true;
                    }
            }
        }
        if (_loc6_) {
            this.invalidate();
        }
        super.properties = param1;
    }

    protected override initInstanceFields(): void {
        this._SafeStr_14982 = "rectangle";
        this._radius = 0;
        this._strokeColor = 4278190080;
        this._strokeHsvShade = 0;
        this._strokeThickness = 0;
        super.initInstanceFields();
    }
}
