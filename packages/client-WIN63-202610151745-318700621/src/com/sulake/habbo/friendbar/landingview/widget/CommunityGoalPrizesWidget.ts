import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CommunityGoalData } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalData';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UserObjectEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/UserObjectEvent';
import { CommunityGoalProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalProgressMessageEvent';
import { UserChangeMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserChangeMessageEvent';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';
import { Logger } from '@/com/sulake/habbo/Logger';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class CommunityGoalPrizesWidget implements ILandingViewWidget, ISettingsAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::CommunityGoalPrizesWidget'); }

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    declare private _data: CommunityGoalData;

    declare private _figure: string;

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    public get container(): IWindow {
        return this._container;
    }

    public dispose(): void {
        this._landingView = null;
        this._container = null;
        this._data = null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("achievement_competition_prizes"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new UserChangeMessageEvent(this.onUserChange));
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new CommunityGoalProgressMessageEvent(this.onCommunityGoalProgress));
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new UserObjectEvent(this.onUserObject));
    }

    public refresh(): void {
        this.refreshContent();
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    private refreshContent(): void {
        if (this._data == null) {
            this._container.visible = false;
            return;
        }
        this._container.visible = true;
        this.setPrizeRankLimits(1);
        this.setPrizeRankLimits(2);
        this.setPrizeRankLimits(3);
        this._landingView.localizationManager.registerParameter(this.getCompetitionSpecificKey("yourrankinfo"), "points", "" + this._data.personalContributionScore);
        this._container.findChildByName("caption_txt").caption = this.getCompetitionSpecificText("caption");
        this._container.findChildByName("info_txt").caption = this.getCompetitionSpecificText("info");
        this._container.findChildByName("reward_name_txt").caption = this.getCompetitionSpecificText("rewardname");
        this._container.findChildByName("reward_info_txt").caption = this.getCompetitionSpecificText("rewardinfo");
        this._container.findChildByName("rank_1_txt").caption = this.getCompetitionSpecificText("rank1");
        this._container.findChildByName("rank_2_txt").caption = this.getCompetitionSpecificText("rank2");
        this._container.findChildByName("rank_3_txt").caption = this.getCompetitionSpecificText("rank3");
        this._container.findChildByName("user_rank_border").visible = !this._data.hasGoalExpired || this._data.personalContributionRank > 0;
        let _loc1_: string = this._data.hasGoalExpired ? "yourfinalrank" : (this._data.personalContributionRank > 0 ? "yourrank" : "youarenotranked");
        this._landingView.localizationManager.registerParameter(this.getKey(_loc1_), "rank", "" + this._data.personalContributionRank);
        this._container.findChildByName("user_rank_txt").caption = this.getText(_loc1_);
        this._container.findChildByName("user_rank_info_txt").visible = !this._data.hasGoalExpired;
        this._container.findChildByName("user_rank_info_txt").caption = this.getCompetitionSpecificText(this._data.personalContributionRank > 0 ? "yourrankinfo" : "youarenotrankedinfo");
        castGuarded(this._container.findChildByName("reward_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}reception/" + this._data.goalCode + "Reward.png";
    }

    private setPrizeRankLimits(param1: number): void {
        let _loc4_: number = 0;
        _loc4_ = 0;
        let _loc5_: number = 1;
        _loc4_ = 0;
        while (_loc4_ < param1) {
            _loc5_ += this.resolveStartRank(param1 - _loc4_);
            _loc4_++;
        }
        let _loc3_: number = 0;
        _loc4_ = 0;
        while (_loc4_ < param1) {
            _loc3_ += this.resolveEndRank(param1 - _loc4_);
            _loc4_++;
        }
        let _loc6_: string = _loc5_ == _loc3_ ? this.getKey("rank") : this.getKey("ranks");
        let _loc2_: string = this._landingView.localizationManager.getLocalizationWithParams(_loc6_, "", "start", _loc5_, "end", _loc3_);
        this._container.findChildByName("rank_" + param1 + "_info_txt").caption = _loc2_;
    }

    private resolveStartRank(param1: number): number {
        return this._data.rewardUserLimits[param1 - 2] | 0;
    }

    private resolveEndRank(param1: number): number {
        return this._data.rewardUserLimits[param1 - 1] | 0;
    }

    private onCommunityGoalProgress = (param1: CommunityGoalProgressMessageEvent): void => {
        this._data = param1.getParser().data;
        this.refreshContent();
    };

    private getKey(param1: string): string {
        return "landing.view.competition.prizes." + param1;
    }

    private getCompetitionSpecificKey(param1: string): string {
        let _loc2_: string = this.getKey(this._data.goalCode + "." + param1);
        Logger.log("foobar: " + _loc2_);
        return _loc2_;
    }

    private getCompetitionSpecificText(param1: string): string {
        let _loc2_: string = this.getCompetitionSpecificKey(param1);
        return "${" + _loc2_ + "}";
    }

    private getText(param1: string): string {
        let _loc2_: string = this.getKey(param1);
        return "${" + _loc2_ + "}";
    }

    private onUserObject = (param1: UserObjectEvent): void => {
        this._figure = param1.getParser().figure;
        this.refreshAvatarInfo();
    };

    private onUserChange = (param1: UserChangeMessageEvent): void => {
        if (param1 != null && param1.id == -1) {
            this._figure = param1.figure;
            this.refreshAvatarInfo();
        }
    };

    private refreshAvatarInfo(): void {
        let _loc1_: IWidgetWindow = castGuarded(this._container.findChildByName("avatar_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc2_: IAvatarImageWidget = castGuarded(_loc1_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget");
        _loc2_.figure = this._figure;
    }

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }
}
