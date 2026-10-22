import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import type { RewardTrackPrize } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackPrize';
import type { RewardTrackTask } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrackTask';
import type { RewardTrackController } from '@/com/sulake/habbo/quest/rewardtrack/RewardTrackController';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RewardTrackHeaderView } from '@/com/sulake/habbo/quest/rewardtrack/view/header/RewardTrackHeaderView';
import { RewardTrackPrizeTrackView } from '@/com/sulake/habbo/quest/rewardtrack/view/prizes/RewardTrackPrizeTrackView';
import { RewardTrackTaskDetailsView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskDetailsView';
import { RewardTrackTaskListView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskListView';
import { RewardTrackTheme } from '@/com/sulake/habbo/quest/rewardtrack/view/theme/RewardTrackTheme';

export class RewardTrackView implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view::RewardTrackView'); }

    declare private _controller: RewardTrackController;

    declare private _SafeStr_5628: RewardTrack;

    declare private _window: IFrameWindow;

    declare private _SafeStr_14376: IWindowContainer;

    declare private _SafeStr_14377: IWindowContainer;

    declare private _SafeStr_14378: IWindowContainer;

    declare private _taskTemplate: IWindowContainer;

    declare private _SafeStr_3102: IWindowContainer;

    declare private _theme: RewardTrackTheme;

    declare private _headerView: RewardTrackHeaderView;

    declare private _SafeStr_14379: RewardTrackPrizeTrackView;

    declare private _SafeStr_14380: RewardTrackTaskListView;

    declare private _SafeStr_14381: RewardTrackTaskDetailsView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: RewardTrackController, param2: RewardTrack) {
        this._controller = param1;
        this._SafeStr_5628 = param2;
        this._theme = RewardTrackTheme.resolve(this._SafeStr_5628.theme);
        this._window = asGuarded(this._controller.windowManager.buildFromXML(XML.from(this._controller.assets.getAssetByName("reward_track_main_xml").content), 1), isIFrameWindow);
        this._theme.applyTo(this._window);
        this.extractTemplates();
        this._window.enableLookupCache();
        this.closeButton.addEventListener("WME_CLICK", this.onCloseClicked);
    }

    public initialize(): void {
        this._headerView = new RewardTrackHeaderView(this._controller, this.headerContainer, this._SafeStr_5628);
        this._SafeStr_14381 = new RewardTrackTaskDetailsView(this._controller, this.taskInfoContainer, this._SafeStr_3102, this._theme);
        this._SafeStr_14380 = new RewardTrackTaskListView(this._controller, this.taskListContainer, this._taskTemplate, this._SafeStr_14381, this._SafeStr_5628, this._theme);
        this._SafeStr_14379 = new RewardTrackPrizeTrackView(this._controller, this._SafeStr_5628, this.prizeContent, this.pointsIndicator, this.mainLoadingBar, this._SafeStr_14376, this._SafeStr_14377, this._SafeStr_14378, this.previousButton, this.nextButton, this.previousUnclaimedIndicator, this.nextUnclaimedIndicator);
    }

    private extractTemplates(): void {
        this._SafeStr_14376 = asGuarded(this.prizeContent.removeChild(this.prizeContent.findChildByName("prize_template")), isIWindowContainer);
        this._SafeStr_14377 = asGuarded(this.prizeContent.removeChild(this.prizeContent.findChildByName("prize_template_premium")), isIWindowContainer);
        this._SafeStr_14378 = asGuarded(this.pointsIndicator.removeChild(this.pointsIndicator.findChildByName("point_indicator_template")), isIWindowContainer);
        this._taskTemplate = asGuarded(this.tasksList.removeListItemAt(0), isIWindowContainer);
        this._SafeStr_3102 = asGuarded(this.levelsList.removeListItemAt(0), isIWindowContainer);
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        this._headerView.refreshOwnAvatar();
        if (this._window.parent == null) {
            _loc1_ = this._controller.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._window.parent != null) {
            _loc1_ = this._controller.windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public activate(): void {
        this._window.activate();
    }

    public center(): void {
        this._window.center();
    }

    public isShowing(): boolean {
        return this._window.parent != null;
    }

    public get shouldAnimate(): boolean {
        return this.isShowing();
    }

    public taskProgressUpdated(param1: RewardTrackTask, param2: boolean, param3: boolean): void {
        this._headerView.refreshPoints();
        this._SafeStr_14379.pointsUpdated(this.shouldAnimate);
        if (param1 != null) {
            this._SafeStr_14380.taskProgressUpdated(param1, param2, param3, this.shouldAnimate);
        }
    }

    public prizeClaimed(param1: RewardTrackPrize): void {
        this._headerView.refreshRewardsCollected();
        this._SafeStr_14379.prizeClaimed(param1);
    }

    public premiumPurchased(): void {
        this._headerView.refreshPoints();
        this._SafeStr_14380.premiumUpdated();
        this._SafeStr_14379.premiumUpdated(this.shouldAnimate);
    }

    public update(param1: number): void {
        this._SafeStr_14380.update(param1);
        this._SafeStr_14379.update(param1);
    }

    public get location(): Point {
        return new Point(this._window.x, this._window.y);
    }

    public setLocation(param1: Point): void {
        this._window.x = param1.x | 0;
        this._window.y = param1.y | 0;
    }

    private onCloseClicked = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._SafeStr_14379 != null) {
            this._SafeStr_14379.dispose();
        }
        if (this._SafeStr_14380 != null) {
            this._SafeStr_14380.dispose();
        }
        if (this._SafeStr_14381 != null) {
            this._SafeStr_14381.dispose();
        }
        if (this._headerView != null) {
            this._headerView.dispose();
        }
        this.closeButton.removeEventListener("WME_CLICK", this.onCloseClicked);
        this.hide();
        this._SafeStr_14376.dispose();
        this._SafeStr_14377.dispose();
        this._SafeStr_14378.dispose();
        this._taskTemplate.dispose();
        this._SafeStr_3102.dispose();
        this._window.dispose();
        this._SafeStr_14379 = null;
        this._SafeStr_14380 = null;
        this._SafeStr_14381 = null;
        this._headerView = null;
        this._SafeStr_14376 = null;
        this._SafeStr_14377 = null;
        this._SafeStr_14378 = null;
        this._taskTemplate = null;
        this._SafeStr_3102 = null;
        this._window = null;
        this._controller = null;
        this._SafeStr_5628 = null;
        this._theme = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get track(): RewardTrack {
        return this._SafeStr_5628;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get headerContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("header"), isIWindowContainer);
    }

    private get prizeContent(): IWindowContainer {
        return asGuarded(this._window.findChildByName("prize_content"), isIWindowContainer);
    }

    private get pointsIndicator(): IWindowContainer {
        return asGuarded(this._window.findChildByName("points_indicator"), isIWindowContainer);
    }

    private get trackContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("track"), isIWindowContainer);
    }

    private get mainLoadingBar(): IWindowContainer {
        return asGuarded(this.trackContainer.findChildByName("loading_bar"), isIWindowContainer);
    }

    private get previousButton(): IRegionWindow {
        return asGuarded(this._window.findChildByName("previous_btn"), isIRegionWindow);
    }

    private get nextButton(): IRegionWindow {
        return asGuarded(this._window.findChildByName("next_btn"), isIRegionWindow);
    }

    private get previousUnclaimedIndicator(): IWindowContainer {
        return asGuarded(this._window.findChildByName("previous_unclaimed_indicator"), isIWindowContainer);
    }

    private get nextUnclaimedIndicator(): IWindowContainer {
        return asGuarded(this._window.findChildByName("next_unclaimed_indicator"), isIWindowContainer);
    }

    private get taskListContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("task_list"), isIWindowContainer);
    }

    private get taskInfoContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("task_info"), isIWindowContainer);
    }

    private get tasksList(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("tasks"), isIScrollableListWindow);
    }

    private get levelsList(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("levels"), isIScrollableListWindow);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
