import type { HabboActivityState } from '@/com/sulake/habbo/discord/habbo_activity/HabboActivityState';

export interface IHabboActivityDetection {
    isInRoom(): boolean;
    isInHiddenRoom(): boolean;
    get roomId(): number;
    getCurrentRoomActivity(): HabboActivityState;
    getCurrentRoomName(): string;
}
