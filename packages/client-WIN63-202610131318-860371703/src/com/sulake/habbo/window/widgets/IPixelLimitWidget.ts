import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';

export interface IPixelLimitWidget extends IWidget, IBitmapDataContainer {
    get limit(): number;
    set limit(param1: number);
}
