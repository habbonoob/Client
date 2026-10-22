import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class YouArePlayingGameMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::YouArePlayingGameMessageParser'); }

    constructor() {
    }

    private _isPlaying: boolean = false;

    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    public flush(): boolean {
        this._isPlaying = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isPlaying = param1.readBoolean();
        return true;
    }
}
