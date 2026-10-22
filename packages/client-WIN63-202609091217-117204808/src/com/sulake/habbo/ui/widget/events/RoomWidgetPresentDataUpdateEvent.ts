import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPresentDataUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPresentDataUpdateEvent'); }

    public static readonly UPDATE_PACKAGEINFO: string = "RWPDUE_PACKAGEINFO";
    public static readonly _SafeStr_7518: string = "RWPDUE_CONTENTS";
    public static readonly _SafeStr_7692: string = "RWPDUE_CONTENTS_CLUB";
    public static readonly _SafeStr_8463: string = "RWPDUE_CONTENTS_FLOOR";
    public static readonly UPDATE_CONTENTS_LANDSCAPE: string = "RWPDUE_CONTENTS_LANDSCAPE";
    public static readonly UPDATE_CONTENTS_WALLPAPER: string = "RWPDUE_CONTENTS_WALLPAPER";
    public static readonly UPDATE_CONTENTS_IMAGE: string = "RWPDUE_CONTENTS_IMAGE";
    private _objectId: number = -1;
    private _classId: number = 0;
    private _itemType: string = "";

    declare private _text: string;

    declare private _controller: boolean;
    static { (this.prototype as any)._controller = false; }

    declare private _iconBitmapData: BitmapData;

    declare private _purchaserName: string;

    declare private _purchaserFigure: string;

    private _placedItemId: number = -1;
    private _placedItemType: string = "";

    declare private _placedInRoom: boolean;
    static { (this.prototype as any)._placedInRoom = false; }

    declare private _trustedSender: boolean;
    static { (this.prototype as any)._trustedSender = false; }

    constructor(param1: string, param2: number, param3: string, param4: boolean = false, param5: BitmapData = null, param6: string = null, param7: string = null, param8: boolean = false, param9: boolean = false, param10: any = false) {
        super(param1, param8, param9);
        this._objectId = param2;
        this._text = param3;
        this._controller = param4;
        this._iconBitmapData = param5;
        this._purchaserName = param6;
        this._purchaserFigure = param7;
        this._trustedSender = param10;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get classId(): number {
        return this._classId;
    }

    public set classId(param1: number) {
        this._classId = param1;
    }

    public get itemType(): string {
        return this._itemType;
    }

    public set itemType(param1: string) {
        this._itemType = param1;
    }

    public get text(): string {
        return this._text;
    }

    public get controller(): boolean {
        return this._controller;
    }

    public get iconBitmapData(): BitmapData {
        return this._iconBitmapData;
    }

    public get purchaserName(): string {
        return this._purchaserName;
    }

    public get purchaserFigure(): string {
        return this._purchaserFigure;
    }

    public get placedItemId(): number {
        return this._placedItemId;
    }

    public set placedItemId(param1: number) {
        this._placedItemId = param1;
    }

    public get placedInRoom(): boolean {
        return this._placedInRoom;
    }

    public set placedInRoom(param1: boolean) {
        this._placedInRoom = param1;
    }

    public get placedItemType(): string {
        return this._placedItemType;
    }

    public set placedItemType(param1: string) {
        this._placedItemType = param1;
    }

    public get trustedSender(): boolean {
        return this._trustedSender;
    }
}
