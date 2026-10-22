import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NowPlayingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.sound::NowPlayingMessageParser'); }

    constructor() {
    }

    declare private _currentSongId: number;
    static { (this.prototype as any)._currentSongId = 0; }

    declare private _currentPosition: number;
    static { (this.prototype as any)._currentPosition = 0; }

    declare private _nextSongId: number;
    static { (this.prototype as any)._nextSongId = 0; }

    declare private _nextPosition: number;
    static { (this.prototype as any)._nextPosition = 0; }

    declare private _syncCount: number;
    static { (this.prototype as any)._syncCount = 0; }

    public get currentSongId(): number {
        return this._currentSongId;
    }

    public get currentPosition(): number {
        return this._currentPosition;
    }

    public get nextSongId(): number {
        return this._nextSongId;
    }

    public get nextPosition(): number {
        return this._nextPosition;
    }

    public get syncCount(): number {
        return this._syncCount;
    }

    public flush(): boolean {
        this._currentSongId = -1;
        this._currentPosition = -1;
        this._nextSongId = -1;
        this._nextPosition = -1;
        this._syncCount = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._currentSongId = param1.readInteger();
        this._currentPosition = param1.readInteger();
        this._nextSongId = param1.readInteger();
        this._nextPosition = param1.readInteger();
        this._syncCount = param1.readInteger();
        return true;
    }
}
