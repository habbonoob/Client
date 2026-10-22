import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomSettingsFlatInfo {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomSettingsFlatInfo'); }

    public static readonly _SafeStr_7458: number = 0;
    public static readonly _SafeStr_7437: number = 1;
    public static readonly _SafeStr_7532: number = 2;
    public static readonly _SafeStr_7576: number = 3;
    public static readonly _SafeStr_7490: number = 4;

    declare private _SafeStr_7088: boolean;
    static { (this.prototype as any)._SafeStr_7088 = false; }

    declare private _doorMode: number;
    static { (this.prototype as any)._doorMode = 0; }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _ownerName: string;

    declare private _type: string;

    declare private _name: string;

    declare private _description: string;

    declare private _allowTrading: boolean;
    static { (this.prototype as any)._allowTrading = false; }

    declare private _SafeStr_6229: boolean;
    static { (this.prototype as any)._SafeStr_6229 = false; }

    declare private _SafeStr_7252: boolean;
    static { (this.prototype as any)._SafeStr_7252 = false; }

    declare private _password: string;

    constructor() {
    }

    public get allowFurniMoving(): boolean {
        return this._SafeStr_7088;
    }

    public get doorMode(): number {
        return this._doorMode;
    }

    public get id(): number {
        return this._id;
    }

    public get ownerName(): string {
        return this._ownerName;
    }

    public get type(): string {
        return this._type;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get showOwnerName(): boolean {
        return this._allowTrading;
    }

    public get allowTrading(): boolean {
        return this._SafeStr_6229;
    }

    public get categoryAlertKey(): boolean {
        return this._SafeStr_7252;
    }

    public get password(): string {
        return this._password;
    }

    public set allowFurniMoving(param1: boolean) {
        this._SafeStr_7088 = param1;
    }

    public set doorMode(param1: number) {
        this._doorMode = param1;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public set ownerName(param1: string) {
        this._ownerName = param1;
    }

    public set type(param1: string) {
        this._type = param1;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public set description(param1: string) {
        this._description = param1;
    }

    public set showOwnerName(param1: boolean) {
        this._allowTrading = param1;
    }

    public set allowTrading(param1: boolean) {
        this._SafeStr_6229 = param1;
    }

    public set categoryAlertKey(param1: boolean) {
        this._SafeStr_7252 = param1;
    }

    public set password(param1: string) {
        this._password = param1;
    }
}
