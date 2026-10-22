import { asGuarded, asInstanceOf, isInt, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetWordQuizUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetWordQuizUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WordQuizWidgetHandler } from '@/com/sulake/habbo/ui/handler/WordQuizWidgetHandler';
import { RoomWidgetPollMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPollMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { WordQuizView } from '@/com/sulake/habbo/ui/widget/wordquiz/WordQuizView';

export class WordQuizWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.wordquiz::WordQuizWidget'); }

    private static readonly ASSET_NAME_LIKE: string = "wordquiz_like_xml";
    private static readonly ASSET_NAME_DISLIKE: string = "wordquiz_unlike_xml";
    private static readonly SIGN_FADE_IN_TIME: number = 750;
    private static readonly SIGN_FADE_OUT_TIME: number = 750;
    private static readonly UPDATE_FREQUENCY: number = 40;
    public static readonly VALUE_KEY_DISLIKE: string = "0";
    public static readonly VALUE_KEY_LIKE: string = "1";

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        // AS3 passed its own handler here, before RoomWidgetBase had set it: null
        super(null, param2, param3, param4);
        this._SafeStr_2143 = param1;
        this._view = new WordQuizView(this);
        this._showResultTime = this.handler.container.config.getInteger("poll.word.quiz.answer.bubble.seconds", 3) * 1000;
    }

    declare private _view: WordQuizView;

    declare private _SafeStr_5654: Timer;

    declare private _SafeStr_2810: Timer;

    declare private _SafeStr_2498: Timer;

    private _SafeStr_6240: number = 0;

    declare private _showResultTime: number;
    static { (this.prototype as any)._showResultTime = 0; }

    private _countdown: number = 0;

    declare private _pollId: number;
    static { (this.prototype as any)._pollId = 0; }

    declare private _question: Map<any, any>;

    declare private _SafeStr_7428: number;
    static { (this.prototype as any)._SafeStr_7428 = 0; }

    private _showSignCounters: Map<any, any> = new Dictionary();
    private _answerWindows: IWindowContainer[] = new Array<IWindowContainer>(0).fill(null);
    private _SafeStr_4595: IWindowContainer[] = new Array<IWindowContainer>(0).fill(null);
    private _SafeStr_4313: IWindowContainer[] = new Array<IWindowContainer>(0).fill(null);

    declare private _SafeStr_5144: boolean;
    static { (this.prototype as any)._SafeStr_5144 = false; }

    public override get mainWindow(): IWindow {
        return this._view ? this._view.mainWindow : null;
    }

    public get handler(): WordQuizWidgetHandler {
        return this._SafeStr_2143 instanceof WordQuizWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWPUW_NEW_QUESTION", this.newQuestion);
        param1.addEventListener("RWPUW_QUESTION_ANSWERED", this.answeredQuestion);
        param1.addEventListener("RWPUW_QUESION_FINSIHED", this.questionFinished);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWPUW_NEW_QUESTION", this.newQuestion);
        param1.removeEventListener("RWPUW_QUESTION_ANSWERED", this.answeredQuestion);
        param1.removeEventListener("RWPUW_QUESION_FINSIHED", this.questionFinished);
        super.unregisterUpdateEvents(param1);
    }

    public override dispose(): void {
        let _loc2_: IWindowContainer = null;
        let _loc1_: number = 0;
        if (this.disposed) {
            return;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        if (this._SafeStr_5654) {
            this._SafeStr_5654.reset();
            this._SafeStr_5654 = null;
        }
        if (this._SafeStr_2810) {
            this._SafeStr_2810.reset();
            this._SafeStr_2810 = null;
        }
        if (this._SafeStr_2498) {
            this._SafeStr_2498.reset();
            this._SafeStr_2498 = null;
        }
        if (this.windowManager) {
            if (this._answerWindows) {
                _loc1_ = 0;
                while (_loc1_ < this._answerWindows.length) {
                    _loc2_ = asGuarded(this._answerWindows[_loc1_], isIWindowContainer);
                    if (_loc2_) {
                        this.windowManager.removeWindow(_loc2_.name);
                    }
                    _loc1_++;
                }
            }
            for (_loc2_ of this._SafeStr_4595 ?? []) {
                _loc2_.destroy();
            }
            this._SafeStr_4595.length = 0;
            for (_loc2_ of this._SafeStr_4313 ?? []) {
                _loc2_.destroy();
            }
            this._SafeStr_4313.length = 0;
        }
        super.dispose();
    }

    public sendAnswer(param1: number): void {
        this._view.removeWindow();
        if (this._SafeStr_5144) {
            return;
        }
        let _loc3_: RoomWidgetPollMessage = new RoomWidgetPollMessage("RWPM_ANSWER", this._pollId);
        _loc3_.questionId = asGuarded(this._question.get("id"), isInt);
        let _loc2_: any[] = [];
        _loc2_.push("" + param1);
        _loc3_.answers = _loc2_;
        this.messageListener.processWidgetMessage(_loc3_);
        this._SafeStr_5144 = true;
        this._view.createWindow(1);
    }

    private poolWindow(param1: string): void {
        if (this.windowManager == null) {
            return;
        }
        this.windowManager.removeWindow(param1);
    }

    private handleSignWindowVisibility(param1: IWindowContainer): void {
        let _loc5_: number = NaN;
        let _loc4_: number = 0;
        let _loc2_: IBorderWindow = asGuarded(param1.getChildByName("colored"), isIBorderWindow);
        let _loc3_: IRegionWindow = asGuarded(param1.getChildByName("button_like"), isIRegionWindow);
        if (this._showSignCounters.has(param1.name) && _loc2_ && _loc3_) {
            _loc4_ = this._showSignCounters.get(param1.name) | 0;
            _loc4_ = _loc4_ - 40;
            this._showSignCounters.set(param1.name, _loc4_);
            if (_loc4_ > this._showResultTime + 750) {
                _loc5_ = 0.1875;
                _loc2_.blend += _loc5_;
                _loc3_.blend = _loc2_.blend;
            } else if (_loc4_ > 750) {
                _loc2_.blend = 1;
                _loc3_.blend = 1;
            } else if (_loc4_ < 750 && _loc4_ > 0) {
                _loc5_ = 750 / 40;
                param1.blend -= _loc5_ * 0.01;
                param1.y -= 20 + (70 - param1.blend * 120);
            } else if (_loc4_ < 0) {
                param1.y -= 20 + (70 - param1.blend * 120);
                this.poolWindow(param1.name);
            }
        }
    }

    private getAvatarRect(param1: number): Rectangle {
        if (!this.handler || !this.handler.container || !this.handler.container.roomSession || !this.handler.container.roomEngine) {
            return null;
        }
        let _loc3_: number = this.handler.container.roomSession.roomId;
        let _loc2_: IUserData = this.handler.container.roomSessionManager.getSession(_loc3_).userDataManager.getUserData(param1);
        if (_loc2_) {
            return this.handler.container.roomEngine.getRoomObjectBoundingRectangle(_loc3_, _loc2_.roomObjectId, 100, this.handler.container.getFirstCanvasId());
        }
        return null;
    }

    private showNewQuestion(param1: Map<any, any>, param2: number): void {
        if (!param1) {
            return;
        }
        this._view.createWindow(0, stringOrNull(param1.get("content")));
        this._SafeStr_6240 = this._SafeStr_6240 + 1;
        this._countdown = 4;
        this._SafeStr_7428 = param1.get("id") | 0;
        if (param2 > 0) {
            this._SafeStr_2810 = new Timer(1000);
            this._countdown = param2 / 1000 | 0;
            this._SafeStr_2810.addEventListener("timer", this.onCountdownDownTimer);
            this._SafeStr_2810.start();
            this._SafeStr_2498 = new Timer(40);
            this._SafeStr_2498.addEventListener("timer", this.onLocationTimer);
            this._SafeStr_2498.start();
            this._view.updateCounter(String(this._countdown));
        }
    }

    private clearTimers(): void {
        if (this._SafeStr_2810) {
            this._SafeStr_2810.reset();
            this._SafeStr_2810 = null;
        }
        if (this._SafeStr_2498) {
            this._SafeStr_2498.reset();
            this._SafeStr_2498 = null;
        }
    }

    private newQuestion = (param1: RoomWidgetWordQuizUpdateEvent): void => {
        this._pollId = param1.id;
        this._question = param1.question;
        this._SafeStr_5144 = false;
        this._showSignCounters = new Dictionary();
        this.showNewQuestion(this._question, param1.duration);
    };

    private questionFinished = (param1: RoomWidgetWordQuizUpdateEvent): void => {
        let _loc2_: number = 0;
        this.clearTimers();
        if (this._view && this._question && this._question.get("id") == param1.questionId) {
            this._view.displayResults(param1.answerCounts);
        }
        _loc2_ = 0;
        while (_loc2_ < this._answerWindows.length) {
            this.poolWindow(this._answerWindows[_loc2_].name);
            _loc2_++;
        }
        this._answerWindows.length = 0;
    };

    private answeredQuestion = (param1: RoomWidgetWordQuizUpdateEvent): void => {
        let _loc7_: IWindowContainer = null;
        if (this._view) {
            this._view.updateResults(param1.answerCounts);
        }
        let _loc8_: number = param1.userId;
        let _loc9_: string = param1.value;
        let _loc3_: IWindowContainer[] = _loc9_ == "1" ? this._SafeStr_4595 : this._SafeStr_4313;
        let _loc4_: string = _loc9_ == "1" ? "wordquiz_like_xml" : "wordquiz_unlike_xml";
        let _loc5_: string = this._pollId + "_" + _loc8_ + "_" + _loc4_;
        if (_loc3_.length) {
            _loc7_ = _loc3_.pop();
        } else {
            _loc7_ = asGuarded(this.windowManager.buildFromXML(asInstanceOf(this.assets.getAssetByName(_loc4_).content, XML)), isIWindowContainer);
        }
        _loc7_.name = _loc5_;
        this._answerWindows.push(_loc7_);
        this._showSignCounters.set(_loc5_, this._showResultTime + 750 + 750);
        let _loc6_: Rectangle = this.getAvatarRect(_loc8_);
        if (_loc6_) {
            _loc7_.x = _loc6_.left + 20 | 0;
            _loc7_.y = _loc6_.top - 20 | 0;
        }
        if (!this._SafeStr_2498) {
            this._SafeStr_2498 = new Timer(40);
            this._SafeStr_2498.addEventListener("timer", this.onLocationTimer);
            this._SafeStr_2498.start();
        }
        let _loc2_: IBorderWindow = asGuarded(_loc7_.getChildByName("colored"), isIBorderWindow);
        if (_loc2_) {
            _loc2_.blend = 0;
        }
    };

    private onLocationTimer = (param1: TimerEvent): void => {
        let _loc3_: number = 0;
        let _loc5_: IWindowContainer = null;
        let _loc2_: any[] = null;
        let _loc6_: number = 0;
        let _loc4_: Rectangle = null;
        _loc3_ = 0;
        while (_loc3_ < this._answerWindows.length) {
            _loc5_ = this._answerWindows[_loc3_];
            if (_loc5_) {
                _loc2_ = String(this._answerWindows[_loc3_].name).split("_");
                if (_loc2_.length > 1) {
                    _loc6_ = _loc2_[1] | 0;
                    _loc4_ = this.getAvatarRect(_loc6_);
                    if (!_loc4_) {
                        this.poolWindow(this._answerWindows[_loc3_].name);
                        return;
                    }
                    _loc5_.x = _loc4_.left + 29 | 0;
                    _loc5_.y = _loc4_.top - 11 | 0;
                    this.handleSignWindowVisibility(_loc5_);
                }
            }
            _loc3_++;
        }
    };

    private onCountdownDownTimer = (param1: TimerEvent): void => {
        if (this._SafeStr_2810 == null) {
            return;
        }
        this._countdown = this._countdown - 1;
        this._view.updateCounter(String(this._countdown));
        if (this._countdown == 0) {
            this.clearTimers();
            this._view.removeWindow();
        }
    };
}
