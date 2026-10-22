import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetPlayListPlayStateMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetPlayListPlayStateMessage'); }

    public static readonly TOGGLE_PLAY_PAUSE: string = "RWPLPS_TOGGLE_PLAY_PAUSE";

    constructor(param1: string, param2: number, param3: number = -1) {
        super(param1);
        this._furniId = param2;
        this._position = param3;
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _position: number;
    static { (this.prototype as any)._position = 0; }

    public get furniId(): number {
        return this._furniId;
    }

    public get position(): number {
        return this._position;
    }
}
