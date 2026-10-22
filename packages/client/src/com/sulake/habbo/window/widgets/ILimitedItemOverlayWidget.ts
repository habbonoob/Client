import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface ILimitedItemOverlayWidget extends IWidget {
    get serialNumber(): number;
    set serialNumber(param1: number);
    get seriesSize(): number;
    set seriesSize(param1: number);
}
