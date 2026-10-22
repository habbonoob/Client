import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomEntryData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::RoomEntryData'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _roomName: string;

    private _hasControllers: boolean = false;

    constructor(param1: number, param2: string, param3: boolean) {
        this._roomId = param1;
        this._roomName = param2;
        this._hasControllers = param3;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public get hasControllers(): boolean {
        return this._hasControllers;
    }
}
