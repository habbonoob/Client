import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PlayListEntry {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::PlayListEntry'); }

    constructor(param1: number, param2: number, param3: string, param4: string) {
        this._SafeStr_4873 = param1;
        this._length = param2;
        this._songName = param3;
        this._creator = param4;
    }

    declare protected _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    declare protected _length: number;
    static { (this.prototype as any)._length = 0; }

    declare protected _songName: string;

    declare protected _creator: string;

    private _startPlayHeadPos: number = 0;

    public get id(): number {
        return this._SafeStr_4873;
    }

    public get length(): number {
        return this._length;
    }

    public get name(): string {
        return this._songName;
    }

    public get creator(): string {
        return this._creator;
    }

    public get startPlayHeadPos(): number {
        return this._startPlayHeadPos;
    }

    public set startPlayHeadPos(param1: number) {
        this._startPlayHeadPos = param1;
    }
}
