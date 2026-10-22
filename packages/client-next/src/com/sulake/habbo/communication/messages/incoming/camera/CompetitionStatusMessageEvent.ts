import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CompetitionStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/camera/CompetitionStatusMessageParser';

export class CompetitionStatusMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.camera::CompetitionStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CompetitionStatusMessageParser);
    }

    public getParser(): CompetitionStatusMessageParser {
        return this._parser instanceof CompetitionStatusMessageParser ? this._parser : null;
    }
}
