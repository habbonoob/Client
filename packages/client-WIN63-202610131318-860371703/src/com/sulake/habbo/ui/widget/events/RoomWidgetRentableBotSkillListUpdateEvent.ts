import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRentableBotSkillListUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRentableBotSkillListUpdateEvent'); }

    public static readonly SKILL_LIST: string = "RWRBSLUE_SKILL_LIST";

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    declare private _SafeStr_3475: any[];

    constructor(param1: number, param2: any[], param3: boolean = false, param4: boolean = false) {
        super("RWRBSLUE_SKILL_LIST", param3, param4);
        this._botId = param1;
        this._SafeStr_3475 = param2;
    }

    public get botSkillsWithCommands(): any[] {
        return this._SafeStr_3475;
    }

    public get botId(): number {
        return this._botId;
    }
}
