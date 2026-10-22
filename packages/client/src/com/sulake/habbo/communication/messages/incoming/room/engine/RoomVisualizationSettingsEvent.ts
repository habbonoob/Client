import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomVisualizationSettingsParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RoomVisualizationSettingsParser';

export class RoomVisualizationSettingsEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::RoomVisualizationSettingsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomVisualizationSettingsParser);
    }

    public getParser(): RoomVisualizationSettingsParser {
        return this._parser instanceof RoomVisualizationSettingsParser ? this._parser : null;
    }
}
