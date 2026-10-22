import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarGuideStatusUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarGuideStatusUpdateMessage'); }

    constructor(param1: number) {
        super();
        this._guideStatus = param1;
    }

    declare private _guideStatus: number;
    static { (this.prototype as any)._guideStatus = 0; }

    public get guideStatus(): number {
        return this._guideStatus;
    }
}
