import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboQuestEngine extends IUnknown {
    ensureAchievementsInitialized(): void;
    showAchievements(): void;
    showQuests(): void;
    getAchievementLevel(param1: string, param2: string): number;
    reenableRoomCompetitionWindow(): void;
    requestSeasonalQuests(): void;
    requestQuests(): void;
    get events(): IEventDispatcher;
    activateQuest(param1: number): void;
    goToQuestRooms(): void;
}
