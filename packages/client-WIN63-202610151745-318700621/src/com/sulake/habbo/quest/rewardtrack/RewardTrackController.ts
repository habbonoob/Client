import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { RewardTrackClaimResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTrackClaimResultMessageParser';
import type { RewardTrackPremiumPurchaseResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTrackPremiumPurchaseResultMessageParser';
import type { RewardTrackProgressMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTrackProgressMessageParser';
import type { RewardTracksMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTracksMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { RewardTrackPrize } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackPrize';
import type { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';
import type { IRewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/IRewardTrackController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Clipboard } from '@habbo-pixi/runtime/desktop/Clipboard';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RewardTrackClaimResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/rewardtrack/RewardTrackClaimResultMessageEvent';
import { RewardTrackPremiumPurchaseResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/rewardtrack/RewardTrackPremiumPurchaseResultMessageEvent';
import { RewardTrackProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/rewardtrack/RewardTrackProgressMessageEvent';
import { RewardTracksMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/rewardtrack/RewardTracksMessageEvent';
import { ClaimRewardTrackPrizeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/rewardtrack/ClaimRewardTrackPrizeMessageComposer';
import { PurchaseRewardTrackPremiumMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/rewardtrack/PurchaseRewardTrackPremiumMessageComposer';
import { UnseenRewardTrackRewardsCountUpdateEvent } from '@/com/sulake/habbo/quest/events/UnseenRewardTrackRewardsCountUpdateEvent';
import { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import { RewardTrackPremiumPurchaseConfirmationView } from '@/com/sulake/habbo/quest/rewardtrack/view/premium/RewardTrackPremiumPurchaseConfirmationView';
import { RewardTrackView } from '@/com/sulake/habbo/quest/rewardtrack/view/RewardTrackView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

export class RewardTrackController extends Component implements ILinkEventTracker, IRewardTrackController, IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack::RewardTrackController'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private static readonly FREE_CLAIM_NOTIFICATION_ICON: string = "reward_track_free_track";
    private static readonly PREMIUM_CLAIM_NOTIFICATION_ICON: string = "reward_track_premium_track";

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _questEngine: HabboQuestEngine;

    declare private _SafeStr_14071: RewardTrack[];

    declare private _SafeStr_14960: Map<any, any>;

    declare private _SafeStr_14961: RewardTrackView;

    declare private _SafeStr_14962: RewardTrackPremiumPurchaseConfirmationView;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_14963: number;

    declare private _disposed_RewardTrackController: boolean;

    constructor(param1: HabboQuestEngine, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._questEngine = param1;
        this._SafeStr_14071 = [];
        this._SafeStr_14960 = new Dictionary();
        this._messageEvents = [];
        this._messageEvents.push(new RewardTracksMessageEvent(this.onRewardTracks));
        this._messageEvents.push(new RewardTrackClaimResultMessageEvent(this.onRewardTrackClaimResult));
        this._messageEvents.push(new RewardTrackProgressMessageEvent(this.onRewardTrackProgress));
        this._messageEvents.push(new RewardTrackPremiumPurchaseResultMessageEvent(this.onRewardTrackPremiumPurchaseResult));
        for (const _loc5_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc5_);
        }
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         })]);
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
    }

    public get linkPattern(): string {
        return "reward_track/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length >= 3 && _loc2_[1] == "open") {
            this.openRewardTrack(stringOrNull(_loc2_[2]));
        }
    }

    public openRewardTrack(param1: string): void {
        let _loc4_: RewardTrack = this.getTrackById(param1);
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: Point = null;
        if (this._SafeStr_14961 != null && !this._SafeStr_14961.disposed) {
            _loc3_ = this._SafeStr_14961.location;
            this._SafeStr_14961.hide();
        }
        let _loc2_: RewardTrackView = asInstanceOf(this._SafeStr_14960.get(param1), RewardTrackView);
        if (_loc2_ == null || _loc2_.disposed) {
            _loc2_ = new RewardTrackView(this, _loc4_);
            this._SafeStr_14960.set(param1, _loc2_);
            _loc2_.initialize();
            _loc2_.center();
        }
        if (_loc3_ != null) {
            _loc2_.setLocation(_loc3_);
        }
        _loc2_.show();
        _loc2_.activate();
        this._SafeStr_14961 = _loc2_;
    }

    public claimPrize(param1: string, param2: string): void {
        this.send(new ClaimRewardTrackPrizeMessageComposer(param1, param2));
    }

    public purchasePremium(param1: string): void {
        this.send(new PurchaseRewardTrackPremiumMessageComposer(param1));
    }

    public getTaskIconAssetName(param1: RewardTrackTask): string {
        let _loc2_: string = "reward_track_tasks_" + param1.track.id + "_" + param1.id;
        if (this._windowManager.assets.hasAsset(_loc2_)) {
            return _loc2_;
        }
        return "reward_track_tasks_" + param1.actionType.toLowerCase();
    }

    public get canCopyDebugIds(): boolean {
        return this._questEngine.sessionDataManager.hasSecurity(4) || this._questEngine.sessionDataManager.hasSecurity(5);
    }

    public copyTrackId(param1: string): void {
        this.copyDebugId(param1, "${reward_track.debug.copy_track_id.success}");
    }

    public copyTaskId(param1: string): void {
        this.copyDebugId(param1, "${reward_track.debug.copy_task_id.success}");
    }

    public openPremiumPurchaseConfirmation(param1: RewardTrack): void {
        this.closePremiumPurchaseConfirmation();
        this._SafeStr_14962 = new RewardTrackPremiumPurchaseConfirmationView(this, param1);
        this._SafeStr_14962.show();
    }

    public closePremiumPurchaseConfirmation(): void {
        if (this._SafeStr_14962 != null) {
            this._SafeStr_14962.dispose();
            this._SafeStr_14962 = null;
        }
    }

    private onRewardTracks(param1: RewardTracksMessageEvent): void {
        let _loc2_: RewardTracksMessageParser = param1.getParser();
        let _loc3_: boolean = this._SafeStr_14961 != null && !this._SafeStr_14961.disposed && this._SafeStr_14961.isShowing();
        let _loc4_: boolean = this._SafeStr_14071.length > 0;
        if (_loc2_.reload || _loc2_.disabled || _loc4_) {
            this.disposeCachedViews();
            this.closePremiumPurchaseConfirmation();
        }
        this._SafeStr_14071 = [];
        if (!_loc2_.disabled) {
            for (const _loc5_ of _loc2_.tracks ?? []) {
                this._SafeStr_14071.push(new RewardTrack(_loc5_));
            }
        }
        if (_loc2_.reload && _loc3_) {
            this._windowManager.alert(this._localizationManager.getLocalization("reward_track.reload.title", "reward_track.reload.title"), this._localizationManager.getLocalization("reward_track.reload.desc", "reward_track.reload.desc"), 0, null);
        }
        this.broadcastClaimableRewardsCount();
    }

    private onRewardTrackProgress(param1: RewardTrackProgressMessageEvent): void {
        let _loc5_: RewardTrackProgressMessageParser = param1.getParser();
        let _loc6_: RewardTrack = this.getTrackById(_loc5_.trackId);
        if (_loc6_ == null) {
            return;
        }
        let _loc4_: RewardTrackTask = _loc6_.getTaskById(_loc5_.taskId);
        let _loc7_: boolean = _loc4_ != null && _loc4_.hasProgress;
        let _loc2_: boolean = _loc4_ != null && _loc4_.isComplete;
        let _loc3_: number = _loc5_.points - _loc6_.points;
        _loc4_ = _loc6_.updateProgress(_loc5_.taskId, _loc5_.progressCount, _loc5_.points);
        this.updateProgressViews(_loc6_, _loc4_, _loc7_, _loc2_);
        this.broadcastClaimableRewardsCount(false);
        if (_loc4_ != null && _loc3_ > 0) {
            this.showNotification(this._localizationManager.getLocalizationWithParams("reward_track.task.notification.completed", "", "points", _loc3_), this.getTaskIconAssetName(_loc4_), "reward_track/open/" + _loc6_.id);
        }
    }

    private onRewardTrackClaimResult(param1: RewardTrackClaimResultMessageEvent): void {
        let _loc2_: RewardTrackClaimResultMessageParser = param1.getParser();
        if (_loc2_.resultCode != 0) {
            this.showNotification(this.localizeResult("reward_track.claim.notification.fail.", _loc2_.resultCode));
            return;
        }
        let _loc3_: RewardTrack = this.getTrackById(_loc2_.trackId);
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: RewardTrackPrize = _loc3_.markPrizeClaimed(_loc2_.rewardId);
        this.updatePrizeClaimViews(_loc3_, _loc4_);
        this.broadcastClaimableRewardsCount();
        this.showClaimSuccessNotification(_loc4_);
    }

    private onRewardTrackPremiumPurchaseResult(param1: RewardTrackPremiumPurchaseResultMessageEvent): void {
        let _loc2_: RewardTrackPremiumPurchaseResultMessageParser = param1.getParser();
        if (_loc2_.resultCode != 0) {
            this.showNotification(this.localizeResult("reward_track.premium.notification.fail.", _loc2_.resultCode));
            if (this._SafeStr_14962 != null && !this._SafeStr_14962.disposed) {
                this._SafeStr_14962.purchaseFailed();
            }
            return;
        }
        let _loc3_: RewardTrack = this.getTrackById(_loc2_.trackId);
        if (_loc3_ == null) {
            this.closePremiumPurchaseConfirmation();
            return;
        }
        _loc3_.markPremiumPurchased(_loc2_.points);
        this.updatePremiumPurchaseViews(_loc3_);
        this.broadcastClaimableRewardsCount();
        this.closePremiumPurchaseConfirmation();
        this.showNotification("${reward_track.premium.notification.success}");
    }

    private broadcastClaimableRewardsCount(param1: boolean = true): void {
        let _loc6_: any;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: UtilsMap = new UtilsMap();
        for (const _loc5_ of this._SafeStr_14071 ?? []) {
            _loc2_ = 0;
            for (_loc6_ of _loc5_.prizes ?? []) {
                if (_loc6_.isClaimable(_loc5_)) {
                    _loc2_ += 1;
                }
            }
            _loc3_.add(_loc5_.id, _loc2_);
            _loc4_ += _loc2_;
        }
        if (!param1 && _loc4_ == this._SafeStr_14963) {
            return;
        }
        this._SafeStr_14963 = _loc4_;
        this._questEngine.events.dispatchEvent(new UnseenRewardTrackRewardsCountUpdateEvent(_loc4_, _loc3_));
    }

    private localizeResult(param1: string, param2: number): string {
        let _loc3_: string = param1 + param2;
        return this._localizationManager.getLocalization(_loc3_, _loc3_);
    }

    private showClaimSuccessNotification(param1: RewardTrackPrize): void {
        this.showNotification("${reward_track.claim.notification.success}", param1 != null && param1.premium ? "reward_track_premium_track" : "reward_track_free_track");
    }

    private showNotification(param1: string, param2: string = null, param3: string = null): void {
        let _loc4_: BitmapData = null;
        if (this._questEngine.notifications != null) {
            if (param2 == null || !this._windowManager.assets.hasAsset(param2)) {
                this._questEngine.notifications.addItem(param1, "info", null, param3);
            } else {
                _loc4_ = (asInstanceOf(this._windowManager.assets.getAssetByName(param2).content, BitmapData)).clone();
                this._questEngine.notifications.addItemWithBitmap(param1, "info", _loc4_, param3);
            }
        }
    }

    private copyDebugId(param1: string, param2: string): void {
        if (!this.canCopyDebugIds) {
            return;
        }
        Clipboard.generalClipboard.clear();
        Clipboard.generalClipboard.setData("air:text", param1);
        this.showNotification(param2);
    }

    private updateProgressViews(param1: RewardTrack, param2: RewardTrackTask, param3: boolean, param4: boolean): void {
        let _loc5_: RewardTrackView = this.getTrackView(param1);
        if (_loc5_ != null) {
            _loc5_.taskProgressUpdated(param2, param3, param4);
        }
    }

    private updatePrizeClaimViews(param1: RewardTrack, param2: RewardTrackPrize): void {
        let _loc3_: RewardTrackView = this.getTrackView(param1);
        if (_loc3_ != null) {
            _loc3_.prizeClaimed(param2);
        }
    }

    private updatePremiumPurchaseViews(param1: RewardTrack): void {
        let _loc2_: RewardTrackView = this.getTrackView(param1);
        if (_loc2_ != null) {
            _loc2_.premiumPurchased();
        }
    }

    private getTrackView(param1: RewardTrack): RewardTrackView {
        let _loc2_: RewardTrackView = asInstanceOf(this._SafeStr_14960.get(param1.id), RewardTrackView);
        if (_loc2_ != null && !_loc2_.disposed && _loc2_.track == param1) {
            return _loc2_;
        }
        return null;
    }

    private disposeCachedViews(): void {
        for (const _loc1_ of this._SafeStr_14960?.values() ?? []) {
            if (_loc1_ != null && !_loc1_.disposed) {
                _loc1_.dispose();
            }
        }
        this._SafeStr_14960 = new Dictionary();
        this._SafeStr_14961 = null;
    }

    public update(param1: number): void {
        for (const _loc2_ of this._SafeStr_14960?.values() ?? []) {
            if (_loc2_ != null && !_loc2_.disposed) {
                _loc2_.update(param1);
            }
        }
    }

    public getTrackById(param1: string): RewardTrack {
        for (const _loc2_ of this._SafeStr_14071 ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public isRewardTrackComplete(param1: string): boolean {
        let _loc2_: RewardTrack = this.getTrackById(param1);
        return _loc2_ != null && _loc2_.complete;
    }

    public hasRewardTrack(param1: string): boolean {
        return this.getTrackById(param1) != null;
    }

    public send(param1: IMessageComposer): void {
        this._communicationManager.connection.send(param1);
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    public override dispose(): void {
        if (this._disposed_RewardTrackController) {
            return;
        }
        this._disposed_RewardTrackController = true;
        this.context.removeLinkEventTracker(this);
        this.closePremiumPurchaseConfirmation();
        this.disposeCachedViews();
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._SafeStr_14071 = null;
        this._communicationManager = null;
        this._windowManager = null;
        this._localizationManager = null;
        this._questEngine = null;
        super.dispose();
    }

    public override get disposed(): boolean {
        return this._disposed_RewardTrackController;
    }

    public get tracks(): RewardTrack[] {
        return this._SafeStr_14071;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get questEngine(): HabboQuestEngine {
        return this._questEngine;
    }

    protected override initInstanceFields(): void {
        this.onRewardTracks = this.onRewardTracks.bind(this);
        this.onRewardTrackProgress = this.onRewardTrackProgress.bind(this);
        this.onRewardTrackClaimResult = this.onRewardTrackClaimResult.bind(this);
        this.onRewardTrackPremiumPurchaseResult = this.onRewardTrackPremiumPurchaseResult.bind(this);
        this._SafeStr_14963 = -1;
        this._disposed_RewardTrackController = false;
        super.initInstanceFields();
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
