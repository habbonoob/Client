import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class RewardTrackHeaderView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.header::RewardTrackHeaderView'); }

    declare private _controller: RewardTrackController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_5628: RewardTrack;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: RewardTrackController, param2: IWindowContainer, param3: RewardTrack) {
        this._controller = param1;
        this._window = param2;
        this._SafeStr_5628 = param3;
        this.initialize();
    }

    private initialize(): void {
        this.refreshOwnAvatar();
        this.trackTitleText.text = this.localize("reward_track." + this._SafeStr_5628.id + ".name");
        this.trackDescText.text = this.localize("reward_track." + this._SafeStr_5628.id + ".desc");
        this.trackInstructionsText.text = this.localize("reward_track." + this._SafeStr_5628.id + ".info");
        this.initializeStaffActions();
        this.refresh();
    }

    private initializeStaffActions(): void {
        this.trackTitleRegion.interactiveCursorDisabled = !this._controller.canCopyDebugIds;
        if (this._controller.canCopyDebugIds) {
            this.trackTitleRegion.addEventListener("WME_CLICK", this.onTrackTitleClicked);
        }
    }

    public refresh(): void {
        this.refreshPoints();
        this.refreshRewardsCollected();
    }

    public refreshOwnAvatar(): void {
        this.ownAvatar.figure = this._controller.questEngine.sessionDataManager.figure;
    }

    public refreshPoints(): void {
        this.pointsTotalCollectedText.text = String(this._SafeStr_5628.points);
    }

    public refreshRewardsCollected(): void {
        this.rewardsCollectedText.text = this._controller.localizationManager.getLocalizationWithParams("reward_track.profile.rewards_collected", "", "progress", this._SafeStr_5628.claimedPrizeCount, "total", this._SafeStr_5628.totalPrizeCount);
    }

    private localize(param1: string): string {
        return this._controller.localizationManager.getLocalization(param1, param1);
    }

    private onTrackTitleClicked = (param1: WindowMouseEvent): void => {
        this._controller.copyTrackId(this._SafeStr_5628.id);
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.trackTitleRegion.removeEventListener("WME_CLICK", this.onTrackTitleClicked);
        this._controller = null;
        this._window = null;
        this._SafeStr_5628 = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get ownAvatar(): IAvatarImageWidget {
        return asGuarded(this.ownAvatarWidget.widget, isIAvatarImageWidget);
    }

    private get ownAvatarWidget(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("own_avatar"), isIWidgetWindow);
    }

    private get trackTitleText(): ITextWindow {
        return asGuarded(this._window.findChildByName("track_title_txt"), isITextWindow);
    }

    private get trackTitleRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("track_title_region"), isIRegionWindow);
    }

    private get trackDescText(): ITextWindow {
        return asGuarded(this._window.findChildByName("track_desc_txt"), isITextWindow);
    }

    private get trackInstructionsText(): ITextWindow {
        return asGuarded(this._window.findChildByName("track_instructions_txt"), isITextWindow);
    }

    private get pointsTotalCollectedText(): ITextWindow {
        return asGuarded(this._window.findChildByName("points_total_collected_txt"), isITextWindow);
    }

    private get rewardsCollectedText(): ITextWindow {
        return asGuarded(this._window.findChildByName("rewards_collected_txt"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
