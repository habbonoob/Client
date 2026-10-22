import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import type { HabbiconTileView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconTileView';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';

export class HabbiconRewardPanelView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconRewardPanelView'); }

    declare private _controller: HabbiconController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14878: HabbiconSetModel;

    declare private _SafeStr_14911: (...args: any[]) => any;

    declare private _SafeStr_14912: IWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabbiconController, param2: IWindowContainer, param3: (...args: any[]) => any) {
        this._controller = param1;
        this._window = param2;
        this._SafeStr_14911 = param3;
        this.rewardHabbicon.disposesBitmap = true;
        this.rewardActionButton.addEventListener("WME_CLICK", this.onClaimClicked);
        if (this.rewardBuyButton != null) {
            this.rewardBuyButton.addEventListener("WME_CLICK", this.onBuyClicked);
        }
        if (this._SafeStr_14911 != null && this.rewardTile != null) {
            this._SafeStr_14912 = this.rewardHabbiconFrame ?? this.rewardHabbicon;
            this._SafeStr_14912.addEventListener("WME_CLICK", this.onRewardTileClick);
        }
    }

    public refresh(param1: HabbiconSetModel, param2: boolean): void {
        this._SafeStr_14878 = param1;
        if (this._SafeStr_14878 == null || this._SafeStr_14878.rewardHabbicon == null) {
            this.rewardPanel.visible = false;
            if (this.rewardBuyContainer != null) {
                this.rewardBuyContainer.visible = false;
            }
            this.rewardActionButton.visible = false;
            this.rewardActionButton.caption = "${habbicon_reward.claim}";
            WindowUtils.disableSection(this.rewardActionButton, true);
            this.clearRewardBitmap();
            return;
        }
        let _loc3_: HabbiconEntryModel = this._SafeStr_14878.rewardHabbicon;
        let _loc6_: boolean = this.isRewardOwned(_loc3_);
        let _loc4_: boolean = this.isRewardClaimable(_loc3_);
        let _loc7_: boolean = this.isRewardBuyable(this._SafeStr_14878, _loc3_);
        let _loc5_: string = _loc4_ ? this._controller.localizationManager.getLocalization("habbicon_book.reward.claimable", "Reward ready to claim.") : (_loc6_ ? this._controller.localizationManager.getLocalization("habbicon_book.reward.claimed", "Reward claimed.") : this._controller.localizationManager.getLocalization("habbicon_book.reward.locked", "Complete this set to unlock the reward."));
        this.rewardPanel.visible = true;
        this.updateRewardBitmap(_loc3_);
        this.rewardTitle.text = "${habbicon_book.reward.title}";
        this.rewardDescription.text = _loc5_;
        this.rewardActionButton.visible = true;
        this.rewardActionButton.caption = _loc6_ ? "${habbicon_reward.claimed}" : "${habbicon_reward.claim}";
        WindowUtils.disableSection(this.rewardActionButton, !_loc4_);
        if (this.rewardBuyContainer != null) {
            this.rewardBuyContainer.visible = _loc7_;
        }
        if (_loc7_) {
            this.rewardBuyPrice.text = this.formatPrice(this._SafeStr_14878.priceCredits, this._SafeStr_14878.priceActivityPoints);
            this.rewardBuyCurrencyIcon.style = this.getPriceIconStyle(this._SafeStr_14878.priceCredits, this._SafeStr_14878.priceActivityPoints, this._SafeStr_14878.activityPointType) >>> 0;
            this.rewardBuyCurrencyIcon.fitToSize();
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.rewardActionButton.removeEventListener("WME_CLICK", this.onClaimClicked);
        if (this.rewardBuyButton != null) {
            this.rewardBuyButton.removeEventListener("WME_CLICK", this.onBuyClicked);
        }
        if (this._SafeStr_14912 != null) {
            this._SafeStr_14912.removeEventListener("WME_CLICK", this.onRewardTileClick);
            this._SafeStr_14912 = null;
        }
        this.clearRewardBitmap();
        this._controller = null;
        this._window = null;
        this._SafeStr_14878 = null;
        this._SafeStr_14911 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get rewardTile(): HabbiconTileView {
        return null;
    }

    public update(param1: number): void {
    }

    private updateRewardBitmap(param1: HabbiconEntryModel): void {
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(param1.habbiconId, false);
        this.clearRewardBitmap();
        this.rewardHabbicon.bitmap = _loc2_ != null ? _loc2_.clone() : new BitmapData(40, 40, false, 9408399);
        this.rewardHabbicon.visible = true;
        this.rewardHabbicon.invalidate();
    }

    private clearRewardBitmap(): void {
        if (this.rewardHabbicon.bitmap != null) {
            this.rewardHabbicon.bitmap = null;
            this.rewardHabbicon.invalidate();
        }
    }

    private isRewardOwned(param1: HabbiconEntryModel): boolean {
        return param1 != null && (param1.owned || param1.favorite);
    }

    private isRewardClaimable(param1: HabbiconEntryModel): boolean {
        return param1 != null && param1.claimable && !this.isRewardOwned(param1);
    }

    private isRewardBuyable(param1: HabbiconSetModel, param2: HabbiconEntryModel): boolean {
        return param1 != null && param1.canBuy && param2 != null && !param2.owned && !param2.favorite && !param2.claimable;
    }

    private formatPrice(param1: number, param2: number): string {
        if (param1 > 0 && param2 > 0) {
            return param1 + "c + " + param2;
        }
        if (param1 > 0) {
            return param1.toString();
        }
        return Math.max(0, param2).toString();
    }

    private getPriceIconStyle(param1: number, param2: number, param3: number): number {
        let _loc4_: number = param2 > 0 ? param3 : 7;
        return ActivityPointTypeEnum.getIconStyleFor(_loc4_, this._controller.configuration, false);
    }

    private onClaimClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: HabbiconEntryModel = this._SafeStr_14878 != null ? this._SafeStr_14878.rewardHabbicon : null;
        if (this.isRewardClaimable(_loc2_)) {
            this._controller.claimHabbicon(_loc2_.habbiconId);
        }
    };

    private onBuyClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: HabbiconEntryModel = this._SafeStr_14878 != null ? this._SafeStr_14878.rewardHabbicon : null;
        if (this.isRewardBuyable(this._SafeStr_14878, _loc2_)) {
            this._controller.openHabbiconSetPurchaseConfirmation(this._SafeStr_14878);
        }
    };

    private onRewardTileClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_14911 != null && this.rewardTile != null) {
            this._SafeStr_14911(this.rewardTile);
        }
    };

    private get rewardPanel(): IWindowContainer {
        return asGuarded(this._window.findChildByName("reward_panel"), isIWindowContainer);
    }

    private get rewardTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("reward_title"), isITextWindow);
    }

    private get rewardHabbiconFrame(): IWindow {
        return this._window.findChildByName("reward_habbicon_frame");
    }

    private get rewardHabbicon(): IBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("reward_habbicon"), isIBitmapWrapperWindow);
    }

    private get rewardDescription(): ITextWindow {
        return asGuarded(this._window.findChildByName("reward_description"), isITextWindow);
    }

    private get rewardActionButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("reward_action_button"), isIButtonWindow);
    }

    private get rewardBuyContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("reward_buy_container"), isIWindowContainer);
    }

    private get rewardBuyPrice(): ITextWindow {
        return asGuarded(this._window.findChildByName("reward_buy_price"), isITextWindow);
    }

    private get rewardBuyCurrencyIcon(): IIconWindow {
        return asGuarded(this._window.findChildByName("reward_buy_currency_icon"), isIIconWindow);
    }

    private get rewardBuyButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("reward_buy_button"), isIButtonWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
