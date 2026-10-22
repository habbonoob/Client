import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class UserDirectionUpdateMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::UserDirectionUpdateMessageData'); }

    declare private _userIndex: number;
    static { (this.prototype as any)._userIndex = 0; }

    declare private _bodyDirection: number;
    static { (this.prototype as any)._bodyDirection = NaN; }

    declare private _headDirection: number;
    static { (this.prototype as any)._headDirection = NaN; }

    constructor(param1: number, param2: number, param3: number) {
        this._userIndex = param1;
        this._bodyDirection = param2;
        this._headDirection = param3;
    }

    public get userIndex(): number {
        return this._userIndex;
    }

    public get bodyDirection(): number {
        return this._bodyDirection;
    }

    public get headDirection(): number {
        return this._headDirection;
    }
}
