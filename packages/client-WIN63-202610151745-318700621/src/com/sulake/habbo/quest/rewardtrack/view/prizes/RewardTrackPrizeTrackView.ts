import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import type { RewardTrackPrize } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackPrize';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { RewardTrackPointIndicatorView } from '@/com/sulake/habbo/quest/rewardtrack/view/prizes/RewardTrackPointIndicatorView';
import { RewardTrackPrizeLayout } from '@/com/sulake/habbo/quest/rewardtrack/view/prizes/RewardTrackPrizeLayout';
import { RewardTrackPrizeView } from '@/com/sulake/habbo/quest/rewardtrack/view/prizes/RewardTrackPrizeView';
import { RewardTrackMainProgressBarView } from '@/com/sulake/habbo/quest/rewardtrack/view/progress/RewardTrackMainProgressBarView';

export class RewardTrackPrizeTrackView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.prizes::RewardTrackPrizeTrackView'); }

    private static readonly MIN_PRIZE_SPACING: number = 15;

    declare private _controller: RewardTrackController;

    declare private _SafeStr_5628: RewardTrack;

    declare private _content: IWindowContainer;

    declare private _SafeStr_14988: IWindowContainer;

    declare private _SafeStr_14989: IWindowContainer;

    declare private _SafeStr_14964: IWindowContainer;

    declare private _SafeStr_14965: IWindowContainer;

    declare private _SafeStr_14966: IWindowContainer;

    declare private _SafeStr_14990: IRegionWindow;

    declare private _SafeStr_4468: IRegionWindow;

    declare private _SafeStr_14991: IWindowContainer;

    declare private _SafeStr_14992: IWindowContainer;

    declare private _layout: RewardTrackPrizeLayout;

    declare private _SafeStr_3381: RewardTrackMainProgressBarView;

    declare private _SafeStr_14993: RewardTrackPrizeView[];

    declare private _SafeStr_14994: RewardTrackPrizeView[];

    declare private _SafeStr_14995: RewardTrackPrizeView[];

    declare private _SafeStr_14996: RewardTrackPointIndicatorView[];

    declare private _freePagePrizes: RewardTrackPrize[][];

    declare private _premiumPagePrizes: RewardTrackPrize[][];

    declare private _pagePointValues: number[][];

    declare private _pageIndex: number;
    static { (this.prototype as any)._pageIndex = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: RewardTrackController, param2: RewardTrack, param3: IWindowContainer, param4: IWindowContainer, param5: IWindowContainer, param6: IWindowContainer, param7: IWindowContainer, param8: IWindowContainer, param9: IRegionWindow, param10: IRegionWindow, param11: IWindowContainer, param12: IWindowContainer) {
        this._controller = param1;
        this._SafeStr_5628 = param2;
        this._content = param3;
        this._SafeStr_14988 = param4;
        this._SafeStr_14989 = param5;
        this._SafeStr_14964 = param6;
        this._SafeStr_14965 = param7;
        this._SafeStr_14966 = param8;
        this._SafeStr_14990 = param9;
        this._SafeStr_4468 = param10;
        this._SafeStr_14991 = param11;
        this._SafeStr_14992 = param12;
        this._layout = new RewardTrackPrizeLayout();
        this._SafeStr_3381 = new RewardTrackMainProgressBarView(this._SafeStr_14989);
        this._SafeStr_14993 = [];
        this._SafeStr_14994 = [];
        this._SafeStr_14995 = [];
        this._SafeStr_14996 = [];
        this._SafeStr_14990.addEventListener("WME_CLICK", this.onPreviousClicked);
        this._SafeStr_4468.addEventListener("WME_CLICK", this.onNextClicked);
        this.refresh(false, true);
    }

    public refresh(param1: boolean, param2: boolean): void {
        this._layout.rebuild(this._SafeStr_5628, this._content.width, this._SafeStr_14964.width, 15);
        this.buildPageData();
        this.ensurePrizeSlots(this._SafeStr_14993, this._SafeStr_14964, this.maxPrizeCount(this._freePagePrizes));
        this.ensurePrizeSlots(this._SafeStr_14994, this._SafeStr_14965, this.maxPrizeCount(this._premiumPagePrizes));
        this.ensurePointIndicatorSlots(this.maxPointIndicatorCount());
        if (param2) {
            this._pageIndex = this._layout.pageForPoints(this._SafeStr_5628.points);
        }
        this._pageIndex = Math.max(0, Math.min(this._layout.pageCount - 1, this._pageIndex)) | 0;
        this.refreshPage(param1);
    }

    public pointsUpdated(param1: boolean): void {
        this.refreshPrizeStates();
        this.refreshPointIndicators();
        this._SafeStr_3381.refreshByX(this._layout.xForPoints(this._SafeStr_5628.points, this._pageIndex) | 0, param1);
        this.refreshUnclaimedIndicators();
    }

    public prizeClaimed(param1: RewardTrackPrize): void {
        let _loc2_: RewardTrackPrizeView = this.getPrizeView(param1);
        if (_loc2_ != null) {
            _loc2_.refreshState();
        } else {
            this.refreshPrizeStates();
        }
        this.refreshUnclaimedIndicators();
    }

    public premiumUpdated(param1: boolean): void {
        this.pointsUpdated(param1);
    }

    public update(param1: number): void {
        this._SafeStr_3381.update(param1);
    }

    private buildPageData(): void {
        let _loc1_: number = 0;
        let _loc2_: any = undefined;
        this._freePagePrizes = this.createPrizePageData();
        this._premiumPagePrizes = this.createPrizePageData();
        this._pagePointValues = this.createPointPageData();
        let _loc3_: Map<any, any>[] = [];
        _loc1_ = 0;
        while (_loc1_ < this._layout.pageCount) {
            _loc3_.push(new Dictionary());
            _loc1_ += 1;
        }
        for (const _loc4_ of this._SafeStr_5628.prizes ?? []) {
            _loc1_ = this._layout.pageForPoints(_loc4_.requiredPoints);
            _loc2_ = _loc4_.premium ? this._premiumPagePrizes : this._freePagePrizes;
            _loc2_[_loc1_].push(_loc4_);
            if (!_loc3_[_loc1_].get(_loc4_.requiredPoints)) {
                _loc3_[_loc1_].set(_loc4_.requiredPoints, true);
                this._pagePointValues[_loc1_].push(_loc4_.requiredPoints);
            }
        }
    }

    private createPrizePageData(): RewardTrackPrize[][] {
        let _loc2_: number = 0;
        let _loc1_: RewardTrackPrize[][] = [];
        _loc2_ = 0;
        while (_loc2_ < this._layout.pageCount) {
            _loc1_.push([]);
            _loc2_ += 1;
        }
        return _loc1_;
    }

    private createPointPageData(): number[][] {
        let _loc2_: number = 0;
        let _loc1_: number[][] = [];
        _loc2_ = 0;
        while (_loc2_ < this._layout.pageCount) {
            _loc1_.push([]);
            _loc2_ += 1;
        }
        return _loc1_;
    }

    private ensurePrizeSlots(param1: RewardTrackPrizeView[], param2: IWindowContainer, param3: number): void {
        let _loc4_: RewardTrackPrizeView = null;
        while (param1.length < param3) {
            _loc4_ = new RewardTrackPrizeView(param2);
            _loc4_.window.visible = false;
            this._content.addChild(_loc4_.window);
            param1.push(_loc4_);
            this._SafeStr_14995.push(_loc4_);
        }
    }

    private ensurePointIndicatorSlots(param1: number): void {
        let _loc2_: RewardTrackPointIndicatorView = null;
        while (this._SafeStr_14996.length < param1) {
            _loc2_ = new RewardTrackPointIndicatorView(this._SafeStr_14966);
            _loc2_.window.visible = false;
            this._SafeStr_14988.addChild(_loc2_.window);
            this._SafeStr_14996.push(_loc2_);
        }
    }

    private refreshPage(param1: boolean): void {
        this.refreshPrizeSlots(this._SafeStr_14993, this._freePagePrizes[this._pageIndex]);
        this.refreshPrizeSlots(this._SafeStr_14994, this._premiumPagePrizes[this._pageIndex]);
        this.refreshPointIndicatorSlots(this._pagePointValues[this._pageIndex]);
        this._SafeStr_3381.refreshByX(this._layout.xForPoints(this._SafeStr_5628.points, this._pageIndex) | 0, param1);
        this.refreshNavigation();
    }

    private refreshPrizeSlots(param1: RewardTrackPrizeView[], param2: RewardTrackPrize[]): void {
        let _loc4_: number = 0;
        let _loc5_: RewardTrackPrizeView = null;
        let _loc6_: RewardTrackPrize = null;
        let _loc3_: number = NaN;
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc5_ = param1[_loc4_];
            if (_loc4_ >= param2.length) {
                _loc5_.clear();
            } else {
                _loc6_ = param2[_loc4_];
                _loc5_.initialize(this._controller, this._SafeStr_5628, _loc6_);
                _loc3_ = this._layout.xForPoints(_loc6_.requiredPoints, this._pageIndex);
                _loc5_.window.x = Math.round(_loc3_ - _loc5_.window.width / 2) | 0;
                _loc5_.window.visible = true;
            }
            _loc4_ += 1;
        }
    }

    private refreshPointIndicatorSlots(param1: number[]): void {
        let _loc4_: number = 0;
        let _loc2_: RewardTrackPointIndicatorView = null;
        let _loc3_: number = NaN;
        _loc4_ = 0;
        while (_loc4_ < this._SafeStr_14996.length) {
            _loc2_ = this._SafeStr_14996[_loc4_];
            if (_loc4_ >= param1.length) {
                _loc2_.clear();
            } else {
                _loc2_.initialize(this._SafeStr_5628, param1[_loc4_]);
                _loc3_ = this._layout.xForPoints(param1[_loc4_], this._pageIndex);
                _loc2_.window.x = Math.round(_loc3_ - _loc2_.window.width / 2) | 0;
                _loc2_.window.visible = true;
            }
            _loc4_ += 1;
        }
    }

    private maxPrizeCount(param1: RewardTrackPrize[][]): number {
        let _loc2_: number = 0;
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = Math.max(_loc2_, _loc3_.length) | 0;
        }
        return _loc2_;
    }

    private maxPointIndicatorCount(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._pagePointValues ?? []) {
            _loc1_ = Math.max(_loc1_, _loc2_.length) | 0;
        }
        return _loc1_;
    }

    private refreshPrizeStates(): void {
        for (const _loc1_ of this._SafeStr_14995 ?? []) {
            if (_loc1_.prize != null) {
                _loc1_.refreshState();
            }
        }
    }

    private refreshPointIndicators(): void {
        for (const _loc1_ of this._SafeStr_14996 ?? []) {
            _loc1_.refreshAvailability();
        }
    }

    private getPrizeView(param1: RewardTrackPrize): RewardTrackPrizeView {
        for (const _loc2_ of this._SafeStr_14995 ?? []) {
            if (_loc2_.prize == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private refreshNavigation(): void {
        WindowUtils.disableSection(this._SafeStr_14990, this._pageIndex <= 0);
        WindowUtils.disableSection(this._SafeStr_4468, this._pageIndex >= this._layout.pageCount - 1);
        this.refreshUnclaimedIndicators();
    }

    private refreshUnclaimedIndicators(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        for (const _loc3_ of this._SafeStr_5628.prizes ?? []) {
            if (!(!_loc3_.isClaimable(this._SafeStr_5628) || this.isPrizeVisibleOnPage(_loc3_, this._pageIndex))) {
                if (this._layout.pageForPoints(_loc3_.requiredPoints) < this._pageIndex) {
                    _loc1_ += 1;
                } else {
                    _loc2_ += 1;
                }
            }
        }
        this.setUnclaimedIndicator(this._SafeStr_14991, this.previousUnclaimedCountText, _loc1_);
        this.setUnclaimedIndicator(this._SafeStr_14992, this.nextUnclaimedCountText, _loc2_);
    }

    private isPrizeVisibleOnPage(param1: RewardTrackPrize, param2: number): boolean {
        let _loc3_: RewardTrackPrize[] = param1.premium ? this._premiumPagePrizes[param2] : this._freePagePrizes[param2];
        return _loc3_.indexOf(param1) >= 0;
    }

    private setUnclaimedIndicator(param1: IWindowContainer, param2: ITextWindow, param3: number): void {
        param1.visible = param3 > 0;
        if (param3 > 0) {
            param2.text = String(param3);
        }
    }

    private onPreviousClicked = (param1: WindowMouseEvent): void => {
        if (this._pageIndex <= 0) {
            return;
        }
        this._pageIndex -= 1;
        this.refreshPage(false);
    };

    private onNextClicked = (param1: WindowMouseEvent): void => {
        if (this._pageIndex >= this._layout.pageCount - 1) {
            return;
        }
        this._pageIndex += 1;
        this.refreshPage(false);
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._SafeStr_14990.removeEventListener("WME_CLICK", this.onPreviousClicked);
        this._SafeStr_4468.removeEventListener("WME_CLICK", this.onNextClicked);
        for (const _loc2_ of this._SafeStr_14995 ?? []) {
            _loc2_.dispose();
        }
        for (const _loc1_ of this._SafeStr_14996 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_3381.dispose();
        this._SafeStr_14993 = null;
        this._SafeStr_14994 = null;
        this._SafeStr_14995 = null;
        this._SafeStr_14996 = null;
        this._freePagePrizes = null;
        this._premiumPagePrizes = null;
        this._pagePointValues = null;
        this._SafeStr_3381 = null;
        this._layout = null;
        this._controller = null;
        this._SafeStr_5628 = null;
        this._content = null;
        this._SafeStr_14988 = null;
        this._SafeStr_14989 = null;
        this._SafeStr_14964 = null;
        this._SafeStr_14965 = null;
        this._SafeStr_14966 = null;
        this._SafeStr_14990 = null;
        this._SafeStr_4468 = null;
        this._SafeStr_14991 = null;
        this._SafeStr_14992 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get previousUnclaimedCountText(): ITextWindow {
        return asGuarded(this._SafeStr_14991.findChildByName("previous_unclaimed_count"), isITextWindow);
    }

    private get nextUnclaimedCountText(): ITextWindow {
        return asGuarded(this._SafeStr_14992.findChildByName("next_unclaimed_count"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
