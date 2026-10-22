import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomData } from '@/com/sulake/habbo/communication/messages/incoming/moderation/RoomData';

export class RoomModerationData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::RoomModerationData'); }

    constructor(param1: IMessageDataWrapper) {
        this._flatId = param1.readInteger();
        this._userCount = param1.readInteger();
        this._ownerInRoom = param1.readBoolean();
        this._ownerId = param1.readInteger();
        this._ownerName = param1.readString();
        this._room = new RoomData(param1);
    }

    declare private _userCount: number;
    static { (this.prototype as any)._userCount = 0; }

    declare private _ownerInRoom: boolean;
    static { (this.prototype as any)._ownerInRoom = false; }

    declare private _ownerId: number;
    static { (this.prototype as any)._ownerId = 0; }

    declare private _room: RoomData;

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    public get flatId(): number {
        return this._flatId;
    }

    declare private _ownerName: string;

    public get ownerName(): string {
        return this._ownerName;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get userCount(): number {
        return this._userCount;
    }

    public get ownerInRoom(): boolean {
        return this._ownerInRoom;
    }

    public get ownerId(): number {
        return this._ownerId;
    }

    public get room(): RoomData {
        return this._room;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._room != null) {
            this._room.dispose();
            this._room = null;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
