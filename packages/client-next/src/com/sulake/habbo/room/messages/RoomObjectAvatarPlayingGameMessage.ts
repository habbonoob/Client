import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateStateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectUpdateStateMessage';

export class RoomObjectAvatarPlayingGameMessage extends RoomObjectUpdateStateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectAvatarPlayingGameMessage'); }

    declare private _isPlayingGame: boolean;
    static { (this.prototype as any)._isPlayingGame = false; }

    constructor(param1: boolean = false) {
        super();
        this._isPlayingGame = param1;
    }

    public get isPlayingGame(): boolean {
        return this._isPlayingGame;
    }
}
