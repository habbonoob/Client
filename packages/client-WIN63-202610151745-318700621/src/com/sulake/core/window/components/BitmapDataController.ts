import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IPropertyMap } from '@/com/sulake/core/window/theme/IPropertyMap';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { WindowController } from '@/com/sulake/core/window/Classes.group';
import { PivotPoint } from '@/com/sulake/core/window/enum/PivotPoint';
import { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';

const preSuperBitmapDataController: ((self: BitmapDataController) => void)[] = [];

export class BitmapDataController extends WindowController implements IBitmapDataContainer {
    static { registerClassName(this, 'com.sulake.core.window.components::BitmapDataController'); }

    declare protected _bitmapData: BitmapData;

    declare protected _SafeStr_3717: number;

    declare protected _stretchedX: boolean;

    declare protected _stretchedY: boolean;

    declare protected _zoomX: number;

    declare protected _zoomY: number;

    declare protected _greyscale: boolean;

    declare protected _etchingColor: number;

    declare protected _etchingPoint: Point;

    declare protected _fitSizeToContents: boolean;

    declare protected _SafeStr_15116: boolean;

    declare protected _SafeStr_15117: boolean;

    declare private _wrapX: boolean;

    declare private _wrapY: boolean;

    declare private _rotation: number;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        let _loc12_: IPropertyMap;
        _loc12_ = param5.getWindowFactory().getThemeManager().getPropertyDefaults(param3);
        preSuperBitmapDataController.push((self: BitmapDataController) => {
            self._SafeStr_3717 = PivotPoint.pivotFromName(String(_loc12_._SafeStr_2119("pivot_point").value));
            self._stretchedX = Boolean(_loc12_._SafeStr_2119("stretched_x").value);
            self._stretchedY = Boolean(_loc12_._SafeStr_2119("stretched_y").value);
            self._zoomX = Number(_loc12_._SafeStr_2119("zoom_x").value);
            self._zoomY = Number(_loc12_._SafeStr_2119("zoom_y").value);
            self._wrapX = Boolean(_loc12_._SafeStr_2119("wrap_x").value);
            self._wrapY = Boolean(_loc12_._SafeStr_2119("wrap_y").value);
            self._SafeStr_15116 = Boolean(_loc12_._SafeStr_2119("flip_x").value);
            self._SafeStr_15117 = Boolean(_loc12_._SafeStr_2119("flip_y").value);
            self._rotation = Number(_loc12_._SafeStr_2119("rotation").value);
        });
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override dispose(): void {
        this._bitmapData = null;
        super.dispose();
    }

    public get bitmapData(): BitmapData {
        return this._bitmapData;
    }

    public get pivotPoint(): number {
        return this._SafeStr_3717;
    }

    public set pivotPoint(param1: number) {
        this._SafeStr_3717 = param1;
    }

    public get stretchedX(): boolean {
        return this._stretchedX;
    }

    public set stretchedX(param1: boolean) {
        this._stretchedX = param1;
    }

    public get stretchedY(): boolean {
        return this._stretchedY;
    }

    public set stretchedY(param1: boolean) {
        this._stretchedY = param1;
    }

    public get zoomX(): number {
        return this._zoomX;
    }

    public set zoomX(param1: number) {
        this._zoomX = param1;
        this.fitSize();
    }

    public get zoomY(): number {
        return this._zoomY;
    }

    public set zoomY(param1: number) {
        this._zoomY = param1;
        this.fitSize();
    }

    public get greyscale(): boolean {
        return this._greyscale;
    }

    public set greyscale(param1: boolean) {
        this._greyscale = param1;
    }

    public get etchingColor(): number {
        return this._etchingColor;
    }

    public set etchingColor(param1: number) {
        this._etchingColor = param1;
    }

    public get fitSizeToContents(): boolean {
        return this._fitSizeToContents;
    }

    public set fitSizeToContents(param1: boolean) {
        this._fitSizeToContents = param1;
        this.fitSize();
    }

    public override get etchingPoint(): Point {
        return this._etchingPoint;
    }

    public override set etching(param1: any[]) {
        this.etchingColor = param1[0] >>> 0;
        this._etchingPoint = new Point(Number(param1[1]), Number(param1[2]));
    }

    public get wrapX(): boolean {
        return this._wrapX;
    }

    public set wrapX(param1: boolean) {
        this._wrapX = param1;
    }

    public get wrapY(): boolean {
        return this._wrapY;
    }

    public set wrapY(param1: boolean) {
        this._wrapY = param1;
    }

    public get flipX(): boolean {
        return this._SafeStr_15116;
    }

    public set flipX(param1: boolean) {
        this._SafeStr_15116 = param1;
    }

    public get flipY(): boolean {
        return this._SafeStr_15117;
    }

    public set flipY(param1: boolean) {
        this._SafeStr_15117 = param1;
    }

    public get rotation(): number {
        return this._rotation;
    }

    public set rotation(param1: number) {
        this._rotation = param1;
    }

    protected fitSize(): void {
        if (this._fitSizeToContents && this._bitmapData != null) {
            this.width = Math.abs(this._bitmapData.width * this._zoomX) | 0;
            this.height = Math.abs(this._bitmapData.height * this._zoomY) | 0;
        }
    }

    public override get properties(): any[] {
        let _loc1_: any[] = super.properties;
        _loc1_.push(this.createProperty("pivot_point", PivotPoint.PIVOT_NAMES[this._SafeStr_3717]));
        _loc1_.push(this.createProperty("stretched_x", this._stretchedX));
        _loc1_.push(this.createProperty("stretched_y", this._stretchedY));
        _loc1_.push(this.createProperty("wrap_x", this._wrapX));
        _loc1_.push(this.createProperty("wrap_y", this._wrapY));
        _loc1_.push(this.createProperty("flip_x", this._SafeStr_15116));
        _loc1_.push(this.createProperty("flip_y", this._SafeStr_15117));
        _loc1_.push(this.createProperty("zoom_x", this._zoomX));
        _loc1_.push(this.createProperty("zoom_y", this._zoomY));
        _loc1_.push(this.createProperty("greyscale", this._greyscale));
        _loc1_.push(this.createProperty("etching_color", this._etchingColor));
        _loc1_.push(this.createProperty("fit_size_to_contents", this._fitSizeToContents));
        _loc1_.push(this.createProperty("rotation", this._rotation));
        return _loc1_;
    }

    public override set properties(param1: any[]) {
        for (const _loc2_ of param1 ?? []) {
            switch (_loc2_.key) {
                case "pivot_point":
                    this._SafeStr_3717 = PivotPoint.pivotFromName(String(_loc2_.value));
                    break;
                case "stretched_x":
                    this._stretchedX = Boolean(_loc2_.value);
                    break;
                case "stretched_y":
                    this._stretchedY = Boolean(_loc2_.value);
                    break;
                case "zoom_x":
                    this._zoomX = Number(_loc2_.value);
                    break;
                case "zoom_y":
                    this._zoomY = Number(_loc2_.value);
                    break;
                case "wrap_x":
                    this._wrapX = Boolean(_loc2_.value);
                    break;
                case "wrap_y":
                    this._wrapY = Boolean(_loc2_.value);
                    break;
                case "flip_x":
                    this._SafeStr_15116 = Boolean(_loc2_.value);
                    break;
                case "flip_y":
                    this._SafeStr_15117 = Boolean(_loc2_.value);
                    break;
                case "greyscale":
                    this._greyscale = Boolean(_loc2_.value);
                    break;
                case "etching_color":
                    this._etchingColor = _loc2_.value >>> 0;
                    break;
                case "fit_size_to_contents":
                    this.fitSizeToContents = typeof _loc2_.value === "boolean" ? _loc2_.value : null;
                    break;
                case "rotation":
                    this._rotation = Number(_loc2_.value);
            }
        }
        super.properties = param1;
    }

    protected override initInstanceFields(): void {
        this._SafeStr_3717 = 0;
        this._stretchedX = false;
        this._stretchedY = false;
        this._zoomX = NaN;
        this._zoomY = NaN;
        this._greyscale = false;
        this._etchingColor = 0;
        this._etchingPoint = new Point(0, -1);
        this._fitSizeToContents = false;
        this._SafeStr_15116 = false;
        this._SafeStr_15117 = false;
        this._wrapX = false;
        this._wrapY = false;
        this._rotation = NaN;
        preSuperBitmapDataController.pop()!(this);
        super.initInstanceFields();
    }

    get [IBitmapDataContainer](): true {
        return true;
    }
}
