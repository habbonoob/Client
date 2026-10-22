import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BuildersClubPlacementWarningMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/BuildersClubPlacementWarningMessageParser';

export class BuildersClubPlacementWarningMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::BuildersClubPlacementWarningMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BuildersClubPlacementWarningMessageParser);
    }

    public getParser(): BuildersClubPlacementWarningMessageParser {
        return this._parser instanceof BuildersClubPlacementWarningMessageParser ? this._parser : null;
    }
}
