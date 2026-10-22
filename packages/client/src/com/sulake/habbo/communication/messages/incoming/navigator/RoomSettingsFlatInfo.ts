import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomSettingsFlatInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomSettingsFlatInfo'); }

    public static readonly _SafeStr_7458: number = 0;
    public static readonly _SafeStr_7437: number = 1;
    public static readonly _SafeStr_7532: number = 2;
    public static readonly _SafeStr_7576: number = 3;
    public static readonly _SafeStr_7490: number = 4;

    constructor() {
    }

    declare private _allowFurniMoving: boolean;
    static { (this.prototype as any)._allowFurniMoving = false; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _type: string;

    declare private _description: string;

    declare private _showOwnerName: boolean;
    static { (this.prototype as any)._showOwnerName = false; }

    declare private _allowTrading: boolean;
    static { (this.prototype as any)._allowTrading = false; }

    declare private _categoryAlertKey: boolean;
    static { (this.prototype as any)._categoryAlertKey = false; }

    declare private _password: string;

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    public get doorMode(): number {
        return this._doorMode;
    }

    public set doorMode(param1: number) {
        this._doorMode = param1;
    }

    declare private _ownerName: string;

    public get ownerName(): string {
        return this._ownerName;
    }

    public set ownerName(param1: string) {
        this._ownerName = param1;
    }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public get allowFurniMoving(): boolean {
        return this._allowFurniMoving;
    }

    public set allowFurniMoving(param1: boolean) {
        this._allowFurniMoving = param1;
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public get type(): string {
        return this._type;
    }

    public set type(param1: string) {
        this._type = param1;
    }

    public get description(): string {
        return this._description;
    }

    public set description(param1: string) {
        this._description = param1;
    }

    public get showOwnerName(): boolean {
        return this._showOwnerName;
    }

    public set showOwnerName(param1: boolean) {
        this._showOwnerName = param1;
    }

    public get allowTrading(): boolean {
        return this._allowTrading;
    }

    public set allowTrading(param1: boolean) {
        this._allowTrading = param1;
    }

    public get categoryAlertKey(): boolean {
        return this._categoryAlertKey;
    }

    public set categoryAlertKey(param1: boolean) {
        this._categoryAlertKey = param1;
    }

    public get password(): string {
        return this._password;
    }

    public set password(param1: string) {
        this._password = param1;
    }
}
