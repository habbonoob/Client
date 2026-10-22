import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { navigateToURL } from '@habbo-pixi/runtime/net/navigateToURL';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';

export class OpenExternalLink {
    static { registerClassName(this, 'com.sulake.habbo.moderation::OpenExternalLink'); }

    declare private _SafeStr_2991: string;

    constructor(param1: ModerationManager, param2: IWindow, param3: string) {
        param2.procedure = this.onClick;
        this._SafeStr_2991 = param3;
    }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        navigateToURL(new URLRequest(this._SafeStr_2991), "_blank");
    };
}
