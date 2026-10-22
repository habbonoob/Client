import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { RewardClaimsTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/RewardClaimsTab';
import type { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';
import type { NftClaim } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftClaim';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { AbstractCollectibleItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/AbstractCollectibleItemRenderer';
import { BaseItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/BaseItemWrapper';

const preSuperRewardCollectibleItemRenderer: ((self: RewardCollectibleItemRenderer) => void)[] = [];

export class RewardCollectibleItemRenderer extends AbstractCollectibleItemRenderer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer::RewardCollectibleItemRenderer'); }

    constructor(param1: CollectiblesController, param2: NftClaim, param3: IWindowContainer, param4: RewardClaimsTab) {
        const item: BaseItemWrapper = new BaseItemWrapper(param2.claimItem);
        preSuperRewardCollectibleItemRenderer.push((self: RewardCollectibleItemRenderer) => {
            self._SafeStr_7374 = param4;
            self._rewardClaim = param2;
            self._SafeStr_5594 = item;
        });
        super(param1, item, param3);
    }

    declare protected _SafeStr_7374: RewardClaimsTab;

    declare protected _rewardClaim: NftClaim;

    declare private _SafeStr_5594: BaseItemWrapper;

    protected override get borderOutline(): IBorderWindow {
        return asGuarded(this.container.findChildByName("border_outline"), isIBorderWindow);
    }

    protected override get borderBackground(): IBorderWindow {
        return asGuarded(this.container.findChildByName("border_background"), isIBorderWindow);
    }

    protected override get amountText(): ITextWindow {
        return asGuarded(this.container.findChildByTag("AMOUNT_TITLE"), isITextWindow);
    }

    protected override get amountTextBorder(): IBorderWindow {
        return asGuarded(this.container.findChildByName("text_border"), isIBorderWindow);
    }

    protected override get bitmapWindow(): IBitmapWrapperWindow {
        return asGuarded(this.container.findChildByTag("BITMAP"), isIBitmapWrapperWindow);
    }

    protected override get unknownImageWindow(): IStaticBitmapWrapperWindow {
        return asGuarded(this.container.findChildByName("unknown_image"), isIStaticBitmapWrapperWindow);
    }

    protected override get badgeImageWindow(): IWidgetWindow {
        return asGuarded(this.container.findChildByName("badge_image_widget"), isIWidgetWindow);
    }

    protected override get petImageWindow(): IWidgetWindow {
        return asGuarded(this.container.findChildByName("pet_image_widget"), isIWidgetWindow);
    }

    public get item(): CollectibleBaseItem {
        return (asInstanceOf(this.renderableItem, BaseItemWrapper)).baseItem;
    }

    public get rewardClaim(): NftClaim {
        return this._rewardClaim;
    }

    private get nameText(): ITextWindow {
        return asGuarded(this.container.findChildByTag("NAME_TITLE"), isITextWindow);
    }

    private get walletText(): ITextWindow {
        return asGuarded(this.container.findChildByName("wallet_text"), isITextWindow);
    }

    private get collectionText(): ITextWindow {
        return asGuarded(this.container.findChildByName("collection_text"), isITextWindow);
    }

    private get expiresText(): ITextWindow {
        return asGuarded(this.container.findChildByName("expires_text"), isITextWindow);
    }

    private get localization(): IHabboLocalizationManager {
        return this._controller.localizationManager;
    }

    private get collectionName(): string {
        let _loc1_: string = this.localization.getLocalization("collectibles.set." + this._rewardClaim.claimItem.setId);
        return _loc1_;
    }

    protected override onClick(param1: WindowMouseEvent): void {
    }

    public override updateVisuals(): void {
        this.nameText.caption = this._controller.getProductName(this._SafeStr_5594);
        this.amountText.caption = "x" + (this._rewardClaim.claimLimit - this._rewardClaim.claimedAmount);
        this.collectionText.caption = "<b>" + this.localization.getLocalization("collectibles.claim.collection") + "</b> " + this.collectionName;
        this.walletText.caption = this._rewardClaim.wallet;
    }

    public updateExpiresText(param1: string): void {
        this.expiresText.caption = "<b>" + this.localization.getLocalization("collectibles.claim.expiration") + "</b> " + param1;
    }

    protected override initInstanceFields(): void {
        preSuperRewardCollectibleItemRenderer.pop()!(this);
        super.initInstanceFields();
    }
}
