import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetStickieDataUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetStickieDataUpdateEvent'); }

    public static readonly UPDATE_STICKIE_DATA: string = "RWSDUE_STICKIE_DATA";
    private _objectId: number = -1;

    declare private _objectType: string;

    declare private _text: string;

    declare private _colorHex: string;

    declare private _controller: boolean;
    static { (this.prototype as any)._controller = false; }

    constructor(param1: string, param2: number, param3: string, param4: string, param5: string, param6: boolean, param7: boolean = false, param8: boolean = false) {
        super(param1, param7, param8);
        this._objectId = param2;
        this._objectType = param3;
        this._text = param4;
        this._colorHex = param5;
        this._controller = param6;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get objectType(): string {
        return this._objectType;
    }

    public get text(): string {
        return this._text;
    }

    public get colorHex(): string {
        return this._colorHex;
    }

    public get controller(): boolean {
        return this._controller;
    }
}
