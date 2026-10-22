import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UserRegistryItem {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.user::UserRegistryItem'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _userName: string = "";
    private _roomName: string = "";
    private _figure: string = "";

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    constructor(param1: number, param2: string, param3: string, param4: number, param5: string = "") {
        this._userId = param1;
        this._userName = param2;
        this._roomId = param4;
        this._roomName = param5;
        this._figure = param3;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public set roomName(param1: string) {
        this._roomName = param1;
    }

    public get figure(): string {
        return this._figure;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
