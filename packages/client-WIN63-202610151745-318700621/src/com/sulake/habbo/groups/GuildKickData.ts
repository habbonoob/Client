import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GuildKickData {
    static { registerClassName(this, 'com.sulake.habbo.groups::GuildKickData'); }

    declare private _kickTargetId: number;
    static { (this.prototype as any)._kickTargetId = 0; }

    declare private _kickGuildId: number;
    static { (this.prototype as any)._kickGuildId = 0; }

    declare private _targetBlocked: boolean;
    static { (this.prototype as any)._targetBlocked = false; }

    constructor(param1: number, param2: number, param3: boolean = false) {
        this._kickTargetId = param1;
        this._kickGuildId = param2;
        this._targetBlocked = param3;
    }

    public get kickTargetId(): number {
        return this._kickTargetId;
    }

    public get kickGuildId(): number {
        return this._kickGuildId;
    }

    public get targetBlocked(): boolean {
        return this._targetBlocked;
    }
}
