import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { clearTimeout } from '@habbo-pixi/runtime/utils/clearTimeout';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetQuestMessageComposer';
import { StartCampaignMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/StartCampaignMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ProgressBar } from '@/com/sulake/habbo/quest/ProgressBar';

export class QuestTracker implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::QuestTracker'); }

    private static readonly TRACKER_ANIMATION_STATUS_NONE: number = 0;
    private static readonly TRACKER_ANIMATION_STATUS_SLIDE_IN: number = 1;
    private static readonly TRACKER_ANIMATION_STATUS_SLIDE_OUT: number = 2;
    private static readonly TRACKER_ANIMATION_STATUS_COMPLETED_ANIMATION: number = 3;
    private static readonly TRACKER_ANIMATION_STATUS_PROGRESS_NUDGE: number = 4;
    private static readonly TRACKER_ANIMATION_STATUS_CLOSE_WAIT: number = 5;
    private static readonly TRACKER_ANIMATION_STATUS_PROMPT_ANIMATION: number = 6;
    private static readonly MAX_SUCCESS_FRAME: number = 6;
    private static readonly PROMPT_SEQUENCE_REPEATS: number = 4;
    private static readonly PROMPT_SEQUENCE_REPEATS_QUEST_OPEN: number = 2;
    private static readonly PROMPT_FRAME_LENGTH_IN_MSECS: number = 200;
    private static readonly PROMPT_DELAY_IN_MSECS: number = 10000;
    private static readonly PROMPT_DELAY_ON_QUEST_OPEN_IN_MSECS: number = 0;
    private static readonly NO_PROMPT_DELAY: number = -1;
    private static readonly PROGRESS_BAR_WIDTH: number = 162;
    private static readonly TRACKER_SLIDE_IN_SPEED: number = 0.01;
    private static readonly TRACKER_SLIDE_OUT_SPEED: number = 100;
    private static readonly COMPLETION_CLOSE_DELAY_IN_MSECS: number = 1000;
    private static readonly TOOLBAR_EXTENSION_ID_PREFIX: string = "quest_tracker_";
    private static readonly _SafeStr_7912: number = 10;
    private static _SafeStr_5827: number = 0;
    private static readonly NUDGE_OFFSETS: any[] = [-2, -3, -2, 0, 2, 3, 2, 0, 2, 1, 0, 1];
    private static readonly _SafeStr_5799: any[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 4];
    private static readonly PROMPT_FRAMES: any[] = ["a", "b", "c", "d"];
    private static readonly PROGRESS_BAR_LOC: Point = new Point(10, 87);

    declare private _questEngine: HabboQuestEngine;

    declare private _SafeStr_2322: QuestMessageData;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2783: Timer;

    declare private _SafeStr_3381: ProgressBar;

    private _trackerAnimationStatus: number = 0;
    private _SafeStr_3531: number = 0;
    private _remainingWait: number = 0;
    private _successFrame: number = -1;
    private _msecsUntilPrompt: number = -1;
    private _promptFrame: number = -1;

    declare private _msecsUntilNextPromptFrame: number;
    static { (this.prototype as any)._msecsUntilNextPromptFrame = 0; }

    declare private _SafeStr_4744: number;
    static { (this.prototype as any)._SafeStr_4744 = 0; }

    declare private _SafeStr_6201: boolean;
    static { (this.prototype as any)._SafeStr_6201 = false; }

    declare private _getNextQuestWhenCompletionAnimationFinishes: boolean;
    static { (this.prototype as any)._getNextQuestWhenCompletionAnimationFinishes = false; }

    private _SafeStr_3480: boolean = false;
    private _SafeStr_4486: number = 4294967295;

    declare private _SafeStr_5074: number;
    static { (this.prototype as any)._SafeStr_5074 = 0; }

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
        this._SafeStr_5074 = QuestTracker._SafeStr_5827;
        QuestTracker._SafeStr_5827 += 1;
    }

    public dispose(): void {
        if (this._questEngine) {
            this._questEngine.toolbar.extensionView.detachExtension("quest_tracker_" + this._SafeStr_5074);
        }
        this._questEngine = null;
        this._SafeStr_2322 = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2783) {
            this._SafeStr_2783.stop();
            this._SafeStr_2783 = null;
        }
        if (this._SafeStr_3381) {
            this._SafeStr_3381.dispose();
            this._SafeStr_3381 = null;
        }
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public onQuestCompleted(param1: QuestMessageData, param2: boolean): void {
        if (this._window) {
            this.clearPrompt();
            this._SafeStr_2322 = param1;
            this._SafeStr_3531 = 0;
            this.refreshTrackerDetails();
            this._successFrame = 0;
            this._trackerAnimationStatus = 3;
            this._getNextQuestWhenCompletionAnimationFinishes = !param2;
        }
    }

    public onQuestCancelled(): void {
        this._SafeStr_2322 = null;
        if (this._window) {
            this.clearPrompt();
            this._SafeStr_3381.refresh(0, 100, -1, 0);
            this._trackerAnimationStatus = 2;
        }
    }

    public startDefaultCampaign(param1: string): void {
        let _loc2_: number = 0;
        let _loc3_: boolean = this._questEngine.getInteger("new.identity", 0) > 0;
        if (!_loc3_) {
            return;
        }
        if (this._SafeStr_2783 == null && _loc3_ && param1 != "") {
            _loc2_ = this._questEngine.getInteger("questing.startQuestDelayInSeconds", 30);
            this._SafeStr_2783 = new Timer(_loc2_ * 1000, 1);
            this._SafeStr_2783.addEventListener("timer", this.onStartQuestTimer);
            this._SafeStr_2783.start();
            Logger.log("Initialized start quest timer with period: " + _loc2_);
        }
    }

    public onRoomExit(): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this._window.findChildByName("more_info_txt").visible = false;
            this._window.findChildByName("more_info_region").visible = false;
        }
    }

    public onQuest(param1: QuestMessageData): void {
        if (this._SafeStr_2783 != null) {
            this._SafeStr_2783.stop();
        }
        if (this._SafeStr_4486 != 4294967295) {
            clearTimeout(this._SafeStr_4486);
            this._SafeStr_4486 = 4294967295;
        }
        let _loc2_: boolean = !!(this._window && this._window.visible);
        if (param1.waitPeriodSeconds > 0) {
            if (_loc2_) {
                this.setWindowVisible(false);
            }
            return;
        }
        this._SafeStr_2322 = param1;
        this.prepareTrackerWindow();
        this.refreshTrackerDetails();
        this.refreshPromptFrames();
        this.setWindowVisible(true);
        this.hideSuccessFrames();
        if (_loc2_) {
            if (this._trackerAnimationStatus == 2) {
                this._trackerAnimationStatus = 1;
            }
            this.setupPrompt(this._msecsUntilPrompt, 4, false);
        } else {
            this._window.x = this.getOutScreenLocationX();
            this._trackerAnimationStatus = 1;
            this.setupPrompt(0, 2, false);
        }
    }

    private refreshPromptFrames(): void {
        let _loc1_: number = 0;
        if (!this._questEngine.isQuestWithPrompts(this._SafeStr_2322)) {
            return;
        }
        _loc1_ = 0;
        while (_loc1_ < QuestTracker.PROMPT_FRAMES.length) {
            this._questEngine.setupPromptFrameImage(this._window, this._SafeStr_2322, stringOrNull(QuestTracker.PROMPT_FRAMES[_loc1_]));
            _loc1_++;
        }
    }

    private prepareTrackerWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._questEngine.getXmlWindow("QuestTracker"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.findChildByName("more_info_region").procedure = this.onMoreInfo;
        this.hideSuccessFrames();
        this._SafeStr_3381 = new ProgressBar(this._questEngine, castGuarded(this._window.findChildByName("content_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), 162, "quests.tracker.progress", false, QuestTracker.PROGRESS_BAR_LOC);
    }

    private hideSuccessFrames(): void {
        let _loc1_: number = 0;
        _loc1_ = 1;
        while (_loc1_ <= 6) {
            this.getSuccessFrame(_loc1_).visible = false;
            _loc1_++;
        }
    }

    private hidePromptFrames(): void {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < QuestTracker.PROMPT_FRAMES.length) {
            this.getPromptFrame(stringOrNull(QuestTracker.PROMPT_FRAMES[_loc1_])).visible = false;
            _loc1_++;
        }
    }

    private getSuccessFrame(param1: number): IWindow {
        return this._window.findChildByName("success_pic_" + param1);
    }

    private getPromptFrame(param1: string): IWindow {
        return this._window.findChildByName("prompt_pic_" + param1);
    }

    private refreshTrackerDetails(): void {
        this._window.findChildByName("quest_header_txt").caption = this._questEngine.localization.getLocalizationWithParams("quests.tracker.caption", "", "quest_name", this._questEngine.getQuestName(this._SafeStr_2322));
        this._window.findChildByName("desc_txt").caption = this._questEngine.getQuestDesc(this._SafeStr_2322);
        this._window.findChildByName("more_info_txt").visible = this._questEngine.currentlyInRoom;
        this._window.findChildByName("more_info_region").visible = this._questEngine.currentlyInRoom;
        let _loc1_: number = Math.ceil(100 * this._SafeStr_2322.completedSteps / this._SafeStr_2322.totalSteps) | 0;
        this._SafeStr_3381.refresh(_loc1_, 100, this._SafeStr_2322.id, 0);
        this._questEngine.setupQuestImage(this._window, this._SafeStr_2322);
    }

    private onMoreInfo = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.questController.questDetails.showDetails(this._SafeStr_2322);
        }
    };

    public forceWindowCloseAfterAnimationsFinished(): void {
        if (this._trackerAnimationStatus == 0) {
            this.setWindowVisible(false);
            this._SafeStr_3480 = false;
        } else {
            this._SafeStr_3480 = true;
        }
    }

    public update(param1: number): void {
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        if (this._window == null) {
            return;
        }
        this._SafeStr_3381.updateView(param1);
        switch (this._trackerAnimationStatus) {
            case 0:
                if (this._msecsUntilPrompt != -1) {
                    this._msecsUntilPrompt -= param1;
                    if (this._msecsUntilPrompt < 0) {
                        this._msecsUntilPrompt = -1;
                        if (this._SafeStr_2322 != null && this._questEngine.isQuestWithPrompts(this._SafeStr_2322)) {
                            if (this._SafeStr_6201) {
                                this.startNudge();
                                break;
                            }
                            this._trackerAnimationStatus = 6;
                            this._promptFrame = 0;
                            this._msecsUntilNextPromptFrame = 200;
                        }
                    }
                }
                break;
            case 1:
                _loc4_ = this.getDefaultLocationX();
                _loc2_ = this._window.x - _loc4_;
                if (_loc2_ > 0) {
                    _loc3_ = Math.max(1, Math.round(_loc2_ * param1 * 0.01)) | 0;
                    this._window.x -= _loc3_;
                } else {
                    this._trackerAnimationStatus = 0;
                    this._window.x = _loc4_;
                }
                break;
            case 2:
                _loc4_ = this.getOutScreenLocationX();
                _loc2_ = this._window.width - this._window.x;
                if (_loc2_ > 0) {
                    _loc3_ = Math.max(1, Math.round(param1 * 100 / _loc2_)) | 0;
                    this._window.x += _loc3_;
                } else {
                    this._trackerAnimationStatus = 0;
                    this._window.x = _loc4_;
                    this.setWindowVisible(false);
                }
                break;
            case 3:
                this.hideSuccessFrames();
                this.getSuccessFrame(QuestTracker._SafeStr_5799[this._successFrame] | 0).visible = true;
                this._successFrame = this._successFrame + 1;
                if (this._successFrame >= QuestTracker._SafeStr_5799.length) {
                    this._trackerAnimationStatus = 5;
                    this._remainingWait = 1000;
                }
                break;
            case 4:
                if (this._SafeStr_3531 >= QuestTracker.NUDGE_OFFSETS.length - 1) {
                    this._window.x = this.getDefaultLocationX();
                    this._trackerAnimationStatus = 0;
                    this.setupPrompt(10000, 2, false);
                } else {
                    this._window.x = this.getDefaultLocationX() + QuestTracker.NUDGE_OFFSETS[this._SafeStr_3531] | 0;
                    this._SafeStr_3531 = this._SafeStr_3531 + 1;
                }
                break;
            case 5:
                this._remainingWait -= param1;
                if (this._remainingWait < 0) {
                    this._trackerAnimationStatus = 0;
                    if (this._getNextQuestWhenCompletionAnimationFinishes && !this._SafeStr_3480) {
                        this._SafeStr_4486 = setTimeout(this.onNewQuestNotReceived, 600);
                        this._questEngine.send(new GetQuestMessageComposer());
                    } else {
                        this.setWindowVisible(false);
                        this._SafeStr_3480 = false;
                    }
                }
                break;
            case 6:
                this.setQuestImageVisible(false);
                this.hidePromptFrames();
                this._msecsUntilNextPromptFrame -= param1;
                this.getPromptFrame(stringOrNull(QuestTracker.PROMPT_FRAMES[this._promptFrame])).visible = true;
                if (this._msecsUntilNextPromptFrame < 0) {
                    this._msecsUntilNextPromptFrame = 200;
                    this._promptFrame = this._promptFrame + 1;
                    if (this._promptFrame >= QuestTracker.PROMPT_FRAMES.length) {
                        this._promptFrame = 0;
                        this._SafeStr_4744 = this._SafeStr_4744 - 1;
                        if (this._SafeStr_4744 < 1) {
                            this.setupPrompt(10000, 2, true);
                            this._trackerAnimationStatus = 0;
                        }
                    }
                }
        }
    }

    private onNewQuestNotReceived = (): void => {
        this.setWindowVisible(false);
        this._SafeStr_3480 = false;
    };

    private getDefaultLocationX(): number {
        return 0;
    }

    private getOutScreenLocationX(): number {
        return this._window.width + 10;
    }

    private onStartQuestTimer = (param1: TimerEvent): void => {
        if (this.hasBlockingWindow()) {
            Logger.log("Quest start blocked. Waiting some more");
            this._SafeStr_2783.reset();
            this._SafeStr_2783.start();
        } else {
            this._questEngine.questController.questDetails.openForNextQuest = this._questEngine.getBoolean("questing.showDetailsForNextQuest");
            this._questEngine.send(new StartCampaignMessageComposer(this._questEngine.questController.getDefaultCampaign()));
        }
    };

    private hasBlockingWindow(): boolean {
        let _loc2_: number = 0;
        let _loc1_: IDesktopWindow = null;
        _loc2_ = 0;
        while (_loc2_ <= 2) {
            _loc1_ = this._questEngine.windowManager.getDesktop(_loc2_ >>> 0);
            if (_loc1_ != null && this.hasBlockingWindowInLayer(_loc1_)) {
                return true;
            }
            _loc2_++;
        }
        return false;
    }

    private hasBlockingWindowInLayer(param1: IWindowContainer): boolean {
        let _loc3_: number = 0;
        let _loc2_: IWindow = null;
        while (_loc3_ < param1.numChildren) {
            _loc2_ = param1.getChildAt(_loc3_);
            if (_loc2_ != null && _loc2_.visible) {
                if ((isIFrameWindow(_loc2_) ? _loc2_ : null) != null) {
                    if (_loc2_.name != "mod_start_panel" && _loc2_.name != "_frame") {
                        return true;
                    }
                } else if (_loc2_.name == "welcome_screen") {
                    return true;
                }
            }
            _loc3_++;
        }
        return false;
    }

    private setQuestImageVisible(param1: boolean): void {
        this._window.findChildByName("quest_pic_bitmap").visible = param1;
    }

    private clearPrompt(): void {
        this.setupPrompt(-1, 0, false);
    }

    private setupPrompt(param1: number, param2: number, param3: boolean): void {
        this.setQuestImageVisible(true);
        this.hidePromptFrames();
        this._msecsUntilPrompt = param1;
        this._SafeStr_4744 = param2;
        this._SafeStr_6201 = param3;
    }

    private startNudge(): void {
        this._SafeStr_3531 = 0;
        this._trackerAnimationStatus = 4;
    }

    private setWindowVisible(param1: boolean): void {
        this._window.visible = param1;
        if (!param1) {
            this._questEngine.toolbar.extensionView.detachExtension("quest_tracker_" + this._SafeStr_5074);
        } else {
            this._questEngine.toolbar.extensionView.attachExtension("quest_tracker_" + this._SafeStr_5074, this._window);
        }
    }

    public get campaignChainCode(): string {
        if (this._SafeStr_2322 == null) {
            return null;
        }
        return this._SafeStr_2322.campaignChainCode;
    }

    public get canBeDisposed(): boolean {
        if (this._SafeStr_2322 == null) {
            return true;
        }
        if (this._window && !this._window.visible && this._trackerAnimationStatus == 0) {
            return true;
        }
        return false;
    }

    get [IDisposable](): true {
        return true;
    }
}
