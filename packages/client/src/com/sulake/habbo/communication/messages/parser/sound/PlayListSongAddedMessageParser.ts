import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PlayListEntry } from '@/com/sulake/habbo/communication/messages/incoming/sound/PlayListEntry';

export class PlayListSongAddedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.sound::PlayListSongAddedMessageParser'); }

    constructor() {
    }

    declare private _entry: PlayListEntry;

    public get entry(): PlayListEntry {
        return this._entry;
    }

    public flush(): boolean {
        this._entry = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        let _loc2_: string = param1.readString();
        let _loc3_: string = param1.readString();
        this._entry = new PlayListEntry(_loc5_, _loc4_, _loc2_, _loc3_);
        return true;
    }
}
