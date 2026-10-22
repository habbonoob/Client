import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UserMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::UserMessageData'); }

    public static readonly _SafeStr_8234: string = "M";
    public static readonly _SafeStr_7975: string = "F";
    private _roomIndex: number = 0;
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _dir: number = 0;
    private _name: string = "";
    private _userType: number = 0;
    private _sex: string = "";
    private _figure: string = "";
    private _custom: string = "";

    declare private _achievementScore: number;
    static { (this.prototype as any)._achievementScore = 0; }

    private _SafeStr_14689: number = -1;
    private _webID: number = 0;
    private _SafeStr_6182: string = "";
    private _groupStatus: number = 0;
    private _groupName: string = "";
    private _subType: string = "";
    private _ownerId: number = 0;

    declare private _ownerName: string;

    declare private _rarityLevel: number;
    static { (this.prototype as any)._rarityLevel = 0; }

    declare private _SafeStr_6702: boolean;
    static { (this.prototype as any)._SafeStr_6702 = false; }

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

    private _SafeStr_6422: number = 0;
    private _SafeStr_14809: string = "";

    declare private _botSkills: any[];

    declare private _isModerator: boolean;
    static { (this.prototype as any)._isModerator = false; }

    private _SafeStr_2237: boolean = false;

    constructor(param1: number) {
        this._roomIndex = param1;
    }

    public setReadOnly(): void {
        this._SafeStr_2237 = true;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public set x(param1: number) {
        if (!this._SafeStr_2237) {
            this._SafeStr_2126 = param1;
        }
    }

    public get y(): number {
        return this._y;
    }

    public set y(param1: number) {
        if (!this._SafeStr_2237) {
            this._y = param1;
        }
    }

    public get z(): number {
        return this._z;
    }

    public set z(param1: number) {
        if (!this._SafeStr_2237) {
            this._z = param1;
        }
    }

    public get dir(): number {
        return this._dir;
    }

    public set dir(param1: number) {
        if (!this._SafeStr_2237) {
            this._dir = param1;
        }
    }

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        if (!this._SafeStr_2237) {
            this._name = param1;
        }
    }

    public get userType(): number {
        return this._userType;
    }

    public set userType(param1: number) {
        if (!this._SafeStr_2237) {
            this._userType = param1;
        }
    }

    public get sex(): string {
        return this._sex;
    }

    public set sex(param1: string) {
        if (!this._SafeStr_2237) {
            this._sex = param1;
        }
    }

    public get figure(): string {
        return this._figure;
    }

    public set figure(param1: string) {
        if (!this._SafeStr_2237) {
            this._figure = param1;
        }
    }

    public get custom(): string {
        return this._custom;
    }

    public set custom(param1: string) {
        if (!this._SafeStr_2237) {
            this._custom = param1;
        }
    }

    public get achievementScore(): number {
        return this._achievementScore;
    }

    public set achievementScore(param1: number) {
        if (!this._SafeStr_2237) {
            this._achievementScore = param1;
        }
    }

    public get badgesRank(): number {
        return this._SafeStr_14689;
    }

    public set badgesRank(param1: number) {
        if (!this._SafeStr_2237) {
            this._SafeStr_14689 = param1;
        }
    }

    public get webID(): number {
        return this._webID;
    }

    public set webID(param1: number) {
        if (!this._SafeStr_2237) {
            this._webID = param1;
        }
    }

    public get groupID(): string {
        return this._SafeStr_6182;
    }

    public set groupID(param1: string) {
        if (!this._SafeStr_2237) {
            this._SafeStr_6182 = param1;
        }
    }

    public get groupName(): string {
        return this._groupName;
    }

    public set groupName(param1: string) {
        if (!this._SafeStr_2237) {
            this._groupName = param1;
        }
    }

    public get groupStatus(): number {
        return this._groupStatus;
    }

    public set groupStatus(param1: number) {
        if (!this._SafeStr_2237) {
            this._groupStatus = param1;
        }
    }

    public get subType(): string {
        return this._subType;
    }

    public set subType(param1: string) {
        if (!this._SafeStr_2237) {
            this._subType = param1;
        }
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public set ownerId(param1: number) {
        if (!this._SafeStr_2237) {
            this._ownerId = param1;
        }
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        if (!this._SafeStr_2237) {
            this._ownerName = param1;
        }
    }

    public get rarityLevel(): number {
        return this._rarityLevel;
    }

    public set rarityLevel(param1: number) {
        if (!this._SafeStr_2237) {
            this._rarityLevel = param1;
        }
    }

    public get hasSaddle(): boolean {
        return this._SafeStr_6702;
    }

    public set hasSaddle(param1: boolean) {
        if (!this._SafeStr_2237) {
            this._SafeStr_6702 = param1;
        }
    }

    public get isRiding(): boolean {
        return this._isRiding;
    }

    public set isRiding(param1: boolean) {
        if (!this._SafeStr_2237) {
            this._isRiding = param1;
        }
    }

    public get canBreed(): boolean {
        return this._canBreed;
    }

    public set canBreed(param1: boolean) {
        if (!this._SafeStr_2237) {
            this._canBreed = param1;
        }
    }

    public get canHarvest(): boolean {
        return this._canHarvest;
    }

    public set canHarvest(param1: boolean) {
        if (!this._SafeStr_2237) {
            this._canHarvest = param1;
        }
    }

    public get canRevive(): boolean {
        return this._canRevive;
    }

    public set canRevive(param1: boolean) {
        if (!this._SafeStr_2237) {
            this._canRevive = param1;
        }
    }

    public get hasBreedingPermission(): boolean {
        return this._hasBreedingPermission;
    }

    public set hasBreedingPermission(param1: boolean) {
        if (!this._SafeStr_2237) {
            this._hasBreedingPermission = param1;
        }
    }

    public get petLevel(): number {
        return this._SafeStr_6422;
    }

    public set petLevel(param1: number) {
        if (!this._SafeStr_2237) {
            this._SafeStr_6422 = param1;
        }
    }

    public get petPosture(): string {
        return this._SafeStr_14809;
    }

    public set petPosture(param1: string) {
        if (!this._SafeStr_2237) {
            this._SafeStr_14809 = param1;
        }
    }

    public get botSkills(): any[] {
        return this._botSkills;
    }

    public set botSkills(param1: any[]) {
        this._botSkills = param1;
    }

    public get isModerator(): boolean {
        return this._isModerator;
    }

    public set isModerator(param1: boolean) {
        if (!this._SafeStr_2237) {
            this._isModerator = param1;
        }
    }
}
