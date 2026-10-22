import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetStickieSendUpdateMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetStickieSendUpdateMessage'); }

    public static readonly _SafeStr_7849: string = "RWSUM_STICKIE_SEND_UPDATE";
    public static readonly _SafeStr_8164: string = "RWSUM_STICKIE_SEND_DELETE";

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _text: string;

    declare private _colorHex: string;

    constructor(param1: string, param2: number, param3: string = "", param4: string = "") {
        super(param1);
        this._objectId = param2;
        this._text = param3;
        this._colorHex = param4;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get text(): string {
        return this._text;
    }

    public get colorHex(): string {
        return this._colorHex;
    }
}
