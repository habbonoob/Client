import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class BadgeLayerOptions {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge::BadgeLayerOptions'); }

    constructor() {
    }

    private _layerIndex: number = -1;
    private _partIndex: number = -1;
    private _colorIndex: number = -1;
    private _gridX: number = -1;
    private _gridY: number = -1;

    public get layerIndex(): number {
        return this._layerIndex;
    }

    public set layerIndex(param1: number) {
        this._layerIndex = param1;
    }

    public get partIndex(): number {
        return this._partIndex;
    }

    public set partIndex(param1: number) {
        this._partIndex = param1;
    }

    public get colorIndex(): number {
        return this._colorIndex;
    }

    public set colorIndex(param1: number) {
        this._colorIndex = param1;
    }

    public get gridX(): number {
        return this._gridX;
    }

    public set gridX(param1: number) {
        this._gridX = param1;
    }

    public get gridY(): number {
        return this._gridY;
    }

    public set gridY(param1: number) {
        this._gridY = param1;
    }

    public get position(): number {
        return this.gridY * 3 + this.gridX;
    }

    public setGrid(param1: number): void {
        this._gridX = Math.floor(param1 % 3) | 0;
        this._gridY = Math.floor(param1 / 3) | 0;
    }

    public clone(): BadgeLayerOptions {
        let _loc1_: BadgeLayerOptions = new BadgeLayerOptions();
        _loc1_._layerIndex = this._layerIndex;
        _loc1_._partIndex = this._partIndex;
        _loc1_._colorIndex = this._colorIndex;
        _loc1_._gridX = this._gridX;
        _loc1_._gridY = this._gridY;
        return _loc1_;
    }

    public equalVisuals(param1: BadgeLayerOptions): boolean {
        if (param1 == null || this._gridX != param1.gridX || this._gridY != param1.gridY || this._colorIndex != param1.colorIndex) {
            return false;
        }
        if (this._layerIndex == 0 && param1.layerIndex != 0 || this._layerIndex != 0 && param1.layerIndex == 0) {
            return false;
        }
        return true;
    }

    public isGridEqual(param1: BadgeLayerOptions): boolean {
        if (param1.gridX == this._gridX && param1.gridY == this._gridY) {
            return true;
        }
        return false;
    }
}
