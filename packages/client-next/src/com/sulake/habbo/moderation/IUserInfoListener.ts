import type { ModeratorUserInfoData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/ModeratorUserInfoData';

export interface IUserInfoListener {
    onUserInfo(param1: ModeratorUserInfoData): void;
}
