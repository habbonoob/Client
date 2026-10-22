import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPetInfo } from '@/com/sulake/habbo/session/IPetInfo';

export class PetInfo implements IPetInfo {
    static { registerClassName(this, 'com.sulake.habbo.session::PetInfo'); }

    constructor() {
    }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _levelMax: number;
    static { (this.prototype as any)._levelMax = 0; }

    declare private _experience: number;
    static { (this.prototype as any)._experience = 0; }

    declare private _experienceMax: number;
    static { (this.prototype as any)._experienceMax = 0; }

    declare private _energy: number;
    static { (this.prototype as any)._energy = 0; }

    declare private _energyMax: number;
    static { (this.prototype as any)._energyMax = 0; }

    declare private _nutrition: number;
    static { (this.prototype as any)._nutrition = 0; }

    declare private _nutritionMax: number;
    static { (this.prototype as any)._nutritionMax = 0; }

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _respect: number;
    static { (this.prototype as any)._respect = 0; }

    declare private _age: number;
    static { (this.prototype as any)._age = 0; }

    declare private _breedId: number;
    static { (this.prototype as any)._breedId = 0; }

    declare private _hasFreeSaddle: boolean;
    static { (this.prototype as any)._hasFreeSaddle = false; }

    declare private _isRiding: boolean;
    static { (this.prototype as any)._isRiding = false; }

    declare private _canBreed: boolean;
    static { (this.prototype as any)._canBreed = false; }

    declare private _skillTresholds: any[];

    declare private _accessRights: number;
    static { (this.prototype as any)._accessRights = 0; }

    declare private _canHarvest: boolean;
    static { (this.prototype as any)._canHarvest = false; }

    declare private _canRevive: boolean;
    static { (this.prototype as any)._canRevive = false; }

    declare private _maxWellBeingSeconds: number;
    static { (this.prototype as any)._maxWellBeingSeconds = 0; }

    declare private _remainingWellBeingSeconds: number;
    static { (this.prototype as any)._remainingWellBeingSeconds = 0; }

    declare private _remainingGrowingSeconds: number;
    static { (this.prototype as any)._remainingGrowingSeconds = 0; }

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _hasBreedingPermission: boolean;
    static { (this.prototype as any)._hasBreedingPermission = false; }

    private _adultLevel: number = 7;

    declare private _ownerName: string;

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        this._ownerName = param1;
    }

    public get petId(): number {
        return this._petId;
    }

    public set petId(param1: number) {
        this._petId = param1;
    }

    public get level(): number {
        return this._level;
    }

    public set level(param1: number) {
        this._level = param1;
    }

    public get levelMax(): number {
        return this._levelMax;
    }

    public set levelMax(param1: number) {
        this._levelMax = param1;
    }

    public get experience(): number {
        return this._experience;
    }

    public set experience(param1: number) {
        this._experience = param1;
    }

    public get experienceMax(): number {
        return this._experienceMax;
    }

    public set experienceMax(param1: number) {
        this._experienceMax = param1;
    }

    public get energy(): number {
        return this._energy;
    }

    public set energy(param1: number) {
        this._energy = param1;
    }

    public get energyMax(): number {
        return this._energyMax;
    }

    public set energyMax(param1: number) {
        this._energyMax = param1;
    }

    public get nutrition(): number {
        return this._nutrition;
    }

    public set nutrition(param1: number) {
        this._nutrition = param1;
    }

    public get nutritionMax(): number {
        return this._nutritionMax;
    }

    public set nutritionMax(param1: number) {
        this._nutritionMax = param1;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public set ownerId(param1: number) {
        this._ownerId = param1;
    }

    public get respect(): number {
        return this._respect;
    }

    public set respect(param1: number) {
        this._respect = param1;
    }

    public get age(): number {
        return this._age;
    }

    public set age(param1: number) {
        this._age = param1;
    }

    public get breedId(): number {
        return this._breedId;
    }

    public set breedId(param1: number) {
        this._breedId = param1;
    }

    public get hasFreeSaddle(): boolean {
        return this._hasFreeSaddle;
    }

    public set hasFreeSaddle(param1: boolean) {
        this._hasFreeSaddle = param1;
    }

    public get isRiding(): boolean {
        return this._isRiding;
    }

    public set isRiding(param1: boolean) {
        this._isRiding = param1;
    }

    public get skillTresholds(): any[] {
        return this._skillTresholds;
    }

    public set skillTresholds(param1: any[]) {
        this._skillTresholds = param1;
    }

    public get accessRights(): number {
        return this._accessRights;
    }

    public set accessRights(param1: number) {
        this._accessRights = param1;
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

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public set rarityLevel(param1: number) {
        this._rarityLevel = param1;
    }

    public get maxWellBeingSeconds(): number {
        return this._maxWellBeingSeconds;
    }

    public set maxWellBeingSeconds(param1: number) {
        this._maxWellBeingSeconds = param1;
    }

    public get remainingWellBeingSeconds(): number {
        return this._remainingWellBeingSeconds;
    }

    public set remainingWellBeingSeconds(param1: number) {
        this._remainingWellBeingSeconds = param1;
    }

    public get remainingGrowingSeconds(): number {
        return this._remainingGrowingSeconds;
    }

    public set remainingGrowingSeconds(param1: number) {
        this._remainingGrowingSeconds = param1;
    }

    public get hasBreedingPermission(): boolean {
        return this._hasBreedingPermission;
    }

    public set hasBreedingPermission(param1: boolean) {
        this._hasBreedingPermission = param1;
    }

    public get adultLevel(): number {
        return this._adultLevel;
    }
}
