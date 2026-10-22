import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { PlaneMaterial } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterial';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PlaneVisualizationAnimationLayer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/animated/PlaneVisualizationAnimationLayer';
import { PlaneVisualizationLayer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualizationLayer';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class PlaneVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneVisualization'); }

    declare private _layers: any[];

    private _geometry: IRoomGeometry = null;

    declare private _SafeStr_2156: BitmapData;

    private _cachedBitmapNormal: Vector3d = null;
    private _SafeStr_4870: boolean = false;
    private _hasAnimationLayers: boolean = false;

    constructor(param1: number, param2: number, param3: IRoomGeometry) {
        let _loc4_: number = 0;
        this._layers = [];
        if (param2 < 0) {
            param2 = 0;
        }
        _loc4_ = 0;
        while (_loc4_ < param2) {
            this._layers.push(null);
            _loc4_++;
        }
        this._geometry = param3;
        this._cachedBitmapNormal = new Vector3d();
    }

    public get geometry(): IRoomGeometry {
        return this._geometry;
    }

    public get hasAnimationLayers(): boolean {
        return this._hasAnimationLayers;
    }

    public dispose(): void {
        let _loc1_: number = 0;
        let _loc2_: IDisposable = null;
        if (this._layers != null) {
            _loc1_ = 0;
            while (_loc1_ < this._layers.length) {
                _loc2_ = asGuarded(this._layers[_loc1_], isIDisposable);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._layers = null;
        }
        this._geometry = null;
        if (this._SafeStr_2156 != null) {
            this._SafeStr_2156.dispose();
        }
        if (this._cachedBitmapNormal != null) {
            this._cachedBitmapNormal = null;
        }
    }

    public clearCache(): void {
        let _loc2_: number = 0;
        let _loc3_: PlaneVisualizationLayer = null;
        let _loc1_: PlaneVisualizationAnimationLayer = null;
        if (!this._SafeStr_4870) {
            return;
        }
        if (this._SafeStr_2156 != null) {
            this._SafeStr_2156.dispose();
            this._SafeStr_2156 = null;
        }
        if (this._cachedBitmapNormal != null) {
            this._cachedBitmapNormal.assign(new Vector3d());
        }
        if (this._layers != null) {
            _loc2_ = 0;
            while (_loc2_ < this._layers.length) {
                _loc3_ = asInstanceOf(this._layers[_loc2_], PlaneVisualizationLayer);
                _loc1_ = asInstanceOf(this._layers[_loc2_], PlaneVisualizationAnimationLayer);
                if (_loc3_ != null) {
                    _loc3_.clearCache();
                } else if (_loc1_ != null) {
                    _loc1_.clearCache();
                }
                _loc2_++;
            }
        }
        this._SafeStr_4870 = false;
    }

    public setLayer(param1: number, param2: PlaneMaterial, param3: number, param4: number, param5: number = 0): boolean {
        if (param1 < 0 || param1 > this._layers.length) {
            return false;
        }
        let _loc6_: IDisposable = asGuarded(this._layers[param1], isIDisposable);
        if (_loc6_ != null) {
            _loc6_.dispose();
            _loc6_ = null;
        }
        _loc6_ = new PlaneVisualizationLayer(param2, param3, param4, param5);
        this._layers[param1] = _loc6_;
        return true;
    }

    public setAnimationLayer(param1: number, param2: XML, param3: IGraphicAssetCollection): boolean {
        if (param1 < 0 || param1 > this._layers.length) {
            return false;
        }
        let _loc4_: IDisposable = asGuarded(this._layers[param1], isIDisposable);
        if (_loc4_ != null) {
            _loc4_.dispose();
            _loc4_ = null;
        }
        _loc4_ = new PlaneVisualizationAnimationLayer(param2, param3);
        this._layers[param1] = _loc4_;
        this._hasAnimationLayers = true;
        return true;
    }

    public getLayers(): any[] {
        return this._layers;
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: IVector3d, param5: boolean, param6: number = 0, param7: number = 0, param8: number = 0, param9: number = 0, param10: number = 0, param11: number = 0, param12: number = 0): BitmapData {
        let _loc14_: number = 0;
        let _loc15_: PlaneVisualizationLayer = null;
        let _loc13_: PlaneVisualizationAnimationLayer = null;
        if (param2 < 1) {
            param2 = 1;
        }
        if (param3 < 1) {
            param3 = 1;
        }
        if (param1 == null || param1.width != param2 || param1.height != param3) {
            param1 = null;
        }
        if (this._SafeStr_2156 != null) {
            try {
                if (this._SafeStr_2156.width == param2 && this._SafeStr_2156.height == param3 && Vector3d.isEqual(this._cachedBitmapNormal, param4)) {
                    if (!this.hasAnimationLayers) {
                        if (param1 != null) {
                            param1.copyPixels(this._SafeStr_2156, this._SafeStr_2156.rect, new Point(0, 0), null, null, false);
                            return param1;
                        }
                        return this._SafeStr_2156;
                    }
                } else {
                    this._SafeStr_2156.dispose();
                    this._SafeStr_2156 = null;
                }
            } catch (e) {
                this._SafeStr_2156.dispose();
                this._SafeStr_2156 = null;
                return null;
            }
        }
        this._SafeStr_4870 = true;
        if (this._SafeStr_2156 == null) {
            try {
                this._SafeStr_2156 = new BitmapData(param2, param3, true, 16777215);
            } catch (e) {
                if (this._SafeStr_2156) {
                    this._SafeStr_2156.dispose();
                }
                this._SafeStr_2156 = null;
                return null;
            }
        } else {
            this._SafeStr_2156.fillRect(this._SafeStr_2156.rect, 16777215);
        }
        if (param1 == null) {
            param1 = this._SafeStr_2156;
        }
        this._cachedBitmapNormal.assign(param4);
        _loc14_ = 0;
        while (_loc14_ < this._layers.length) {
            _loc15_ = asInstanceOf(this._layers[_loc14_], PlaneVisualizationLayer);
            _loc13_ = asInstanceOf(this._layers[_loc14_], PlaneVisualizationAnimationLayer);
            if (_loc15_ != null) {
                _loc15_.render(param1, param2, param3, param4, param5, param6, param7);
            } else if (_loc13_ != null) {
                _loc13_.render(param1, param2, param3, param4, param6, param7, param8, param9, param10, param11, param12);
            }
            _loc14_++;
        }
        if (param1 != null && param1 != this._SafeStr_2156) {
            this._SafeStr_2156.copyPixels(param1, param1.rect, new Point(0, 0), null, null, false);
            return param1;
        }
        return this._SafeStr_2156;
    }
}
