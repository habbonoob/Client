import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';

export class SearchResultList {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::SearchResultList'); }

    public static readonly _SafeStr_7727: number = 0;
    public static readonly _SafeStr_7883: number = 1;
    public static readonly _SafeStr_8731: number = 2;

    declare private _searchCode: string;

    declare private _text: string;

    declare private _actionAllowed: number;
    static { (this.prototype as any)._actionAllowed = 0; }

    declare private _forceClosed: boolean;
    static { (this.prototype as any)._forceClosed = false; }

    declare private _viewMode: number;
    static { (this.prototype as any)._viewMode = 0; }

    declare private _guestRooms: GuestRoomData[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._guestRooms = new Array<GuestRoomData>(0).fill(null);
        this._searchCode = param1.readString();
        this._text = param1.readString();
        this._actionAllowed = param1.readInteger();
        this._forceClosed = param1.readBoolean();
        this._viewMode = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._guestRooms.push(new GuestRoomData(param1));
            _loc3_++;
        }
    }

    public get guestRooms(): GuestRoomData[] {
        return this._guestRooms;
    }

    public get searchCode(): string {
        return this._searchCode;
    }

    public get text(): string {
        return this._text;
    }

    public get actionAllowed(): number {
        return this._actionAllowed;
    }

    public get forceClosed(): boolean {
        return this._forceClosed;
    }

    public get viewMode(): number {
        return this._viewMode;
    }

    public set viewMode(param1: number) {
        this._viewMode = param1;
    }

    public findGuestRoom(param1: number): GuestRoomData {
        for (const _loc2_ of this._guestRooms ?? []) {
            if (_loc2_.flatId == param1) {
                return _loc2_;
            }
        }
        return null;
    }
}
