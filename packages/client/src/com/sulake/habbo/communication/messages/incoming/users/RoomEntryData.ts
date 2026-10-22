import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomEntryData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::RoomEntryData'); }

    constructor(param1: number, param2: string, param3: boolean) {
        this._roomId = param1;
        this._roomName = param2;
        this._hasControllers = param3;
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    private _hasControllers: boolean = false;

    declare private _roomName: string;

    public get roomName(): string {
        return this._roomName;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get hasControllers(): boolean {
        return this._hasControllers;
    }
}
