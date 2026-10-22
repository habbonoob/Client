import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPetCommandsUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPetCommandsUpdateEvent'); }

    public static readonly PET_COMMANDS: string = "RWPCUE_PET_COMMANDS";
    public static readonly OPEN_PET_TRAINING: string = "RWPCUE_OPEN_PET_TRAINING";
    public static readonly CLOSE_PET_TRAINING: string = "RWPCUE_CLOSE_PET_TRAINING";

    constructor(param1: number, param2: any[], param3: any[], param4: boolean = false, param5: boolean = false) {
        super("RWPCUE_PET_COMMANDS", param4, param5);
        this._id = param1;
        this._allCommands = param2;
        this._SafeStr_4496 = param3;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _allCommands: any[];

    declare private _SafeStr_4496: any[];

    public get id(): number {
        return this._id;
    }

    public get allCommands(): any[] {
        return this._allCommands;
    }

    public get enabledCommands(): any[] {
        return this._SafeStr_4496;
    }
}
