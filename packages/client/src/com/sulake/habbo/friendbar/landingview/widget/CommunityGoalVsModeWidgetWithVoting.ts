import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import { CommunityVoteReceivedEvent } from '@/com/sulake/habbo/communication/messages/incoming/landingview/votes/CommunityVoteReceivedEvent';
import { CommunityGoalVsModeWidget } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';

export class CommunityGoalVsModeWidgetWithVoting extends CommunityGoalVsModeWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::CommunityGoalVsModeWidgetWithVoting'); }

    constructor(param1: HabboLandingView) {
        super(param1, true);
    }

    declare private _SafeStr_4601: IWindow;

    declare private _SafeStr_4272: IWindow;

    declare private _SafeStr_7413: string;

    public override initialize(): void {
        super.initialize();
        this._SafeStr_4601 = this._SafeStr_2250.findChildByName("community_vote_one_button");
        this._SafeStr_4601.procedure = this.onVoteOptionOneClick;
        this._SafeStr_4272 = this._SafeStr_2250.findChildByName("community_vote_two_button");
        this._SafeStr_4272.procedure = this.onVoteOptionTwoClick;
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new CommunityVoteReceivedEvent(this.onInfo));
    }

    public override refresh(): void {
        super.refresh();
        if (this.communityProgress != null) {
            if (this._SafeStr_4601 != null) {
                this._SafeStr_4601.visible = this.communityProgress.personalContributionScore == 0;
            }
            if (this._SafeStr_4272 != null) {
                this._SafeStr_4272.visible = this.communityProgress.personalContributionScore == 0;
            }
        }
    }

    private onVoteOptionOneClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.hideVoteButtons();
            this._landingView.communityGoalVote(1);
            this._landingView.tracking.trackGoogle("landingView", "click_voteoption_one");
        }
    };

    private onVoteOptionTwoClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.hideVoteButtons();
            this._landingView.communityGoalVote(2);
            this._landingView.tracking.trackGoogle("landingView", "click_voteoption_two");
        }
    };

    private onInfo = (param1: CommunityVoteReceivedEvent): void => {
        if (param1.getParser().acknowledged) {
            this.hideVoteButtons();
        }
    };

    private hideVoteButtons(): void {
        this._SafeStr_4601.visible = false;
        this._SafeStr_4272.visible = false;
    }
}
