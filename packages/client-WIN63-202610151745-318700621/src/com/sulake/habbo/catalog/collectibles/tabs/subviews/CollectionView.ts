import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IRenderableCollectibleItem } from '@/com/sulake/habbo/catalog/collectibles/IRenderableCollectibleItem';
import type { CollectionsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/CollectionsTab';
import type { CollectibleItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleItem';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { DateTimeFormatter } from '@habbo-pixi/runtime/globalization/DateTimeFormatter';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CollectibleItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/collections/CollectibleItemRenderer';
import { CollectionProgressColorUtil } from '@/com/sulake/habbo/catalog/collectibles/renderer/collections/CollectionProgressColorUtil';
import { CollectionItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/CollectionItemWrapper';
import { CollectibleProductPreviewer } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/CollectibleProductPreviewer';
import { NftCollectiblesClaimBonusItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/NftCollectiblesClaimBonusItemMessageComposer';
import { NftCollectiblesClaimRewardItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/collectibles/NftCollectiblesClaimRewardItemMessageComposer';
import { NftCollection } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftCollection';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class CollectionView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs.subviews::CollectionView'); }

    private static PREVIEW_STATUS_NONE: number = 0;
    private static PREVIEW_STATUS_BONUS: number = 1;
    private static PREVIEW_STATUS_REWARD: number = 2;
    private static PREVIEW_STATUS_COLLECTION: number = 3;
    private static PREVIEW_STATUS_ITEM: number = 4;
    private static BONUS_PROGRESS_ACTIVE_TOP_COLOR: number = 37130;
    private static BONUS_PROGRESS_ACTIVE_BOTTOM_COLOR: number = 228352;
    private static BONUS_PROGRESS_EXPIRED_TOP_COLOR: number = 4294913325;
    private static BONUS_PROGRESS_EXPIRED_BOTTOM_COLOR: number = 4289724416;
    private static PROGRESS_BAR_UPDATE_THRESHOLD: number = 1000;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _collectionsWidget: CollectionsTab;

    declare private _container: IWindowContainer;

    declare private _nftCollection: NftCollection;

    declare private _previewStatus: number;
    static { (this.prototype as any)._previewStatus = 0; }

    declare private _SafeStr_4585: number;
    static { (this.prototype as any)._SafeStr_4585 = NaN; }

    declare private _gridItems: CollectibleItemRenderer[];

    declare private _selectedItem: CollectibleItemRenderer;

    declare private _SafeStr_4176: CollectibleProductPreviewer;

    declare private _SafeStr_4438: DateTimeFormatter;

    declare private _SafeStr_14837: boolean;
    static { (this.prototype as any)._SafeStr_14837 = false; }

    constructor(param1: CollectionsTab, param2: IWindowContainer, param3: NftCollection) {
        this._collectionsWidget = param1;
        this._container = param2;
        this._nftCollection = param3;
        this._gridItems = [];
        this._SafeStr_4438 = new DateTimeFormatter("i-default");
        this._SafeStr_4438.setDateTimePattern("dd/MM/yyyy");
        this._previewStatus = CollectionView.PREVIEW_STATUS_NONE;
        this._SafeStr_4176 = new CollectibleProductPreviewer(this.productPreviewBitmap, this.badgeImageWidget, this.petImageWidget, this.unknownImageWindow, this.avatarImageWidget, this.placeholderImage, this.effectImageWidget, param1.controller.avatarRenderManager);
        this.initHeader();
        this.initCollectionPreview();
        this.populateGridItems();
        this.productNameContainer.addEventListener("WME_OVER", this.onProductNameHover);
        this.productNameContainer.addEventListener("WME_OUT", this.onProductNameUnhover);
        this.claimButton.addEventListener("WME_CLICK", this.onClickClaim);
    }

    private initHeader(): void {
        this.titleText.caption = this.localization.getLocalization("collectibles.set." + this._nftCollection.collectionId, this._nftCollection.collectionName);
        let _loc1_: number = this._nftCollection.collectedItemCount;
        let _loc2_: number = this._nftCollection.totalItemCount;
        this.progressText.caption = _loc1_ + "/" + _loc2_;
        let _loc3_: number = CollectionProgressColorUtil.getColor(_loc1_, _loc2_);
        this.progressColorContainer.color = _loc3_;
    }

    private initCollectionPreview(): void {
        let _loc2_: CollectibleItem = this.initRewardClaim();
        let _loc1_: boolean = this._nftCollection.collectedItemCount == this._nftCollection.totalItemCount;
        this.collectionProgressContainer.visible = true;
        this.collectionProgressScoreText.caption = this.localization.getLocalizationWithParams("collectibles.preview.score", "", "progress", "<font color=\"#00FF12\">" + this._nftCollection.collectionScore + "</font>", "goal", this._nftCollection.collectionTotalScore + "");
        this.collectionProgressRewardText.caption = this.localization.getLocalizationWithParams(_loc1_ ? "collectibles.preview.reward_collected" : "collectibles.preview.reward", "", "amount", "<font color=\"#FFC800\">" + this._nftCollection.collectionBoostScore + "</font>");
        this.productNameContainer.visible = false;
        this.productProgressContainer.visible = false;
        this.setProductInfoVisible(false);
        if (_loc2_ == null) {
            this._SafeStr_4176.setPlaceholder();
        } else {
            this._collectionsWidget.controller.previewImage(new CollectionItemWrapper(_loc2_), this._SafeStr_4176);
        }
    }

    private initRewardClaim(): CollectibleItem {
        let _loc5_: boolean = this.nftCollection.hasRewardItem;
        let _loc4_: boolean = this.nftCollection.hasBonusItem;
        let _loc3_: boolean = this.nftCollection.rewardClaimed;
        let _loc2_: boolean = this.nftCollection.canClaimReward;
        let _loc1_: boolean = this.nftCollection.bonusClaimed;
        let _loc6_: boolean = this.nftCollection.canClaimBonus;
        if (_loc6_) {
            this.initRewardItem(this._nftCollection.bonusItem, true, true);
            return this._nftCollection.bonusItem;
        }
        if (_loc2_) {
            this.initRewardItem(this._nftCollection.rewardItem, true, false);
            return this._nftCollection.rewardItem;
        }
        if (_loc4_ && !_loc1_) {
            this.initRewardItem(this._nftCollection.bonusItem, _loc6_, true);
            return this._nftCollection.bonusItem;
        }
        if (_loc5_ && !_loc3_) {
            this.initRewardItem(this._nftCollection.rewardItem, _loc2_, false);
            return this._nftCollection.rewardItem;
        }
        this._previewStatus = CollectionView.PREVIEW_STATUS_COLLECTION;
        this.completionContainer.visible = false;
        return null;
    }

    private initRewardItem(param1: CollectibleItem, param2: boolean, param3: boolean): void {
        this._previewStatus = param3 ? CollectionView.PREVIEW_STATUS_BONUS : CollectionView.PREVIEW_STATUS_REWARD;
        this.completionContainer.visible = true;
        this.completionRewardNameText.caption = this._collectionsWidget.controller.getProductName(new CollectionItemWrapper(param1));
        this.completionProgressBar.visible = param3;
        this.completionHeaderContainer.height = param3 ? 60 : 38;
        if (param3) {
            this.updateBonusProgressBar();
        }
        let _loc4_: number = param3 ? this.nftCollection.claimingBonusStatus : this.nftCollection.claimingRewardStatus;
        if (_loc4_ == NftCollection._SafeStr_3827) {
            this.claimButton.enable();
        } else {
            this.claimButton.disable();
        }
        this.claimButton.visible = param2;
    }

    private onClickClaim = (param1: WindowMouseEvent): void => {
        if (this._collectionsWidget.activeWallet == null) {
            return;
        }
        if (this._previewStatus == CollectionView.PREVIEW_STATUS_BONUS) {
            this._nftCollection.claimBonusAwaiting();
            this._collectionsWidget.controller.send(new NftCollectiblesClaimBonusItemMessageComposer(this.nftCollection.collectionId, this._collectionsWidget.activeWallet));
            this._collectionsWidget.sendClaimWaitNotification();
        } else {
            if (this._previewStatus != CollectionView.PREVIEW_STATUS_REWARD) {
                return;
            }
            this._nftCollection.claimRewardAwaiting();
            this._collectionsWidget.controller.send(new NftCollectiblesClaimRewardItemMessageComposer(this.nftCollection.collectionId, this._collectionsWidget.activeWallet));
            this._collectionsWidget.sendClaimWaitNotification();
        }
        this.claimButton.disable();
    };

    public claimingFinished(param1: boolean, param2: boolean): void {
        if (this._previewStatus == CollectionView.PREVIEW_STATUS_REWARD || this._previewStatus == CollectionView.PREVIEW_STATUS_BONUS) {
            this.initCollectionPreview();
        }
    }

    public updateBonusProgressBar(param1: boolean = true, param2: number = 0): void {
        this._SafeStr_4585 += param2;
        if (this._previewStatus != CollectionView.PREVIEW_STATUS_BONUS) {
            return;
        }
        let _loc4_: number = this._nftCollection.releasedTime;
        let _loc5_: number = this._nftCollection.snapshotTime;
        let _loc3_: number = Number(new Date().getTime());
        let _loc6_: boolean = param1 || this._SafeStr_4585 >= CollectionView.PROGRESS_BAR_UPDATE_THRESHOLD || this.hasBonusClaimWindow(_loc4_, _loc5_) && _loc3_ >= _loc5_ && !this._SafeStr_14837;
        if (!_loc6_) {
            return;
        }
        this._SafeStr_4585 = 0;
        if (!this.hasBonusClaimWindow(_loc4_, _loc5_)) {
            this._SafeStr_14837 = false;
            this.completionProgressBar.visible = false;
            this.completionHeaderContainer.height = 38;
            return;
        }
        this.completionProgressBar.visible = true;
        this.completionHeaderContainer.height = 60;
        if (_loc3_ >= _loc5_) {
            this.showExpiredBonusClaimState(_loc5_);
            this._SafeStr_14837 = true;
            return;
        }
        this._SafeStr_14837 = false;
        this.showActiveBonusClaimTimer(_loc4_, _loc5_, _loc3_);
    }

    private hasBonusClaimWindow(param1: number, param2: number): boolean {
        return !isNaN(param1) && !isNaN(param2) && param1 != -1 && param2 != -1;
    }

    private showActiveBonusClaimTimer(param1: number, param2: number, param3: number): void {
        this.completionProgressBarTop.color = CollectionView.BONUS_PROGRESS_ACTIVE_TOP_COLOR;
        this.completionProgressBarBottom.color = CollectionView.BONUS_PROGRESS_ACTIVE_BOTTOM_COLOR;
        let _loc6_: number = Number(Math.max(0, param2 - param3));
        let _loc4_: number = param2 - param1;
        let _loc5_: number = _loc4_ <= 0 ? 1 : Number(Math.min(1, Math.max(0, _loc6_ / _loc4_)));
        let _loc7_: number = this.completionProgressBarPadded.width * _loc5_ | 0;
        this.completionProgressBarTop.width = _loc7_;
        this.completionProgressBarBottom.width = _loc7_;
        this.completionProgressBarTop.invalidate();
        this.completionProgressBarBottom.invalidate();
        let _loc8_: string = FriendlyTime.getFriendlyTime(this.localization, _loc6_ / 1000);
        this.completionProgressBarText.caption = this.localization.getLocalizationWithParams("collectibles.preview.time_left", "") + ": " + _loc8_;
    }

    private showExpiredBonusClaimState(param1: number): void {
        this.completionProgressBarTop.color = CollectionView.BONUS_PROGRESS_EXPIRED_TOP_COLOR;
        this.completionProgressBarBottom.color = CollectionView.BONUS_PROGRESS_EXPIRED_BOTTOM_COLOR;
        this.completionProgressBarTop.width = this.completionProgressBarPadded.width;
        this.completionProgressBarBottom.width = this.completionProgressBarPadded.width;
        this.completionProgressBarTop.invalidate();
        this.completionProgressBarBottom.invalidate();
        let _loc2_: string = this._SafeStr_4438.format(new Date(param1));
        this.completionProgressBarText.caption = this.localization.getLocalizationWithParams("collectibles.preview.bonus_claim_ended", "Bonus item claim period ended - %date%", "date", _loc2_);
    }

    private initMintedItemPreview(param1: CollectibleItem): void {
        this._previewStatus = CollectionView.PREVIEW_STATUS_ITEM;
        this.completionContainer.visible = false;
        this.collectionProgressContainer.visible = false;
        this._SafeStr_4176.clearPreviewer();
        let _loc2_: IRenderableCollectibleItem = new CollectionItemWrapper(param1);
        this._collectionsWidget.controller.previewImage(_loc2_, this._SafeStr_4176);
        this.productNameContainer.visible = true;
        this.productNameText.caption = this._collectionsWidget.controller.getProductName(_loc2_);
        this.productProgressContainer.visible = true;
        this.productProgressScoreText.caption = this.localization.getLocalizationWithParams(param1.amount > 0 ? "collectibles.preview.product.complete" : "collectibles.preview.product.incomplete", "", "amount", "<font color=\"#FFC800\">" + param1.score + "</font>");
        this.initInfoEntries(param1);
    }

    private initInfoEntries(param1: CollectibleItem): void {
        this.clearInfoEntries();
        let _loc3_: string = this.localization.getLocalization("collectibles.item.type");
        let _loc6_: string = this.localization.getLocalization("collectibles.item.rarity");
        let _loc7_: string = this.localization.getLocalization("collectibles.item.xp");
        let _loc5_: string = this._collectionsWidget.controller.getProductType(new CollectionItemWrapper(param1));
        let _loc2_: string = param1.rarity;
        let _loc4_: string = String(param1.score);
        this.addInfoEntry(_loc3_, _loc5_);
        this.addInfoEntry(_loc6_, _loc2_);
        this.addInfoEntry(_loc7_, _loc4_);
    }

    private addInfoEntry(param1: string, param2: string): void {
        let _loc3_: IWindowContainer = asGuarded(this._collectionsWidget.productInfoEntryTemplate.clone(), isIWindowContainer);
        _loc3_.findChildByName("product_info_key").caption = param1;
        _loc3_.findChildByName("product_info_value").caption = param2;
        this.productInfoList.addListItem(_loc3_);
    }

    private clearInfoEntries(): void {
        this.productInfoList.removeListItems();
    }

    private setProductInfoVisible(param1: boolean): void {
        this.productInfoContainer.visible = param1;
    }

    private onProductNameUnhover = (param1: WindowMouseEvent): void => {
        this.setProductInfoVisible(false);
    };

    private onProductNameHover = (param1: WindowMouseEvent): void => {
        this.setProductInfoVisible(true);
    };

    public populateGridItems(): void {
        let _loc4_: IWindowContainer = null;
        let _loc3_: CollectibleItemRenderer = null;
        this.clearGridItems();
        let _loc1_: IWindowContainer = this._collectionsWidget.gridItemTemplate;
        for (const _loc2_ of this._nftCollection.items ?? []) {
            _loc4_ = asGuarded(_loc1_.clone(), isIWindowContainer);
            _loc3_ = new CollectibleItemRenderer(this._collectionsWidget.controller, _loc2_, _loc4_, this);
            this.itemGrid.addGridItem(_loc4_);
            this._gridItems.push(_loc3_);
        }
    }

    public clearGridItems(): void {
        if (this._gridItems) {
            for (const _loc1_ of this._gridItems ?? []) {
                _loc1_.dispose();
            }
            this._gridItems.length = 0;
        }
        if (this.itemGrid) {
            this.itemGrid.destroyGridItems();
        }
    }

    public get nftCollection(): NftCollection {
        return this._nftCollection;
    }

    public selectItem(param1: CollectibleItemRenderer): void {
        if (this._selectedItem == param1) {
            this._selectedItem.deactivate();
            this._selectedItem = null;
            this.initCollectionPreview();
            return;
        }
        if (this._selectedItem != null) {
            this._selectedItem.deactivate();
            this._selectedItem = null;
        }
        if (param1 != null) {
            this._selectedItem = param1;
            this._selectedItem.activate();
            this.initMintedItemPreview(param1.item);
        } else {
            this._selectedItem = null;
            this.initCollectionPreview();
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_4176.clearPreviewer();
        this.clearInfoEntries();
        this.clearGridItems();
        this.productNameContainer.removeEventListener("WME_OVER", this.onProductNameHover);
        this.productNameContainer.removeEventListener("WME_OUT", this.onProductNameUnhover);
        this.claimButton.removeEventListener("WME_CLICK", this.onClickClaim);
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get localization(): IHabboLocalizationManager {
        return this._collectionsWidget.controller.localizationManager;
    }

    private get titleText(): ITextWindow {
        return asGuarded(this._container.findChildByName("collection_name"), isITextWindow);
    }

    private get progressColorContainer(): IBorderWindow {
        return asGuarded(this._container.findChildByName("progress_color"), isIBorderWindow);
    }

    private get progressText(): ITextWindow {
        return asGuarded(this._container.findChildByName("progress_text"), isITextWindow);
    }

    private get completionContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("bonus_or_reward_container"), isIWindowContainer);
    }

    private get completionHeaderContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("completion_header_container"), isIWindowContainer);
    }

    private get completionRewardNameText(): ITextWindow {
        return asGuarded(this._container.findChildByName("reward_furni_name"), isITextWindow);
    }

    private get completionProgressBar(): IWindowContainer {
        return asGuarded(this._container.findChildByName("progress_bar"), isIWindowContainer);
    }

    private get completionProgressBarPadded(): IWindowContainer {
        return asGuarded(this._container.findChildByName("progress_padded_bar"), isIWindowContainer);
    }

    private get completionProgressBarTop(): IWindowContainer {
        return asGuarded(this._container.findChildByName("progress_bar_top"), isIWindowContainer);
    }

    private get completionProgressBarBottom(): IWindowContainer {
        return asGuarded(this._container.findChildByName("progress_bar_bottom"), isIWindowContainer);
    }

    private get completionProgressBarText(): ITextWindow {
        return asGuarded(this._container.findChildByName("progress_bar_text"), isITextWindow);
    }

    private get claimButton(): IButtonWindow {
        return asGuarded(this._container.findChildByName("claim_button"), isIButtonWindow);
    }

    private get collectionProgressContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("collection_progress_container"), isIWindowContainer);
    }

    private get collectionProgressScoreText(): ITextWindow {
        return asGuarded(this._container.findChildByName("preview_score_text"), isITextWindow);
    }

    private get collectionProgressRewardText(): ITextWindow {
        return asGuarded(this._container.findChildByName("preview_reward_text"), isITextWindow);
    }

    private get placeholderImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("placeholder_image"), isIStaticBitmapWrapperWindow);
    }

    private get productPreviewBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("product_preview"), isIBitmapWrapperWindow);
    }

    private get productNameContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("product_name_container"), isIWindowContainer);
    }

    private get productNameText(): ITextWindow {
        return asGuarded(this._container.findChildByName("preview_furni_name"), isITextWindow);
    }

    private get productInfoContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("product_info_container"), isIWindowContainer);
    }

    private get productInfoList(): IItemListWindow {
        return asGuarded(this._container.findChildByName("product_info_list"), isIItemListWindow);
    }

    private get productProgressContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("product_progress_container"), isIWindowContainer);
    }

    private get productProgressScoreText(): ITextWindow {
        return asGuarded(this._container.findChildByName("procuct_score_text"), isITextWindow);
    }

    private get itemGrid(): IItemGridWindow {
        return asGuarded(this._container.findChildByName("itemgrid_collection"), isIItemGridWindow);
    }

    private get avatarImageWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("avatar_image_widget"), isIWidgetWindow);
    }

    private get badgeImageWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("badge_image_widget"), isIWidgetWindow);
    }

    private get petImageWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("pet_image_widget"), isIWidgetWindow);
    }

    private get effectImageWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("effect_image_widget"), isIWidgetWindow);
    }

    private get unknownImageWindow(): IStaticBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("unknown_image"), isIStaticBitmapWrapperWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
