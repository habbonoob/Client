import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class SaveableRoomSettingsData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.roomsettings::SaveableRoomSettingsData'); }

    constructor() {
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _description: string;

    declare private _password: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _maximumVisitors: number;
    static { (this.prototype as any)._maximumVisitors = 0; }

    declare private _tags: any[];

    declare private _controllers: any[];

    declare private _allowPets: boolean;
    static { (this.prototype as any)._allowPets = false; }

    declare private _allowFoodConsume: boolean;
    static { (this.prototype as any)._allowFoodConsume = false; }

    declare private _allowWalkThrough: boolean;
    static { (this.prototype as any)._allowWalkThrough = false; }

    declare private _allowNavigatorDynCats: boolean;
    static { (this.prototype as any)._allowNavigatorDynCats = false; }

    declare private _whoCanMute: number;
    static { (this.prototype as any)._whoCanMute = 0; }

    declare private _whoCanKick: number;
    static { (this.prototype as any)._whoCanKick = 0; }

    declare private _whoCanBan: number;
    static { (this.prototype as any)._whoCanBan = 0; }

    declare private _chatMode: number;
    static { (this.prototype as any)._chatMode = 0; }

    declare private _chatBubbleSize: number;
    static { (this.prototype as any)._chatBubbleSize = 0; }

    declare private _chatScrollUpFrequency: number;
    static { (this.prototype as any)._chatScrollUpFrequency = 0; }

    declare private _chatFullHearRange: number;
    static { (this.prototype as any)._chatFullHearRange = 0; }

    declare private _chatFloodSensitivity: number;
    static { (this.prototype as any)._chatFloodSensitivity = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    public get doorMode(): number {
        return this._doorMode;
    }

    public set doorMode(param1: number) {
        this._doorMode = param1;
    }

    declare private _tradeMode: number;
    static { (this.prototype as any)._tradeMode = 0; }

    public get tradeMode(): number {
        return this._tradeMode;
    }

    public set tradeMode(param1: number) {
        this._tradeMode = param1;
    }

    declare private _hideWalls: boolean;
    static { (this.prototype as any)._hideWalls = false; }

    public get hideWalls(): boolean {
        return this._hideWalls;
    }

    public set hideWalls(param1: boolean) {
        this._hideWalls = param1;
    }

    declare private _wallThickness: number;
    static { (this.prototype as any)._wallThickness = 0; }

    public get wallThickness(): number {
        return this._wallThickness;
    }

    public set wallThickness(param1: number) {
        this._wallThickness = param1;
    }

    declare private _floorThickness: number;
    static { (this.prototype as any)._floorThickness = 0; }

    public get floorThickness(): number {
        return this._floorThickness;
    }

    public set floorThickness(param1: number) {
        this._floorThickness = param1;
    }

    public get allowPets(): boolean {
        return this._allowPets;
    }

    public set allowPets(param1: boolean) {
        this._allowPets = param1;
    }

    public get allowFoodConsume(): boolean {
        return this._allowFoodConsume;
    }

    public set allowFoodConsume(param1: boolean) {
        this._allowFoodConsume = param1;
    }

    public get allowWalkThrough(): boolean {
        return this._allowWalkThrough;
    }

    public set allowWalkThrough(param1: boolean) {
        this._allowWalkThrough = param1;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public set roomId(param1: number) {
        this._roomId = param1;
    }

    public get description(): string {
        return this._description;
    }

    public set description(param1: string) {
        this._description = param1;
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

    public get chatMode(): number {
        return this._chatMode;
    }

    public set chatMode(param1: number) {
        this._chatMode = param1;
    }

    public get chatBubbleSize(): number {
        return this._chatBubbleSize;
    }

    public set chatBubbleSize(param1: number) {
        this._chatBubbleSize = param1;
    }

    public get chatScrollUpFrequency(): number {
        return this._chatScrollUpFrequency;
    }

    public set chatScrollUpFrequency(param1: number) {
        this._chatScrollUpFrequency = param1;
    }

    public get chatFullHearRange(): number {
        return this._chatFullHearRange;
    }

    public set chatFullHearRange(param1: number) {
        this._chatFullHearRange = param1;
    }

    public get chatFloodSensitivity(): number {
        return this._chatFloodSensitivity;
    }

    public set chatFloodSensitivity(param1: number) {
        this._chatFloodSensitivity = param1;
    }

    public get allowNavigatorDynCats(): boolean {
        return this._allowNavigatorDynCats;
    }

    public set allowNavigatorDynCats(param1: boolean) {
        this._allowNavigatorDynCats = param1;
    }
}
