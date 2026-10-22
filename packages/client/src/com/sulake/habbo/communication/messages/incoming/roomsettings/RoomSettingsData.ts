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

    constructor() {
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _description: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _maximumVisitors: number;
    static { (this.prototype as any)._maximumVisitors = 0; }

    declare private _maximumVisitorsLimit: number;
    static { (this.prototype as any)._maximumVisitorsLimit = 0; }

    declare private _tags: any[];

    declare private _allowPets: boolean;
    static { (this.prototype as any)._allowPets = false; }

    declare private _allowFoodConsume: boolean;
    static { (this.prototype as any)._allowFoodConsume = false; }

    declare private _allowWalkThrough: boolean;
    static { (this.prototype as any)._allowWalkThrough = false; }

    declare private _controllersById: Map<any, any>;

    declare private _SafeStr_3708: any[];

    declare private _highlightedUserId: number;
    static { (this.prototype as any)._highlightedUserId = 0; }

    declare private _bannedUsersById: Map<any, any>;

    declare private _SafeStr_3620: any[];

    declare private _roomModerationSettings: RoomModerationSettings;

    declare private _chatSettings: RoomChatSettings;

    declare private _allowNavigatorDynamicCats: boolean;
    static { (this.prototype as any)._allowNavigatorDynamicCats = false; }

    declare private _hiddenByBc: boolean;
    static { (this.prototype as any)._hiddenByBc = false; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    public get doorMode(): number {
        return this._doorMode;
    }

    public set doorMode(param1: number) {
        this._doorMode = param1;
    }

    declare private _tradeMode: number;
    static { (this.prototype as any)._tradeMode = 0; }

    public get tradeMode(): number {
        return this._tradeMode;
    }

    public set tradeMode(param1: number) {
        this._tradeMode = param1;
    }

    declare private _hideWalls: boolean;
    static { (this.prototype as any)._hideWalls = false; }

    public get hideWalls(): boolean {
        return this._hideWalls;
    }

    public set hideWalls(param1: boolean) {
        this._hideWalls = param1;
    }

    declare private _wallThickness: number;
    static { (this.prototype as any)._wallThickness = 0; }

    public get wallThickness(): number {
        return this._wallThickness;
    }

    public set wallThickness(param1: number) {
        this._wallThickness = param1;
    }

    declare private _floorThickness: number;
    static { (this.prototype as any)._floorThickness = 0; }

    public get floorThickness(): number {
        return this._floorThickness;
    }

    public set floorThickness(param1: number) {
        this._floorThickness = param1;
    }

    public get allowPets(): boolean {
        return this._allowPets;
    }

    public set allowPets(param1: boolean) {
        this._allowPets = param1;
    }

    public get allowFoodConsume(): boolean {
        return this._allowFoodConsume;
    }

    public set allowFoodConsume(param1: boolean) {
        this._allowFoodConsume = param1;
    }

    public get allowWalkThrough(): boolean {
        return this._allowWalkThrough;
    }

    public set allowWalkThrough(param1: boolean) {
        this._allowWalkThrough = param1;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public set roomId(param1: number) {
        this._roomId = param1;
    }

    public get description(): string {
        return this._description;
    }

    public set description(param1: string) {
        this._description = param1;
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
        return this._maximumVisitorsLimit;
    }

    public set maximumVisitorsLimit(param1: number) {
        this._maximumVisitorsLimit = param1;
    }

    public get tags(): any[] {
        return this._tags;
    }

    public set tags(param1: any[]) {
        this._tags = param1;
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

    public get allowNavigatorDynamicCats(): boolean {
        return this._allowNavigatorDynamicCats;
    }

    public set allowNavigatorDynamicCats(param1: boolean) {
        this._allowNavigatorDynamicCats = param1;
    }

    public get hiddenByBc(): boolean {
        return this._hiddenByBc;
    }

    public set hiddenByBc(param1: boolean) {
        this._hiddenByBc = param1;
    }

    public setFlatController(param1: number, param2: FlatControllerData): void {
        if (this._controllersById != null) {
            this._controllersById.set(param1, param2);
            this._SafeStr_3708 = null;
            this._highlightedUserId = param1;
        }
    }

    public setBannedUser(param1: number, param2: BannedUserData): void {
        if (this._bannedUsersById == null) {
            this._bannedUsersById = new Dictionary();
        } else {
            this._SafeStr_3620 = null;
        }
        this._bannedUsersById.set(param1, param2);
    }
}
