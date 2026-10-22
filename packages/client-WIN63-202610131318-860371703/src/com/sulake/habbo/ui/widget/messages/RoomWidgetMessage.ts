import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetMessage'); }

    public static readonly WIDGET_MESSAGE_TEST: string = "RWM_MESSAGE_TEST";
    private _type: string = "";

    constructor(param1: string) {
        this._type = param1;
    }

    public get type(): string {
        return this._type;
    }
}
