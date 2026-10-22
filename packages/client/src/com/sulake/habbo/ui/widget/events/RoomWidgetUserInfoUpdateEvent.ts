import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetUserInfoUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetUserInfoUpdateEvent'); }

    public static readonly OWN_USER: string = "RWUIUE_OWN_USER";
    public static readonly BOT: string = "RWUIUE_BOT";
    public static readonly PEER: string = "RWUIUE_PEER";
    public static readonly TRADE_REASON_OK: number = 0;
    public static readonly TRADE_REASON_SHUTDOWN: number = 2;
    public static readonly TRADE_REASON_NO_TRADINGROOM: number = 3;
    public static readonly DEFAULT_BOT_BADGE_ID: string = "BOT";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }

    private _motto: string = "";
    private _webID: number = 0;
    private _xp: number = 0;

    declare private _userType: number;
    static { (this.prototype as any)._userType = 0; }

    private _figure: string = "";
    private _groupBadgeId: string = "";
    private _carryItem: number = 0;
    private _userRoomId: number = 0;
    private _allowNameChange: boolean = false;
    private _amIOwner: boolean = false;
    private _amIAnyRoomController: boolean = false;
    private _myRoomControllerLevel: number = 0;
    private _canBeAskedAsFriend: boolean = false;
    private _canBeKicked: boolean = false;
    private _canBeBanned: boolean = false;
    private _canBeMuted: boolean = false;
    private _respectLeft: number = 0;
    private _respectReplenishesLeft: number = 0;
    private _isIgnored: boolean = false;
    private _canTradeReason: number = 0;
    private _targetRoomControllerLevel: number = 0;
    private _isFriend: boolean = false;
    private _isAmbassador: boolean = false;

    declare private _isBlocked: boolean;
    static { (this.prototype as any)._isBlocked = false; }

    private _name: string = "";

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _achievementScore: number;
    static { (this.prototype as any)._achievementScore = 0; }

    public get achievementScore(): number {
        return this._achievementScore;
    }

    public set achievementScore(param1: number) {
        this._achievementScore = param1;
    }

    private _badges: any[] = [];

    public get badges(): any[] {
        return this._badges;
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

    private _isSpectatorMode: boolean = false;

    public get isSpectatorMode(): boolean {
        return this._isSpectatorMode;
    }

    public set isSpectatorMode(param1: boolean) {
        this._isSpectatorMode = param1;
    }

    private _realName: string = "";

    public get realName(): string {
        return this._realName;
    }

    public set realName(param1: string) {
        this._realName = param1;
    }

    private _isGuildRoom: boolean = false;

    public get isGuildRoom(): boolean {
        return this._isGuildRoom;
    }

    public set isGuildRoom(param1: boolean) {
        this._isGuildRoom = param1;
    }

    private _canTrade: boolean = false;

    public get canTrade(): boolean {
        return this._canTrade;
    }

    public set canTrade(param1: boolean) {
        this._canTrade = param1;
    }

    public get motto(): string {
        return this._motto;
    }

    public set motto(param1: string) {
        this._motto = param1;
    }

    public get webID(): number {
        return this._webID;
    }

    public set webID(param1: number) {
        this._webID = param1;
    }

    public get xp(): number {
        return this._xp;
    }

    public set xp(param1: number) {
        this._xp = param1;
    }

    public get userType(): number {
        return this._userType;
    }

    public set userType(param1: number) {
        this._userType = param1;
    }

    public get figure(): string {
        return this._figure;
    }

    public set figure(param1: string) {
        this._figure = param1;
    }

    public get groupBadgeId(): string {
        return this._groupBadgeId;
    }

    public set groupBadgeId(param1: string) {
        this._groupBadgeId = param1;
    }

    public get canBeAskedAsFriend(): boolean {
        return this._canBeAskedAsFriend;
    }

    public set canBeAskedAsFriend(param1: boolean) {
        this._canBeAskedAsFriend = param1;
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

    public get myRoomControllerLevel(): number {
        return this._myRoomControllerLevel;
    }

    public set myRoomControllerLevel(param1: number) {
        this._myRoomControllerLevel = param1;
    }

    public get amIAnyRoomController(): boolean {
        return this._amIAnyRoomController;
    }

    public set amIAnyRoomController(param1: boolean) {
        this._amIAnyRoomController = param1;
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

    public get canBeMuted(): boolean {
        return this._canBeMuted;
    }

    public set canBeMuted(param1: boolean) {
        this._canBeMuted = param1;
    }

    public get targetRoomControllerLevel(): number {
        return this._targetRoomControllerLevel;
    }

    public set targetRoomControllerLevel(param1: number) {
        this._targetRoomControllerLevel = param1;
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

    public get allowNameChange(): boolean {
        return this._allowNameChange;
    }

    public set allowNameChange(param1: boolean) {
        this._allowNameChange = param1;
    }

    public get isFriend(): boolean {
        return this._isFriend;
    }

    public set isFriend(param1: boolean) {
        this._isFriend = param1;
    }

    public get amIAnAmbassador(): boolean {
        return this._isAmbassador;
    }

    public set amIAnAmbassador(param1: boolean) {
        this._isAmbassador = param1;
    }

    public get isBlocked(): boolean {
        return this._isBlocked;
    }

    public set isBlocked(param1: boolean) {
        this._isBlocked = param1;
    }
}
