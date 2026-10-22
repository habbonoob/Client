import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { BCFloorPlanEditor } from '@/com/sulake/habbo/window/utils/floorplaneditor/BCFloorPlanEditor';
import type { FloorPlanCache } from '@/com/sulake/habbo/window/utils/floorplaneditor/FloorPlanCache';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';

const tile_preview_0_pngAsset = embedBitmap("window/tile_preview_0.png");
const tile_preview_1_pngAsset = embedBitmap("window/tile_preview_1.png");
const tile_preview_2_pngAsset = embedBitmap("window/tile_preview_2.png");
const tile_preview_3_pngAsset = embedBitmap("window/tile_preview_3.png");
const tile_preview_4_pngAsset = embedBitmap("window/tile_preview_4.png");
const tile_preview_5_pngAsset = embedBitmap("window/tile_preview_5.png");
const tile_preview_6_pngAsset = embedBitmap("window/tile_preview_6.png");
const tile_preview_7_pngAsset = embedBitmap("window/tile_preview_7.png");
const tile_preview_8_pngAsset = embedBitmap("window/tile_preview_8.png");
const tile_preview_9_pngAsset = embedBitmap("window/tile_preview_9.png");
const tile_preview_a_pngAsset = embedBitmap("window/tile_preview_a.png");
const tile_preview_b_pngAsset = embedBitmap("window/tile_preview_b.png");
const tile_preview_c_pngAsset = embedBitmap("window/tile_preview_c.png");
const tile_preview_d_pngAsset = embedBitmap("window/tile_preview_d.png");
const tile_preview_e_pngAsset = embedBitmap("window/tile_preview_e.png");
const tile_preview_f_pngAsset = embedBitmap("window/tile_preview_f.png");
const tile_preview_entry_pngAsset = embedBitmap("window/tile_preview_entry.png");

export class FloorPlanPreviewer {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.floorplaneditor::FloorPlanPreviewer'); }

    public static tile_preview_0 = tile_preview_0_pngAsset;

    public static tile_preview_1 = tile_preview_1_pngAsset;

    public static tile_preview_2 = tile_preview_2_pngAsset;

    public static tile_preview_3 = tile_preview_3_pngAsset;

    public static tile_preview_4 = tile_preview_4_pngAsset;

    public static tile_preview_5 = tile_preview_5_pngAsset;

    public static tile_preview_6 = tile_preview_6_pngAsset;

    public static tile_preview_7 = tile_preview_7_pngAsset;

    public static tile_preview_8 = tile_preview_8_pngAsset;

    public static tile_preview_9 = tile_preview_9_pngAsset;

    public static tile_preview_a = tile_preview_a_pngAsset;

    public static tile_preview_b = tile_preview_b_pngAsset;

    public static tile_preview_c = tile_preview_c_pngAsset;

    public static tile_preview_d = tile_preview_d_pngAsset;

    public static tile_preview_e = tile_preview_e_pngAsset;

    public static tile_preview_f = tile_preview_f_pngAsset;

    public static tile_preview_entry = tile_preview_entry_pngAsset;

    declare private _bcFloorPlanEditor: BCFloorPlanEditor;

    declare private _tileImages: BitmapData[];

    declare private _floorPlan: FloorPlanCache;

    constructor(param1: BCFloorPlanEditor) {
        this._bcFloorPlanEditor = param1;
        this._floorPlan = param1.floorPlanCache;
        this._tileImages = new Array<BitmapData>(0).fill(null);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_0(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_1(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_2(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_3(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_4(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_5(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_6(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_7(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_8(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_9(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_a(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_b(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_c(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_d(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_e(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_f(), Bitmap).bitmapData);
        this._tileImages.push(castTo(new FloorPlanPreviewer.tile_preview_entry(), Bitmap).bitmapData);
    }

    private static getCanvasPoint(param1: number, param2: number, param3: number): Point {
        return new Point(8 * (param1 - param2), 4 * (param1 + param2) - 8 * param3);
    }

    public updatePreview(): void {
        let _loc20_: number = 0;
        let _loc22_: number = 0;
        let _loc23_: number = 0;
        let _loc11_: Point = null;
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        let _loc10_: number = 0;
        let _loc12_: number = 0;
        let _loc13_: number = 0;
        let _loc14_: number = 0;
        let _loc4_: number = 0;
        let _loc16_: number = 0;
        let _loc15_: any[] = [];
        let _loc18_: number = 2147483647;
        let _loc17_: number = 2147483647;
        let _loc2_: number = -2147483648;
        let _loc1_: number = -2147483648;
        _loc22_ = 0;
        while (_loc22_ < this._floorPlan.floorHeight) {
            _loc20_ = 0;
            while (_loc20_ < this._floorPlan.floorWidth) {
                _loc23_ = this._floorPlan.getHeightAt(_loc20_, _loc22_);
                if (_loc23_ >= 0) {
                    _loc11_ = FloorPlanPreviewer.getCanvasPoint(_loc20_, _loc22_, _loc23_);
                    _loc18_ = Math.min(_loc18_, _loc11_.x) | 0;
                    _loc17_ = Math.min(_loc17_, _loc11_.y) | 0;
                    _loc2_ = Math.max(_loc2_, _loc11_.x) | 0;
                    _loc1_ = Math.max(_loc1_, _loc11_.y) | 0;
                    _loc5_ = this._floorPlan.getHeightAt(_loc20_ - 1, _loc22_ - 1);
                    _loc7_ = this._floorPlan.getHeightAt(_loc20_, _loc22_ - 1);
                    _loc8_ = this._floorPlan.getHeightAt(_loc20_ + 1, _loc22_ - 1);
                    _loc9_ = this._floorPlan.getHeightAt(_loc20_ - 1, _loc22_);
                    _loc10_ = this._floorPlan.getHeightAt(_loc20_ + 1, _loc22_);
                    _loc12_ = this._floorPlan.getHeightAt(_loc20_ - 1, _loc22_ + 1);
                    _loc13_ = this._floorPlan.getHeightAt(_loc20_, _loc22_ + 1);
                    _loc14_ = this._floorPlan.getHeightAt(_loc20_ + 1, _loc22_ + 1);
                    _loc4_ = _loc23_ + 1;
                    _loc16_ = (_loc5_ == _loc4_ || _loc7_ == _loc4_ || _loc9_ == _loc4_ ? 1 : 0) | (_loc8_ == _loc4_ || _loc7_ == _loc4_ || _loc10_ == _loc4_ ? 2 : 0) | (_loc12_ == _loc4_ || _loc13_ == _loc4_ || _loc9_ == _loc4_ ? 4 : 0) | (_loc14_ == _loc4_ || _loc13_ == _loc4_ || _loc10_ == _loc4_ ? 8 : 0);
                    if (_loc16_ == 15) {
                        _loc16_ = 0;
                    }
                    if (this._floorPlan.isEntryPoint(_loc20_, _loc22_)) {
                        _loc16_ = this._tileImages.length - 1;
                    }
                    _loc15_.push({ "point": _loc11_, "type": _loc16_ });
                }
                _loc20_++;
            }
            _loc22_++;
        }
        let _loc21_: number = Math.min(_loc2_ - _loc18_ + 18, 4095) | 0;
        let _loc24_: number = Math.min(_loc1_ - _loc17_ + 18, 4095) | 0;
        let _loc19_: BitmapData = new BitmapData(_loc21_, _loc24_, false, 4294967295);
        let _loc3_: Point = new Point(-_loc18_, -_loc17_);
        for (const _loc6_ of _loc15_ ?? []) {
            _loc19_.copyPixels(this._tileImages[_loc6_.type], this._tileImages[_loc6_.type].rect, _loc6_.point.add(_loc3_));
        }
        this._bcFloorPlanEditor.updatePreviewBitmap(_loc19_);
    }
}
