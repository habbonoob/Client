import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class NewUserExperienceGetGiftsSelection {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.nux::NewUserExperienceGetGiftsSelection'); }

    declare private _dayIndex: number;
    static { (this.prototype as any)._dayIndex = 0; }

    declare private _stepIndex: number;
    static { (this.prototype as any)._stepIndex = 0; }

    declare private _giftIndex: number;
    static { (this.prototype as any)._giftIndex = 0; }

    constructor(param1: number, param2: number, param3: number) {
        this._dayIndex = param1;
        this._stepIndex = param2;
        this._giftIndex = param3;
    }

    public get dayIndex(): number {
        return this._dayIndex;
    }

    public get stepIndex(): number {
        return this._stepIndex;
    }

    public get giftIndex(): number {
        return this._giftIndex;
    }
}
