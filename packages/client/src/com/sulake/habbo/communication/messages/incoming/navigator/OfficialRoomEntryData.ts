import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';

export class OfficialRoomEntryData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::OfficialRoomEntryData'); }

    public static readonly _SafeStr_8353: number = 1;
    public static readonly _SafeStr_7886: number = 2;
    public static readonly _SafeStr_7769: number = 4;

    constructor(param1: IMessageDataWrapper) {
        this._index = param1.readInteger();
        this._popupCaption = param1.readString();
        this._popupDesc = param1.readString();
        this._showDetails = param1.readInteger() == 1;
        this._picText = param1.readString();
        this._picRef = param1.readString();
        this._folderId = param1.readInteger();
        this._userCount = param1.readInteger();
        this._type = param1.readInteger();
        if (this._type == 1) {
            this._tag = param1.readString();
        } else if (this._type == 2) {
            this._guestRoomData = new GuestRoomData(param1);
        } else {
            this._open = param1.readBoolean();
        }
    }

    declare private _popupCaption: string;

    declare private _popupDesc: string;

    declare private _showDetails: boolean;
    static { (this.prototype as any)._showDetails = false; }

    declare private _picText: string;

    declare private _picRef: string;

    declare private _folderId: number;
    static { (this.prototype as any)._folderId = 0; }

    declare private _userCount: number;
    static { (this.prototype as any)._userCount = 0; }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _tag: string;

    declare private _guestRoomData: GuestRoomData;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    public get index(): number {
        return this._index;
    }

    declare private _open: boolean;
    static { (this.prototype as any)._open = false; }

    public get open(): boolean {
        return this._open;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): number {
        return this._type;
    }

    public get popupCaption(): string {
        return this._popupCaption;
    }

    public get popupDesc(): string {
        return this._popupDesc;
    }

    public get showDetails(): boolean {
        return this._showDetails;
    }

    public get picText(): string {
        return this._picText;
    }

    public get picRef(): string {
        return this._picRef;
    }

    public get folderId(): number {
        return this._folderId;
    }

    public get tag(): string {
        return this._tag;
    }

    public get userCount(): number {
        return this._userCount;
    }

    public get guestRoomData(): GuestRoomData {
        return this._guestRoomData;
    }

    public get maxUsers(): number {
        if (this.type == 1) {
            return 0;
        }
        if (this.type == 2) {
            return this._guestRoomData.maxUserCount;
        }
        return 0;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._guestRoomData != null) {
            this._guestRoomData.dispose();
            this._guestRoomData = null;
        }
    }

    public toggleOpen(): void {
        this._open = !this._open;
    }

    get [IDisposable](): true {
        return true;
    }
}
