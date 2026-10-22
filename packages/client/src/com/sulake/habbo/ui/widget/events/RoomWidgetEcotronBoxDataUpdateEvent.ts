import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetEcotronBoxDataUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetEcotronBoxDataUpdateEvent'); }

    public static readonly UPDATE_PACKAGEINFO: string = "RWEBDUE_PACKAGEINFO";
    public static readonly _SafeStr_7518: string = "RWEBDUE_CONTENTS";

    constructor(param1: string, param2: number, param3: string, param4: string, param5: boolean = false, param6: BitmapData = null, param7: boolean = false, param8: boolean = false) {
        super(param1, param7, param8);
        this._objectId = param2;
        this._text = param3;
        this._furniTypeName = param4;
        this._controller = param5;
        this._iconBitmapData = param6;
    }

    private _objectId: number = -1;

    declare private _controller: boolean;
    static { (this.prototype as any)._controller = false; }

    declare private _iconBitmapData: BitmapData;

    declare private _text: string;

    public get text(): string {
        return this._text;
    }

    declare private _furniTypeName: string;

    public get furniTypeName(): string {
        return this._furniTypeName;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get controller(): boolean {
        return this._controller;
    }

    public get iconBitmapData(): BitmapData {
        return this._iconBitmapData;
    }
}
