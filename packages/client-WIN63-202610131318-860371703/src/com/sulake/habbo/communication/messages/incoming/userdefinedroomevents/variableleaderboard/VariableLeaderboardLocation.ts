import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableLeaderboardLocation {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.variableleaderboard::VariableLeaderboardLocation'); }

    declare private _tileX: number;
    static { (this.prototype as any)._tileX = 0; }

    declare private _tileY: number;
    static { (this.prototype as any)._tileY = 0; }

    declare private _offsetX: number;
    static { (this.prototype as any)._offsetX = 0; }

    declare private _altitude: number;
    static { (this.prototype as any)._altitude = 0; }

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._tileX = param1;
        this._tileY = param2;
        this._offsetX = param3;
        this._altitude = param4;
    }

    public get tileX(): number {
        return this._tileX;
    }

    public get tileY(): number {
        return this._tileY;
    }

    public get offsetX(): number {
        return this._offsetX;
    }

    public get altitude(): number {
        return this._altitude;
    }
}
