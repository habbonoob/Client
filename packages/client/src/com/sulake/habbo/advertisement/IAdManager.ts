import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IAdManager extends IUnknown {
    get events(): IEventDispatcher;
    showInterstitial(): void;
    loadRoomAdImage(roomId: number, objectId: number, objectCategory: number, imageUrl: string, clickUrl: string): void;
}
