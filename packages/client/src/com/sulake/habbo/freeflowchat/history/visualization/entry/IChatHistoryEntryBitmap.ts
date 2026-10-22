import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IChatHistoryEntryBitmap {
    get bitmap(): BitmapData;
    get overlap(): Rectangle;
    get userId(): number;
    get roomId(): number;
    get canIgnore(): boolean;
    get userName(): string;
}
