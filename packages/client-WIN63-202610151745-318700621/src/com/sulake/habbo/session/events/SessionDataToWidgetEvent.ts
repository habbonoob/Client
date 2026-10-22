import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { SessionDataEvent } from '@/com/sulake/habbo/session/events/SessionDataEvent';

export class SessionDataToWidgetEvent extends SessionDataEvent {
    static { registerClassName(this, 'com.sulake.habbo.session.events::SessionDataToWidgetEvent'); }

    public static readonly _SafeStr_8072: string = "SDTWE_PURCHASABLE_STYLES_UPDATED";

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super(param1, param2, param3);
    }
}
