import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { LayerData } from '@/com/sulake/habbo/room/object/visualization/data/LayerData';

export class DirectionData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::DirectionData'); }

    public static readonly USE_DEFAULT_DIRECTION: number = -1;

    declare private _layers: any[];

    constructor(param1: number) {
        let _loc2_: number = 0;
        let _loc3_: LayerData = null;
        this._layers = [];
        _loc2_ = 0;
        while (_loc2_ < param1) {
            _loc3_ = new LayerData();
            this._layers.push(_loc3_);
            _loc2_++;
        }
    }

    public dispose(): void {
        this._layers = null;
    }

    public get layerCount(): number {
        return this._layers.length | 0;
    }

    private getLayer(param1: number): LayerData {
        if (param1 < 0 || param1 >= this.layerCount) {
            return null;
        }
        return this._layers[param1];
    }

    public getTag(param1: number): string {
        let _loc2_: LayerData = this.getLayer(param1);
        if (_loc2_ != null) {
            return _loc2_.tag;
        }
        return "";
    }

    public setTag(param1: number, param2: string): void {
        let _loc3_: LayerData = this.getLayer(param1);
        if (_loc3_ != null) {
            _loc3_.tag = param2;
        }
    }

    public getInk(param1: number): number {
        let _loc2_: LayerData = this.getLayer(param1);
        if (_loc2_ != null) {
            return _loc2_.ink;
        }
        return 0;
    }

    public setInk(param1: number, param2: number): void {
        let _loc3_: LayerData = this.getLayer(param1);
        if (_loc3_ != null) {
            _loc3_.ink = param2;
        }
    }

    public getAlpha(param1: number): number {
        let _loc2_: LayerData = this.getLayer(param1);
        if (_loc2_ != null) {
            return _loc2_.alpha;
        }
        return 255;
    }

    public setAlpha(param1: number, param2: number): void {
        let _loc3_: LayerData = this.getLayer(param1);
        if (_loc3_ != null) {
            _loc3_.alpha = param2;
        }
    }

    public getIgnoreMouse(param1: number): boolean {
        let _loc2_: LayerData = this.getLayer(param1);
        if (_loc2_ != null) {
            return _loc2_.ignoreMouse;
        }
        return false;
    }

    public setIgnoreMouse(param1: number, param2: boolean): void {
        let _loc3_: LayerData = this.getLayer(param1);
        if (_loc3_ != null) {
            _loc3_.ignoreMouse = param2;
        }
    }

    public getXOffset(param1: number): number {
        let _loc2_: LayerData = this.getLayer(param1);
        if (_loc2_ != null) {
            return _loc2_.xOffset;
        }
        return 0;
    }

    public setXOffset(param1: number, param2: number): void {
        let _loc3_: LayerData = this.getLayer(param1);
        if (_loc3_ != null) {
            _loc3_.xOffset = param2;
        }
    }

    public getYOffset(param1: number): number {
        let _loc2_: LayerData = this.getLayer(param1);
        if (_loc2_ != null) {
            return _loc2_.yOffset;
        }
        return 0;
    }

    public setYOffset(param1: number, param2: number): void {
        let _loc3_: LayerData = this.getLayer(param1);
        if (_loc3_ != null) {
            _loc3_.yOffset = param2;
        }
    }

    public getZOffset(param1: number): number {
        let _loc2_: LayerData = this.getLayer(param1);
        if (_loc2_ != null) {
            return _loc2_.zOffset;
        }
        return 0;
    }

    public setZOffset(param1: number, param2: number): void {
        let _loc3_: LayerData = this.getLayer(param1);
        if (_loc3_ != null) {
            _loc3_.zOffset = param2;
        }
    }

    public copyValues(param1: DirectionData): void {
        let _loc3_: number = 0;
        if (param1 == null) {
            return;
        }
        if (this.layerCount != param1.layerCount) {
            return;
        }
        let _loc4_: LayerData = null;
        let _loc2_: LayerData = null;
        _loc3_ = 0;
        while (_loc3_ < this.layerCount) {
            _loc4_ = this.getLayer(_loc3_);
            _loc2_ = param1.getLayer(_loc3_);
            if (_loc4_) {
                _loc4_.copyValues(_loc2_);
            }
            _loc3_++;
        }
    }
}
