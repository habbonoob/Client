import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomThumbnailData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomThumbnailData';

export class GuestRoomData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::GuestRoomData'); }

    private readonly _SafeStr_8214: number = 1;
    private readonly _SafeStr_7866: number = 2;
    private readonly _SafeStr_8114: number = 4;
    private readonly _SafeStr_8156: number = 8;
    private readonly _SafeStr_8482: number = 16;
    private readonly _SafeStr_8165: number = 32;

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _roomName: string;

    declare private _showOwner: boolean;
    static { (this.prototype as any)._showOwner = false; }

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _ownerName: string;

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    declare private _userCount: number;
    static { (this.prototype as any)._userCount = 0; }

    declare private _maxUserCount: number;
    static { (this.prototype as any)._maxUserCount = 0; }

    declare private _description: string;

    declare private _tradeMode: number;
    static { (this.prototype as any)._tradeMode = 0; }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    declare private _ranking: number;
    static { (this.prototype as any)._ranking = 0; }

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _SafeStr_7587: number;
    static { (this.prototype as any)._SafeStr_7587 = 0; }

    private _habboGroupId: number = 0;
    private _groupName: string = "";
    private _groupBadgeCode: string = "";

    declare private _tags: any[];

    declare private _thumbnail: RoomThumbnailData;

    declare private _SafeStr_6184: boolean;
    static { (this.prototype as any)._SafeStr_6184 = false; }

    declare private _displayRoomEntryAd: boolean;
    static { (this.prototype as any)._displayRoomEntryAd = false; }

    private _roomAdName: string = "";
    private _roomAdDescription: string = "";
    private _roomAdExpiresInMin: number = 0;

    declare private _SafeStr_7242: boolean;
    static { (this.prototype as any)._SafeStr_7242 = false; }

    declare private _SafeStr_6434: boolean;
    static { (this.prototype as any)._SafeStr_6434 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    private _officialRoomPicRef: string = null;

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc5_: string = null;
        this._tags = [];
        this._flatId = param1.readInteger();
        this._roomName = param1.readString();
        this._ownerId = param1.readInteger();
        this._ownerName = param1.readString();
        this._doorMode = param1.readInteger();
        this._userCount = param1.readInteger();
        this._maxUserCount = param1.readInteger();
        this._description = param1.readString();
        this._tradeMode = param1.readInteger();
        this._score = param1.readInteger();
        this._ranking = param1.readInteger();
        this._categoryId = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc5_ = param1.readString();
            this._tags.push(_loc5_);
            _loc4_++;
        }
        let _loc2_: number = param1.readInteger();
        if ((_loc2_ & 1) > 0) {
            this._officialRoomPicRef = param1.readString();
        }
        if ((_loc2_ & 2) > 0) {
            this._habboGroupId = param1.readInteger();
            this._groupName = param1.readString();
            this._groupBadgeCode = param1.readString();
        }
        if ((_loc2_ & 4) > 0) {
            this._roomAdName = param1.readString();
            this._roomAdDescription = param1.readString();
            this._roomAdExpiresInMin = param1.readInteger();
        }
        this._showOwner = (_loc2_ & 8) > 0;
        this._SafeStr_6184 = (_loc2_ & 0x10) > 0;
        this._displayRoomEntryAd = (_loc2_ & 0x20) > 0;
        this._thumbnail = new RoomThumbnailData(null);
        this._thumbnail.setDefaults();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._tags = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public get showOwner(): boolean {
        return this._showOwner;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public get doorMode(): number {
        return this._doorMode;
    }

    public get userCount(): number {
        return this._userCount;
    }

    public get maxUserCount(): number {
        return this._maxUserCount;
    }

    public get description(): string {
        return this._description;
    }

    public get tradeMode(): number {
        return this._tradeMode;
    }

    public get score(): number {
        return this._score;
    }

    public get ranking(): number {
        return this._ranking;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public get habboGroupId(): number {
        return this._habboGroupId;
    }

    public get groupName(): string {
        return this._groupName;
    }

    public get groupBadgeCode(): string {
        return this._groupBadgeCode;
    }

    public get tags(): any[] {
        return this._tags;
    }

    public get thumbnail(): RoomThumbnailData {
        return this._thumbnail;
    }

    public get allowPets(): boolean {
        return this._SafeStr_6184;
    }

    public get displayRoomEntryAd(): boolean {
        return this._displayRoomEntryAd;
    }

    public get roomAdName(): string {
        return this._roomAdName;
    }

    public get roomAdDescription(): string {
        return this._roomAdDescription;
    }

    public get roomAdExpiresInMin(): number {
        return this._roomAdExpiresInMin;
    }

    public get allInRoomMuted(): boolean {
        return this._SafeStr_7242;
    }

    public get officialRoomPicRef(): string {
        return this._officialRoomPicRef;
    }

    public set allInRoomMuted(param1: boolean) {
        this._SafeStr_7242 = param1;
    }

    public set roomName(param1: string) {
        this._roomName = param1;
    }

    public get canMute(): boolean {
        return this._SafeStr_6434;
    }

    public set canMute(param1: boolean) {
        this._SafeStr_6434 = param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
