import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BannedUserData } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/BannedUserData';
import type { FlatControllerData } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/FlatControllerData';
import type { RoomChatSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomChatSettings';
import type { RoomModerationSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomModerationSettings';

export class RoomSettingsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomSettingsData'); }

    public static readonly _SafeStr_7458: number = 0;
    public static readonly _SafeStr_7437: number = 1;
    public static readonly _SafeStr_7532: number = 2;
    public static readonly _SafeStr_7576: number = 3;
    public static readonly _SafeStr_7490: number = 4;
    public static readonly _SafeStr_7792: number = 0;
    public static readonly _SafeStr_7846: number = 1;
    public static readonly _SafeStr_8008: number = 2;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _name: string;

    declare private _description: string;

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _maximumVisitors: number;
    static { (this.prototype as any)._maximumVisitors = 0; }

    declare private _SafeStr_6244: number;
    static { (this.prototype as any)._SafeStr_6244 = 0; }

    declare private _tags: any[];

    declare private _tradeMode: number;
    static { (this.prototype as any)._tradeMode = 0; }

    declare private _SafeStr_6184: boolean;
    static { (this.prototype as any)._SafeStr_6184 = false; }

    declare private _SafeStr_6378: boolean;
    static { (this.prototype as any)._SafeStr_6378 = false; }

    declare private _SafeStr_6015: boolean;
    static { (this.prototype as any)._SafeStr_6015 = false; }

    declare private _hideWalls: boolean;
    static { (this.prototype as any)._hideWalls = false; }

    declare private _wallThickness: number;
    static { (this.prototype as any)._wallThickness = 0; }

    declare private _floorThickness: number;
    static { (this.prototype as any)._floorThickness = 0; }

    private _SafeStr_14785: boolean = true;
    private _SafeStr_14786: boolean = true;
    private _SafeStr_14787: number = 0;
    private _SafeStr_14788: boolean = true;
    private _SafeStr_14789: number = 0;
    private _SafeStr_14790: boolean = false;

    declare private _controllersById: Map<any, any>;

    declare private _SafeStr_3708: any[];

    declare private _highlightedUserId: number;
    static { (this.prototype as any)._highlightedUserId = 0; }

    declare private _bannedUsersById: Map<any, any>;

    declare private _SafeStr_3620: any[];

    declare private _roomModerationSettings: RoomModerationSettings;

    declare private _chatSettings: RoomChatSettings;

    declare private _SafeStr_6453: boolean;
    static { (this.prototype as any)._SafeStr_6453 = false; }

    constructor() {
    }

    public static getDoorModeLocalizationKey(param1: number): string {
        switch (param1) {
            case 0:
                return "${navigator.door.mode.open}";
            case 1:
                return "${navigator.door.mode.closed}";
            case 2:
                return "${navigator.door.mode.password}";
            case 3:
                return "${navigator.door.mode.invisible}";
            case 4:
                return "${navigator.door.mode.noobs_only}";
            default:
                return "";
        }
    }

    public get tradeMode(): number {
        return this._tradeMode;
    }

    public set tradeMode(param1: number) {
        this._tradeMode = param1;
    }

    public get allowPets(): boolean {
        return this._SafeStr_6184;
    }

    public set allowPets(param1: boolean) {
        this._SafeStr_6184 = param1;
    }

    public get allowFoodConsume(): boolean {
        return this._SafeStr_6378;
    }

    public set allowFoodConsume(param1: boolean) {
        this._SafeStr_6378 = param1;
    }

    public get allowWalkThrough(): boolean {
        return this._SafeStr_6015;
    }

    public set allowWalkThrough(param1: boolean) {
        this._SafeStr_6015 = param1;
    }

    public get hideWalls(): boolean {
        return this._hideWalls;
    }

    public set hideWalls(param1: boolean) {
        this._hideWalls = param1;
    }

    public get wallThickness(): number {
        return this._wallThickness;
    }

    public set wallThickness(param1: number) {
        this._wallThickness = param1;
    }

    public get floorThickness(): number {
        return this._floorThickness;
    }

    public set floorThickness(param1: number) {
        this._floorThickness = param1;
    }

    public get leaveOnDoorTileEnabled(): boolean {
        return this._SafeStr_14785;
    }

    public set leaveOnDoorTileEnabled(param1: boolean) {
        this._SafeStr_14785 = param1;
    }

    public get idleSleepEnabled(): boolean {
        return this._SafeStr_14786;
    }

    public set idleSleepEnabled(param1: boolean) {
        this._SafeStr_14786 = param1;
    }

    public get idleSleepTimeoutSeconds(): number {
        return this._SafeStr_14787;
    }

    public set idleSleepTimeoutSeconds(param1: number) {
        this._SafeStr_14787 = param1;
    }

    public get idleAutokickEnabled(): boolean {
        return this._SafeStr_14788;
    }

    public set idleAutokickEnabled(param1: boolean) {
        this._SafeStr_14788 = param1;
    }

    public get idleAutokickTimeoutSeconds(): number {
        return this._SafeStr_14789;
    }

    public set idleAutokickTimeoutSeconds(param1: number) {
        this._SafeStr_14789 = param1;
    }

    public get muteAllPets(): boolean {
        return this._SafeStr_14790;
    }

    public set muteAllPets(param1: boolean) {
        this._SafeStr_14790 = param1;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public set roomId(param1: number) {
        this._roomId = param1;
    }

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public get description(): string {
        return this._description;
    }

    public set description(param1: string) {
        this._description = param1;
    }

    public get doorMode(): number {
        return this._doorMode;
    }

    public set doorMode(param1: number) {
        this._doorMode = param1;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public set categoryId(param1: number) {
        this._categoryId = param1;
    }

    public get maximumVisitors(): number {
        return this._maximumVisitors;
    }

    public set maximumVisitors(param1: number) {
        this._maximumVisitors = param1;
    }

    public get maximumVisitorsLimit(): number {
        return this._SafeStr_6244;
    }

    public set maximumVisitorsLimit(param1: number) {
        this._SafeStr_6244 = param1;
    }

    public get tags(): any[] {
        return this._tags;
    }

    public set tags(param1: any[]) {
        this._tags = param1;
    }

    public setFlatController(param1: number, param2: FlatControllerData): void {
        if (this._controllersById != null) {
            this._controllersById.set(param1, param2);
            this._SafeStr_3708 = null;
            this._highlightedUserId = param1;
        }
    }

    public get roomModerationSettings(): RoomModerationSettings {
        return this._roomModerationSettings;
    }

    public set roomModerationSettings(param1: RoomModerationSettings) {
        this._roomModerationSettings = param1;
    }

    public get controllersById(): Map<any, any> {
        return this._controllersById;
    }

    public set controllersById(param1: Map<any, any>) {
        this._controllersById = param1;
    }

    public get controllerList(): any[] {
        let _loc3_: number = 0;
        let _loc2_: FlatControllerData = null;
        if (this._SafeStr_3708 == null) {
            this._SafeStr_3708 = [];
            for (const _loc1_ of this._controllersById?.keys() ?? []) {
                _loc3_ = _loc1_ | 0;
                _loc2_ = this._controllersById.get(_loc3_);
                if (_loc2_ != null) {
                    this._SafeStr_3708.push(_loc2_);
                }
            }
            this._SafeStr_3708.sort((a, b) => (String(a.userName).toLowerCase() < String(b.userName).toLowerCase() ? -1 : String(a.userName).toLowerCase() > String(b.userName).toLowerCase() ? 1 : 0));
        }
        return this._SafeStr_3708;
    }

    public get highlightedUserId(): number {
        return this._highlightedUserId;
    }

    public setBannedUser(param1: number, param2: BannedUserData): void {
        if (this._bannedUsersById == null) {
            this._bannedUsersById = new Dictionary();
        } else {
            this._SafeStr_3620 = null;
        }
        this._bannedUsersById.set(param1, param2);
    }

    public get bannedUsersById(): Map<any, any> {
        return this._bannedUsersById;
    }

    public get bannedUsersList(): any[] {
        if (this._SafeStr_3620 == null) {
            this._SafeStr_3620 = [];
            for (const _loc1_ of this._bannedUsersById?.values() ?? []) {
                this._SafeStr_3620.push(_loc1_);
            }
            this._SafeStr_3620.sort((a, b) => (String(a.userName).toLowerCase() < String(b.userName).toLowerCase() ? -1 : String(a.userName).toLowerCase() > String(b.userName).toLowerCase() ? 1 : 0));
        }
        return this._SafeStr_3620;
    }

    public get chatSettings(): RoomChatSettings {
        return this._chatSettings;
    }

    public set chatSettings(param1: RoomChatSettings) {
        this._chatSettings = param1;
    }

    public get hiddenByBc(): boolean {
        return this._SafeStr_6453;
    }

    public set hiddenByBc(param1: boolean) {
        this._SafeStr_6453 = param1;
    }
}
