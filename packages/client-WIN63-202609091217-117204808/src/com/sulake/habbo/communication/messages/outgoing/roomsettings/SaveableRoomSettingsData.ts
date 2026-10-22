import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SaveableRoomSettingsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.roomsettings::SaveableRoomSettingsData'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _name: string;

    declare private _description: string;

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    declare private _password: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _maximumVisitors: number;
    static { (this.prototype as any)._maximumVisitors = 0; }

    declare private _tags: any[];

    declare private _controllers: any[];

    declare private _tradeMode: number;
    static { (this.prototype as any)._tradeMode = 0; }

    declare private _SafeStr_6184: boolean;
    static { (this.prototype as any)._SafeStr_6184 = false; }

    declare private _SafeStr_6378: boolean;
    static { (this.prototype as any)._SafeStr_6378 = false; }

    declare private _SafeStr_6015: boolean;
    static { (this.prototype as any)._SafeStr_6015 = false; }

    declare private _hideWalls: boolean;
    static { (this.prototype as any)._hideWalls = false; }

    declare private _wallThickness: number;
    static { (this.prototype as any)._wallThickness = 0; }

    declare private _floorThickness: number;
    static { (this.prototype as any)._floorThickness = 0; }

    declare private _whoCanMute: number;
    static { (this.prototype as any)._whoCanMute = 0; }

    declare private _whoCanKick: number;
    static { (this.prototype as any)._whoCanKick = 0; }

    declare private _whoCanBan: number;
    static { (this.prototype as any)._whoCanBan = 0; }

    declare private _chatMode: number;
    static { (this.prototype as any)._chatMode = 0; }

    private _SafeStr_14785: boolean = true;
    private _SafeStr_14786: boolean = true;
    private _SafeStr_14787: number = 0;
    private _SafeStr_14788: boolean = true;
    private _SafeStr_14789: number = 0;
    private _SafeStr_14790: boolean = false;

    constructor() {
    }

    public get tradeMode(): number {
        return this._tradeMode;
    }

    public set tradeMode(param1: number) {
        this._tradeMode = param1;
    }

    public get allowPets(): boolean {
        return this._SafeStr_6184;
    }

    public set allowPets(param1: boolean) {
        this._SafeStr_6184 = param1;
    }

    public get allowFoodConsume(): boolean {
        return this._SafeStr_6378;
    }

    public set allowFoodConsume(param1: boolean) {
        this._SafeStr_6378 = param1;
    }

    public get allowWalkThrough(): boolean {
        return this._SafeStr_6015;
    }

    public set allowWalkThrough(param1: boolean) {
        this._SafeStr_6015 = param1;
    }

    public get hideWalls(): boolean {
        return this._hideWalls;
    }

    public set hideWalls(param1: boolean) {
        this._hideWalls = param1;
    }

    public get wallThickness(): number {
        return this._wallThickness;
    }

    public set wallThickness(param1: number) {
        this._wallThickness = param1;
    }

    public get floorThickness(): number {
        return this._floorThickness;
    }

    public set floorThickness(param1: number) {
        this._floorThickness = param1;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public set roomId(param1: number) {
        this._roomId = param1;
    }

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public get description(): string {
        return this._description;
    }

    public set description(param1: string) {
        this._description = param1;
    }

    public get doorMode(): number {
        return this._doorMode;
    }

    public set doorMode(param1: number) {
        this._doorMode = param1;
    }

    public get password(): string {
        return this._password;
    }

    public set password(param1: string) {
        this._password = param1;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public set categoryId(param1: number) {
        this._categoryId = param1;
    }

    public get maximumVisitors(): number {
        return this._maximumVisitors;
    }

    public set maximumVisitors(param1: number) {
        this._maximumVisitors = param1;
    }

    public get tags(): any[] {
        return this._tags;
    }

    public set tags(param1: any[]) {
        this._tags = param1;
    }

    public get controllers(): any[] {
        return this._controllers;
    }

    public set controllers(param1: any[]) {
        this._controllers = param1;
    }

    public get whoCanMute(): number {
        return this._whoCanMute;
    }

    public set whoCanMute(param1: number) {
        this._whoCanMute = param1;
    }

    public get whoCanKick(): number {
        return this._whoCanKick;
    }

    public set whoCanKick(param1: number) {
        this._whoCanKick = param1;
    }

    public get whoCanBan(): number {
        return this._whoCanBan;
    }

    public set whoCanBan(param1: number) {
        this._whoCanBan = param1;
    }

    public get chatFloodSensitivity(): number {
        return this._chatMode;
    }

    public set chatFloodSensitivity(param1: number) {
        this._chatMode = param1;
    }

    public get leaveOnDoorTileEnabled(): boolean {
        return this._SafeStr_14785;
    }

    public set leaveOnDoorTileEnabled(param1: boolean) {
        this._SafeStr_14785 = param1;
    }

    public get idleSleepEnabled(): boolean {
        return this._SafeStr_14786;
    }

    public set idleSleepEnabled(param1: boolean) {
        this._SafeStr_14786 = param1;
    }

    public get idleSleepTimeoutSeconds(): number {
        return this._SafeStr_14787;
    }

    public set idleSleepTimeoutSeconds(param1: number) {
        this._SafeStr_14787 = param1;
    }

    public get idleAutokickEnabled(): boolean {
        return this._SafeStr_14788;
    }

    public set idleAutokickEnabled(param1: boolean) {
        this._SafeStr_14788 = param1;
    }

    public get idleAutokickTimeoutSeconds(): number {
        return this._SafeStr_14789;
    }

    public set idleAutokickTimeoutSeconds(param1: number) {
        this._SafeStr_14789 = param1;
    }

    public get muteAllPets(): boolean {
        return this._SafeStr_14790;
    }

    public set muteAllPets(param1: boolean) {
        this._SafeStr_14790 = param1;
    }
}
