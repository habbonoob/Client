import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomWidgetRentableBotInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotInfoUpdateEvent';

export class RentableBotInfoData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::RentableBotInfoData'); }

    constructor() {
    }

    private _id: number = -1;

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    private _isIgnored: boolean = false;
    private _amIOwner: boolean = false;
    private _amIAnyRoomController: boolean = false;
    private _carryItemType: number = 0;
    private _botSkillsWithCommands: any[] = new Array(0);

    declare private _botSkills: any[];

    public get botSkills(): any[] {
        return this._botSkills;
    }

    public set botSkills(param1: any[]) {
        this._botSkills = param1;
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public set roomIndex(param1: number) {
        this._roomIndex = param1;
    }

    public get isIgnored(): boolean {
        return this._isIgnored;
    }

    public set isIgnored(param1: boolean) {
        this._isIgnored = param1;
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

    public get carryItemType(): number {
        return this._carryItemType;
    }

    public set carryItemType(param1: number) {
        this._carryItemType = param1;
    }

    public get botSkillsWithCommands(): any[] {
        return this._botSkillsWithCommands;
    }

    public set botSkillsWithCommands(param1: any[]) {
        this._botSkillsWithCommands = param1;
    }

    public cloneAndSetSkillsWithCommands(param1: any[]): void {
        this._botSkills = [];
        for (const _loc2_ of param1 ?? []) {
            this.botSkills.push(_loc2_.id);
        }
        this._botSkillsWithCommands = param1.concat();
    }

    public populate(param1: RoomWidgetRentableBotInfoUpdateEvent): void {
        if (param1.webID != this.id) {
            this._botSkillsWithCommands = new Array(0);
        }
        this.id = param1.webID;
        this.roomIndex = param1.userRoomId;
        this.amIOwner = param1.amIOwner;
        this.amIAnyRoomController = param1.amIAnyRoomController;
        this.carryItemType = param1.carryItem;
        this.botSkills = param1.botSkills;
        this._name = param1.name;
    }
}
