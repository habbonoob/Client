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
import type { ShopTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/ShopTab';
import type { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';
import type { NftStoreOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftStoreOffer';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { AbstractCollectibleItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/AbstractCollectibleItemRenderer';
import { BaseItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/BaseItemWrapper';

const preSuperShopCollectibleItemRenderer: ((self: ShopCollectibleItemRenderer) => void)[] = [];

export class ShopCollectibleItemRenderer extends AbstractCollectibleItemRenderer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer::ShopCollectibleItemRenderer'); }

    declare protected _SafeStr_6718: ShopTab;

    declare protected _offer: NftStoreOffer;

    constructor(param1: CollectiblesController, param2: NftStoreOffer, param3: IWindowContainer, param4: ShopTab) {
        preSuperShopCollectibleItemRenderer.push((self: ShopCollectibleItemRenderer) => {
            self._SafeStr_6718 = param4;
            self._offer = param2;
        });
        super(param1, new BaseItemWrapper(param2.productInfo), param3);
    }

    protected override onClick(param1: WindowMouseEvent): void {
        this._SafeStr_6718.selectItem(this);
    }

    public override updateVisuals(): void {
        this.amountText.caption = this._offer.emeraldPrice.toString();
    }

    public get item(): CollectibleBaseItem {
        return (asInstanceOf(this.renderableItem, BaseItemWrapper)).baseItem;
    }

    public get offer(): NftStoreOffer {
        return this._offer;
    }

    protected override get borderOutline(): IBorderWindow {
        return asGuarded(this.container.findChildByName("border_outline"), isIBorderWindow);
    }

    protected override get borderBackground(): IBorderWindow {
        return asGuarded(this.container.findChildByName("border_background"), isIBorderWindow);
    }

    protected override get amountText(): ITextWindow {
        return asGuarded(this.container.findChildByName("number"), isITextWindow);
    }

    protected override get amountTextBorder(): IBorderWindow {
        return asGuarded(this.container.findChildByName("text_border"), isIBorderWindow);
    }

    private get checkmarkIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this.container.findChildByName("checkmark_icon"), isIStaticBitmapWrapperWindow);
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

    protected override initInstanceFields(): void {
        preSuperShopCollectibleItemRenderer.pop()!(this);
        super.initInstanceFields();
    }
}
