import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetFigureUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetFigureUpdateEvent'); }

    public static readonly PET_FIGURE_UPDATE: string = "RWPIUE_PET_FIGURE_UPDATE";

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _image: BitmapData;

    constructor(param1: number, param2: BitmapData, param3: boolean = false, param4: boolean = false) {
        super("RWPIUE_PET_FIGURE_UPDATE", param3, param4);
        this._petId = param1;
        this._image = param2;
    }

    public get petId(): number {
        return this._petId;
    }

    public get image(): BitmapData {
        return this._image;
    }
}
