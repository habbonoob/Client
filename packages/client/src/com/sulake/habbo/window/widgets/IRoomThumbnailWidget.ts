import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IRoomThumbnailWidget extends IWidget {
    set flatId(param1: number);
    reset(): void;
}
