import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomWidgetPetInfoUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetInfoUpdateEvent';

export class PetInfoData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::PetInfoData'); }

    public age: number = 0;
    public breedId: number = 0;
    public canRemovePet: boolean = false;
    public energy: number = 0;
    public energyMax: number = 0;
    public experience: number = 0;
    public experienceMax: number = 0;
    public id: number = 0;
    public isOwnPet: boolean = false;
    public level: number = 0;
    public levelMax: number = 0;
    public name: string = "";
    public nutrition: number = 0;
    public nutritionMax: number = 0;
    public ownerId: number = 0;
    public ownerName: string = "";
    public petRace: number = 0;
    public petRespect: number = 0;
    public petRespectLeft: number = 0;
    public petType: number = 0;
    public hasFreeSaddle: boolean = false;
    public isRiding: boolean = false;
    public canBreed: boolean = false;
    public canHarvest: boolean = false;
    public canRevive: boolean = false;
    public skillTresholds: any[] = [];
    public accessRights: number = 0;
    public maxWellBeingSeconds: number = 0;
    public remainingWellBeingSeconds: number = 0;
    public remainingGrowingSeconds: number = 0;
    public hasBreedingPermission: boolean = false;

    constructor() {
    }

    public populate(param1: RoomWidgetPetInfoUpdateEvent): void {
        this.age = param1.age;
        this.breedId = param1.breedId;
        this.canRemovePet = param1.canRemovePet;
        this.energy = param1.energy;
        this.energyMax = param1.energyMax;
        this.experience = param1.experience;
        this.experienceMax = param1.experienceMax;
        this.id = param1.id;
        this.isOwnPet = param1.isOwnPet;
        this.level = param1.level;
        this.levelMax = param1.levelMax;
        this.name = param1.name;
        this.nutrition = param1.nutrition;
        this.nutritionMax = param1.nutritionMax;
        this.ownerId = param1.ownerId;
        this.ownerName = param1.ownerName;
        this.petRace = param1.petRace;
        this.petRespect = param1.petRespect;
        this.petRespectLeft = param1.petRespectLeft;
        this.petType = param1.petType;
        this.hasFreeSaddle = param1.hasFreeSaddle;
        this.isRiding = param1.isRiding;
        this.canBreed = param1.canBreed;
        this.canRevive = param1.canRevive;
        this.canHarvest = param1.canHarvest;
        this.skillTresholds = param1.skillTresholds;
        this.accessRights = param1.accessRights;
        this.maxWellBeingSeconds = param1.maxWellBeingSeconds;
        this.remainingWellBeingSeconds = param1.remainingWellBeingSeconds;
        this.remainingGrowingSeconds = param1.remainingGrowingSeconds;
        this.hasBreedingPermission = param1.hasBreedingPermission;
    }
}
