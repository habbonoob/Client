import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IRarityItemOverlayWidget extends IWidget {
    set rarityLevel(param1: number);
    get rarityLevel(): number;
}
