import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetFurniInfoUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetFurniInfoUpdateEvent'); }

    public static readonly FURNI: string = "RWFIUE_FURNI";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }

    private _id: number = 0;
    private _category: number = 0;
    private _description: string = "";
    private _image: BitmapData = null;
    private _classId: number = 0;
    private _isWallItem: boolean = false;
    private _isStickie: boolean = false;
    private _isRoomOwner: boolean = false;
    private _roomControllerLevel: number = 0;
    private _isAnyRoomController: boolean = false;
    private _expiration: number = -1;
    private _SafeStr_7927: number = -1;
    private _purchaseOfferId: number = -1;
    private _extraParam: string = "";
    private _isOwner: boolean = false;
    private _stuffData: IStuffData = null;
    private _ownerId: number = 0;
    private _usagePolicy: number = 0;
    private _SafeStr_7599: number = -1;
    private _rentOfferId: number = -1;

    declare private _availableForBuildersClub: boolean;
    static { (this.prototype as any)._availableForBuildersClub = false; }

    declare private _isNft: boolean;
    static { (this.prototype as any)._isNft = false; }

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

    private _groupId: number = 0;

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

    declare private _purchaseCouldBeUsedForBuyout: boolean;
    static { (this.prototype as any)._purchaseCouldBeUsedForBuyout = false; }

    public get purchaseCouldBeUsedForBuyout(): boolean {
        return this._purchaseCouldBeUsedForBuyout;
    }

    public set purchaseCouldBeUsedForBuyout(param1: boolean) {
        this._purchaseCouldBeUsedForBuyout = param1;
    }

    declare private _rentCouldBeUsedForBuyout: boolean;
    static { (this.prototype as any)._rentCouldBeUsedForBuyout = false; }

    public get rentCouldBeUsedForBuyout(): boolean {
        return this._rentCouldBeUsedForBuyout;
    }

    public set rentCouldBeUsedForBuyout(param1: boolean) {
        this._rentCouldBeUsedForBuyout = param1;
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

    public get image(): BitmapData {
        return this._image;
    }

    public set image(param1: BitmapData) {
        this._image = param1;
    }

    public get isWallItem(): boolean {
        return this._isWallItem;
    }

    public set isWallItem(param1: boolean) {
        this._isWallItem = param1;
    }

    public get isStickie(): boolean {
        return this._isStickie;
    }

    public set isStickie(param1: boolean) {
        this._isStickie = param1;
    }

    public get isRoomOwner(): boolean {
        return this._isRoomOwner;
    }

    public set isRoomOwner(param1: boolean) {
        this._isRoomOwner = param1;
    }

    public get roomControllerLevel(): number {
        return this._roomControllerLevel;
    }

    public set roomControllerLevel(param1: number) {
        this._roomControllerLevel = param1;
    }

    public get isAnyRoomController(): boolean {
        return this._isAnyRoomController;
    }

    public set isAnyRoomController(param1: boolean) {
        this._isAnyRoomController = param1;
    }

    public get expiration(): number {
        return this._expiration;
    }

    public set expiration(param1: number) {
        this._expiration = param1;
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

    public get isOwner(): boolean {
        return this._isOwner;
    }

    public set isOwner(param1: boolean) {
        this._isOwner = param1;
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

    public get usagePolicy(): number {
        return this._usagePolicy;
    }

    public set usagePolicy(param1: number) {
        this._usagePolicy = param1;
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

    public get isNft(): boolean {
        return this._isNft;
    }

    public set isNft(param1: boolean) {
        this._isNft = param1;
    }

    public get classId(): number {
        return this._classId;
    }

    public set classId(param1: number) {
        this._classId = param1;
    }

    public get tradeable(): boolean {
        return this._tradeable;
    }

    public set tradeable(param1: boolean) {
        this._tradeable = param1;
    }
}
