import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameDirectoryStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameDirectoryStatusMessageParser';

export class Game2GameDirectoryStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2GameDirectoryStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameDirectoryStatusMessageParser);
    }

    public getParser(): Game2GameDirectoryStatusMessageParser {
        return this._parser instanceof Game2GameDirectoryStatusMessageParser ? this._parser : null;
    }
}
