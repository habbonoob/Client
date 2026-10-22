import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxClipRect';

export class LevelBadgePainter {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelBadgePainter'); }

    public static readonly MAX_SHARED_BADGE_PREBAKE_DIGITS: number = 5;
    private static readonly DIGIT_WIDTH: number = 8;
    private static readonly NUMBER_Y: number = 5;
    private static readonly SINGLE_DIGIT_NUMBER_X: number = 7;
    private static readonly MULTI_DIGIT_NUMBER_X: number = 6;
    private static readonly SINGLE_DIGIT_FRAME_WIDTH: number = 21;
    private static readonly MULTI_DIGIT_RIGHT_PADDING: number = 5;
    private static readonly THREE_SLICE_LEFT_WIDTH: number = 10;
    private static readonly THREE_SLICE_RIGHT_WIDTH: number = 10;

    private _badgePrebakes: any = {};

    declare private _SafeStr_14696: any;

    declare private _numbers: BitmapData;

    constructor(param1: any, param2: any) {
        this._numbers = param1.numbers;
        this._SafeStr_14696 = { "background": (param1.background == null ? null : this.createNormalizedLayer(param1.background, param2)), "darkening": this.createNormalizedLayer(param1.darkening, param2), "frame": this.createNormalizedLayer(param1.frame, param2), "lighting": this.createNormalizedLayer(param1.lighting, param2) };
    }

    public resolveFrameWidth(param1: number): number {
        let _loc2_: number = Math.max(1, param1) | 0;
        if (_loc2_ == 1) {
            return 21;
        }
        return 6 + _loc2_ * 8 + 5;
    }

    public createBadgeRender(param1: number, param2: number): any {
        let _loc6_: any = this.getBadgeSourcePrebake(param1);
        let _loc3_: any = _loc6_.prebake;
        let _loc4_: number = _loc3_.backgroundAndFrame.width | 0;
        let _loc5_: BitmapData = this.createTransparentBitmap(_loc4_, _loc3_.backgroundAndFrame.height | 0);
        this.drawRecoloredBackgroundAndFrame(_loc5_, _loc3_, param2);
        return { "backgroundAndFrame": _loc5_, "ownsSourcePrebake": Boolean(_loc6_.ownsPrebake), "sourcePrebake": _loc3_ };
    }

    public disposeBadgeRender(param1: any): void {
        if (param1 == null) {
            return;
        }
        if (param1.backgroundAndFrame != null) {
            castTo(param1.backgroundAndFrame, BitmapData).dispose();
        }
        if (param1.ownsSourcePrebake == true) {
            this.disposeBadgeSourcePrebake(param1.sourcePrebake);
        }
    }

    public drawBadge(param1: VariableFxBitmapComposer, param2: any, param3: string, param4: number, param5: number): void {
        param1.drawLayer(param2.backgroundAndFrame, param4, param5, "normal", 255);
        this.drawDigits(param1, param3, param4, param5);
        param1.drawLayer(param2.sourcePrebake.darkening, param4, param5, "multiply", 255);
        param1.drawLayer(param2.sourcePrebake.lighting, param4, param5, "add", 255);
    }

    public dispose(): void {
        let _loc1_: string = null;
        for (_loc1_ of keysOf(this._badgePrebakes)) {
            this.disposeBadgeSourcePrebake(this._badgePrebakes[_loc1_]);
        }
        this._badgePrebakes = {};
        if (this._SafeStr_14696.background != null) {
            castTo(this._SafeStr_14696.background, BitmapData).dispose();
        }
        castTo(this._SafeStr_14696.darkening, BitmapData).dispose();
        castTo(this._SafeStr_14696.frame, BitmapData).dispose();
        castTo(this._SafeStr_14696.lighting, BitmapData).dispose();
    }

    private getBadgeSourcePrebake(param1: number): any {
        let _loc4_: string = null;
        let _loc2_: any = null;
        let _loc3_: number = Math.max(1, param1) | 0;
        if (_loc3_ > 5) {
            return { "ownsPrebake": true, "prebake": this.createBadgeSourcePrebake(_loc3_) };
        }
        _loc4_ = String(_loc3_);
        _loc2_ = this._badgePrebakes[_loc4_];
        if (_loc2_ == null) {
            _loc2_ = this.createBadgeSourcePrebake(_loc3_);
            this._badgePrebakes[_loc4_] = _loc2_;
        }
        return { "ownsPrebake": false, "prebake": _loc2_ };
    }

    private createBadgeSourcePrebake(param1: number): any {
        let _loc2_: number = this.resolveFrameWidth(param1);
        let _loc6_: number = castTo(this._SafeStr_14696.frame, BitmapData).height;
        let _loc3_: BitmapData = this.createTransparentBitmap(_loc2_, _loc6_);
        let _loc7_: BitmapData = this.createTransparentBitmap(_loc2_, _loc6_);
        let _loc5_: BitmapData = this.createTransparentBitmap(_loc2_, _loc6_);
        let _loc4_: BitmapData = this.createTransparentBitmap(_loc2_, _loc6_);
        this.drawBackgroundAndFramePrebake(_loc3_);
        this.drawFramePrebake(_loc7_);
        this.drawOverlayPrebake(_loc5_, this._SafeStr_14696.darkening);
        this.drawOverlayPrebake(_loc4_, this._SafeStr_14696.lighting);
        return { "backgroundAndFrame": _loc3_, "darkening": _loc5_, "frame": _loc7_, "lighting": _loc4_ };
    }

    private drawBackgroundAndFramePrebake(param1: BitmapData): void {
        let _loc2_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc2_ = new VariableFxBitmapComposer(param1);
            _loc2_.clear(0);
            if (this._SafeStr_14696.background != null) {
                _loc2_.drawThreeSlice(this._SafeStr_14696.background, 10, 10, param1.width, 0, 0, "normal", 255);
            }
            _loc2_.drawThreeSlice(this._SafeStr_14696.frame, 10, 10, param1.width, 0, 0, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private drawFramePrebake(param1: BitmapData): void {
        let _loc2_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc2_ = new VariableFxBitmapComposer(param1);
            _loc2_.clear(0);
            _loc2_.drawThreeSlice(this._SafeStr_14696.frame, 10, 10, param1.width, 0, 0, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private drawOverlayPrebake(param1: BitmapData, param2: BitmapData): void {
        let _loc3_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc3_ = new VariableFxBitmapComposer(param1);
            _loc3_.clear(0);
            _loc3_.drawThreeSlice(param2, 10, 10, param1.width, 0, 0, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private drawRecoloredBackgroundAndFrame(param1: BitmapData, param2: any, param3: number): void {
        let _loc4_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(param1);
            _loc4_.clear(0);
            _loc4_.drawLayer(param2.backgroundAndFrame, 0, 0, "normal", 255);
            _loc4_.drawTintedLayer(param2.frame, 0, 0, param3, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private drawDigits(param1: VariableFxBitmapComposer, param2: string, param3: number, param4: number): void {
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc8_: number = param2.length == 1 ? 7 : 6;
        _loc7_ = 0;
        while (_loc7_ < param2.length) {
            _loc9_ = Number(param2.charAt(_loc7_)) | 0;
            _loc6_ = param3 + _loc8_ + _loc7_ * 8;
            _loc5_ = param4 + 5;
            param1.drawLayer(this._numbers, _loc6_ - _loc9_ * 8, _loc5_, "normal", 255, new VariableFxClipRect(_loc6_, _loc5_, 8, this._numbers.height));
            _loc7_++;
        }
    }

    private createNormalizedLayer(param1: BitmapData, param2: any): BitmapData {
        let _loc4_: VariableFxBitmapComposer = null;
        let _loc3_: BitmapData = this.createTransparentBitmap(param2.width | 0, param2.height | 0);
        _loc3_.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(_loc3_);
            _loc4_.clear(0);
            _loc4_.drawLayer(param1, -(param2.x | 0), -(param2.y | 0), "normal", 255);
        } finally {
            _loc3_.unlock();
        }
        return _loc3_;
    }

    private createTransparentBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }

    private disposeBadgeSourcePrebake(param1: any): void {
        castTo(param1.backgroundAndFrame, BitmapData).dispose();
        castTo(param1.darkening, BitmapData).dispose();
        castTo(param1.frame, BitmapData).dispose();
        castTo(param1.lighting, BitmapData).dispose();
    }
}
