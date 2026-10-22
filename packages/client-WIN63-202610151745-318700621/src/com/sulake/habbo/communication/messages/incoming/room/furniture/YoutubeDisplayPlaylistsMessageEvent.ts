import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { YoutubeDisplayPlaylistsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/YoutubeDisplayPlaylistsMessageParser';

export class YoutubeDisplayPlaylistsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::YoutubeDisplayPlaylistsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, YoutubeDisplayPlaylistsMessageParser);
    }

    public getParser(): YoutubeDisplayPlaylistsMessageParser {
        return asInstanceOf(this.parser, YoutubeDisplayPlaylistsMessageParser);
    }
}
