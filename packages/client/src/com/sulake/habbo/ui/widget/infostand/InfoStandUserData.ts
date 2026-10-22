import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';

export class InfoStandUserData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandUserData'); }

    constructor() {
    }

    private _userId: number = 0;
    private _groupBadgeId: string = "";
    private _respectLeft: number = 0;
    private _respectReplenishesLeft: number = 0;
    private _carryItem: number = 0;
    private _userRoomId: number = 0;

    declare private _type: string;

    private _petRespectLeft: number = 0;
    private _userName: string = "";

    public get userName(): string {
        return this._userName;
    }

    public set userName(param1: string) {
        this._userName = param1;
    }

    private _badges: any[] = [];

    public get badges(): any[] {
        return this._badges.slice();
    }

    public set badges(param1: any[]) {
        this._badges = param1;
    }

    private _groupId: number = 0;

    public get groupId(): number {
        return this._groupId;
    }

    public set groupId(param1: number) {
        this._groupId = param1;
    }

    private _groupName: string = "";

    public get groupName(): string {
        return this._groupName;
    }

    public set groupName(param1: string) {
        this._groupName = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(param1: number) {
        this._userId = param1;
    }

    public get groupBadgeId(): string {
        return this._groupBadgeId;
    }

    public set groupBadgeId(param1: string) {
        this._groupBadgeId = param1;
    }

    public get respectLeft(): number {
        return this._respectLeft;
    }

    public set respectLeft(param1: number) {
        this._respectLeft = param1;
    }

    public get respectReplenishesLeft(): number {
        return this._respectReplenishesLeft;
    }

    public set respectReplenishesLeft(param1: number) {
        this._respectReplenishesLeft = param1;
    }

    public get carryItem(): number {
        return this._carryItem;
    }

    public set carryItem(param1: number) {
        this._carryItem = param1;
    }

    public get userRoomId(): number {
        return this._userRoomId;
    }

    public set userRoomId(param1: number) {
        this._userRoomId = param1;
    }

    public get type(): string {
        return this._type;
    }

    public set type(param1: string) {
        this._type = param1;
    }

    public get petRespectLeft(): number {
        return this._petRespectLeft;
    }

    public set petRespectLeft(param1: number) {
        this._petRespectLeft = param1;
    }

    public isBot(): boolean {
        return this.type == "RWUIUE_BOT";
    }

    public setData(param1: RoomWidgetUserInfoUpdateEvent): void {
        this.userId = param1.webID;
        this.userName = param1.name;
        this.badges = param1.badges;
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
