import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf, valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxClipRect';

export class LevelDetailsNumberPainter {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelDetailsNumberPainter'); }

    private static readonly GLYPH_HEIGHT: number = 9;
    private static readonly GLYPH_SPACING_X: number = -1;

    private static readonly GLYPHS: any = { "0": { "sourceX": 0, "width": 7 }, "1": { "sourceX": 8, "width": 4 }, "2": { "sourceX": 13, "width": 7 }, "3": { "sourceX": 21, "width": 7 }, "4": { "sourceX": 29, "width": 7 }, "5": { "sourceX": 37, "width": 7 }, "6": { "sourceX": 45, "width": 7 }, "7": { "sourceX": 53, "width": 7 }, "8": { "sourceX": 61, "width": 7 }, "9": { "sourceX": 69, "width": 7 }, "/": { "sourceX": 77, "width": 12 }, "...": { "sourceX": 90, "width": 8 } };

    declare private _numbers: BitmapData;

    private _SafeStr_14558: any = {};

    constructor(param1: BitmapData) {
        this._numbers = param1;
    }

    public createRenderPlan(param1: string, param2: string, param3: number): any {
        let _loc4_: any = null;
        let _loc5_: number = Math.max(0, param3) | 0;
        let _loc6_: any = this.createPlan("full:" + param1 + "/" + param2, [param1, "/", param2]);
        if (_loc6_.width <= _loc5_) {
            return _loc6_;
        }
        _loc4_ = this.createPlan("current:" + param1, [param1]);
        if (_loc4_.width <= _loc5_) {
            return _loc4_;
        }
        return this.createTruncatedCurrentPlan(param1, _loc5_);
    }

    public draw(param1: VariableFxBitmapComposer, param2: any, param3: number, param4: number): void {
        let _loc6_: any = null;
        let _loc5_: BitmapData = null;
        let _loc7_: number = param3;
        for (_loc6_ of valuesOf(param2.parts)) {
            _loc5_ = this.getTextBitmap(stringOrNull(_loc6_.text));
            param1.drawLayer(_loc5_, _loc7_, param4, "normal", 255);
            _loc7_ += (_loc6_.width | 0) + -1;
        }
    }

    public dispose(): void {
        let _loc2_: string = null;
        let _loc1_: BitmapData = null;
        for (_loc2_ of keysOf(this._SafeStr_14558)) {
            _loc1_ = asInstanceOf(this._SafeStr_14558[_loc2_], BitmapData);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
        }
        this._SafeStr_14558 = {};
    }

    private createTruncatedCurrentPlan(param1: string, param2: number): any {
        let _loc4_: number = 0;
        let _loc3_: string = null;
        let _loc6_: any = null;
        let _loc5_: any = null;
        _loc4_ = param1.length;
        while (_loc4_ > 0) {
            _loc3_ = param1.substr(0, _loc4_);
            _loc6_ = this.createPlan("truncated:" + _loc3_ + "...", [_loc3_, "..."]);
            if (_loc6_.width <= param2) {
                return _loc6_;
            }
            _loc4_--;
        }
        _loc5_ = this.createPlan("truncated:...", ["..."]);
        return _loc5_.width <= param2 ? _loc5_ : { "key": "empty", "parts": [], "width": 0 };
    }

    private createPlan(param1: string, param2: any[]): any {
        let _loc4_: any = null;
        let _loc3_: any[] = [];
        for (_loc4_ of param2 ?? []) {
            if (_loc4_.length > 0) {
                _loc3_.push({ "text": _loc4_, "width": this.measureText(stringOrNull(_loc4_)) });
            }
        }
        return { "key": param1, "parts": _loc3_, "width": this.measureParts(_loc3_) };
    }

    private measureParts(param1: any[]): number {
        let _loc3_: any = null;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        for (_loc3_ of param1 ?? []) {
            _loc2_ += _loc3_.width | 0;
            _loc4_++;
        }
        return _loc4_ == 0 ? 0 : _loc2_ + -1 * (_loc4_ - 1);
    }

    private measureText(param1: string): number {
        let _loc3_: any = null;
        let _loc4_: any[] = this.resolveGlyphs(param1);
        let _loc2_: number = 0;
        if (_loc4_.length == 0) {
            return 0;
        }
        for (_loc3_ of _loc4_ ?? []) {
            _loc2_ += _loc3_.width | 0;
        }
        return _loc2_ + -1 * (_loc4_.length - 1);
    }

    private getTextBitmap(param1: string): BitmapData {
        let _loc4_: number = 0;
        let _loc3_: VariableFxBitmapComposer = null;
        let _loc2_: BitmapData = asInstanceOf(this._SafeStr_14558[param1], BitmapData);
        if (_loc2_ != null) {
            return _loc2_;
        }
        _loc4_ = Math.max(1, this.measureText(param1)) | 0;
        _loc2_ = new BitmapData(_loc4_, 9, true, 0);
        _loc2_.lock();
        try {
            _loc3_ = new VariableFxBitmapComposer(_loc2_);
            _loc3_.clear(0);
            this.drawTextGlyphs(_loc3_, param1, 0, 0);
        } finally {
            _loc2_.unlock();
        }
        this._SafeStr_14558[param1] = _loc2_;
        return _loc2_;
    }

    private drawTextGlyphs(param1: VariableFxBitmapComposer, param2: string, param3: number, param4: number): void {
        let _loc6_: any = null;
        let _loc5_: number = param3;
        for (_loc6_ of this.resolveGlyphs(param2) ?? []) {
            param1.drawLayer(this._numbers, _loc5_ - (_loc6_.sourceX | 0), param4, "normal", 255, new VariableFxClipRect(_loc5_, param4, _loc6_.width | 0, 9));
            _loc5_ += (_loc6_.width | 0) + -1;
        }
    }

    private resolveGlyphs(param1: string): any[] {
        let _loc2_: string = null;
        let _loc3_: any = null;
        let _loc5_: any[] = [];
        let _loc4_: number = 0;
        while (_loc4_ < param1.length) {
            if (param1.substr(_loc4_, 3) == "...") {
                _loc5_.push(LevelDetailsNumberPainter.GLYPHS["..."]);
                _loc4_ += 3;
            } else {
                _loc2_ = param1.charAt(_loc4_);
                _loc3_ = LevelDetailsNumberPainter.GLYPHS[_loc2_];
                if (_loc3_ != null) {
                    _loc5_.push(_loc3_);
                }
                _loc4_++;
            }
        }
        return _loc5_;
    }
}
