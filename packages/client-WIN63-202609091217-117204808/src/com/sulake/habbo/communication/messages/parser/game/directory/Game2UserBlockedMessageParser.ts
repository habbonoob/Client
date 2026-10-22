import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2UserBlockedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2UserBlockedMessageParser'); }

    declare private _playerBlockLength: number;
    static { (this.prototype as any)._playerBlockLength = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._playerBlockLength = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._playerBlockLength = param1.readInteger();
        return true;
    }

    public get playerBlockLength(): number {
        return this._playerBlockLength;
    }
}
