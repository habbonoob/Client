import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CompetitionRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CompetitionRoomsData';
import type { EventCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/EventCategory';
import type { FlatCategory } from '@/com/sulake/habbo/communication/messages/incoming/navigator/FlatCategory';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { ISearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/ISearchResultData';
import type { OfficialRoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomEntryData';
import type { PromotedRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PromotedRoomsData';
import type { RoomEventData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomEventData';
import type { FavouritesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FavouritesMessageParser';
import type { RoomEntryInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomEntryInfoMessageParser';
import type { RoomSessionTags } from '@/com/sulake/habbo/navigator/domain/RoomSessionTags';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import { CategoriesWithVisitorCountData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/CategoriesWithVisitorCountData';
import { GuestRoomSearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomSearchResultData';
import { OfficialRoomsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomsData';
import { PopularRoomTagsData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PopularRoomTagsData';
import { FriendList } from '@/com/sulake/habbo/navigator/roomsettings/FriendList';

export class NavigatorData {
    static { registerClassName(this, 'com.sulake.habbo.navigator.domain::NavigatorData'); }

    private static readonly MAX_HISTORY_LENGTH: number = 10;

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNavigator;

    declare private _lastMsg: ISearchResultData;

    declare private _roomEventData: RoomEventData;

    declare private _eventMod: boolean;
    static { (this.prototype as any)._eventMod = false; }

    declare private _roomPicker: boolean;
    static { (this.prototype as any)._roomPicker = false; }

    declare private _currentRoomOwner: boolean;
    static { (this.prototype as any)._currentRoomOwner = false; }

    declare private _currentRoomId: number;
    static { (this.prototype as any)._currentRoomId = 0; }

    declare private _avatarId: number;
    static { (this.prototype as any)._avatarId = 0; }

    declare private _hcMember: boolean;
    static { (this.prototype as any)._hcMember = false; }

    declare private _createdFlatId: number;
    static { (this.prototype as any)._createdFlatId = 0; }

    declare private _homeRoomId: number;
    static { (this.prototype as any)._homeRoomId = 0; }

    declare private _settingsReceived: boolean;
    static { (this.prototype as any)._settingsReceived = false; }

    declare private _favouriteLimit: number;
    static { (this.prototype as any)._favouriteLimit = 0; }

    declare private _SafeStr_5090: number;
    static { (this.prototype as any)._SafeStr_5090 = 0; }

    private _SafeStr_4155: Map<any, any> = new Dictionary();

    declare private _SafeStr_3217: boolean;
    static { (this.prototype as any)._SafeStr_3217 = false; }

    declare private _currentRoomRating: number;
    static { (this.prototype as any)._currentRoomRating = 0; }

    declare private _canRate: boolean;
    static { (this.prototype as any)._canRate = false; }

    declare private _currentRoomIsStaffPick: boolean;
    static { (this.prototype as any)._currentRoomIsStaffPick = false; }

    private _adIndex: number = 0;

    declare private _adRoom: OfficialRoomEntryData;

    declare private _roomSessionTags: RoomSessionTags;

    declare private _competitionRoomsData: CompetitionRoomsData;

    declare private _enteredGuestRoom: GuestRoomData;

    public get enteredGuestRoom(): GuestRoomData {
        return this._enteredGuestRoom;
    }

    declare private _hotRoomPopupOpen: boolean;
    static { (this.prototype as any)._hotRoomPopupOpen = false; }

    public get hotRoomPopupOpen(): boolean {
        return this._hotRoomPopupOpen;
    }

    public set hotRoomPopupOpen(param1: boolean) {
        this._hotRoomPopupOpen = param1;
    }

    private _allCategories: any[] = [];

    public get allCategories(): any[] {
        return this._allCategories;
    }

    private _visibleCategories: any[] = [];

    public get visibleCategories(): any[] {
        return this._visibleCategories;
    }

    private _allEventCategories: any[] = [];

    public get allEventCategories(): any[] {
        return this._allEventCategories;
    }

    private _visibleEventCategories: any[] = [];

    public get visibleEventCategories(): any[] {
        return this._visibleEventCategories;
    }

    declare private _promotedRooms: PromotedRoomsData;

    public get promotedRooms(): PromotedRoomsData {
        return this._promotedRooms;
    }

    public set promotedRooms(param1: PromotedRoomsData) {
        this._promotedRooms = param1;
    }

    private _friendList: FriendList = new FriendList();

    public get friendList(): FriendList {
        return this._friendList;
    }

    public get canAddFavourite(): boolean {
        return this._enteredGuestRoom != null && !this._currentRoomOwner;
    }

    public get canEditRoomSettings(): boolean {
        return this._enteredGuestRoom != null && (this._currentRoomOwner || this._navigator.sessionData.hasSecurity(5));
    }

    public set enteredRoom(param1: GuestRoomData) {
        if (this._enteredGuestRoom != null) {
            this._enteredGuestRoom.dispose();
        }
        this._enteredGuestRoom = param1;
    }

    public get popularTagsArrived(): boolean {
        return this._lastMsg != null && (this._lastMsg instanceof PopularRoomTagsData ? this._lastMsg : null) != null;
    }

    public get guestRoomSearchArrived(): boolean {
        return this._lastMsg != null && (this._lastMsg instanceof GuestRoomSearchResultData ? this._lastMsg : null) != null;
    }

    public get officialRoomsArrived(): boolean {
        return this._lastMsg != null && (this._lastMsg instanceof OfficialRoomsData ? this._lastMsg : null) != null;
    }

    public get categoriesWithUserCountArrived(): boolean {
        return this._lastMsg != null && (this._lastMsg instanceof CategoriesWithVisitorCountData ? this._lastMsg : null) != null;
    }

    public get adRoom(): OfficialRoomEntryData {
        return this._adRoom;
    }

    public set adRoom(param1: OfficialRoomEntryData) {
        this._adRoom = param1;
    }

    public get guestRoomSearchResults(): GuestRoomSearchResultData {
        return this._lastMsg instanceof GuestRoomSearchResultData ? this._lastMsg : null;
    }

    public set guestRoomSearchResults(param1: GuestRoomSearchResultData) {
        this.disposeCurrentMsg();
        this._lastMsg = param1;
        this._adRoom = param1.ad;
        this._SafeStr_3217 = false;
    }

    public get popularTags(): PopularRoomTagsData {
        return this._lastMsg instanceof PopularRoomTagsData ? this._lastMsg : null;
    }

    public set popularTags(param1: PopularRoomTagsData) {
        this.disposeCurrentMsg();
        this._lastMsg = param1;
        this._SafeStr_3217 = false;
    }

    public get officialRooms(): OfficialRoomsData {
        return this._lastMsg instanceof OfficialRoomsData ? this._lastMsg : null;
    }

    public set officialRooms(param1: OfficialRoomsData) {
        this.disposeCurrentMsg();
        this._lastMsg = param1;
        this._SafeStr_3217 = false;
    }

    public get categoriesWithVisitorData(): CategoriesWithVisitorCountData {
        return this._lastMsg instanceof CategoriesWithVisitorCountData ? this._lastMsg : null;
    }

    public set categoriesWithVisitorData(param1: CategoriesWithVisitorCountData) {
        this.disposeCurrentMsg();
        this._lastMsg = param1;
        this._SafeStr_3217 = false;
    }

    public get roomEventData(): RoomEventData {
        return this._roomEventData;
    }

    public set roomEventData(param1: RoomEventData) {
        if (this._roomEventData != null) {
            this._roomEventData.dispose();
        }
        this._roomEventData = param1;
    }

    public get avatarId(): number {
        return this._avatarId;
    }

    public set avatarId(param1: number) {
        this._avatarId = param1;
    }

    public get eventMod(): boolean {
        return this._eventMod;
    }

    public set eventMod(param1: boolean) {
        this._eventMod = param1;
    }

    public get roomPicker(): boolean {
        return this._roomPicker;
    }

    public set roomPicker(param1: boolean) {
        this._roomPicker = param1;
    }

    public get currentRoomOwner(): boolean {
        return this._currentRoomOwner;
    }

    public get hcMember(): boolean {
        return this._hcMember;
    }

    public set hcMember(param1: boolean) {
        this._hcMember = param1;
    }

    public get createdFlatId(): number {
        return this._createdFlatId;
    }

    public set createdFlatId(param1: number) {
        this._createdFlatId = param1;
    }

    public get homeRoomId(): number {
        return this._homeRoomId;
    }

    public set homeRoomId(param1: number) {
        this._homeRoomId = param1;
    }

    public get currentRoomRating(): number {
        return this._currentRoomRating;
    }

    public set currentRoomRating(param1: number) {
        this._currentRoomRating = param1;
    }

    public get canRate(): boolean {
        return this._canRate;
    }

    public set canRate(param1: boolean) {
        this._canRate = param1;
    }

    public get settingsReceived(): boolean {
        return this._settingsReceived;
    }

    public set settingsReceived(param1: boolean) {
        this._settingsReceived = param1;
    }

    public get adIndex(): number {
        return this._adIndex;
    }

    public set adIndex(param1: number) {
        this._adIndex = param1;
    }

    public get currentRoomIsStaffPick(): boolean {
        return this._currentRoomIsStaffPick;
    }

    public set currentRoomIsStaffPick(param1: boolean) {
        this._currentRoomIsStaffPick = param1;
    }

    public get currentRoomId(): number {
        return this._currentRoomId;
    }

    public set categories(param1: any[]) {
        this._allCategories = param1;
        this._visibleCategories = [];
        for (const _loc2_ of this._allCategories ?? []) {
            if (_loc2_.visible) {
                this._visibleCategories.push(_loc2_);
            }
        }
    }

    public set eventCategories(param1: any[]) {
        this._allEventCategories = param1;
        this._visibleEventCategories = [];
        for (const _loc2_ of this._allEventCategories ?? []) {
            if (_loc2_.visible) {
                this._visibleEventCategories.push(_loc2_);
            }
        }
    }

    public set roomSessionTags(param1: RoomSessionTags) {
        this._roomSessionTags = param1;
    }

    public get competitionRoomsData(): CompetitionRoomsData {
        return this._competitionRoomsData;
    }

    public set competitionRoomsData(param1: CompetitionRoomsData) {
        this._competitionRoomsData = param1;
    }

    public onRoomEnter(param1: RoomEntryInfoMessageParser): void {
        this._enteredGuestRoom = null;
        this._currentRoomOwner = false;
        this._currentRoomOwner = param1.owner;
        this._currentRoomId = param1.guestRoomId;
    }

    public onRoomExit(): void {
        if (this._roomEventData != null) {
            this._roomEventData.dispose();
            this._roomEventData = null;
        }
        if (this._enteredGuestRoom != null) {
            this._enteredGuestRoom.dispose();
            this._enteredGuestRoom = null;
        }
        this._currentRoomOwner = false;
    }

    public getCategoryById(param1: number): FlatCategory {
        for (const _loc2_ of this._allCategories ?? []) {
            if (_loc2_.nodeId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getEventCategoryById(param1: number): EventCategory {
        for (const _loc2_ of this._allCategories ?? []) {
            if (_loc2_.categoryId == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public onFavourites(param1: FavouritesMessageParser): void {
        this._favouriteLimit = param1.limit;
        this._SafeStr_5090 = param1.favouriteRoomIds.length | 0;
        this._SafeStr_4155 = new Dictionary();
        for (const _loc2_ of param1.favouriteRoomIds ?? []) {
            this._SafeStr_4155.set(_loc2_, "yes");
        }
    }

    public favouriteChanged(param1: number, param2: boolean): void {
        this._SafeStr_4155.set(param1, param2 ? "yes" : null);
        this._SafeStr_5090 += param2 ? 1 : -1;
    }

    public isCurrentRoomFavourite(): boolean {
        let _loc1_: number = this._enteredGuestRoom.flatId;
        return this._SafeStr_4155.get(_loc1_) != null;
    }

    public isCurrentRoomHome(): boolean {
        if (this._enteredGuestRoom == null) {
            return false;
        }
        let _loc1_: number = this._enteredGuestRoom.flatId;
        return this._homeRoomId == _loc1_;
    }

    public isRoomFavourite(param1: number): boolean {
        return this._SafeStr_4155.get(param1) != null;
    }

    public isFavouritesFull(): boolean {
        return this._SafeStr_5090 >= this._favouriteLimit;
    }

    public isRoomHome(param1: number): boolean {
        return param1 == this._homeRoomId;
    }

    public startLoading(): void {
        this._SafeStr_3217 = true;
    }

    public isLoading(): boolean {
        return this._SafeStr_3217;
    }

    public getAndResetSessionTags(): RoomSessionTags {
        let _loc1_: RoomSessionTags = this._roomSessionTags;
        this._roomSessionTags = null;
        return _loc1_;
    }

    private disposeCurrentMsg(): void {
        if (this._lastMsg == null) {
            return;
        }
        this._lastMsg.dispose();
        this._lastMsg = null;
    }
}
