import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarEffect {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.avatareffect::AvatarEffect'); }

    constructor() {
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _subType: number;
    static { (this.prototype as any)._subType = 0; }

    declare private _duration: number;
    static { (this.prototype as any)._duration = 0; }

    declare private _inactiveEffectsInInventory: number;
    static { (this.prototype as any)._inactiveEffectsInInventory = 0; }

    declare private _secondsLeftIfActive: number;
    static { (this.prototype as any)._secondsLeftIfActive = 0; }

    declare private _isPermanent: boolean;
    static { (this.prototype as any)._isPermanent = false; }

    public get type(): number {
        return this._type;
    }

    public set type(param1: number) {
        this._type = param1;
    }

    public get subType(): number {
        return this._subType;
    }

    public set subType(param1: number) {
        this._subType = param1;
    }

    public get duration(): number {
        return this._duration;
    }

    public set duration(param1: number) {
        this._duration = param1;
    }

    public get inactiveEffectsInInventory(): number {
        return this._inactiveEffectsInInventory;
    }

    public set inactiveEffectsInInventory(param1: number) {
        this._inactiveEffectsInInventory = param1;
    }

    public get secondsLeftIfActive(): number {
        return this._secondsLeftIfActive;
    }

    public set secondsLeftIfActive(param1: number) {
        this._secondsLeftIfActive = param1;
    }

    public get isPermanent(): boolean {
        return this._isPermanent;
    }

    public set isPermanent(param1: boolean) {
        this._isPermanent = param1;
    }
}
