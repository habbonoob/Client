import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendEntity } from '@/com/sulake/habbo/friendbar/data/IFriendEntity';
import type { IFriendNotification } from '@/com/sulake/habbo/friendbar/data/IFriendNotification';

export class FriendEntity implements IFriendEntity {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.data::FriendEntity'); }

    private static ROLLING_LOG_EVENT_ID: number = 0;

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
        this._lastAccess = param10;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _gender: number;
    static { (this.prototype as any)._gender = 0; }

    declare private _online: boolean;
    static { (this.prototype as any)._online = false; }

    declare private _figure: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _motto: string;

    declare private _lastAccess: string;

    private _logEventId: number = -1;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _allowFollow: boolean;
    static { (this.prototype as any)._allowFollow = false; }

    public get allowFollow(): boolean {
        return this._allowFollow;
    }

    public set allowFollow(param1: boolean) {
        this._allowFollow = param1;
    }

    declare private _realName: string;

    public get realName(): string {
        return this._realName;
    }

    public set realName(param1: string) {
        this._realName = param1;
    }

    declare private _notifications: IFriendNotification[];

    public get notifications(): IFriendNotification[] {
        if (!this._notifications) {
            this._notifications = [];
        }
        return this._notifications;
    }

    public get id(): number {
        return this._id;
    }

    public get gender(): number {
        return this._gender;
    }

    public set gender(param1: number) {
        this._gender = param1;
    }

    public get online(): boolean {
        return this._online;
    }

    public set online(param1: boolean) {
        this._online = param1;
    }

    public get figure(): string {
        return this._figure;
    }

    public set figure(param1: string) {
        this._figure = param1;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public set categoryId(param1: number) {
        this._categoryId = param1;
    }

    public get motto(): string {
        return this._motto;
    }

    public set motto(param1: string) {
        this._motto = param1;
    }

    public get lastAccess(): string {
        return this._lastAccess;
    }

    public set lastAccess(param1: string) {
        this._lastAccess = param1;
    }

    public get logEventId(): number {
        return this._logEventId;
    }

    public set logEventId(param1: number) {
        this._logEventId = param1;
    }

    public getNextLogEventId(): number {
        return ++FriendEntity.ROLLING_LOG_EVENT_ID;
    }
}
