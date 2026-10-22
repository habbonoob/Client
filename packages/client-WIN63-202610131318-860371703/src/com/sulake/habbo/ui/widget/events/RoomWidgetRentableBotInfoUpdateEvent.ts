import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRentableBotInfoUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRentableBotInfoUpdateEvent'); }

    public static readonly RENTABLE_BOT: string = "RWRBIUE_RENTABLE_BOT";
    public static readonly DEFAULT_BOT_BADGE_ID: string = "RENTABLE_BOT";
    private _name: string = "";
    private _motto: string = "";
    private _webID: number = 0;
    private _figure: string = "";
    private _badges: any[] = [];
    private _SafeStr_6245: number = 0;
    private _SafeStr_6067: number = 0;

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _ownerName: string;

    private _amIOwner: boolean = false;
    private _amIAnyRoomController: boolean = false;
    private _myRoomControllerLevel: number = 0;

    declare private _botSkills: any[];

    constructor(param1: boolean = false, param2: boolean = false) {
        super("RWRBIUE_RENTABLE_BOT", param1, param2);
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public get name(): string {
        return this._name;
    }

    public set motto(param1: string) {
        this._motto = param1;
    }

    public get motto(): string {
        return this._motto;
    }

    public set webID(param1: number) {
        this._webID = param1;
    }

    public get webID(): number {
        return this._webID;
    }

    public set figure(param1: string) {
        this._figure = param1;
    }

    public get figure(): string {
        return this._figure;
    }

    public set badges(param1: any[]) {
        this._badges = param1;
    }

    public get badges(): any[] {
        return this._badges;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public set ownerId(param1: number) {
        this._ownerId = param1;
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        this._ownerName = param1;
    }

    public set amIOwner(param1: boolean) {
        this._amIOwner = param1;
    }

    public get amIOwner(): boolean {
        return this._amIOwner;
    }

    public set myRoomControllerLevel(param1: number) {
        this._myRoomControllerLevel = param1;
    }

    public get myRoomControllerLevel(): number {
        return this._myRoomControllerLevel;
    }

    public set amIAnyRoomController(param1: boolean) {
        this._amIAnyRoomController = param1;
    }

    public get amIAnyRoomController(): boolean {
        return this._amIAnyRoomController;
    }

    public set carryItem(param1: number) {
        this._SafeStr_6245 = param1;
    }

    public get carryItem(): number {
        return this._SafeStr_6245;
    }

    public set userRoomId(param1: number) {
        this._SafeStr_6067 = param1;
    }

    public get userRoomId(): number {
        return this._SafeStr_6067;
    }

    public get botSkills(): any[] {
        return this._botSkills;
    }

    public set botSkills(param1: any[]) {
        this._botSkills = param1;
    }
}
