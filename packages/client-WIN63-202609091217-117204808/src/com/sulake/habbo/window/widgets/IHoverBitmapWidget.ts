import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IHoverBitmapWidget extends IWidget {
    get bitmapWrapper(): IStaticBitmapWrapperWindow;
    get normalAsset(): string;
    set normalAsset(param1: string);
    get hoverAsset(): string;
    set hoverAsset(param1: string);
}
