import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class PromotedRoomButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::PromotedRoomButtonElementHandler'); }

    constructor() {
        super();
    }

    declare private _categoryCode: string;

    protected override onClick(): void {
        this.landingView.goToRoom(this._categoryCode);
        this.landingView.tracking.trackGoogle("landingView", "click_promotedroom" + this._categoryCode);
    }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        if (param3.length > 1) {
            this._categoryCode = stringOrNull(param3[2]);
        }
    }
}
