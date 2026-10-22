import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IWiredChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/IWiredChestSubController';
import type { WiredChestWrapperView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestWrapperView';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';

export interface IWiredChestParent {
    get roomEvents(): HabboUserDefinedRoomEvents;
    get localization(): IHabboLocalizationManager;
    get sessionDataManager(): ISessionDataManager;
    get status(): number;
    get chestWrapperView(): WiredChestWrapperView;
    get activeChestId(): number;
    get requestedChestId(): number;
    addMessageEvent(param1: IMessageEvent): void;
    removeMessageEvent(param1: IMessageEvent): void;
    send(param1: IMessageComposer): void;
    setClosedStatus(): void;
    setOpeningStatus(param1: number): void;
    setOpenStatus(param1: number, param2: IWiredChestSubController): void;
}
