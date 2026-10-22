import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class InternalLinkButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::InternalLinkButtonElementHandler'); }

    constructor() {
        super();
    }

    declare private _link: string;

    declare private _configurationCode: string;

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        this._link = stringOrNull(param3[2]);
        this._configurationCode = param4.configurationCode;
    }

    protected override onClick(): void {
        this.landingView.context.createLinkEvent(this._link);
        this.landingView.tracking.trackEventLog("LandingView", this._configurationCode, "client_link", this._link);
    }
}
