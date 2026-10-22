import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface ISeparatorWidget extends IWidget {
    get vertical(): boolean;
    set vertical(param1: boolean);
}
