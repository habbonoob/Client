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
import type { CollectionView } from '@/com/sulake/habbo/catalog/collectibles/tabs/subviews/CollectionView';
import type { CollectibleItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleItem';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { AbstractCollectibleItemRenderer } from '@/com/sulake/habbo/catalog/collectibles/renderer/AbstractCollectibleItemRenderer';
import { CollectionItemWrapper } from '@/com/sulake/habbo/catalog/collectibles/renderer/model/CollectionItemWrapper';

export class CollectibleItemRenderer extends AbstractCollectibleItemRenderer {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.renderer.collections::CollectibleItemRenderer'); }

    constructor(param1: CollectiblesController, param2: CollectibleItem, param3: IWindowContainer, param4: CollectionView) {
        super(param1, new CollectionItemWrapper(param2), param3);
        this._SafeStr_2917 = param4;
    }

    declare protected _SafeStr_2917: CollectionView;

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

    public get item(): CollectibleItem {
        return (asInstanceOf(this.renderableItem, CollectionItemWrapper)).collectionItem;
    }

    private get checkmarkIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this.container.findChildByName("checkmark_icon"), isIStaticBitmapWrapperWindow);
    }

    protected override onClick(param1: WindowMouseEvent): void {
        this._SafeStr_2917.selectItem(this);
    }

    public override updateVisuals(): void {
        this.amountText.caption = "x" + this.item.amount;
        this.amountTextBorder.color = (this.isComplete ? 3374080 : 7441834) >>> 0;
        this.checkmarkIcon.visible = this.isComplete;
    }
}
