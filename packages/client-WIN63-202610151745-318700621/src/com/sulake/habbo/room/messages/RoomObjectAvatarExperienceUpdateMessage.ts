import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarExperienceUpdateMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarExperienceUpdateMessage'); }

    declare private _gainedExperience: number;
    static { (this.prototype as any)._gainedExperience = 0; }

    constructor(param1: number) {
        super();
        this._gainedExperience = param1;
    }

    public get gainedExperience(): number {
        return this._gainedExperience;
    }
}
