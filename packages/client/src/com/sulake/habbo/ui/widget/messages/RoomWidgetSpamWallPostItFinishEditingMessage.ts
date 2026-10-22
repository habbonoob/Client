import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetSpamWallPostItFinishEditingMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetSpamWallPostItFinishEditingMessage'); }

    public static readonly SEND_POSTIT_DATA: string = "RWSWPFEE_SEND_POSTIT_DATA";

    constructor(param1: string, param2: number, param3: string, param4: string, param5: string) {
        super(param1);
        this._objectId = param2;
        this._location = param3;
        this._text = param4;
        this._colorHex = param5;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _location: string;

    declare private _colorHex: string;

    declare private _text: string;

    public get text(): string {
        return this._text;
    }

    public get location(): string {
        return this._location;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get colorHex(): string {
        return this._colorHex;
    }
}
