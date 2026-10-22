import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SongInfoEntry } from '@/com/sulake/habbo/communication/messages/incoming/sound/SongInfoEntry';

export class TraxSongInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.sound::TraxSongInfoMessageParser'); }

    declare private _songs: any[];

    constructor() {
    }

    public get songs(): any[] {
        return this._songs;
    }

    public flush(): boolean {
        this._songs = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc9_: number = 0;
        let _loc4_: string = null;
        let _loc6_: string = null;
        let _loc2_: string = null;
        let _loc7_: number = 0;
        let _loc3_: string = null;
        let _loc8_: number = 0;
        let _loc10_: SongInfoEntry = null;
        let _loc5_: number = param1.readInteger();
        _loc8_ = 0;
        while (_loc8_ < _loc5_) {
            _loc9_ = param1.readInteger();
            _loc4_ = param1.readString();
            _loc6_ = param1.readString();
            _loc2_ = param1.readString();
            _loc7_ = param1.readInteger();
            _loc3_ = param1.readString();
            _loc10_ = new SongInfoEntry(_loc9_, _loc7_, _loc6_, _loc3_, _loc2_);
            this._songs.push(_loc10_);
            _loc8_++;
        }
        return true;
    }
}
