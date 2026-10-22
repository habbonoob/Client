import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomWidgetRentableBotInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotInfoUpdateEvent';

export class InfoStandRentableBotData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandRentableBotData'); }

    private _userId: number = 0;
    private _name: string = "";
    private _badges: any[] = [];
    private _SafeStr_6245: number = 0;
    private _SafeStr_6067: number = 0;

    declare private _amIOwner: boolean;
    static { (this.prototype as any)._amIOwner = false; }

    declare private _amIAnyRoomController: boolean;
    static { (this.prototype as any)._amIAnyRoomController = false; }

    declare private _botSkills: any[];

    constructor() {
    }

    public set userId(param1: number) {
        this._userId = param1;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public set badges(param1: any[]) {
        this._badges = param1;
    }

    public set carryItem(param1: number) {
        this._SafeStr_6245 = param1;
    }

    public set userRoomId(param1: number) {
        this._SafeStr_6067 = param1;
    }

    public set amIOwner(param1: boolean) {
        this._amIOwner = param1;
    }

    public set amIAnyRoomController(param1: boolean) {
        this._amIAnyRoomController = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public get name(): string {
        return this._name;
    }

    public get badges(): any[] {
        return this._badges.slice();
    }

    public get carryItem(): number {
        return this._SafeStr_6245;
    }

    public get userRoomId(): number {
        return this._SafeStr_6067;
    }

    public get amIOwner(): boolean {
        return this._amIOwner;
    }

    public get amIAnyRoomController(): boolean {
        return this._amIAnyRoomController;
    }

    public get botSkills(): any[] {
        return this._botSkills;
    }

    public set botSkills(param1: any[]) {
        this._botSkills = param1;
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
