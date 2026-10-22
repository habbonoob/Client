import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface ILimitedItemOverlayWidget extends IWidget {
    set serialNumber(param1: number);
    set seriesSize(param1: number);
    get serialNumber(): number;
    get seriesSize(): number;
}
