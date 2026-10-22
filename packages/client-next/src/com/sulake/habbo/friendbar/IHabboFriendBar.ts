import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboFriendBar extends IUnknown {
    get events(): IEventDispatcher;
    set visible(param1: boolean);
}
