import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { VariableLeaderboardSnapshotMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/variableleaderboard/VariableLeaderboardSnapshotMessageParser';

export class VariableLeaderboardSnapshotMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.variableleaderboard::VariableLeaderboardSnapshotMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, VariableLeaderboardSnapshotMessageParser);
    }

    public getParser(): VariableLeaderboardSnapshotMessageParser {
        return this._parser instanceof VariableLeaderboardSnapshotMessageParser ? this._parser : null;
    }
}
