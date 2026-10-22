import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class YoutubeDisplayPlaylist {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::YoutubeDisplayPlaylist'); }

    constructor(param1: string, param2: string, param3: string) {
        this._playlistId = param1;
        this._title = param2;
        this._description = param3;
    }

    declare private _playlistId: string;

    declare private _title: string;

    declare private _description: string;

    public get playlistId(): string {
        return this._playlistId;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }
}
