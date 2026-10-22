import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { RoomWidgetFurniInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFurniInfoUpdateEvent';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class InfoStandFurniData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandFurniData'); }

    constructor() {
    }

    private _id: number = 0;
    private _category: number = 0;
    private _description: string = "";

    declare private _image: BitmapData;

    declare private _classId: number;
    static { (this.prototype as any)._classId = 0; }

    private _purchaseOfferId: number = -1;
    private _extraParam: string = "";
    private _stuffData: IStuffData = null;
    private _ownerId: number = 0;
    private _rentOfferId: number = -1;
    private _availableForBuildersClub: boolean = false;
    private _bcOfferId: number = -1;

    declare private _tradeable: boolean;
    static { (this.prototype as any)._tradeable = false; }

    private _name: string = "";

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    public get groupId(): number {
        return this._groupId;
    }

    public set groupId(param1: number) {
        this._groupId = param1;
    }

    private _ownerName: string = "";

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        this._ownerName = param1;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get category(): number {
        return this._category;
    }

    public set category(param1: number) {
        this._category = param1;
    }

    public get description(): string {
        return this._description;
    }

    public set description(param1: string) {
        this._description = param1;
    }

    public get classId(): number {
        return this._classId;
    }

    public set classId(param1: number) {
        this._classId = param1;
    }

    public get image(): BitmapData {
        return this._image;
    }

    public set image(param1: BitmapData) {
        this._image = param1;
    }

    public get purchaseOfferId(): number {
        return this._purchaseOfferId;
    }

    public set purchaseOfferId(param1: number) {
        this._purchaseOfferId = param1;
    }

    public get bcOfferId(): number {
        return this._bcOfferId;
    }

    public set bcOfferId(param1: number) {
        this._bcOfferId = param1;
    }

    public get extraParam(): string {
        return this._extraParam;
    }

    public set extraParam(param1: string) {
        this._extraParam = param1;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public set stuffData(param1: IStuffData) {
        this._stuffData = param1;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public set ownerId(param1: number) {
        this._ownerId = param1;
    }

    public get rentOfferId(): number {
        return this._rentOfferId;
    }

    public set rentOfferId(param1: number) {
        this._rentOfferId = param1;
    }

    public get availableForBuildersClub(): boolean {
        return this._availableForBuildersClub;
    }

    public set availableForBuildersClub(param1: boolean) {
        this._availableForBuildersClub = param1;
    }

    public get tradeable(): boolean {
        return this._tradeable;
    }

    public set tradeable(param1: boolean) {
        this._tradeable = param1;
    }

    public setData(param1: RoomWidgetFurniInfoUpdateEvent): void {
        this.id = param1.id;
        this.category = param1.category;
        this.name = param1.name;
        this.description = param1.description;
        this.image = param1.image;
        this.purchaseOfferId = param1.purchaseOfferId;
        this.extraParam = param1.extraParam;
        this.stuffData = param1.stuffData;
        this.groupId = param1.groupId;
        this.ownerName = param1.ownerName;
        this.ownerId = param1.ownerId;
        this.rentOfferId = param1.rentOfferId;
        this.availableForBuildersClub = param1.availableForBuildersClub;
        this.classId = param1.classId;
        this.bcOfferId = param1.bcOfferId;
        this.tradeable = param1.tradeable;
    }
}
