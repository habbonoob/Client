import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomVisitHistoryEntry {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomVisitHistoryEntry'); }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _roomName: string;

    constructor(param1: number, param2: string) {
        this._flatId = param1;
        this._roomName = param2;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public set roomName(param1: string) {
        this._roomName = param1;
    }

    public copy(): RoomVisitHistoryEntry {
        return new RoomVisitHistoryEntry(this._flatId, this._roomName);
    }
}
