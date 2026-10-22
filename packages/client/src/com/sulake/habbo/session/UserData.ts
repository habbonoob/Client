import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';

export class UserData implements IUserData {
    static { registerClassName(this, 'com.sulake.habbo.session::UserData'); }

    constructor(param1: number) {
        this._roomObjectId = param1;
    }

    private _roomObjectId: number = -1;
    private _type: number = 0;
    private _sex: string = "";
    private _figure: string = "";
    private _custom: string = "";
    private _webID: number = 0;
    private _groupID: string = "";
    private _ownerId: number = 0;
    private _petLevel: number = 0;
    private _rarityLevel: number = 0;

    declare private _hasSaddle: boolean;
    static { (this.prototype as any)._hasSaddle = false; }

    declare private _isRiding: boolean;
    static { (this.prototype as any)._isRiding = false; }

    declare private _canBreed: boolean;
    static { (this.prototype as any)._canBreed = false; }

    declare private _canHarvest: boolean;
    static { (this.prototype as any)._canHarvest = false; }

    declare private _canRevive: boolean;
    static { (this.prototype as any)._canRevive = false; }

    declare private _hasBreedingPermission: boolean;
    static { (this.prototype as any)._hasBreedingPermission = false; }

    declare private _botSkillData: any[];

    declare private _isModerator: boolean;
    static { (this.prototype as any)._isModerator = false; }

    private _isBlocked: boolean = false;
    private _name: string = "";

    public get name(): string {
        return this._isBlocked ? "" : this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    declare private _achievementScore: number;
    static { (this.prototype as any)._achievementScore = 0; }

    public get achievementScore(): number {
        return this._isBlocked ? 0 : this._achievementScore;
    }

    public set achievementScore(param1: number) {
        this._achievementScore = param1;
    }

    private _groupStatus: number = 0;

    public get groupStatus(): number {
        return this._isBlocked ? 0 : this._groupStatus;
    }

    public set groupStatus(param1: number) {
        this._groupStatus = param1;
    }

    private _groupName: string = "";

    public get groupName(): string {
        return this._isBlocked ? "" : this._groupName;
    }

    public set groupName(param1: string) {
        this._groupName = param1;
    }

    private _ownerName: string = "";

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        this._ownerName = param1;
    }

    declare private _botSkills: any[];

    public get botSkills(): any[] {
        return this._botSkills;
    }

    public set botSkills(param1: any[]) {
        this._botSkills = param1;
    }

    public get roomObjectId(): number {
        return this._roomObjectId;
    }

    public get type(): number {
        return this._type;
    }

    public set type(param1: number) {
        this._type = param1;
    }

    public get sex(): string {
        return this._isBlocked ? "M" : this._sex;
    }

    public set sex(param1: string) {
        this._sex = param1;
    }

    public get figure(): string {
        return this._isBlocked ? "" : this._figure;
    }

    public set figure(param1: string) {
        this._figure = param1;
    }

    public get custom(): string {
        return this._isBlocked ? "" : this._custom;
    }

    public set custom(param1: string) {
        this._custom = param1;
    }

    public get webID(): number {
        return this._webID;
    }

    public set webID(param1: number) {
        this._webID = param1;
    }

    public get groupID(): string {
        return this._isBlocked ? "" : this._groupID;
    }

    public set groupID(param1: string) {
        this._groupID = param1;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public set ownerId(param1: number) {
        this._ownerId = param1;
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public set rarityLevel(param1: number) {
        this._rarityLevel = param1;
    }

    public get hasSaddle(): boolean {
        return this._hasSaddle;
    }

    public set hasSaddle(param1: boolean) {
        this._hasSaddle = param1;
    }

    public get isRiding(): boolean {
        return this._isRiding;
    }

    public set isRiding(param1: boolean) {
        this._isRiding = param1;
    }

    public get canBreed(): boolean {
        return this._canBreed;
    }

    public set canBreed(param1: boolean) {
        this._canBreed = param1;
    }

    public get canHarvest(): boolean {
        return this._canHarvest;
    }

    public set canHarvest(param1: boolean) {
        this._canHarvest = param1;
    }

    public get canRevive(): boolean {
        return this._canRevive;
    }

    public set canRevive(param1: boolean) {
        this._canRevive = param1;
    }

    public get hasBreedingPermission(): boolean {
        return this._hasBreedingPermission;
    }

    public set hasBreedingPermission(param1: boolean) {
        this._hasBreedingPermission = param1;
    }

    public get petLevel(): number {
        return this._petLevel;
    }

    public set petLevel(param1: number) {
        this._petLevel = param1;
    }

    public get botSkillData(): any[] {
        return this._botSkillData;
    }

    public set botSkillData(param1: any[]) {
        this._botSkillData = param1;
    }

    public get isModerator(): boolean {
        return this._isModerator;
    }

    public set isModerator(param1: boolean) {
        this._isModerator = param1;
    }

    public get isBlocked(): boolean {
        return this._isBlocked;
    }

    public set isBlocked(param1: boolean) {
        this._isBlocked = param1;
    }
}
