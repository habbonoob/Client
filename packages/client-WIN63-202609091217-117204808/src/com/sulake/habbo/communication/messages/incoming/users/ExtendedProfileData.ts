import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_6113 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6113';
import { HabboGroupEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupEntryData';

export class ExtendedProfileData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ExtendedProfileData'); }

    public static readonly _SafeStr_14791: number = 0;
    public static readonly _SafeStr_14792: number = 1;
    public static readonly _SafeStr_14793: number = 2;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _figure: string;

    declare private _motto: string;

    declare private _SafeStr_6298: string;

    declare private _achievementScore: number;
    static { (this.prototype as any)._achievementScore = 0; }

    declare private _friendCount: number;
    static { (this.prototype as any)._friendCount = 0; }

    declare private _isFriend: boolean;
    static { (this.prototype as any)._isFriend = false; }

    declare private _isFriendRequestSent: boolean;
    static { (this.prototype as any)._isFriendRequestSent = false; }

    declare private _SafeStr_6769: number;
    static { (this.prototype as any)._SafeStr_6769 = 0; }

    declare private _guilds: any[];

    declare private _lastAccessSinceInSeconds: number;
    static { (this.prototype as any)._lastAccessSinceInSeconds = 0; }

    declare private _openProfileWindow: boolean;
    static { (this.prototype as any)._openProfileWindow = false; }

    declare private _isHidden: boolean;
    static { (this.prototype as any)._isHidden = false; }

    declare private _accountLevel: number;
    static { (this.prototype as any)._accountLevel = 0; }

    declare private _SafeStr_7376: number;
    static { (this.prototype as any)._SafeStr_7376 = 0; }

    declare private _starGemCount: number;
    static { (this.prototype as any)._starGemCount = 0; }

    declare private _SafeStr_7396: boolean;
    static { (this.prototype as any)._SafeStr_7396 = false; }

    declare private _SafeStr_7412: boolean;
    static { (this.prototype as any)._SafeStr_7412 = false; }

    declare private _SafeStr_14794: number;
    static { (this.prototype as any)._SafeStr_14794 = 0; }

    declare private _SafeStr_14795: number;
    static { (this.prototype as any)._SafeStr_14795 = 0; }

    declare private _SafeStr_14796: any[];

    private _SafeStr_14797: number = -1;

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._guilds = [];
        this._SafeStr_14796 = [];
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        this._figure = param1.readString();
        this._motto = param1.readString();
        this._SafeStr_6298 = param1.readString();
        this._achievementScore = param1.readInteger();
        this._friendCount = param1.readInteger();
        this._isFriend = param1.readBoolean();
        this._isFriendRequestSent = param1.readBoolean();
        this._SafeStr_6769 = param1.readByte();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._guilds.push(new HabboGroupEntryData(param1));
            _loc3_++;
        }
        this._lastAccessSinceInSeconds = param1.readInteger();
        this._openProfileWindow = param1.readBoolean();
        this._isHidden = param1.readBoolean();
        this._accountLevel = param1.readInteger();
        this._SafeStr_7376 = param1.readInteger();
        this._starGemCount = param1.readInteger();
        this._SafeStr_7396 = param1.readBoolean();
        this._SafeStr_7412 = param1.readBoolean();
        this._SafeStr_14794 = param1.readInteger();
        this._SafeStr_14795 = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            this._SafeStr_14796.push(new _SafeCls_6113(param1.readByte(), param1.readInteger()));
            _loc3_++;
        }
        this._SafeStr_14797 = param1.readInteger();
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get isHidden(): boolean {
        return this._isHidden;
    }

    public get motto(): string {
        return this._motto;
    }

    public get figure(): string {
        return this._figure;
    }

    public get creationDate(): string {
        return this._SafeStr_6298;
    }

    public get achievementScore(): number {
        return this._achievementScore;
    }

    public get friendCount(): number {
        return this._friendCount;
    }

    public get isFriend(): boolean {
        return this._isFriend;
    }

    public get isFriendRequestSent(): boolean {
        return this._isFriendRequestSent;
    }

    public get onlineStatus(): number {
        return this._SafeStr_6769;
    }

    public get guilds(): any[] {
        return this._guilds;
    }

    public set isFriendRequestSent(param1: boolean) {
        this._isFriendRequestSent = param1;
    }

    public get lastAccessSinceInSeconds(): number {
        return this._lastAccessSinceInSeconds;
    }

    public get openProfileWindow(): boolean {
        return this._openProfileWindow;
    }

    public get accountLevel(): number {
        return this._accountLevel;
    }

    public get starGemCount(): number {
        return this._starGemCount;
    }

    public get totalBadges(): number {
        return this._SafeStr_14794;
    }

    public get achievementLevel(): number {
        return this._SafeStr_14795;
    }

    public get badgeRarityCounts(): any[] {
        return this._SafeStr_14796;
    }

    public get totalBadgesRank(): number {
        return this._SafeStr_14797;
    }

    public getBadgeCountByRarityId(param1: number): number {
        for (const _loc2_ of this._SafeStr_14796 ?? []) {
            if (_loc2_.rarityId == param1) {
                return _loc2_.count | 0;
            }
        }
        return 0;
    }
}
