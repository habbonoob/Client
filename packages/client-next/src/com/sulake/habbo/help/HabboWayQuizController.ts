import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { QuizDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/QuizDataMessageParser';
import type { QuizResultsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/help/QuizResultsMessageParser';
import type { HabboHelp } from '@/com/sulake/habbo/help/HabboHelp';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isISelectorListWindow } from '@/com/sulake/core/window/components/ISelectorListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { QuizDataMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/QuizDataMessageEvent';
import { QuizResultsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/help/QuizResultsMessageEvent';
import { GetQuizQuestionsComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/GetQuizQuestionsComposer';
import { PostQuizAnswersComposer } from '@/com/sulake/habbo/communication/messages/outgoing/help/PostQuizAnswersComposer';

export class HabboWayQuizController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.help::HabboWayQuizController'); }

    private static readonly HABBO_WAY_QUIZ_CODE: string = "HabboWay1";
    private static readonly SAFETY_QUIZ_CODE: string = "SafetyQuiz1";
    private static readonly PAGE_QUESTION: number = 1;
    private static readonly PAGE_SUCCESS: number = 2;
    private static readonly PAGE_FAILURE: number = 3;
    private static readonly PAGE_ANALYSIS: number = 4;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _habboHelp: HabboHelp;

    declare private _SafeStr_2492: IModalDialog;

    declare private _window: IWindowContainer;

    declare private _SafeStr_4365: IWindowContainer;

    declare private _SafeStr_2882: ISelectorListWindow;

    declare private _SafeStr_3686: ISelectableWindow;

    declare private _SafeStr_3029: IItemListWindow;

    declare private _SafeStr_3692: IWindow;

    declare private _quizCode: string;

    declare private _questionIds: any[];

    declare private _SafeStr_4051: any[];

    declare private _answerOrders: any[];

    declare private _questionIdsForWrongAnswers: any[];

    declare private _SafeStr_2949: number;
    static { (this.prototype as any)._SafeStr_2949 = 0; }

    constructor(param1: HabboHelp) {
        this._habboHelp = param1;
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new QuizDataMessageEvent(this.onQuizData));
        this._habboHelp.communicationManager.addHabboConnectionMessageEvent(new QuizResultsMessageEvent(this.onQuizResults));
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_4365 = null;
            this._SafeStr_2882 = null;
            if (this._SafeStr_3686 != null) {
                this._SafeStr_3686.dispose();
                this._SafeStr_3686 = null;
            }
            this._SafeStr_3029 = null;
            if (this._SafeStr_3692 != null) {
                this._SafeStr_3692.dispose();
                this._SafeStr_3692 = null;
            }
            this.closeWindow();
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public showHabboWayQuiz(): void {
        this._habboHelp.sendMessage(new GetQuizQuestionsComposer("HabboWay1"));
    }

    public showSafetyQuiz(): void {
        this._habboHelp.sendMessage(new GetQuizQuestionsComposer("SafetyQuiz1"));
    }

    private onQuizData = (param1: QuizDataMessageEvent): void => {
        let _loc2_: QuizDataMessageParser = param1.getParser();
        this._habboHelp.closeHabboWay();
        this._habboHelp.closeSafetyBooklet();
        this.showWindow(_loc2_.quizCode, _loc2_.questionIds);
    };

    private onQuizResults = (param1: QuizResultsMessageEvent): void => {
        let _loc2_: QuizResultsMessageParser = param1.getParser();
        this._questionIdsForWrongAnswers = _loc2_.questionIdsForWrongAnswers;
        if (this._questionIdsForWrongAnswers.length == 0) {
            this.showPage(2);
        } else {
            this.showPage(3);
        }
    };

    private showWindow(param1: string, param2: any[]): void {
        this.closeWindow();
        this._SafeStr_2492 = this._habboHelp.getModalXmlWindow("habbo_way_quiz");
        this._window = castGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.procedure = this.onWindowEvent;
        this._SafeStr_4365 = castGuarded(this._window.findChildByName("question_pane"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2882 = castGuarded(this._SafeStr_4365.findChildByName("answer_list"), isISelectorListWindow, "com.sulake.core.window.components.ISelectorListWindow");
        this._SafeStr_3686 = this._SafeStr_2882.getSelectableAt(0);
        this._SafeStr_2882.removeSelectable(this._SafeStr_3686);
        this._SafeStr_3029 = castGuarded(this._window.findChildByName("analysis_pane"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_3692 = this._SafeStr_3029.getListItemAt(0);
        this._SafeStr_3029.removeListItems();
        this._SafeStr_3029.spacing = 4;
        this._quizCode = param1;
        this._questionIds = param2;
        this._SafeStr_4051 = new Array(this.questionCount);
        this._answerOrders = new Array(this.questionCount);
        this.setCurrentQuestion(0);
        let _loc3_: IWindowContainer = castGuarded(castGuarded(this._SafeStr_3692, isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").getListItemByName("explanation_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        switch (this._quizCode) {
            case "HabboWay1":
                castGuarded(this._window.findChildByName("question_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}habboway/quiz_question.png";
                castGuarded(this._window.findChildByName("indicator_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "help_habboway_dove_on";
                castGuarded(this._window.findChildByName("success_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}habboway/quiz_success.png";
                castGuarded(_loc3_.findChildByName("explanation_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "help_habboway_dove_quizz";
                break;
            case "SafetyQuiz1":
                castGuarded(this._window.findChildByName("question_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/question_illustration.png";
                castGuarded(this._window.findChildByName("indicator_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/safety_on.png";
                castGuarded(this._window.findChildByName("failure_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/result_failure.png";
                castGuarded(this._window.findChildByName("success_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/result_success.png";
                castGuarded(_loc3_.findChildByName("explanation_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}safetyquiz/safety_on.png";
        }
        this.showPage(1);
    }

    private closeWindow(): void {
        this._window = null;
        if (this._SafeStr_2492 != null) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
    }

    private showPage(param1: number): void {
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc8_: IItemListWindow = null;
        let _loc6_: string = null;
        let _loc9_: string = null;
        this._window.findChildByName("question_pane").visible = param1 == 1;
        this._window.findChildByName("success_pane").visible = param1 == 2;
        this._window.findChildByName("failure_pane").visible = param1 == 3;
        this._SafeStr_3029.visible = param1 == 4;
        this._window.findChildByName("prev_next_buttons").visible = param1 == 1;
        this._window.findChildByName("failure_buttons").visible = param1 == 3;
        this._window.findChildByName("exit_button_container").visible = param1 == 2 || param1 == 4;
        let _loc3_: IWindow = this._window.findChildByName("top_indicator");
        let _loc7_: IWindow = this._window.findChildByName("indicator_image");
        switch (param1 - 1) {
            case 0:
                this._window.caption = this.getFullLocalizationKey("question.title");
                _loc7_.visible = true;
                _loc3_.visible = true;
                _loc3_.caption = this._habboHelp.localization.getLocalizationWithParams(this.getRawLocalizationKey("question.page"), "", "current_page", 1, "page_count", this.questionCount.toString());
                _loc3_.caption = this.getFullLocalizationKey("question.page");
                break;
            case 1:
                this._window.caption = this.getFullLocalizationKey("success.title");
                this._window.findChildByName("failure_advice").caption = this.getFullLocalizationKey("failure.advice");
                this._window.findChildByName("success_results").caption = this._habboHelp.localization.getLocalizationWithParams(this.getRawLocalizationKey("success.results"), "", "question_count", this.questionCount.toString());
                _loc7_.visible = false;
                _loc3_.visible = false;
                _loc3_.caption = "";
                break;
            case 2:
                _loc5_ = this._questionIds.length - this._questionIdsForWrongAnswers.length;
                this._window.caption = this.getFullLocalizationKey("failure.title");
                this._window.findChildByName("failure_advice").caption = this.getFullLocalizationKey("failure.advice");
                this._window.findChildByName("failure_results").caption = this._habboHelp.localization.getLocalizationWithParams(this.getRawLocalizationKey("failure.results"), "", "correct_count", _loc5_.toString(), "total_count", this.questionCount.toString());
                _loc7_.visible = false;
                _loc3_.visible = false;
                _loc3_.caption = "";
                break;
            case 3:
                this._window.caption = this.getFullLocalizationKey("analysis.title");
                _loc7_.visible = true;
                _loc3_.visible = true;
                _loc3_.caption = this.getFullLocalizationKey("analysis.top");
                for (const _loc4_ of this._questionIdsForWrongAnswers ?? []) {
                    _loc2_ = this._SafeStr_4051[this._questionIds.indexOf(_loc4_)] | 0;
                    _loc8_ = castGuarded(this._SafeStr_3692.clone(), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
                    _loc6_ = "${quiz." + this._quizCode + ".";
                    _loc9_ = "." + _loc4_ + "." + _loc2_ + "}";
                    _loc8_.getListItemByName("question").caption = _loc6_ + "question." + _loc4_ + "}";
                    castGuarded(_loc8_.getListItemByName("answer_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("answer").caption = _loc6_ + "answer" + _loc9_;
                    castGuarded(_loc8_.getListItemByName("explanation_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("explanation").caption = _loc6_ + "explanation" + _loc9_;
                    this._SafeStr_3029.addListItem(_loc8_);
                }
                castGuarded(this._SafeStr_3029.getListItemAt(this._SafeStr_3029.numListItems - 1 >>> 0), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").getListItemByName("separator").dispose();
        }
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this._disposed || this._window == null || param1.type != "WME_CLICK") {
            return;
        }
        if (isISelectableWindow(param2)) {
            this._SafeStr_4051[this._SafeStr_2949] = Number(param2.name) | 0;
            this._window.findChildByName("next_dimmer").visible = false;
        } else {
            switch (param2.name) {
                case "header_button_close":
                case "exit_button":
                    this.closeWindow();
                    break;
                case "prev_button":
                    this.setCurrentQuestion(this._SafeStr_2949 - 1);
                    break;
                case "next_button":
                    this.setCurrentQuestion(this._SafeStr_2949 + 1);
                    break;
                case "review_button":
                    this.showPage(4);
            }
        }
    };

    private setCurrentQuestion(param1: number): void {
        let _loc3_: number = 0;
        let _loc10_: any[] = null;
        let _loc2_: number = 0;
        let _loc4_: string = null;
        let _loc6_: ISelectableWindow = null;
        let _loc7_: number = 0;
        let _loc5_: ISelectableWindow = null;
        let _loc9_: ISelectableWindow = null;
        if (param1 >= this.questionCount) {
            this._habboHelp.sendMessage(new PostQuizAnswersComposer(this._quizCode, this._SafeStr_4051));
        } else if (param1 >= 0) {
            this._SafeStr_2949 = param1;
            this._window.findChildByName("prev_dimmer").visible = param1 <= 0;
            this._window.findChildByName("next_dimmer").visible = this._SafeStr_4051[this._SafeStr_2949] == null;
            this._window.findChildByName("top_indicator").caption = this._habboHelp.localization.getLocalizationWithParams(this.getRawLocalizationKey("question.page"), "", "current_page", String(param1 + 1), "page_count", this.questionCount.toString());
            while (this._SafeStr_2882.numSelectables > 0) {
                this._SafeStr_2882.removeSelectable(this._SafeStr_2882.getSelectableAt(0)).dispose();
            }
            _loc3_ = this._questionIds[this._SafeStr_2949] | 0;
            _loc10_ = [];
            this._SafeStr_4365.findChildByName("question").caption = "${quiz." + this._quizCode + ".question." + _loc3_ + "}";
            _loc2_ = 0;
            while (true) {
                _loc4_ = this._habboHelp.localization.getLocalization("quiz." + this._quizCode + ".answer." + _loc3_ + "." + _loc2_, "");
                if (_loc4_.length <= 0) {
                    break;
                }
                _loc6_ = castGuarded(this._SafeStr_3686.clone(), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow");
                _loc6_.caption = _loc4_;
                _loc6_.name = _loc2_.toString();
                _loc10_.push(_loc6_);
                _loc2_++;
            }
            if (this._answerOrders[this._SafeStr_2949] == null) {
                this._answerOrders[this._SafeStr_2949] = [];
                _loc7_ = 0;
                while (_loc7_ < _loc2_) {
                    _loc5_ = _loc10_.splice(Math.random() * _loc10_.length | 0, 1)[0];
                    this._SafeStr_2882.addSelectable(_loc5_);
                    this._answerOrders[this._SafeStr_2949].push(Number(_loc5_.name) | 0);
                    _loc7_++;
                }
            } else {
                for (const _loc8_ of valuesOf(this._answerOrders[this._SafeStr_2949])) {
                    this._SafeStr_2882.addSelectable(_loc10_[_loc8_]);
                }
            }
            _loc9_ = this._SafeStr_2882.getSelectableByName(String(this._SafeStr_4051[this._SafeStr_2949]));
            if (_loc9_ != null) {
                _loc9_.select();
            }
        }
    }

    private get questionCount(): number {
        return (this._questionIds != null ? this._questionIds.length : 0) | 0;
    }

    private getFullLocalizationKey(param1: string): string {
        return "${" + this.getRawLocalizationKey(param1) + "}";
    }

    private getRawLocalizationKey(param1: string): string {
        let _loc2_: string = this._quizCode;
        if ("HabboWay1" !== _loc2_) {
            return "quiz." + this._quizCode + "." + param1;
        }
        return "habbo.way.quiz." + param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
