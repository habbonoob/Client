import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChatRegistryItem {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.chat::ChatRegistryItem'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _userName: string = "";
    private _text: string = "";

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    private _roomName: string = "";

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _chatTime: Date;

    constructor(param1: number, param2: number, param3: string, param4: number, param5: string, param6: string) {
        this._index = param1;
        this._roomId = param2;
        this._roomName = param3;
        this._userId = param4;
        this._userName = param5;
        this._text = param6;
        this._selected = false;
        this._chatTime = new Date();
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get text(): string {
        return this._text;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
    }

    public get index(): number {
        return this._index | 0;
    }

    public get chatTime(): Date {
        return this._chatTime;
    }
}
