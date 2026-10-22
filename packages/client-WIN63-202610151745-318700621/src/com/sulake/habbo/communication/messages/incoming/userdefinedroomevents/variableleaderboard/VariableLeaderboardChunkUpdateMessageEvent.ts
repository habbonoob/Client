import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VariableLeaderboardChunkUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/variableleaderboard/VariableLeaderboardChunkUpdateMessageParser';

export class VariableLeaderboardChunkUpdateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.variableleaderboard::VariableLeaderboardChunkUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VariableLeaderboardChunkUpdateMessageParser);
    }

    public getParser(): VariableLeaderboardChunkUpdateMessageParser {
        return this._parser instanceof VariableLeaderboardChunkUpdateMessageParser ? this._parser : null;
    }
}
