import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetPackageUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetPackageUpdateEvent'); }

    public static readonly _SafeStr_7945: string = "RWOPPUE_OPEN_PET_PACKAGE_REQUESTED";
    public static readonly OPEN_PET_PACKAGE_RESULT: string = "RWOPPUE_OPEN_PET_PACKAGE_RESULT";
    public static readonly OPEN_PET_PACKAGE_UPDATE_PET_IMAGE: string = "RWOPPUE_OPEN_PET_PACKAGE_UPDATE_PET_IMAGE";

    constructor(param1: string, param2: number, param3: BitmapData, param4: number, param5: string, param6: number, param7: boolean = false, param8: boolean = false) {
        super(param1, param7, param8);
        this._objectId = param2;
        this._image = param3;
        this._nameValidationStatus = param4;
        this._nameValidationInfo = param5;
        this._typeId = param6;
    }

    private _objectId: number = -1;
    private _typeId: number = -1;
    private _image: BitmapData = null;
    private _nameValidationStatus: number = 0;

    public get nameValidationStatus(): number {
        return this._nameValidationStatus;
    }

    private _nameValidationInfo: string = null;

    public get nameValidationInfo(): string {
        return this._nameValidationInfo;
    }

    public get image(): BitmapData {
        return this._image;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get typeId(): number {
        return this._typeId;
    }
}
