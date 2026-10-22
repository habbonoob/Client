import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetInfoMessageParser'); }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _name: string;

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    declare private _maxLevel: number;
    static { (this.prototype as any)._maxLevel = 0; }

    declare private _experience: number;
    static { (this.prototype as any)._experience = 0; }

    declare private _energy: number;
    static { (this.prototype as any)._energy = 0; }

    declare private _nutrition: number;
    static { (this.prototype as any)._nutrition = 0; }

    declare private _experienceRequiredToLevel: number;
    static { (this.prototype as any)._experienceRequiredToLevel = 0; }

    declare private _maxEnergy: number;
    static { (this.prototype as any)._maxEnergy = 0; }

    declare private _maxNutrition: number;
    static { (this.prototype as any)._maxNutrition = 0; }

    declare private _respect: number;
    static { (this.prototype as any)._respect = 0; }

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _ownerName: string;

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

    declare private _skillTresholds: any[];

    declare private _accessRights: number;
    static { (this.prototype as any)._accessRights = 0; }

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _hasBreedingPermission: boolean;
    static { (this.prototype as any)._hasBreedingPermission = false; }

    constructor() {
    }

    public get petId(): number {
        return this._petId;
    }

    public get name(): string {
        return this._name;
    }

    public get level(): number {
        return this._level;
    }

    public get maxLevel(): number {
        return this._maxLevel;
    }

    public get experience(): number {
        return this._experience;
    }

    public get energy(): number {
        return this._energy;
    }

    public get nutrition(): number {
        return this._nutrition;
    }

    public get experienceRequiredToLevel(): number {
        return this._experienceRequiredToLevel;
    }

    public get maxEnergy(): number {
        return this._maxEnergy;
    }

    public get maxNutrition(): number {
        return this._maxNutrition;
    }

    public get respect(): number {
        return this._respect;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public get ownerName(): string {
        return this._ownerName;
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

    public get maxWellBeingSeconds(): number {
        return this._maxWellBeingSeconds;
    }

    public get remainingWellBeingSeconds(): number {
        return this._remainingWellBeingSeconds;
    }

    public get remainingGrowingSeconds(): number {
        return this._remainingGrowingSeconds;
    }

    public get skillTresholds(): any[] {
        return this._skillTresholds;
    }

    public get accessRights(): number {
        return this._accessRights;
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public get hasBreedingPermission(): boolean {
        return this._hasBreedingPermission;
    }

    public flush(): boolean {
        this._petId = -1;
        this._skillTresholds = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        if (param1 == null) {
            return false;
        }
        this._petId = param1.readInteger();
        this._name = param1.readString();
        this._level = param1.readInteger();
        this._maxLevel = param1.readInteger();
        this._experience = param1.readInteger();
        this._experienceRequiredToLevel = param1.readInteger();
        this._energy = param1.readInteger();
        this._maxEnergy = param1.readInteger();
        this._nutrition = param1.readInteger();
        this._maxNutrition = param1.readInteger();
        this._respect = param1.readInteger();
        this._ownerId = param1.readInteger();
        this._age = param1.readInteger();
        this._ownerName = param1.readString();
        this._breedId = param1.readInteger();
        this._hasFreeSaddle = param1.readBoolean();
        this._isRiding = param1.readBoolean();
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._skillTresholds.push(param1.readInteger());
            _loc2_++;
        }
        this._skillTresholds.sort((a, b) => a - b);
        this._accessRights = param1.readInteger();
        this._canBreed = param1.readBoolean();
        this._canHarvest = param1.readBoolean();
        this._canRevive = param1.readBoolean();
        this._rarityLevel = param1.readInteger();
        this._maxWellBeingSeconds = param1.readInteger();
        this._remainingWellBeingSeconds = param1.readInteger();
        this._remainingGrowingSeconds = param1.readInteger();
        this._hasBreedingPermission = param1.readBoolean();
        return true;
    }
}
