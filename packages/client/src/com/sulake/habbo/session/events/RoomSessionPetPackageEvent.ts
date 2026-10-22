import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';

export class RoomSessionPetPackageEvent extends RoomSessionEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::RoomSessionPetPackageEvent'); }

    public static readonly ROOM_SESSION_OPEN_PET_PACKAGE_REQUESTED: string = "RSOPPE_OPEN_PET_PACKAGE_REQUESTED";
    public static readonly ROOM_SESSION_OPEN_PET_PACKAGE_RESULT: string = "RSOPPE_OPEN_PET_PACKAGE_RESULT";

    constructor(param1: string, param2: IRoomSession, param3: number, param4: PetFigureData, param5: number, param6: string, param7: boolean = false, param8: boolean = false) {
        super(param1, param2, param7, param8);
        this._objectId = param3;
        this._figureData = param4;
        this._nameValidationStatus = param5;
        this._nameValidationInfo = param6;
    }

    private _objectId: number = -1;

    declare private _figureData: PetFigureData;

    private _nameValidationStatus: number = 0;

    public get nameValidationStatus(): number {
        return this._nameValidationStatus;
    }

    private _nameValidationInfo: string = null;

    public get nameValidationInfo(): string {
        return this._nameValidationInfo;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get figureData(): PetFigureData {
        return this._figureData;
    }
}
