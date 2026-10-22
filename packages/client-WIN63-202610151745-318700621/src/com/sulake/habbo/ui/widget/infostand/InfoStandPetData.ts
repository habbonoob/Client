import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomWidgetPetInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetInfoUpdateEvent';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class InfoStandPetData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandPetData'); }

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

    declare private _petRespect: number;
    static { (this.prototype as any)._petRespect = 0; }

    private _name: string = "";
    private _petId: number = -1;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _race: number;
    static { (this.prototype as any)._race = 0; }

    declare private _image: BitmapData;

    declare private _isOwnPet: boolean;
    static { (this.prototype as any)._isOwnPet = false; }

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _ownerName: string;

    declare private _canRemovePet: boolean;
    static { (this.prototype as any)._canRemovePet = false; }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _age: number;
    static { (this.prototype as any)._age = 0; }

    declare private _breedId: number;
    static { (this.prototype as any)._breedId = 0; }

    declare private _skillTresholds: any[];

    declare private _accessRights: number;
    static { (this.prototype as any)._accessRights = 0; }

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _hasBreedingPermission: boolean;
    static { (this.prototype as any)._hasBreedingPermission = false; }

    declare private _maxWellBeingSeconds: number;
    static { (this.prototype as any)._maxWellBeingSeconds = 0; }

    declare private _remainingWellBeingSeconds: number;
    static { (this.prototype as any)._remainingWellBeingSeconds = 0; }

    declare private _remainingGrowingSeconds: number;
    static { (this.prototype as any)._remainingGrowingSeconds = 0; }

    constructor() {
    }

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._petId;
    }

    public get type(): number {
        return this._type;
    }

    public get race(): number {
        return this._race;
    }

    public get image(): BitmapData {
        return this._image;
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

    public get age(): number {
        return this._age;
    }

    public get breedId(): number {
        return this._breedId;
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

    public get petRespect(): number {
        return this._petRespect;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public get maxWellBeingSeconds(): number {
        return this._maxWellBeingSeconds;
    }

    public get remainingWellBeingSeconds(): number {
        return this._remainingWellBeingSeconds;
    }

    public get remainingGrowingSeconds(): number {
        return this._remainingGrowingSeconds;
    }

    public get hasBreedingPermission(): boolean {
        return this._hasBreedingPermission;
    }

    public setData(param1: RoomWidgetPetInfoUpdateEvent): void {
        this._name = param1.name;
        this._petId = param1.id;
        this._type = param1.petType;
        this._race = param1.petRace;
        this._image = param1.image;
        this._isOwnPet = param1.isOwnPet;
        this._ownerId = param1.ownerId;
        this._ownerName = param1.ownerName;
        this._canRemovePet = param1.canRemovePet;
        this._level = param1.level;
        this._levelMax = param1.levelMax;
        this._experience = param1.experience;
        this._experienceMax = param1.experienceMax;
        this._energy = param1.energy;
        this._energyMax = param1.energyMax;
        this._nutrition = param1.nutrition;
        this._nutritionMax = param1.nutritionMax;
        this._petRespect = param1.petRespect;
        this._roomIndex = param1.roomIndex;
        this._age = param1.age;
        this._breedId = param1.breedId;
        this._skillTresholds = param1.skillTresholds;
        this._accessRights = param1.accessRights;
        this._maxWellBeingSeconds = param1.maxWellBeingSeconds;
        this._remainingWellBeingSeconds = param1.remainingWellBeingSeconds;
        this._remainingGrowingSeconds = param1.remainingGrowingSeconds;
        this._rarityLevel = param1.rarityLevel;
        this._hasBreedingPermission = param1.hasBreedingPermission;
    }
}
