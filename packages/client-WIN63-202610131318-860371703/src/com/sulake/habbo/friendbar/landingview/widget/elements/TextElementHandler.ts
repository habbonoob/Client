import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';

export class TextElementHandler implements IElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::TextElementHandler'); }

    declare private _window: ITextWindow;

    constructor() {
    }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        this._window = isITextWindow(param2) ? param2 : null;
        let _loc5_: string = stringOrNull(param3[1]);
        this._window.caption = "${" + _loc5_ + "}";
        if (param3.length > 2) {
            this._window.width = parseInt(stringOrNull(param3[2])) | 0;
        }
        if (param3.length > 3 && param3[3] == "true") {
            this._window.border = true;
        }
    }

    public refresh(): void {
    }

    public set localizationKey(param1: string) {
        this._window.caption = "${" + param1 + "}";
    }

    get [IElementHandler](): true {
        return true;
    }
}
