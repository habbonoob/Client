import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CommunityGoalData } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalData';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CommunityGoalProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/CommunityGoalProgressMessageEvent';
import { GetCommunityGoalProgressMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetCommunityGoalProgressMessageComposer';
import { CommunityGoalProgressMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/CommunityGoalProgressMessageParser';
import { HabboLandingView, WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';

export class CommunityGoalWidget implements IUpdateReceiver, ILandingViewWidget, ISettingsAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::CommunityGoalWidget'); }

    private static readonly METER_INITIAL_DELAY_MS: number = 1500;
    private static readonly METER_BUILDUP_TIME_MS: number = 1000;
    private static readonly CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES: any[] = [0, 8, 16, 23];

    declare protected _landingView: HabboLandingView;

    declare protected _SafeStr_2250: IWindowContainer;

    declare private _SafeStr_6963: IStaticBitmapWrapperWindow;

    declare protected _communityProgress: CommunityGoalData;

    private _SafeStr_5033: boolean = false;
    private _SafeStr_5631: number = 0;
    private _buildupProgress: number = 0;
    private _isInitialized: boolean = false;
    private _SafeStr_5608: boolean = true;
    private _SafeStr_4445: boolean = false;

    constructor(param1: HabboLandingView, param2: boolean = false) {
        this._landingView = param1;
        this._SafeStr_4445 = param2;
    }

    public get container(): IWindow {
        return this._SafeStr_2250;
    }

    public dispose(): void {
        if (this._landingView != null && this._landingView.windowManager) {
            castTo(this._landingView.windowManager, Component).removeUpdateReceiver(this);
        }
        this._landingView = null;
        this._SafeStr_2250 = null;
        this._communityProgress = null;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public initialize(): void {
        let _loc1_: IWindow = null;
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new CommunityGoalProgressMessageEvent(this.onCommunityGoalProgress));
        this._SafeStr_2250 = castGuarded(this._SafeStr_4445 ? this._landingView.getXmlWindow("community_goal_voting") : this._landingView.getXmlWindow("community_goal"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_6963 = castGuarded(this._SafeStr_2250.findChildByName("meter_needle"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        if (!this._SafeStr_4445) {
            _loc1_ = this._SafeStr_2250.findChildByName("community_catalog_button");
            this._SafeStr_5608 = this._landingView.getBoolean("landing.view.community.interactive");
            _loc1_.visible = this._SafeStr_5608;
            _loc1_.procedure = this.onCommunityCatalogButtonClick;
        }
        HabboLandingView.positionAfterAndStretch(this._SafeStr_2250, "community_title", "hdr_line");
    }

    private campaignizeMeterElementAssetUri(param1: IWindow): void {
        let _loc3_: IStaticBitmapWrapperWindow = castGuarded(param1, isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc2_: number = _loc3_.assetUri.indexOf(".png");
        _loc3_.assetUri = _loc3_.assetUri.substr(0, _loc2_) + "_" + this._communityProgress.goalCode + ".png";
    }

    protected setCampaignLocalization(param1: string, param2: string): void {
        let _loc3_: IWindow = this._SafeStr_2250.findChildByName(param1);
        if (_loc3_ != null) {
            _loc3_.caption = "${" + param2 + "." + this._communityProgress.goalCode + "}";
        }
    }

    protected getCurrentNeedleFrame(): number {
        if (this._communityProgress.communityHighestAchievedLevel >= CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES.length - 1) {
            return CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES[CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES.length - 1] | 0;
        }
        let _loc1_: number = CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES[this._communityProgress.communityHighestAchievedLevel] | 0;
        let _loc2_: number = CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES[this._communityProgress.communityHighestAchievedLevel + 1] - _loc1_ | 0;
        return _loc1_ + Math.floor(this._communityProgress.percentCompletionTowardsNextLevel * (_loc2_ + 0.001) / 100) | 0;
    }

    private initializeLocalizations(): void {
        let _loc1_: number = 0;
        if (this._communityProgress != null && this._communityProgress.goalCode != null) {
            _loc1_ = 0;
            while (_loc1_ < CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES.length) {
                this.campaignizeMeterElementAssetUri(this._SafeStr_2250.findChildByName("meter_level_" + _loc1_));
                if (_loc1_ > 0) {
                    this.campaignizeMeterElementAssetUri(this._SafeStr_2250.findChildByName("meter_level_" + _loc1_ + "_icon"));
                    this.campaignizeMeterElementAssetUri(this._SafeStr_2250.findChildByName("meter_level_" + _loc1_ + "_icon_locked"));
                }
                _loc1_++;
            }
            this.setCampaignLocalization("community_title", "landing.view.community.headline");
            this.setCampaignLocalization("goal_caption", "landing.view.community.caption");
            this.setCampaignLocalization("goal_info", "landing.view.community.info");
            this.setCampaignLocalization("community_catalog_button", "landing.view.community_catalog_button.text");
            this._isInitialized = true;
        }
    }

    private refreshContent(): void {
        let _loc3_: number = 0;
        if (this._communityProgress == null) {
            this._SafeStr_2250.visible = false;
            return;
        }
        if (!this._isInitialized) {
            this.initializeLocalizations();
        }
        _loc3_ = 1;
        while (_loc3_ < CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES.length) {
            this._SafeStr_2250.findChildByName("meter_level_" + _loc3_).visible = false;
            this._SafeStr_2250.findChildByName("meter_level_" + _loc3_ + "_icon").visible = false;
            this._SafeStr_2250.findChildByName("meter_level_" + _loc3_ + "_icon_locked").visible = false;
            _loc3_++;
        }
        let _loc2_: string = "landing.view.community.meter";
        this._landingView.localizationManager.registerParameter(_loc2_, "userRank", this._communityProgress.personalContributionRank.toString());
        this._landingView.localizationManager.registerParameter(_loc2_, "userAmount", this._communityProgress.personalContributionScore.toString());
        this._landingView.localizationManager.registerParameter(_loc2_, "totalAmount", this._communityProgress.communityTotalScore.toString());
        if (this._communityProgress != null && this._communityProgress.goalCode != null) {
            this._landingView.localizationManager.registerParameter("landing.view.community.meter." + this._communityProgress.goalCode, "totalAmount", this._communityProgress.communityTotalScore.toString());
            this.setCampaignLocalization("community_total_status", "landing.view.community.meter");
            if (this._SafeStr_4445) {
                this.setCampaignLocalization("community_vote_one_button", "landing.view.vote_one_button.text");
                this.setCampaignLocalization("community_vote_two_button", "landing.view.vote_two_button.text");
            }
        }
        let _loc1_: ITextWindow = castGuarded(this._SafeStr_2250.findChildByName("goal_info"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc1_.height = _loc1_.textHeight + 6 | 0;
        if (!this._SafeStr_4445) {
            this._SafeStr_2250.findChildByName("community_catalog_button").visible = this._SafeStr_5608;
        }
        this._SafeStr_2250.visible = true;
        this._SafeStr_2250.invalidate();
    }

    protected updateMeter(param1: number, param2: boolean = true): void {
        let _loc3_: number = 0;
        let _loc4_: boolean = false;
        _loc3_ = 1;
        while (_loc3_ < CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES.length) {
            _loc4_ = param2 && param1 >= CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES[_loc3_];
            this._SafeStr_2250.findChildByName("meter_level_" + _loc3_).visible = _loc4_;
            this._SafeStr_2250.findChildByName("meter_level_" + _loc3_ + "_icon").visible = _loc4_;
            this._SafeStr_2250.findChildByName("meter_level_" + _loc3_ + "_icon_locked").visible = !_loc4_;
            _loc3_++;
        }
        this._SafeStr_6963.assetUri = "landing_view_needle_meter_needle" + param1;
    }

    public refresh(): void {
        this.requestCommunityGoalProgress();
        this.refreshContent();
    }

    private requestCommunityGoalProgress(): void {
        if (!this._SafeStr_5033) {
            this._landingView.send(new GetCommunityGoalProgressMessageComposer());
            this._SafeStr_5033 = true;
        }
    }

    public update(param1: number): void {
        this._SafeStr_5631 += param1;
        if (this._SafeStr_5631 > 1500) {
            this._buildupProgress += param1 / 1000;
            if (this._buildupProgress > 1) {
                this._buildupProgress = 1;
                castTo(this._landingView.windowManager, Component).removeUpdateReceiver(this);
            }
            this.updateMeter(Math.floor(this.getCurrentNeedleFrame() * this._buildupProgress) | 0);
        }
    }

    private onCommunityGoalProgress = (param1: IMessageEvent): void => {
        this._communityProgress = castTo(param1.parser, CommunityGoalProgressMessageParser).data;
        this._SafeStr_5033 = false;
        this.refreshContent();
        castTo(this._landingView.windowManager, Component).registerUpdateReceiver(this, 10);
    };

    private onCommunityCatalogButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._landingView.getProperty("landing.view.community.catalog.target");
            this._landingView.catalog.openCatalogPage(_loc3_);
            this._landingView.tracking.trackGoogle("landingView", "click_communityCatalogTarget");
        }
    };

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._SafeStr_2250, param1);
    }

    protected get communityProgress(): CommunityGoalData {
        return this._communityProgress;
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }
}
