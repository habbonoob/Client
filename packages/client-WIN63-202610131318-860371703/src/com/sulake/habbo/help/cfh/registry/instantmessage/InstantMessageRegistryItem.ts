import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class InstantMessageRegistryItem {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.instantmessage::InstantMessageRegistryItem'); }

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _username: string = "";
    private _chatText: string = "";

    declare private _chatTime: Date;

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    constructor(param1: number, param2: number, param3: string, param4: string) {
        this._index = param1;
        this._userId = param2;
        this._username = param3;
        this._chatText = param4;
        this._selected = false;
        this._chatTime = new Date();
    }

    public get index(): number {
        return this._index;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._username;
    }

    public get text(): string {
        return this._chatText;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
    }

    public get chatTime(): Date {
        return this._chatTime;
    }
}
