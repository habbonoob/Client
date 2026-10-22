import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';

export class FriendEntity implements IFriendEntity {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.data::FriendEntity'); }

    private static ROLLING_LOG_EVENT_ID: number = 0;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _gender: number;
    static { (this.prototype as any)._gender = 0; }

    declare private _online: boolean;
    static { (this.prototype as any)._online = false; }

    declare private _allowFollow: boolean;
    static { (this.prototype as any)._allowFollow = false; }

    declare private _figure: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _motto: string;

    declare private _SafeStr_4795: string;

    declare private _realName: string;

    declare private _notifications: IFriendNotification[];

    private _logEventId: number = -1;

    constructor(param1: number, param2: string, param3: string, param4: string, param5: number, param6: boolean, param7: boolean, param8: string, param9: number, param10: string) {
        this._id = param1;
        this._name = param2;
        this._realName = param3;
        this._motto = param4;
        this._gender = param5;
        this._online = param6;
        this._allowFollow = param7;
        this._figure = param8;
        this._categoryId = param9;
        this._SafeStr_4795 = param10;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get gender(): number {
        return this._gender;
    }

    public get online(): boolean {
        return this._online;
    }

    public get allowFollow(): boolean {
        return this._allowFollow;
    }

    public get figure(): string {
        return this._figure;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public get motto(): string {
        return this._motto;
    }

    public get lastAccess(): string {
        return this._SafeStr_4795;
    }

    public get realName(): string {
        return this._realName;
    }

    public get logEventId(): number {
        return this._logEventId;
    }

    public get notifications(): IFriendNotification[] {
        if (!this._notifications) {
            this._notifications = [];
        }
        return this._notifications;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public set gender(param1: number) {
        this._gender = param1;
    }

    public set online(param1: boolean) {
        this._online = param1;
    }

    public set allowFollow(param1: boolean) {
        this._allowFollow = param1;
    }

    public set figure(param1: string) {
        this._figure = param1;
    }

    public set categoryId(param1: number) {
        this._categoryId = param1;
    }

    public set motto(param1: string) {
        this._motto = param1;
    }

    public set lastAccess(param1: string) {
        this._SafeStr_4795 = param1;
    }

    public set realName(param1: string) {
        this._realName = param1;
    }

    public set logEventId(param1: number) {
        this._logEventId = param1;
    }

    public getNextLogEventId(): number {
        return ++FriendEntity.ROLLING_LOG_EVENT_ID;
    }
}
