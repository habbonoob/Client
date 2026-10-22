import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UserDirectionUpdateMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::UserDirectionUpdateMessageData'); }

    constructor(param1: number, param2: number, param3: number) {
        this._userIndex = param1;
        this._bodyDirection = param2;
        this._headDirection = param3;
    }

    declare private _userIndex: number;
    static { (this.prototype as any)._userIndex = 0; }

    declare private _bodyDirection: number;
    static { (this.prototype as any)._bodyDirection = NaN; }

    declare private _headDirection: number;
    static { (this.prototype as any)._headDirection = NaN; }

    public get headDirection(): number {
        return this._headDirection;
    }

    public get userIndex(): number {
        return this._userIndex;
    }

    public get bodyDirection(): number {
        return this._bodyDirection;
    }
}
