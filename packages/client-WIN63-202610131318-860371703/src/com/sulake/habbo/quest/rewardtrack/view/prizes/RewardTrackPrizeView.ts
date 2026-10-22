import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import type { RewardTrackPrize } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackPrize';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { RewardTrackRewardDisplayWrapper } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackRewardDisplayWrapper';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class RewardTrackPrizeView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.prizes::RewardTrackPrizeView'); }

    private static readonly _SafeStr_14979: number = 3;

    declare private _controller: RewardTrackController;

    declare private _SafeStr_5628: RewardTrack;

    declare private _SafeStr_14980: RewardTrackPrize;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14981: number;
    static { (this.prototype as any)._SafeStr_14981 = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._SafeStr_14981 = this.productIcon.y;
        this.clickRegion.addEventListener("WME_CLICK", this.onClick);
    }

    public initialize(param1: RewardTrackController, param2: RewardTrack, param3: RewardTrackPrize): void {
        this._controller = param1;
        this._SafeStr_5628 = param2;
        this._SafeStr_14980 = param3;
        this.refresh();
    }

    public refresh(): void {
        (asGuarded(this.productIcon.widget, isIProductIconWidget)).productInfo = new RewardTrackRewardDisplayWrapper(this._SafeStr_14980);
        this.quantityContainer.visible = this._SafeStr_14980.rewardAmount > 1;
        this.quantityText.text = String(this._SafeStr_14980.rewardAmount);
        this.productIcon.y = this._SafeStr_14980.rewardAmount > 1 ? this._SafeStr_14981 - 3 : this._SafeStr_14981;
        this.refreshState();
    }

    public refreshState(): void {
        this.claimedIcon.visible = this._SafeStr_14980.claimed;
        this.lockedIcon.visible = this._SafeStr_14980.isPremiumLocked(this._SafeStr_5628);
        if (this._SafeStr_14980.claimed) {
            this.clickRegion.toolTipCaption = "${reward_track.rewards.reward_tooltip.claimed}";
        } else if (this._SafeStr_14980.isPremiumLocked(this._SafeStr_5628)) {
            this.clickRegion.toolTipCaption = "${reward_track.rewards.reward_tooltip.premium}";
        } else if (!this._SafeStr_14980.isAvailable(this._SafeStr_5628)) {
            this.clickRegion.toolTipCaption = "${reward_track.rewards.reward_tooltip.not_enough_points}";
        } else {
            this.clickRegion.toolTipCaption = "${reward_track.rewards.reward_tooltip.claim}";
        }
        WindowUtils.disableSection(this._window, !this._SafeStr_14980.hasEnoughPoints(this._SafeStr_5628), 0.75);
    }

    public clear(): void {
        this._controller = null;
        this._SafeStr_5628 = null;
        this._SafeStr_14980 = null;
        this._window.visible = false;
    }

    private onClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14980 == null) {
            return;
        }
        if (this._SafeStr_14980.claimed) {
            return;
        }
        if (this._SafeStr_14980.isPremiumLocked(this._SafeStr_5628)) {
            this._controller.openPremiumPurchaseConfirmation(this._SafeStr_5628);
            return;
        }
        if (this._SafeStr_14980.isClaimable(this._SafeStr_5628)) {
            this._controller.claimPrize(this._SafeStr_5628.id, this._SafeStr_14980.id);
        }
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._window.parent != null) {
            castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._window);
        }
        this.clickRegion.removeEventListener("WME_CLICK", this.onClick);
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._SafeStr_5628 = null;
        this._SafeStr_14980 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get prize(): RewardTrackPrize {
        return this._SafeStr_14980;
    }

    private get clickRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("click_region"), isIRegionWindow);
    }

    private get productIcon(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("product_icon"), isIWidgetWindow);
    }

    private get quantityContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("quantity_container"), isIWindowContainer);
    }

    private get quantityText(): ITextWindow {
        return asGuarded(this.quantityContainer.getChildAt(0), isITextWindow);
    }

    private get lockedIcon(): IWindow {
        return this._window.findChildByName("locked_icon");
    }

    private get claimedIcon(): IWindow {
        return this._window.findChildByName("claimed_icon");
    }

    get [IDisposable](): true {
        return true;
    }
}
