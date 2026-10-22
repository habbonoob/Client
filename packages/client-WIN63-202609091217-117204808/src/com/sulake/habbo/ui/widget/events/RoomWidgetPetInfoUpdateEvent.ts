import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetInfoUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetInfoUpdateEvent'); }

    public static readonly PET_INFO: string = "RWPIUE_PET_INFO";

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

    declare private _petRespectLeft: number;
    static { (this.prototype as any)._petRespectLeft = 0; }

    declare private _petRespect: number;
    static { (this.prototype as any)._petRespect = 0; }

    declare private _age: number;
    static { (this.prototype as any)._age = 0; }

    declare private _name: string;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _image: BitmapData;

    declare private _petType: number;
    static { (this.prototype as any)._petType = 0; }

    declare private _petRace: number;
    static { (this.prototype as any)._petRace = 0; }

    declare private _isOwnPet: boolean;
    static { (this.prototype as any)._isOwnPet = false; }

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _ownerName: string;

    declare private _canRemovePet: boolean;
    static { (this.prototype as any)._canRemovePet = false; }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

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

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _maxWellBeingSeconds: number;
    static { (this.prototype as any)._maxWellBeingSeconds = 0; }

    declare private _remainingWellBeingSeconds: number;
    static { (this.prototype as any)._remainingWellBeingSeconds = 0; }

    declare private _remainingGrowingSeconds: number;
    static { (this.prototype as any)._remainingGrowingSeconds = 0; }

    declare private _hasBreedingPermission: boolean;
    static { (this.prototype as any)._hasBreedingPermission = false; }

    constructor(param1: number, param2: number, param3: string, param4: number, param5: BitmapData, param6: boolean, param7: number, param8: string, param9: number, param10: number, param11: boolean = false, param12: boolean = false) {
        super("RWPIUE_PET_INFO", param11, param12);
        this._petType = param1;
        this._petRace = param2;
        this._name = param3;
        this._id = param4;
        this._image = param5;
        this._isOwnPet = param6;
        this._ownerId = param7;
        this._ownerName = param8;
        this._roomIndex = param9;
        this._breedId = param10;
    }

    public get name(): string {
        return this._name;
    }

    public get image(): BitmapData {
        return this._image;
    }

    public get id(): number {
        return this._id;
    }

    public get petType(): number {
        return this._petType;
    }

    public get petRace(): number {
        return this._petRace;
    }

    public get isOwnPet(): boolean {
        return this._isOwnPet;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public get canRemovePet(): boolean {
        return this._canRemovePet;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get age(): number {
        return this._age;
    }

    public get breedId(): number {
        return this._breedId;
    }

    public get hasFreeSaddle(): boolean {
        return this._hasFreeSaddle;
    }

    public get isRiding(): boolean {
        return this._isRiding;
    }

    public get canBreed(): boolean {
        return this._canBreed;
    }

    public get canHarvest(): boolean {
        return this._canHarvest;
    }

    public get canRevive(): boolean {
        return this._canRevive;
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public get skillTresholds(): any[] {
        return this._skillTresholds;
    }

    public get accessRights(): number {
        return this._accessRights;
    }

    public get level(): number {
        return this._level;
    }

    public get levelMax(): number {
        return this._levelMax;
    }

    public get experience(): number {
        return this._experience;
    }

    public get experienceMax(): number {
        return this._experienceMax;
    }

    public get energy(): number {
        return this._energy;
    }

    public get energyMax(): number {
        return this._energyMax;
    }

    public get nutrition(): number {
        return this._nutrition;
    }

    public get nutritionMax(): number {
        return this._nutritionMax;
    }

    public get petRespectLeft(): number {
        return this._petRespectLeft;
    }

    public get petRespect(): number {
        return this._petRespect;
    }

    public set level(param1: number) {
        this._level = param1;
    }

    public set levelMax(param1: number) {
        this._levelMax = param1;
    }

    public set experience(param1: number) {
        this._experience = param1;
    }

    public set experienceMax(param1: number) {
        this._experienceMax = param1;
    }

    public set energy(param1: number) {
        this._energy = param1;
    }

    public set energyMax(param1: number) {
        this._energyMax = param1;
    }

    public set nutrition(param1: number) {
        this._nutrition = param1;
    }

    public set nutritionMax(param1: number) {
        this._nutritionMax = param1;
    }

    public set petRespectLeft(param1: number) {
        this._petRespectLeft = param1;
    }

    public set canRemovePet(param1: boolean) {
        this._canRemovePet = param1;
    }

    public set petRespect(param1: number) {
        this._petRespect = param1;
    }

    public set age(param1: number) {
        this._age = param1;
    }

    public set hasFreeSaddle(param1: boolean) {
        this._hasFreeSaddle = param1;
    }

    public set isRiding(param1: boolean) {
        this._isRiding = param1;
    }

    public set canBreed(param1: boolean) {
        this._canBreed = param1;
    }

    public set skillTresholds(param1: any[]) {
        this._skillTresholds = param1;
    }

    public set accessRights(param1: number) {
        this._accessRights = param1;
    }

    public set canHarvest(param1: boolean) {
        this._canHarvest = param1;
    }

    public set canRevive(param1: boolean) {
        this._canRevive = param1;
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
}
