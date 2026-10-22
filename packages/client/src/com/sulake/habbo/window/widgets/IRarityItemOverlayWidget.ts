import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IRarityItemOverlayWidget extends IWidget {
    get rarityLevel(): number;
    set rarityLevel(param1: number);
}
