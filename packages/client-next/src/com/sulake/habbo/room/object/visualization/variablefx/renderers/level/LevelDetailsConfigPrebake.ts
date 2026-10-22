import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { LevelBadgePainter } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelBadgePainter';
import type { LevelDetailsNumberPainter } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelDetailsNumberPainter';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { _SafeCls_6078 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6078';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';

export class LevelDetailsConfigPrebake implements _SafeCls_6078 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelDetailsConfigPrebake'); }

    declare public background: BitmapData;

    declare public badgePainter: LevelBadgePainter;

    public disposed: boolean = false;

    declare public _SafeStr_14556: LevelDetailsNumberPainter;

    private _backgroundPrebakes: any = {};

    declare private _progressRendererConfig: VariableFxConfigData;

    constructor(param1: BitmapData, param2: LevelBadgePainter, param3: LevelDetailsNumberPainter) {
        this.background = param1;
        this.badgePainter = param2;
        this._SafeStr_14556 = param3;
    }

    public getBackgroundPrebake(param1: number, param2: number): any {
        let _loc6_: string = null;
        let _loc3_: BitmapData = null;
        let _loc4_: number = Math.max(1, param1) | 0;
        let _loc5_: number = Math.max(1, param2) | 0;
        if (_loc4_ > 5) {
            return { "bitmapData": this.createBackgroundPrebake(_loc5_), "ownsPrebake": true };
        }
        _loc6_ = String(_loc4_);
        _loc3_ = asInstanceOf(this._backgroundPrebakes[_loc6_], BitmapData);
        if (_loc3_ == null) {
            _loc3_ = this.createBackgroundPrebake(_loc5_);
            this._backgroundPrebakes[_loc6_] = _loc3_;
        }
        return { "bitmapData": _loc3_, "ownsPrebake": false };
    }

    public getOrCreateProgressRendererConfig(param1: (...args: any[]) => any): VariableFxConfigData {
        if (this._progressRendererConfig == null) {
            this._progressRendererConfig = asInstanceOf(param1(), VariableFxConfigData);
        }
        return this._progressRendererConfig;
    }

    public dispose(): void {
        let _loc2_: string = null;
        let _loc1_: BitmapData = null;
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        if (this.badgePainter != null) {
            this.badgePainter.dispose();
        }
        if (this._SafeStr_14556 != null) {
            this._SafeStr_14556.dispose();
            this._SafeStr_14556 = null;
        }
        for (_loc2_ of keysOf(this._backgroundPrebakes)) {
            _loc1_ = asInstanceOf(this._backgroundPrebakes[_loc2_], BitmapData);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
        }
        this._backgroundPrebakes = {};
        if (this._progressRendererConfig != null) {
            _SafeCls_6075.disposeConfigPrebake(this._progressRendererConfig);
            this._progressRendererConfig = null;
        }
    }

    private createBackgroundPrebake(param1: number): BitmapData {
        let _loc3_: VariableFxBitmapComposer = null;
        let _loc2_: BitmapData = new BitmapData(param1, 29, true, 0);
        _loc2_.lock();
        try {
            _loc3_ = new VariableFxBitmapComposer(_loc2_);
            _loc3_.clear(0);
            _loc3_.drawThreeSlice(this.background, 29, 6, param1, 0, 0, "normal", 255);
        } finally {
            _loc2_.unlock();
        }
        return _loc2_;
    }

    get [_SafeCls_6078](): true {
        return true;
    }
}
