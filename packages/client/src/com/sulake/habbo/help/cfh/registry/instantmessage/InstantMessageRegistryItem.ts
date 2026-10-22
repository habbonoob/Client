import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class InstantMessageRegistryItem {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.instantmessage::InstantMessageRegistryItem'); }

    constructor(param1: number, param2: number, param3: string, param4: string) {
        this._index = param1;
        this._userId = param2;
        this._username = param3;
        this._SafeStr_6722 = param4;
        this._selected = false;
        this._chatTime = new Date();
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _username: string = "";
    private _SafeStr_6722: string = "";

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    public get index(): number {
        return this._index;
    }

    declare private _chatTime: Date;

    public get chatTime(): Date {
        return this._chatTime;
    }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._username;
    }

    public get text(): string {
        return this._SafeStr_6722;
    }
}
