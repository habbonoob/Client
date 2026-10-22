import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class JsonPoint {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera.json::JsonPoint'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    constructor(param1: number, param2: number) {
        this._SafeStr_2126 = param1;
        this._y = param2;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    /** What AS3's JSON.stringify writes for an instance: its public getters, not its private fields. */
    public toJSON(): object {
        return { x: this.x, y: this.y };
    }
}
