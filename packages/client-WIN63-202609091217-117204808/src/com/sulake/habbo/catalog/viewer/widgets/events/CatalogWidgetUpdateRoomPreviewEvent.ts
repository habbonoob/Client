import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetUpdateRoomPreviewEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetUpdateRoomPreviewEvent'); }

    private _wallType: string = "default";
    private _floorType: string = "default";
    private _landscapeType: string = "1.1";
    private _tileSize: number = 64;

    constructor(param1: string, param2: string, param3: string, param4: number, param5: boolean = false, param6: boolean = false) {
        super("UPDATE_ROOM_PREVIEW", param5, param6);
        this._floorType = param1;
        this._wallType = param2;
        this._landscapeType = param3;
        this._tileSize = param4;
    }

    public get wallType(): string {
        return this._wallType;
    }

    public get floorType(): string {
        return this._floorType;
    }

    public get landscapeType(): string {
        return this._landscapeType;
    }

    public get tileSize(): number {
        return this._tileSize;
    }
}
