import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import { CommunityGoalWidget } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';

export class CommunityGoalVsModeWidget extends CommunityGoalWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::CommunityGoalVsModeWidget'); }

    private static readonly NEEDLE_LEVELS: any[] = [-3, -2, -1, 0, 1, 2, 3];
    private static readonly NEEDLE_FRAMES: any[] = [0, 0, 4.75, 11.5, 16.25, 23, 23];

    constructor(param1: HabboLandingView, param2: boolean = false) {
        super(param1, param2);
    }

    protected override getCurrentNeedleFrame(): number {
        if (this.communityProgress.communityHighestAchievedLevel <= CommunityGoalVsModeWidget.NEEDLE_LEVELS[0]) {
            return Math.round(Number(CommunityGoalVsModeWidget.NEEDLE_FRAMES[0])) | 0;
        }
        if (this.communityProgress.communityHighestAchievedLevel >= CommunityGoalVsModeWidget.NEEDLE_LEVELS[CommunityGoalVsModeWidget.NEEDLE_LEVELS.length - 1]) {
            return Math.round(Number(CommunityGoalVsModeWidget.NEEDLE_FRAMES[CommunityGoalVsModeWidget.NEEDLE_LEVELS.length - 1])) | 0;
        }
        let _loc3_: number = this.communityProgress.scoreRemainingUntilNextLevel < 0 ? -1 : 1;
        let _loc1_: number = this.communityProgress.communityHighestAchievedLevel;
        let _loc2_: number = Number(CommunityGoalVsModeWidget.NEEDLE_FRAMES[CommunityGoalVsModeWidget.NEEDLE_LEVELS.indexOf(_loc1_)]);
        let _loc4_: number = Number(Math.abs(CommunityGoalVsModeWidget.NEEDLE_FRAMES[CommunityGoalVsModeWidget.NEEDLE_LEVELS.indexOf(_loc1_ + _loc3_)] - CommunityGoalVsModeWidget.NEEDLE_FRAMES[CommunityGoalVsModeWidget.NEEDLE_LEVELS.indexOf(_loc1_)]));
        return Math.round(_loc2_ + this.communityProgress.percentCompletionTowardsNextLevel / 100 * _loc4_ * _loc3_) | 0;
    }

    public override update(param1: number): void {
        this.updateMeter(Math.floor(this.getCurrentNeedleFrame()) | 0, false);
    }

    public override initialize(): void {
        super.initialize();
        this._SafeStr_2250.findChildByName("community_total_status").visible = false;
    }
}
