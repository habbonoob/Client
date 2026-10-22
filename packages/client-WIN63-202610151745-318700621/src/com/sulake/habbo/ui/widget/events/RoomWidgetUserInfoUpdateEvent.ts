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
    private _name: string = "";
    private _motto: string = "";

    declare private _achievementScore: number;
    static { (this.prototype as any)._achievementScore = 0; }

    private _SafeStr_14166: number = -1;
    private _webID: number = 0;
    private _SafeStr_14618: number = 0;

    declare private _userType: number;
    static { (this.prototype as any)._userType = 0; }

    private _figure: string = "";
    private _badges: any[] = [];
    private _selectedBadges: any[] = [];
    private _groupId: number = 0;
    private _groupName: string = "";
    private _SafeStr_6005: string = "";
    private _SafeStr_6245: number = 0;
    private _SafeStr_6067: number = 0;
    private _isSpectatorMode: boolean = false;
    private _realName: string = "";
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
    private _isGuildRoom: boolean = false;
    private _canTrade: boolean = false;
    private _canTradeReason: number = 0;
    private _targetRoomControllerLevel: number = 0;
    private _isFriend: boolean = false;
    private _isAmbassador: boolean = false;

    declare private _isBlocked: boolean;
    static { (this.prototype as any)._isBlocked = false; }

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
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

    public set achievementScore(param1: number) {
        this._achievementScore = param1;
    }

    public get achievementScore(): number {
        return this._achievementScore;
    }

    public set badgesRank(param1: number) {
        this._SafeStr_14166 = param1;
    }

    public get badgesRank(): number {
        return this._SafeStr_14166;
    }

    public set webID(param1: number) {
        this._webID = param1;
    }

    public get webID(): number {
        return this._webID;
    }

    public set xp(param1: number) {
        this._SafeStr_14618 = param1;
    }

    public get xp(): number {
        return this._SafeStr_14618;
    }

    public set userType(param1: number) {
        this._userType = param1;
    }

    public get userType(): number {
        return this._userType;
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

    public set selectedBadges(param1: any[]) {
        this._selectedBadges = param1 == null ? [] : param1;
    }

    public get selectedBadges(): any[] {
        return this._selectedBadges;
    }

    public set groupId(param1: number) {
        this._groupId = param1;
    }

    public get groupId(): number {
        return this._groupId;
    }

    public set groupName(param1: string) {
        this._groupName = param1;
    }

    public get groupName(): string {
        return this._groupName;
    }

    public set groupBadgeId(param1: string) {
        this._SafeStr_6005 = param1;
    }

    public get groupBadgeId(): string {
        return this._SafeStr_6005;
    }

    public set canBeAskedAsFriend(param1: boolean) {
        this._canBeAskedAsFriend = param1;
    }

    public get canBeAskedAsFriend(): boolean {
        return this._canBeAskedAsFriend;
    }

    public set respectLeft(param1: number) {
        this._respectLeft = param1;
    }

    public get respectLeft(): number {
        return this._respectLeft;
    }

    public get respectReplenishesLeft(): number {
        return this._respectReplenishesLeft;
    }

    public set respectReplenishesLeft(param1: number) {
        this._respectReplenishesLeft = param1;
    }

    public set isIgnored(param1: boolean) {
        this._isIgnored = param1;
    }

    public get isIgnored(): boolean {
        return this._isIgnored;
    }

    public set amIOwner(param1: boolean) {
        this._amIOwner = param1;
    }

    public get amIOwner(): boolean {
        return this._amIOwner;
    }

    public set isGuildRoom(param1: boolean) {
        this._isGuildRoom = param1;
    }

    public get isGuildRoom(): boolean {
        return this._isGuildRoom;
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

    public set canTrade(param1: boolean) {
        this._canTrade = param1;
    }

    public get canTrade(): boolean {
        return this._canTrade;
    }

    public set canTradeReason(param1: number) {
        this._canTradeReason = param1;
    }

    public get canTradeReason(): number {
        return this._canTradeReason;
    }

    public set canBeKicked(param1: boolean) {
        this._canBeKicked = param1;
    }

    public get canBeKicked(): boolean {
        return this._canBeKicked;
    }

    public set canBeBanned(param1: boolean) {
        this._canBeBanned = param1;
    }

    public get canBeBanned(): boolean {
        return this._canBeBanned;
    }

    public get canBeMuted(): boolean {
        return this._canBeMuted;
    }

    public set canBeMuted(param1: boolean) {
        this._canBeMuted = param1;
    }

    public set targetRoomControllerLevel(param1: number) {
        this._targetRoomControllerLevel = param1;
    }

    public get targetRoomControllerLevel(): number {
        return this._targetRoomControllerLevel;
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

    public set isSpectatorMode(param1: boolean) {
        this._isSpectatorMode = param1;
    }

    public get isSpectatorMode(): boolean {
        return this._isSpectatorMode;
    }

    public set realName(param1: string) {
        this._realName = param1;
    }

    public get realName(): string {
        return this._realName;
    }

    public set allowNameChange(param1: boolean) {
        this._allowNameChange = param1;
    }

    public get allowNameChange(): boolean {
        return this._allowNameChange;
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
