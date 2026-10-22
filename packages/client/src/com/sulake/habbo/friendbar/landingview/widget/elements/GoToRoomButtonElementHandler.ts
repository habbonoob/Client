import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class GoToRoomButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::GoToRoomButtonElementHandler'); }

    constructor() {
        super();
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        this._roomId = param3[2] | 0;
    }

    protected override onClick(): void {
        this.landingView.navigator.goToPrivateRoom(this._roomId);
        this.landingView.tracking.trackGoogle("landingView", "click_gotoroom");
    }
}
