import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { CommunityGoalData } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalData';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { CommunityGoalProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalProgressMessageEvent';
import { GetCommunityGoalProgressMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetCommunityGoalProgressMessageComposer';
import { AbstractTimerElementHandler } from '@/com/sulake/habbo/friendbar/landingview/widget/elements/AbstractTimerElementHandler';

export class CommunityGoalTimerElementHandler extends AbstractTimerElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::CommunityGoalTimerElementHandler'); }

    constructor() {
        super();
    }

    public override initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        super.initialize(param1, param2, param3, param4);
        param1.communicationManager.addHabboConnectionMessageEvent(new CommunityGoalProgressMessageEvent(this.onCommunityGoalProgress));
    }

    public override refresh(): void {
        this.landingView.send(new GetCommunityGoalProgressMessageComposer());
    }

    private onCommunityGoalProgress = (param1: CommunityGoalProgressMessageEvent): void => {
        let _loc2_: CommunityGoalData = param1.getParser().data;
        this.setTimer(_loc2_.hasGoalExpired ? 0 : _loc2_.timeRemainingInSeconds);
    };
}
