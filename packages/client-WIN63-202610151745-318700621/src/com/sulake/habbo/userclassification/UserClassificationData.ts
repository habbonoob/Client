import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UserClassificationData {
    static { registerClassName(this, 'com.sulake.habbo.userclassification::UserClassificationData'); }

    public static _SafeStr_8558: number = 1;
    public static NEW_USER_CLASSIFICATION: number = 2;
    public static _SafeStr_8630: number = 3;
    public static PAYING_USER_CLASSIFICATION: number = 4;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _username: string;

    declare private _classType: string;

    constructor(param1: number, param2: string, param3: string) {
        this._userId = param1;
        this._username = param2;
        this._classType = param3;
    }

    public get userId(): number {
        return this._userId;
    }

    public get username(): string {
        return this._username;
    }

    public get classType(): string {
        return this._classType;
    }

    public toString(): string {
        return "[" + this._userId + ", " + this._username + "] [" + this._classType + "]";
    }
}
