import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomWidgetUserInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUserInfoUpdateEvent';

export class AvatarInfoData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::AvatarInfoData'); }

    constructor() {
    }

    private _isIgnored: boolean = false;
    private _canTradeReason: number = 0;
    private _canBeKicked: boolean = false;
    private _canBeBanned: boolean = false;
    private _canBeMuted: boolean = false;
    private _canBeAskedAsFriend: boolean = false;
    private _amIOwner: boolean = false;
    private _amIAnyRoomController: boolean = false;
    private _respectLeft: number = 0;
    private _respectReplenishesLeft: number = 0;
    private _isOwnUser: boolean = false;
    private _allowNameChange: boolean = false;
    private _carryItemType: number = 0;
    private _myRoomControllerLevel: number = 0;
    private _targetRoomControllerLevel: number = 0;
    private _isFriend: boolean = false;
    private _isBlocked: boolean = false;
    private _canTrade: boolean = false;

    public get canTrade(): boolean {
        return this._canTrade;
    }

    public set canTrade(param1: boolean) {
        this._canTrade = param1;
    }

    private _isGuildRoom: boolean = false;

    public get isGuildRoom(): boolean {
        return this._isGuildRoom;
    }

    public set isGuildRoom(param1: boolean) {
        this._isGuildRoom = param1;
    }

    private _isAmbassador: boolean = false;

    public get isAmbassador(): boolean {
        return this._isAmbassador;
    }

    public get isIgnored(): boolean {
        return this._isIgnored;
    }

    public set isIgnored(param1: boolean) {
        this._isIgnored = param1;
    }

    public get canTradeReason(): number {
        return this._canTradeReason;
    }

    public set canTradeReason(param1: number) {
        this._canTradeReason = param1;
    }

    public get canBeKicked(): boolean {
        return this._canBeKicked;
    }

    public set canBeKicked(param1: boolean) {
        this._canBeKicked = param1;
    }

    public get canBeBanned(): boolean {
        return this._canBeBanned;
    }

    public set canBeBanned(param1: boolean) {
        this._canBeBanned = param1;
    }

    public get canBeAskedAsFriend(): boolean {
        return this._canBeAskedAsFriend;
    }

    public set canBeAskedAsFriend(param1: boolean) {
        this._canBeAskedAsFriend = param1;
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

    public get isOwnUser(): boolean {
        return this._isOwnUser;
    }

    public set isOwnUser(param1: boolean) {
        this._isOwnUser = param1;
    }

    public get allowNameChange(): boolean {
        return this._allowNameChange;
    }

    public set allowNameChange(param1: boolean) {
        this._allowNameChange = param1;
    }

    public get carryItemType(): number {
        return this._carryItemType;
    }

    public set carryItemType(param1: number) {
        this._carryItemType = param1;
    }

    public get myRoomControllerLevel(): number {
        return this._myRoomControllerLevel;
    }

    public set myRoomControllerLevel(param1: number) {
        this._myRoomControllerLevel = param1;
    }

    public get targetRoomControllerLevel(): number {
        return this._targetRoomControllerLevel;
    }

    public set targetRoomControllerLevel(param1: number) {
        this._targetRoomControllerLevel = param1;
    }

    public get canBeMuted(): boolean {
        return this._canBeMuted;
    }

    public set canBeMuted(param1: boolean) {
        this._canBeMuted = param1;
    }

    public get isFriend(): boolean {
        return this._isFriend;
    }

    public get isBlocked(): boolean {
        return this._isBlocked;
    }

    public populate(param1: RoomWidgetUserInfoUpdateEvent): void {
        this._amIAnyRoomController = param1.amIAnyRoomController;
        this._myRoomControllerLevel = param1.myRoomControllerLevel;
        this._amIOwner = param1.amIOwner;
        this._canBeAskedAsFriend = param1.canBeAskedAsFriend;
        this._canBeKicked = param1.canBeKicked;
        this._canBeBanned = param1.canBeBanned;
        this._canBeMuted = param1.canBeMuted;
        this._canTrade = param1.canTrade;
        this._canTradeReason = param1.canTradeReason;
        this._isIgnored = param1.isIgnored;
        this._respectLeft = param1.respectLeft;
        this._respectReplenishesLeft = param1.respectReplenishesLeft;
        this._isOwnUser = param1.type == "RWUIUE_OWN_USER";
        this._allowNameChange = param1.allowNameChange;
        this._isGuildRoom = param1.isGuildRoom;
        this._targetRoomControllerLevel = param1.targetRoomControllerLevel;
        this._carryItemType = param1.carryItem;
        this._isFriend = param1.isFriend;
        this._isAmbassador = param1.amIAnAmbassador;
        this._isBlocked = param1.isBlocked;
    }
}
