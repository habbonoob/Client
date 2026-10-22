import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarExpressionUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarExpressionUpdateMessage'); }

    constructor(param1: number = -1) {
        super();
        this._expressionType = param1;
    }

    private _expressionType: number = -1;

    public get expressionType(): number {
        return this._expressionType;
    }
}
