import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboUserDefinedRoomEvents extends IUnknown {
    get events(): IEventDispatcher;
    get wiredWhisperDisabled(): boolean;
    set wiredWhisperDisabled(param1: boolean);
    stuffSelected(param1: number): void;
    userSelected(param1: number): void;
    showInspectButton(): boolean;
    showToolbarMenuButton(): boolean;
    hasClickUserWired(): boolean;
    switchPlayTestMode(): void;
    resetCache(): void;
    hasWiredUIOpen(): boolean;
}
