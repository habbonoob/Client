import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetUseProductMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetUseProductMessage'); }

    public static readonly PET_PRODUCT: string = "RWUPM_PET_PRODUCT";
    public static readonly MONSTERPLANT_SEED: string = "RWUPM_MONSTERPLANT_SEED";

    constructor(param1: string, param2: number, param3: number = -1) {
        super(param1);
        this._roomObjectId = param2;
        this._petId = param3;
    }

    private _roomObjectId: number = 0;
    private _petId: number = -1;

    public get roomObjectId(): number {
        return this._roomObjectId;
    }

    public get petId(): number {
        return this._petId;
    }
}
