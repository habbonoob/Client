import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboUserDefinedRoomEvents extends IUnknown {
    get events(): IEventDispatcher;
    stuffSelected(param1: number): void;
    userSelected(param1: number): void;
    showInspectButton(): boolean;
    showToolbarMenuButton(): boolean;
    get wiredWhisperDisabled(): boolean;
    set wiredWhisperDisabled(param1: boolean);
    hasClickUserWired(): boolean;
    get achievementsInRoom(): string[];
    switchPlayTestMode(): void;
    resetCache(): void;
    hasWiredUIOpen(): boolean;
    get isGameMode(): boolean;
}

export const IHabboUserDefinedRoomEvents = Symbol('com.sulake.habbo.roomevents::IHabboUserDefinedRoomEvents');
registerClassName(IHabboUserDefinedRoomEvents, 'com.sulake.habbo.roomevents::IHabboUserDefinedRoomEvents');

export function isIHabboUserDefinedRoomEvents(value: unknown): value is IHabboUserDefinedRoomEvents {
    return (value as { [IHabboUserDefinedRoomEvents]?: true } | null | undefined)?.[IHabboUserDefinedRoomEvents] === true;
}
