import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { YoutubeDisplayPlaylist } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/YoutubeDisplayPlaylist';

export class YoutubeDisplayPlaylistsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::YoutubeDisplayPlaylistsMessageParser'); }

    constructor() {
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _playlists: YoutubeDisplayPlaylist[];

    declare private _selectedPlaylistId: string;

    public get furniId(): number {
        return this._furniId;
    }

    public get playlists(): YoutubeDisplayPlaylist[] {
        return this._playlists;
    }

    public get selectedPlaylistId(): string {
        return this._selectedPlaylistId;
    }

    public flush(): boolean {
        this._playlists = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: string = null;
        let _loc6_: string = null;
        let _loc5_: string = null;
        this._furniId = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        this._playlists = new Array<YoutubeDisplayPlaylist>(0).fill(null);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = param1.readString();
            _loc6_ = param1.readString();
            _loc5_ = param1.readString();
            this._playlists.push(new YoutubeDisplayPlaylist(_loc2_, _loc6_, _loc5_));
            _loc4_++;
        }
        this._selectedPlaylistId = param1.readString();
        return true;
    }
}
