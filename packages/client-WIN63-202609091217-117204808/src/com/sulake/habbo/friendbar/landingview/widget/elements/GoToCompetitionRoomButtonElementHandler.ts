import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { ForwardToRandomCompetitionRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/competition/ForwardToRandomCompetitionRoomMessageComposer';
import { AbstractButtonElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractButtonElementHandler';

export class GoToCompetitionRoomButtonElementHandler extends AbstractButtonElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::GoToCompetitionRoomButtonElementHandler'); }

    declare private _goalCode: string;

    constructor() {
        super();
    }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        this._goalCode = stringOrNull(param3[2]);
    }

    protected override onClick(): void {
        this.landingView.questEngine.reenableRoomCompetitionWindow();
        this.landingView.send(new ForwardToRandomCompetitionRoomMessageComposer(this._goalCode));
        this.landingView.tracking.trackGoogle("landingView", "click_gotocompetitionroom");
    }
}
