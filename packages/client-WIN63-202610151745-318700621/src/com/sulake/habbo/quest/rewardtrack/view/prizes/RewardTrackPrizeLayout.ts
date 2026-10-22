import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import type { RewardTrackPrize } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackPrize';

export class RewardTrackPrizeLayout {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.prizes::RewardTrackPrizeLayout'); }

    private static readonly PAGE_BOUNDARY_EPSILON: number = 0.0001;

    declare private _visibleWidth: number;
    static { (this.prototype as any)._visibleWidth = 0; }

    declare private _prizeWidth: number;
    static { (this.prototype as any)._prizeWidth = 0; }

    declare private _SafeStr_14983: number;
    static { (this.prototype as any)._SafeStr_14983 = 0; }

    declare private _SafeStr_14984: number;
    static { (this.prototype as any)._SafeStr_14984 = NaN; }

    declare private _SafeStr_14985: number;
    static { (this.prototype as any)._SafeStr_14985 = NaN; }

    private _SafeStr_14986: number = 1;
    private _distancePerPoint: number = 1;
    private _pageCount: number = 1;

    declare private _SafeStr_14987: number;
    static { (this.prototype as any)._SafeStr_14987 = 0; }

    constructor() {
    }

    public rebuild(param1: RewardTrack, param2: number, param3: number, param4: number): void {
        this._visibleWidth = param2;
        this._prizeWidth = param3;
        this._SafeStr_14983 = param4;
        this._SafeStr_14984 = this._prizeWidth / 2 + this._SafeStr_14983;
        this._SafeStr_14987 = this.findMinRequiredPoints(param1.prizes);
        let _loc6_: number = this.findMinimumGap(param1.prizes);
        let _loc5_: number = this.findMaxRequiredPoints(param1.prizes);
        if (_loc6_ <= 0) {
            _loc6_ = Math.max(1, _loc5_) | 0;
        }
        this._distancePerPoint = (this._prizeWidth + this._SafeStr_14983) / _loc6_;
        if (this._distancePerPoint <= 0) {
            this._distancePerPoint = 1;
        }
        this._SafeStr_14986 = this.calculatePagePointSpan(this._distancePerPoint, _loc6_);
        this._distancePerPoint = this.findMaxDistancePerPoint(this._distancePerPoint, this._SafeStr_14986);
        this._SafeStr_14985 = this.zeroOffsetFor(this._distancePerPoint);
        this._pageCount = this.calculatePageCount(param1.prizes);
    }

    public xForPoints(param1: number, param2: number): number {
        let _loc3_: number = Math.max(0, param2 * this._SafeStr_14986) | 0;
        return this._SafeStr_14985 + (param1 - _loc3_) * this._distancePerPoint;
    }

    public pageForPoints(param1: number): number {
        let _loc2_: number = this.pageForPointSpan(param1, this._SafeStr_14986);
        return Math.max(0, Math.min(this._pageCount - 1, _loc2_)) | 0;
    }

    private calculatePageCount(param1: RewardTrackPrize[]): number {
        let _loc2_: number = 0;
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = Math.max(_loc2_, this.pageForPointSpan(_loc3_.requiredPoints, this._SafeStr_14986)) | 0;
        }
        return Math.max(1, _loc2_ + 1) | 0;
    }

    private pageForPointSpan(param1: number, param2: number): number {
        if (param1 <= 0) {
            return 0;
        }
        return Math.max(0, (Math.ceil((param1 - 0.0001) / param2) | 0) - 1) | 0;
    }

    private zeroOffsetFor(param1: number): number {
        return Math.max(0, this._SafeStr_14984 - this._SafeStr_14987 * param1);
    }

    private usableWidthFor(param1: number): number {
        return Math.max(1, this._visibleWidth - this._SafeStr_14984 - this.zeroOffsetFor(param1));
    }

    private calculatePagePointSpan(param1: number, param2: number): number {
        let _loc3_: number = Math.max(1, Math.floor(this.usableWidthFor(param1) / param1 / param2) | 0) | 0;
        return Math.max(1, _loc3_ * param2) | 0;
    }

    private findMaxDistancePerPoint(param1: number, param2: number): number {
        let _loc5_: number = 0;
        let _loc6_: number = NaN;
        let _loc4_: number = param1;
        let _loc3_: number = param1;
        _loc5_ = 0;
        while (_loc5_ < 32) {
            _loc3_ *= 2;
            if (!this.pagePointSpanFits(_loc3_, param2)) {
                break;
            }
            _loc4_ = _loc3_;
            _loc5_ += 1;
        }
        _loc5_ = 0;
        while (_loc5_ < 24) {
            _loc6_ = (_loc4_ + _loc3_) / 2;
            if (this.pagePointSpanFits(_loc6_, param2)) {
                _loc4_ = _loc6_;
            } else {
                _loc3_ = _loc6_;
            }
            _loc5_ += 1;
        }
        return _loc4_;
    }

    private pagePointSpanFits(param1: number, param2: number): boolean {
        return param2 * param1 <= this.usableWidthFor(param1) + 0.0001;
    }

    private findMinimumGap(param1: RewardTrackPrize[]): number {
        let _loc3_: number = this.findMinimumGapForPremium(param1, false);
        let _loc2_: number = this.findMinimumGapForPremium(param1, true);
        if (_loc3_ <= 0) {
            return _loc2_;
        }
        if (_loc2_ <= 0) {
            return _loc3_;
        }
        return Math.min(_loc3_, _loc2_) | 0;
    }

    private findMinimumGapForPremium(param1: RewardTrackPrize[], param2: boolean): number {
        let _loc4_: number = 0;
        let _loc3_: number = -1;
        let _loc5_: number = 0;
        for (const _loc6_ of param1 ?? []) {
            if (_loc6_.premium == param2) {
                if (_loc3_ != -1) {
                    _loc4_ = _loc6_.requiredPoints - _loc3_;
                    if (_loc4_ > 0 && (_loc5_ == 0 || _loc4_ < _loc5_)) {
                        _loc5_ = _loc4_;
                    }
                }
                _loc3_ = _loc6_.requiredPoints;
            }
        }
        return _loc5_;
    }

    private findMinRequiredPoints(param1: RewardTrackPrize[]): number {
        let _loc2_: number = -1;
        for (const _loc3_ of param1 ?? []) {
            if (_loc2_ == -1 || _loc3_.requiredPoints < _loc2_) {
                _loc2_ = _loc3_.requiredPoints;
            }
        }
        return Math.max(0, _loc2_) | 0;
    }

    private findMaxRequiredPoints(param1: RewardTrackPrize[]): number {
        let _loc2_: number = 0;
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = Math.max(_loc2_, _loc3_.requiredPoints) | 0;
        }
        return _loc2_;
    }

    public get pageCount(): number {
        return this._pageCount;
    }

    public get distancePerPoint(): number {
        return this._distancePerPoint;
    }
}
