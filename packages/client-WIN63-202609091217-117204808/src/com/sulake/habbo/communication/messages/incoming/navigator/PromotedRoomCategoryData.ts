import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';

export class PromotedRoomCategoryData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::PromotedRoomCategoryData'); }

    declare private _code: string;

    declare private _leaderFigure: string;

    declare private _bestRoom: GuestRoomData;

    declare private _rooms: any[];

    declare private _open: boolean;
    static { (this.prototype as any)._open = false; }

    declare private _SafeStr_6637: boolean;
    static { (this.prototype as any)._SafeStr_6637 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._rooms = [];
        this._code = param1.readString();
        this._leaderFigure = param1.readString();
        let _loc2_: number = param1.readInteger();
        this._bestRoom = new GuestRoomData(param1);
        _loc3_ = 1;
        while (_loc3_ < _loc2_) {
            this._rooms.push(new GuestRoomData(param1));
            _loc3_++;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._bestRoom) {
            this._bestRoom.dispose();
            this._bestRoom = null;
        }
        for (const _loc1_ of this.rooms ?? []) {
            _loc1_.dispose();
        }
        this._rooms = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get code(): string {
        return this._code;
    }

    public get leaderFigure(): string {
        return this._leaderFigure;
    }

    public get rooms(): any[] {
        return this._rooms;
    }

    public get open(): boolean {
        return this._open;
    }

    public set open(param1: boolean) {
        this._open = param1;
    }

    public toggleOpen(): void {
        this._open = !this._open;
    }

    public get bestRoom(): GuestRoomData {
        return this._bestRoom;
    }

    public get figurePending(): boolean {
        return this._SafeStr_6637;
    }

    public set figurePending(param1: boolean) {
        this._SafeStr_6637 = param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
