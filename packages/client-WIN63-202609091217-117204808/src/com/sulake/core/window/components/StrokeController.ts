import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';

export class StrokeController extends WindowController {
    static { registerClassName(this, 'com.sulake.core.window.components::StrokeController'); }

    public static readonly SIDE_TOP: number = 1;
    public static readonly SIDE_RIGHT: number = 2;
    public static readonly SIDE_BOTTOM: number = 4;
    public static readonly SIDE_LEFT: number = 8;
    public static readonly SIDES_ALL: string = "all";
    private static readonly SIDE_MASK_ALL: number = 15;
    public static readonly SIDE_NAMES: any[] = ["top", "right", "bottom", "left"];

    declare private _radius: number;

    declare private _strokeThickness: number;

    declare private _sides: string;

    declare private _SafeStr_14041: number;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public static sidesFromString(param1: string): number {
        if (param1 == null) {
            return 15;
        }
        let _loc2_: string = StrokeController.trim(param1).toLowerCase();
        if (_loc2_ == "" || _loc2_ == "all") {
            return 15;
        }
        let _loc4_: number = 0;
        let _loc3_: any[] = _loc2_.split(",");
        for (const _loc5_ of _loc3_ ?? []) {
            switch (StrokeController.trim(stringOrNull(_loc5_))) {
                case "all":
                    return 15;
                case "top":
                    _loc4_ |= 1;
                    break;
                case "right":
                    _loc4_ |= 2;
                    break;
                case "bottom":
                    _loc4_ |= 4;
                    break;
                case "left":
                    _loc4_ |= 8;
            }
        }
        return (_loc4_ == 0 ? 15 : _loc4_) >>> 0;
    }

    private static clampNumber(param1: number): number {
        return isNaN(param1) ? 0 : Math.max(0, param1);
    }

    private static normalizeSideMask(param1: number): number {
        let _loc2_: number = (param1 & 0x0F) >>> 0;
        return (_loc2_ == 0 ? 15 : _loc2_) >>> 0;
    }

    private static sidesToString(param1: number): string {
        param1 = StrokeController.normalizeSideMask(param1);
        if (param1 == 15) {
            return "all";
        }
        let _loc2_: any[] = [];
        if ((param1 & 1) != 0) {
            _loc2_.push(StrokeController.SIDE_NAMES[0]);
        }
        if ((param1 & 2) != 0) {
            _loc2_.push(StrokeController.SIDE_NAMES[1]);
        }
        if ((param1 & 4) != 0) {
            _loc2_.push(StrokeController.SIDE_NAMES[2]);
        }
        if ((param1 & 8) != 0) {
            _loc2_.push(StrokeController.SIDE_NAMES[3]);
        }
        return _loc2_.join(",");
    }

    private static trim(param1: string): string {
        return param1 == null ? "" : param1.replace(/^\s+|\s+$/g, "");
    }

    public get radius(): number {
        return this._radius;
    }

    public set radius(param1: number) {
        let _loc2_: number = StrokeController.clampNumber(param1);
        if (this._radius != _loc2_) {
            this._radius = _loc2_;
            this.invalidate();
        }
    }

    public get strokeThickness(): number {
        return this._strokeThickness;
    }

    public set strokeThickness(param1: number) {
        let _loc2_: number = StrokeController.clampNumber(param1);
        if (this._strokeThickness != _loc2_) {
            this._strokeThickness = _loc2_;
            this.invalidate();
        }
    }

    public get sides(): string {
        return this._sides;
    }

    public set sides(param1: string) {
        this.setSidesMask(StrokeController.sidesFromString(param1));
    }

    public get sideMask(): number {
        return this._SafeStr_14041;
    }

    public set sideMask(param1: number) {
        this.setSidesMask(StrokeController.normalizeSideMask(param1));
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("radius", this._radius));
        _loc1_.push(this.createProperty("stroke_thickness", this._strokeThickness));
        _loc1_.push(this.createProperty("sides", this._sides));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        let _loc4_: number = NaN;
        let _loc2_: any = 0;
        let _loc5_: boolean = false;
        for (const _loc3_ of param1 ?? []) {
            switch (_loc3_.key) {
                case "radius":
                    _loc4_ = StrokeController.clampNumber(Number(_loc3_.value));
                    if (this._radius != _loc4_) {
                        this._radius = _loc4_;
                        _loc5_ = true;
                    }
                    break;
                case "stroke_thickness":
                    _loc4_ = StrokeController.clampNumber(Number(_loc3_.value));
                    if (this._strokeThickness != _loc4_) {
                        this._strokeThickness = _loc4_;
                        _loc5_ = true;
                    }
                    break;
                case "sides":
                    _loc2_ = StrokeController.sidesFromString(String(_loc3_.value));
                    if (this.updateSides(_loc2_ >>> 0)) {
                        _loc5_ = true;
                    }
            }
        }
        if (_loc5_) {
            this.invalidate();
        }
        super.properties = param1;
    }

    private setSidesMask(param1: number): void {
        if (this.updateSides(param1)) {
            this.invalidate();
        }
    }

    private updateSides(param1: number): boolean {
        param1 = StrokeController.normalizeSideMask(param1);
        let _loc2_: string = StrokeController.sidesToString(param1);
        if (this._SafeStr_14041 != param1 || this._sides != _loc2_) {
            this._SafeStr_14041 = param1;
            this._sides = _loc2_;
            return true;
        }
        return false;
    }

    protected override initInstanceFields(): void {
        this._radius = 0;
        this._strokeThickness = 0;
        this._sides = "all";
        this._SafeStr_14041 = 15;
        super.initInstanceFields();
    }
}
