import type { HabboActivityState } from '@/com/sulake/habbo/discord/habbo_activity/HabboActivityState';

export interface IHabboActivityDetection {
    get roomId(): number;
    isInRoom(): boolean;
    isInHiddenRoom(): boolean;
    getCurrentRoomActivity(): HabboActivityState;
    getCurrentRoomName(): string;
}
