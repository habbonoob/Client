import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RewardTrackPremiumPurchaseConfirmationView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.premium::RewardTrackPremiumPurchaseConfirmationView'); }

    private static readonly RETRY_ENABLE_DELAY_MS: number = 500;

    declare private _controller: RewardTrackController;

    declare private _SafeStr_5628: RewardTrack;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14880: Timer;

    declare private _SafeStr_14881: boolean;
    static { (this.prototype as any)._SafeStr_14881 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: RewardTrackController, param2: RewardTrack) {
        this._controller = param1;
        this._SafeStr_5628 = param2;
        this._window = asGuarded(this._controller.windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("reward_track_premium_purchase_confirmation_xml").content), 1), isIWindowContainer);
        this._window.enableLookupCache();
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.cancelButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.confirmButton.addEventListener("WME_CLICK", this.onConfirmClicked);
        this.initializeUI();
    }

    private initializeUI(): void {
        this.boostBenefitText.text = this._controller.localizationManager.getLocalizationWithParams("reward_track.premium.confirm.benefit.boost", "", "percent", Math.round((this._SafeStr_5628.taskPointsBoost - 1) * 100));
        this.instantPointsBenefitText.text = this._controller.localizationManager.getLocalizationWithParams("reward_track.premium.confirm.benefit.instant_points", "", "points", this._SafeStr_5628.instantPoints);
        this.boostBenefitRow.visible = this._SafeStr_5628.taskPointsBoost > 1;
        this.rewardsBenefitRow.visible = this._SafeStr_5628.hasPremiumPrizes;
        this.instantPointsBenefitRow.visible = this._SafeStr_5628.instantPoints > 0;
        this.tasksBenefitRow.visible = this._SafeStr_5628.hasPremiumTasks;
        this.levelsBenefitRow.visible = this._SafeStr_5628.hasPremiumLevels;
        this.priceCreditsText.text = String(this._SafeStr_5628.costCredits);
        this.priceDiamondsText.text = String(this._SafeStr_5628.costDiamonds);
        this.priceCreditsText.visible = this._SafeStr_5628.costCredits > 0;
        this.creditsIcon.visible = this._SafeStr_5628.costCredits > 0;
        this.priceDiamondsText.visible = this._SafeStr_5628.costDiamonds > 0;
        this.diamondsIcon.visible = this._SafeStr_5628.costDiamonds > 0;
        this.pricePlusText.visible = this._SafeStr_5628.costCredits > 0 && this._SafeStr_5628.costDiamonds > 0;
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._window.parent == null) {
            _loc1_ = this._controller.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
        this._window.center();
        this._window.activate();
    }

    public purchaseFailed(): void {
        if (this._SafeStr_14880 != null) {
            this._SafeStr_14880.stop();
            this._SafeStr_14880.removeEventListener("timerComplete", this.onRetryTimerComplete);
        }
        this._SafeStr_14880 = new Timer(500, 1);
        this._SafeStr_14880.addEventListener("timerComplete", this.onRetryTimerComplete);
        this._SafeStr_14880.start();
    }

    private onConfirmClicked = (param1: WindowMouseEvent): void => {
        this.setPending(true);
        this._controller.purchasePremium(this._SafeStr_5628.id);
    };

    private onRetryTimerComplete = (param1: TimerEvent): void => {
        this._SafeStr_14880.removeEventListener("timerComplete", this.onRetryTimerComplete);
        this._SafeStr_14880 = null;
        this.setPending(false);
    };

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._SafeStr_14881) {
            return;
        }
        this._controller.closePremiumPurchaseConfirmation();
    };

    public setPending(param1: boolean): void {
        this._SafeStr_14881 = param1;
        if (this._SafeStr_14881) {
            this.confirmButton.disable();
            this.cancelButton.disable();
            this.closeButton.disable();
            return;
        }
        this.confirmButton.enable();
        this.cancelButton.enable();
        this.closeButton.enable();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_14880 != null) {
            this._SafeStr_14880.stop();
            this._SafeStr_14880.removeEventListener("timerComplete", this.onRetryTimerComplete);
            this._SafeStr_14880 = null;
        }
        this.closeButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this.cancelButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this.confirmButton.removeEventListener("WME_CLICK", this.onConfirmClicked);
        if (this._window.parent != null) {
            castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._window);
        }
        this._window.dispose();
        this._window = null;
        this._controller = null;
        this._SafeStr_5628 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get benefitsList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("benefits"), isIItemListWindow);
    }

    private get boostBenefitRow(): IWindow {
        return this.benefitsList.findChildByName("benefit_boost_row");
    }

    private get boostBenefitText(): ITextWindow {
        return asGuarded(this.benefitsList.findChildByName("benefit_boost_txt"), isITextWindow);
    }

    private get rewardsBenefitRow(): IWindow {
        return this.benefitsList.findChildByName("benefit_rewards_row");
    }

    private get rewardsBenefitText(): ITextWindow {
        return asGuarded(this.benefitsList.findChildByName("benefit_rewards_txt"), isITextWindow);
    }

    private get instantPointsBenefitRow(): IWindow {
        return this.benefitsList.findChildByName("benefit_instant_points_row");
    }

    private get instantPointsBenefitText(): ITextWindow {
        return asGuarded(this.benefitsList.findChildByName("benefit_instant_points_txt"), isITextWindow);
    }

    private get tasksBenefitRow(): IWindow {
        return this.benefitsList.findChildByName("benefit_tasks_row");
    }

    private get tasksBenefitText(): ITextWindow {
        return asGuarded(this.benefitsList.findChildByName("benefit_tasks_txt"), isITextWindow);
    }

    private get levelsBenefitRow(): IWindow {
        return this.benefitsList.findChildByName("benefit_levels_row");
    }

    private get levelsBenefitText(): ITextWindow {
        return asGuarded(this.benefitsList.findChildByName("benefit_levels_txt"), isITextWindow);
    }

    private get priceCreditsText(): ITextWindow {
        return asGuarded(this._window.findChildByName("price_credits"), isITextWindow);
    }

    private get pricePlusText(): ITextWindow {
        return asGuarded(this._window.findChildByName("plus_txt"), isITextWindow);
    }

    private get priceDiamondsText(): ITextWindow {
        return asGuarded(this._window.findChildByName("price_diamonds"), isITextWindow);
    }

    private get creditsIcon(): IWindow {
        return this._window.findChildByName("credits_icon");
    }

    private get diamondsIcon(): IWindow {
        return this._window.findChildByName("diamonds_icon");
    }

    private get cancelButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("cancel_button"), isIButtonWindow);
    }

    private get confirmButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("confirm_button"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
