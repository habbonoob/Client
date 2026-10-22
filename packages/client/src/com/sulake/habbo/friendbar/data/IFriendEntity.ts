import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';

export interface IFriendEntity {
    get id(): number;
    get name(): string;
    get gender(): number;
    get online(): boolean;
    get allowFollow(): boolean;
    get figure(): string;
    get categoryId(): number;
    get motto(): string;
    get lastAccess(): string;
    get realName(): string;
    get notifications(): IFriendNotification[];
    get logEventId(): number;
    set logEventId(param1: number);
    getNextLogEventId(): number;
}
