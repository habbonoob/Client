import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IWidgetAvatarEffect {
    get amountInInventory(): number;
    get type(): number;
    get secondsLeft(): number;
    get duration(): number;
    get isActive(): boolean;
    get isInUse(): boolean;
    get icon(): BitmapData;
}
