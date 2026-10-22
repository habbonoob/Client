import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarExperienceUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarExperienceUpdateMessage'); }

    constructor(param1: number) {
        super();
        this._gainedExperience = param1;
    }

    declare private _gainedExperience: number;
    static { (this.prototype as any)._gainedExperience = 0; }

    public get gainedExperience(): number {
        return this._gainedExperience;
    }
}
