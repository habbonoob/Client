import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IPropertyMap } from '@/com/sulake/core/window/theme/IPropertyMap';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { StaticBitmapWrapperController } from '@/com/sulake/core/window/Classes.group';

const preSuperBitmapFillController: ((self: BitmapFillController) => void)[] = [];

export class BitmapFillController extends StaticBitmapWrapperController {
    static { registerClassName(this, 'com.sulake.core.window.components::BitmapFillController'); }

    public static readonly FILL_MODE_STRETCH: string = "stretch";
    public static readonly FILL_MODE_TILE: string = "tile";
    public static readonly FILL_MODE_CENTER: string = "center";
    public static readonly FILL_MODE_COVER: string = "cover";
    public static readonly FILL_MODE_CONTAIN: string = "contain";
    public static readonly FILL_MODES: any[] = ["stretch", "tile", "center", "cover", "contain"];

    declare private _fillMode: string;

    declare private _tint: boolean;

    declare private _spacing: number;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        let _loc12_: IPropertyMap;
        _loc12_ = param5.getWindowFactory().getThemeManager().getPropertyDefaults(param3);
        preSuperBitmapFillController.push((self: BitmapFillController) => {
            self._fillMode = BitmapFillController.normalizeFillMode(String(_loc12_._SafeStr_2119("fill_mode").value));
            self._tint = BitmapFillController.parseBoolean(_loc12_._SafeStr_2119("tint").value);
            self._spacing = BitmapFillController.normalizeSpacing(Number(_loc12_._SafeStr_2119("spacing").value));
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public static normalizeFillMode(param1: string): string {
        return BitmapFillController.FILL_MODES.indexOf(param1) >= 0 ? param1 : "stretch";
    }

    public static normalizeSpacing(param1: number): number {
        return isNaN(param1) ? 0 : Number(Math.max(0, param1));
    }

    private static parseBoolean(param1: any): boolean {
        let _loc2_: string = null;
        if (typeof param1 === "boolean") {
            return Boolean(param1);
        }
        if (typeof param1 === "string") {
            _loc2_ = String(param1).replace(/^\s+|\s+$/g, "").toLowerCase();
            return _loc2_ == "true" || _loc2_ == "1";
        }
        return Boolean(param1);
    }

    public get fillMode(): string {
        return this._fillMode;
    }

    public set fillMode(param1: string) {
        let _loc2_: string = BitmapFillController.normalizeFillMode(param1);
        if (this._fillMode != _loc2_) {
            this._fillMode = _loc2_;
            this.invalidate();
        }
    }

    public get tint(): boolean {
        return this._tint;
    }

    public set tint(param1: boolean) {
        if (this._tint != param1) {
            this._tint = param1;
            this.invalidate();
        }
    }

    public get spacing(): number {
        return this._spacing;
    }

    public set spacing(param1: number) {
        let _loc2_: number = BitmapFillController.normalizeSpacing(param1);
        if (this._spacing != _loc2_) {
            this._spacing = _loc2_;
            this.invalidate();
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("fill_mode", this._fillMode));
        _loc1_.push(this.createProperty("tint", this._tint));
        _loc1_.push(this.createProperty("spacing", this._spacing));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        let _loc2_: string = null;
        let _loc4_: boolean = false;
        let _loc5_: number = NaN;
        let _loc6_: boolean = false;
        for (const _loc3_ of param1 ?? []) {
            switch (_loc3_.key) {
                case "fill_mode":
                    _loc2_ = BitmapFillController.normalizeFillMode(String(_loc3_.value));
                    if (this._fillMode != _loc2_) {
                        this._fillMode = _loc2_;
                        _loc6_ = true;
                    }
                    break;
                case "tint":
                    _loc4_ = BitmapFillController.parseBoolean(_loc3_.value);
                    if (this._tint != _loc4_) {
                        this._tint = _loc4_;
                        _loc6_ = true;
                    }
                    break;
                case "spacing":
                    _loc5_ = BitmapFillController.normalizeSpacing(Number(_loc3_.value));
                    if (this._spacing != _loc5_) {
                        this._spacing = _loc5_;
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
        this._fillMode = "stretch";
        this._tint = false;
        this._spacing = 0;
        preSuperBitmapFillController.pop()!(this);
        super.initInstanceFields();
    }
}
