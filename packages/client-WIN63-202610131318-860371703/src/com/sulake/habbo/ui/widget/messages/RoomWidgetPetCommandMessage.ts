import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetPetCommandMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetPetCommandMessage'); }

    public static readonly REQUEST_COMMANDS: string = "RWPCM_REQUEST_PET_COMMANDS";
    public static readonly PET_COMMAND: string = "RWPCM_PET_COMMAND";
    public static readonly BREED_TRAIN_COMMAND_ID: number = 46;
    private _petId: number = 0;

    declare private _value: string;

    constructor(param1: string, param2: number, param3: string = null) {
        super(param1);
        this._petId = param2;
        this._value = param3;
    }

    public get petId(): number {
        return this._petId;
    }

    public get value(): string {
        return this._value;
    }
}
