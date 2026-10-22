import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomWidgetRentableBotInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotInfoUpdateEvent';

export class InfoStandRentableBotData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandRentableBotData'); }

    constructor() {
    }

    private _userId: number = 0;
    private _carryItem: number = 0;
    private _userRoomId: number = 0;

    declare private _amIOwner: boolean;
    static { (this.prototype as any)._amIOwner = false; }

    declare private _amIAnyRoomController: boolean;
    static { (this.prototype as any)._amIAnyRoomController = false; }

    private _name: string = "";

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    private _badges: any[] = [];

    public get badges(): any[] {
        return this._badges.slice();
    }

    public set badges(param1: any[]) {
        this._badges = param1;
    }

    declare private _botSkills: any[];

    public get botSkills(): any[] {
        return this._botSkills;
    }

    public set botSkills(param1: any[]) {
        this._botSkills = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(param1: number) {
        this._userId = param1;
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

    public get amIOwner(): boolean {
        return this._amIOwner;
    }

    public set amIOwner(param1: boolean) {
        this._amIOwner = param1;
    }

    public get amIAnyRoomController(): boolean {
        return this._amIAnyRoomController;
    }

    public set amIAnyRoomController(param1: boolean) {
        this._amIAnyRoomController = param1;
    }

    public setData(param1: RoomWidgetRentableBotInfoUpdateEvent): void {
        this.userId = param1.webID;
        this.name = param1.name;
        this.badges = param1.badges;
        this.carryItem = param1.carryItem;
        this.userRoomId = param1.userRoomId;
        this.amIOwner = param1.amIOwner;
        this.amIAnyRoomController = param1.amIAnyRoomController;
        this.botSkills = param1.botSkills;
    }
}
