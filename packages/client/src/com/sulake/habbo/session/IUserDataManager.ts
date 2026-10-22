import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';

export interface IUserDataManager {
    setUserData(param1: IUserData): void;
    getUserData(param1: number): IUserData;
    getUserDataByType(param1: number, param2: number): IUserData;
    getUserDataByIndex(param1: number): IUserData;
    getUserDataByName(param1: string): IUserData;
    getUserBadges(param1: number): any[];
    removeUserDataByRoomIndex(param1: number): void;
    setUserBadges(param1: number, param2: any[]): void;
    updateFigure(param1: number, param2: string, param3: string, param4: boolean, param5: boolean): void;
    updatePetLevel(param1: number, param2: number): void;
    updatePetBreedingStatus(param1: number, param2: boolean, param3: boolean, param4: boolean, param5: boolean): void;
    updateCustom(param1: number, param2: string): void;
    updateAchievementScore(param1: number, param2: number): void;
    updateNameByIndex(param1: number, param2: string): void;
    markAsBlocked(param1: number, param2?: boolean): void;
    getPetUserData(param1: number): IUserData;
    getRentableBotUserData(param1: number): IUserData;
    requestPetInfo(param1: number): void;
    getAllUserIds(): any[];
}

export const IUserDataManager = Symbol('com.sulake.habbo.session::IUserDataManager');
registerClassName(IUserDataManager, 'com.sulake.habbo.session::IUserDataManager');

export function isIUserDataManager(value: unknown): value is IUserDataManager {
    return (value as { [IUserDataManager]?: true } | null | undefined)?.[IUserDataManager] === true;
}
