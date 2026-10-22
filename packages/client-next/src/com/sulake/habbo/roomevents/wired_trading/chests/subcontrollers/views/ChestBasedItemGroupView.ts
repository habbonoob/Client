import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { ChestBasedItem } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestBasedItem';

export interface ChestBasedItemGroupView {
    get ltdBackgroundBitmap(): IStaticBitmapWrapperWindow;
    get furniIcon(): IWidgetWindow;
    get ltdOverlayWidget(): IWidgetWindow;
    get rarityOverlayWidget(): IWidgetWindow;
    get chestBasedItemSample(): ChestBasedItem;
}
