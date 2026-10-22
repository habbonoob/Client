import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IRoomThumbnailWidget extends IWidget {
    reset(): void;
    set flatId(param1: number);
}
