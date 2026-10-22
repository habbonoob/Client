import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class YoutubeDisplayVideoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::YoutubeDisplayVideoMessageParser'); }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _videoId: string;

    declare private _startAtSeconds: number;
    static { (this.prototype as any)._startAtSeconds = 0; }

    declare private _endAtSeconds: number;
    static { (this.prototype as any)._endAtSeconds = 0; }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._furniId = param1.readInteger();
        this._videoId = param1.readString();
        this._startAtSeconds = param1.readInteger();
        this._endAtSeconds = param1.readInteger();
        this._state = param1.readInteger();
        return true;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get videoId(): string {
        return this._videoId;
    }

    public get startAtSeconds(): number {
        return this._startAtSeconds;
    }

    public get endAtSeconds(): number {
        return this._endAtSeconds;
    }

    public get state(): number {
        return this._state;
    }
}
