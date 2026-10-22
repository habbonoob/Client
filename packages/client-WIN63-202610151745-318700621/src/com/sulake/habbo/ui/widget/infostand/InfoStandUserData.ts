import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6059 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6059';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';

export class InfoStandUserData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandUserData'); }

    private _userId: number = 0;
    private _userName: string = "";
    private _badges: any[] = [];
    private _selectedBadges: any[] = [];
    private _SafeStr_14166: number = -1;
    private _groupId: number = 0;
    private _groupName: string = "";
    private _SafeStr_6005: string = "";
    private _respectLeft: number = 0;
    private _respectReplenishesLeft: number = 0;
    private _SafeStr_6245: number = 0;
    private _SafeStr_6067: number = 0;

    declare private _type: string;

    private _petRespectLeft: number = 0;

    constructor() {
    }

    public set userId(param1: number) {
        this._userId = param1;
    }

    public set userName(param1: string) {
        this._userName = param1;
    }

    public set badges(param1: any[]) {
        this._badges = param1;
    }

    public set selectedBadges(param1: any[]) {
        this._selectedBadges = param1 == null ? [] : param1;
    }

    public set badgesRank(param1: number) {
        this._SafeStr_14166 = param1;
    }

    public set groupId(param1: number) {
        this._groupId = param1;
    }

    public set groupName(param1: string) {
        this._groupName = param1;
    }

    public set groupBadgeId(param1: string) {
        this._SafeStr_6005 = param1;
    }

    public set respectLeft(param1: number) {
        this._respectLeft = param1;
    }

    public set respectReplenishesLeft(param1: number) {
        this._respectReplenishesLeft = param1;
    }

    public set carryItem(param1: number) {
        this._SafeStr_6245 = param1;
    }

    public set userRoomId(param1: number) {
        this._SafeStr_6067 = param1;
    }

    public set type(param1: string) {
        this._type = param1;
    }

    public set petRespectLeft(param1: number) {
        this._petRespectLeft = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get badges(): any[] {
        return this._badges.slice();
    }

    public get selectedBadges(): any[] {
        return this._selectedBadges.slice();
    }

    public get badgesRank(): number {
        return this._SafeStr_14166;
    }

    public get groupId(): number {
        return this._groupId;
    }

    public get groupName(): string {
        return this._groupName;
    }

    public get groupBadgeId(): string {
        return this._SafeStr_6005;
    }

    public get respectLeft(): number {
        return this._respectLeft;
    }

    public get respectReplenishesLeft(): number {
        return this._respectReplenishesLeft;
    }

    public get carryItem(): number {
        return this._SafeStr_6245;
    }

    public get userRoomId(): number {
        return this._SafeStr_6067;
    }

    public get type(): string {
        return this._type;
    }

    public get petRespectLeft(): number {
        return this._petRespectLeft;
    }

    public getSelectedBadge(param1: number): _SafeCls_6059 {
        for (const _loc2_ of this._selectedBadges ?? []) {
            if (_loc2_ != null && _loc2_.slotIndex == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getBadgeSlot(param1: string): number {
        for (const _loc2_ of this._selectedBadges ?? []) {
            if (_loc2_ != null && _loc2_.badgeCode == param1) {
                return _loc2_.slotIndex | 0;
            }
        }
        return this._badges.indexOf(param1);
    }

    public isBot(): boolean {
        return this.type == "RWUIUE_BOT";
    }

    public setData(param1: RoomWidgetUserInfoUpdateEvent): void {
        this.userId = param1.webID;
        this.userName = param1.name;
        this.badges = param1.badges;
        this.selectedBadges = param1.selectedBadges;
        this.badgesRank = param1.badgesRank;
        this.groupId = param1.groupId;
        this.groupName = param1.groupName;
        this.groupBadgeId = param1.groupBadgeId;
        this.respectLeft = param1.respectLeft;
        this.respectReplenishesLeft = param1.respectReplenishesLeft;
        this.carryItem = param1.carryItem;
        this.userRoomId = param1.userRoomId;
        this.type = param1.type;
    }
}
