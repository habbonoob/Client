import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { GetPetInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/pets/GetPetInfoMessageComposer';
import { GetSelectedBadgesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetSelectedBadgesMessageComposer';
import { IUserDataManager } from '@/com/sulake/habbo/session/IUserDataManager';

export class UserDataManager implements IUserDataManager {
    static { registerClassName(this, 'com.sulake.habbo.session::UserDataManager'); }

    private static readonly TYPE_USER: number = 1;
    private static readonly TYPE_PET: number = 2;
    private static readonly _SafeStr_7652: number = 3;
    private static readonly _SafeStr_7924: number = 4;

    declare private _SafeStr_3448: UtilsMap;

    declare private _SafeStr_3254: UtilsMap;

    declare private _userSelectedBadges: UtilsMap;

    declare private _connection: IConnection;

    constructor() {
        this._SafeStr_3448 = new UtilsMap();
        this._SafeStr_3254 = new UtilsMap();
        this._userSelectedBadges = new UtilsMap();
    }

    public dispose(): void {
        this._connection = null;
        this._SafeStr_3448.dispose();
        this._SafeStr_3448 = null;
        this._SafeStr_3254.dispose();
        this._SafeStr_3254 = null;
        this._userSelectedBadges.dispose();
        this._userSelectedBadges = null;
    }

    public set connection(param1: IConnection) {
        this._connection = param1;
    }

    public getUserData(param1: number): IUserData {
        return this.getUserDataByType(param1, 1);
    }

    public getUserDataByType(param1: number, param2: number): IUserData {
        let _loc3_: IUserData = null;
        let _loc4_: UtilsMap = this._SafeStr_3448.getValue(param2);
        if (_loc4_ != null) {
            _loc3_ = _loc4_.getValue(param1);
        }
        return _loc3_;
    }

    public getUserDataByIndex(param1: number): IUserData {
        return this._SafeStr_3254.getValue(param1);
    }

    public getUserDataByName(param1: string): IUserData {
        for (const _loc2_ of valuesOf(this._SafeStr_3254)) {
            if (_loc2_.name == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public requestUserSelectedBadges(param1: number): void {
        if (this._connection != null) {
            this._connection.send(new GetSelectedBadgesMessageComposer(param1));
        }
    }

    public getUserSelectedBadges(param1: number): any[] {
        let _loc2_: any[] = asGuarded(this._userSelectedBadges.getValue(param1), Array.isArray);
        if (_loc2_ == null) {
            _loc2_ = [];
        }
        return _loc2_;
    }

    public setUserData(param1: IUserData): void {
        if (param1 == null) {
            return;
        }
        this.removeUserDataByRoomIndex(param1.roomObjectId);
        let _loc2_: UtilsMap = this._SafeStr_3448.getValue(param1.type);
        if (_loc2_ == null) {
            _loc2_ = new UtilsMap();
            this._SafeStr_3448.add(param1.type, _loc2_);
        }
        _loc2_.add(param1.webID, param1);
        this._SafeStr_3254.add(param1.roomObjectId, param1);
    }

    public removeUserDataByRoomIndex(param1: number): void {
        let _loc4_: UtilsMap = null;
        let _loc3_: IUserData = null;
        let _loc2_: IUserData = this._SafeStr_3254.remove(param1);
        if (_loc2_ != null) {
            _loc4_ = this._SafeStr_3448.getValue(_loc2_.type);
            if (_loc4_ != null) {
                _loc3_ = _loc4_.remove(_loc2_.webID);
                if (_loc3_ != null) {
                }
            }
        }
    }

    public setUserSelectedBadges(param1: number, param2: any[]): void {
        this._userSelectedBadges.remove(param1);
        this._userSelectedBadges.add(param1, param2 == null ? [] : param2);
    }

    public updateFigure(param1: number, param2: string, param3: string, param4: boolean, param5: boolean): void {
        let _loc6_: IUserData = this.getUserDataByIndex(param1);
        if (_loc6_ != null) {
            _loc6_.figure = param2;
            _loc6_.sex = param3;
            _loc6_.hasSaddle = param4;
            _loc6_.isRiding = param5;
        }
    }

    public updatePetLevel(param1: number, param2: number): void {
        let _loc3_: IUserData = this.getUserDataByIndex(param1);
        if (_loc3_ != null) {
            _loc3_.petLevel = param2;
        }
    }

    public updatePetBreedingStatus(param1: number, param2: boolean, param3: boolean, param4: boolean, param5: boolean): void {
        let _loc6_: IUserData = this.getUserDataByIndex(param1);
        if (_loc6_ != null) {
            _loc6_.canBreed = param2;
            _loc6_.canHarvest = param3;
            _loc6_.canRevive = param4;
            _loc6_.hasBreedingPermission = param5;
        }
    }

    public updateCustom(param1: number, param2: string): void {
        let _loc3_: IUserData = this.getUserDataByIndex(param1);
        if (_loc3_ != null) {
            _loc3_.custom = param2;
        }
    }

    public updateAchievementScore(param1: number, param2: number): void {
        let _loc3_: IUserData = this.getUserDataByIndex(param1);
        if (_loc3_ != null) {
            _loc3_.achievementScore = param2;
        }
    }

    public updateBadgesRank(param1: number, param2: number): void {
        let _loc3_: IUserData = this.getUserDataByIndex(param1);
        if (_loc3_ != null) {
            _loc3_.badgesRank = param2;
        }
    }

    public markAsBlocked(param1: number, param2: boolean = true): void {
        let _loc3_: IUserData = this.getUserDataByIndex(param1);
        if (_loc3_ != null) {
            _loc3_.isBlocked = param2;
        }
    }

    public updateNameByIndex(param1: number, param2: string): void {
        let _loc3_: IUserData = this.getUserDataByIndex(param1);
        if (_loc3_ != null) {
            _loc3_.name = param2;
        }
    }

    public getPetUserData(param1: number): IUserData {
        return this.getUserDataByType(param1, 2);
    }

    public getRentableBotUserData(param1: number): IUserData {
        return this.getUserDataByType(param1, 4);
    }

    public requestPetInfo(param1: number): void {
        let _loc2_: IUserData = this.getPetUserData(param1);
        if (_loc2_ != null && this._connection != null) {
            this._connection.send(new GetPetInfoMessageComposer(_loc2_.webID));
        }
    }

    public getAllUserIds(): any[] {
        let _loc2_: any[] = [];
        for (const _loc1_ of valuesOf(this._SafeStr_3254)) {
            _loc2_.push(_loc1_.webID);
        }
        return _loc2_;
    }

    get [IUserDataManager](): true {
        return true;
    }
}
