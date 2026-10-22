import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IAdManager extends IUnknown {
    get events(): IEventDispatcher;
    showInterstitial(): void;
    loadRoomAdImage(param1: number, param2: number, param3: number, param4: string, param5: string): void;
}
