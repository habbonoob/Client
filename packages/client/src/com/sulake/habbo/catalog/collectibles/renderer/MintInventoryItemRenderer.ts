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
import type { MintInventoryListTab } from '@/com/sulake/habbo/catalog/collectibles/tabs/MintInventoryListTab';
import type { CollectiblesProductItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectiblesProductItem';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { AbstractCollectibleItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/AbstractCollectibleItemRenderer';
import { MintableItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/MintableItemWrapper';

export class MintInventoryItemRenderer extends AbstractCollectibleItemRenderer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer::MintInventoryItemRenderer'); }

    constructor(param1: CollectiblesController, param2: CollectiblesProductItem, param3: IWindowContainer, param4: MintInventoryListTab, param5: number) {
        super(param1, new MintableItemWrapper(param2, param5), param3);
        this._mintInventoryListWidget = param4;
    }

    declare protected _mintInventoryListWidget: MintInventoryListTab;

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

    public get item(): CollectiblesProductItem {
        return (asInstanceOf(this.renderableItem, MintableItemWrapper)).productItem;
    }

    private get checkmarkIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this.container.findChildByName("checkmark_icon"), isIStaticBitmapWrapperWindow);
    }

    protected override onClick(param1: WindowMouseEvent): void {
        this._mintInventoryListWidget.selectItem(this);
    }

    public override updateVisuals(): void {
        this.amountText.caption = this.isComplete ? "x" + this.renderableItem.amount : "-";
        this.amountTextBorder.color = (this.isComplete ? 3374080 : 7441834) >>> 0;
    }

    protected override completeColoring(): any {
        return this.incompleteColoring();
    }
}
