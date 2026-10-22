import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { PollChoice } from '@/com/sulake/habbo/communication/messages/parser/poll/PollChoice';
import type { PollQuestion } from '@/com/sulake/habbo/communication/messages/parser/poll/PollQuestion';
import type { IPollDialog } from '@/com/sulake/habbo/ui/widget/poll/IPollDialog';
import type { PollWidget } from '@/com/sulake/habbo/ui/widget/poll/PollWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetPollMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPollMessage';

export class PollContentDialog implements IPollDialog {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.poll::PollContentDialog'); }

    constructor(param1: number, param2: string, param3: any[], param4: PollWidget, param5: boolean) {
        let _loc8_: ITextWindow = null;
        let _loc7_: IWindow = null;
        let _loc9_: IWindow = null;
        let _loc6_: IWindow = null;
        this._id = param1;
        this._SafeStr_3313 = param3;
        this._widget = param4;
        this._npsPoll = param5;
        this.answerableQuestionCount();
        let _loc10_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("poll_question"), XmlAsset);
        if (_loc10_ != null) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc10_.content, XML)), isIFrameWindow);
            _loc8_ = asGuarded(this._window.findChildByName("poll_question_headline"), isITextWindow);
            if (_loc8_) {
                _loc8_.text = param2;
            }
            this._window.center();
            _loc7_ = this._window.findChildByName("header_button_close");
            if (_loc7_ != null) {
                _loc7_.addEventListener("WME_CLICK", this.onClose);
            }
            _loc9_ = this._window.findChildByName("poll_question_button_ok");
            if (_loc9_ != null) {
                _loc9_.addEventListener("WME_CLICK", this.onOk);
            }
            _loc6_ = this._window.findChildByName("poll_question_cancel");
            if (_loc6_ != null) {
                _loc6_.addEventListener("WME_CLICK", this.onCancel);
            }
        }
    }

    private _id: number = -1;

    declare private _window: IFrameWindow;

    declare private _widget: PollWidget;

    declare private _SafeStr_2600: IFrameWindow;

    private _SafeStr_6608: boolean = false;

    declare private _SafeStr_3313: any[];

    private _question: number = -1;
    private _SafeStr_4355: number = 0;
    private _SafeStr_4542: number = -1;
    private _npsPoll: boolean = false;
    private _SafeStr_3786: number = 0;
    private _SafeStr_2949: PollQuestion = null;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public start(): void {
        if (!this._SafeStr_6608) {
            this._SafeStr_6608 = true;
            this.nextQuestion();
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2600) {
            this._SafeStr_2600.dispose();
            this._SafeStr_2600 = null;
        }
        this._widget = null;
        this._SafeStr_3313 = null;
    }

    private onClose = (param1: WindowEvent): void => {
        this.showCancelConfirm();
    };

    private onOk = (param1: WindowEvent): void => {
        this.answerPollQuestion();
    };

    private onCancel = (param1: WindowEvent): void => {
        this.showCancelConfirm();
    };

    private nextQuestion(): void {
        let _loc5_: ITextWindow = null;
        let _loc1_: IWindowContainer = null;
        let _loc2_: string = null;
        let _loc4_: IItemListWindow = null;
        let _loc3_: number = 0;
        this._SafeStr_2949 = this.getNextQuestion();
        if (this._SafeStr_2949) {
            if (this._window != null) {
                _loc5_ = asGuarded(this._window.findChildByName("poll_question_text"), isITextWindow);
                if (_loc5_ != null) {
                    _loc5_.text = this._SafeStr_2949.questionText;
                }
                _loc5_ = asGuarded(this._window.findChildByName("poll_question_number"), isITextWindow);
                if (_loc5_ != null) {
                    _loc5_.text = "${poll_question_number}";
                    _loc2_ = _loc5_.text;
                    _loc2_ = _loc2_.replace("%number%", String(this._question + 1));
                    _loc2_ = _loc2_.replace("%count%", String(this._SafeStr_4355));
                    _loc5_.text = _loc2_;
                }
                _loc1_ = asGuarded(this._window.findChildByName("poll_question_answer_container"), isIWindowContainer);
                if (_loc1_ != null) {
                    while (_loc1_.numChildren > 0) {
                        _loc1_.getChildAt(0).dispose();
                    }
                    _loc1_.invalidate();
                }
                switch (this._SafeStr_2949.questionType - 1) {
                    case 0:
                        this.populateRadionButtonType(_loc1_, this._SafeStr_2949.questionChoices);
                        break;
                    case 1:
                        this.populateCheckBoxType(_loc1_, this._SafeStr_2949.questionChoices);
                        break;
                    case 2:
                        this.populateTextLineType(_loc1_);
                        break;
                    case 3:
                        this.populateTextAreaType(_loc1_);
                        break;
                    default:
                        this.nextQuestion();
                }
                _loc4_ = asGuarded(this._window.findChildByName("poll_content_wrapper"), isIItemListWindow);
                if (_loc4_ != null) {
                    _loc3_ = _loc4_.scrollableRegion.height - _loc4_.visibleRegion.height | 0;
                    this._window.height += _loc3_;
                    this._window.center();
                }
            }
        } else {
            this._widget.pollFinished(this._id);
        }
    }

    private getNextQuestion(): PollQuestion {
        let _loc1_: PollQuestion = null;
        let _loc3_: number = 0;
        let _loc2_: PollQuestion = null;
        if (this._npsPoll && this._SafeStr_4542 >= 0 && this._SafeStr_3786 != 0) {
            _loc1_ = this._SafeStr_3313[this._SafeStr_4542];
            _loc3_ = 0;
            while (_loc3_ < _loc1_.children.length) {
                _loc2_ = _loc1_.children[_loc3_];
                if (_loc2_ && _loc2_.questionCategory == this._SafeStr_3786) {
                    this._SafeStr_4542 = -1;
                    return _loc2_;
                }
                _loc3_++;
            }
        }
        this._question = this._question + 1;
        if (this._question < this._SafeStr_3313.length) {
            this._SafeStr_4542 = this._question;
            return this._SafeStr_3313[this._question];
        }
        return null;
    }

    private populateRadionButtonType(param1: IWindowContainer, param2: PollChoice[]): void {
        let _loc3_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("poll_answer_radiobutton_input"), XmlAsset);
        if (!_loc3_) {
            throw new Error("Asset for poll widget hot found: \"poll_answer_radiobutton_input\"!");
        }
        let _loc4_: IWindowContainer = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIWindowContainer);
        if (_loc4_ != null) {
            this.populateSelectionList(param2, _loc4_);
            param1.addChild(_loc4_);
        }
    }

    private resolveRadionButtonTypeAnswer(param1: PollQuestion): any[] {
        let _loc3_: ISelectorWindow = null;
        let _loc4_: ISelectableWindow = null;
        let _loc5_: PollChoice = null;
        let _loc2_: any[] = [];
        if (this._window != null) {
            _loc3_ = asGuarded(this._window.findChildByName("poll_answer_selector"), isISelectorWindow);
            if (_loc3_) {
                _loc4_ = _loc3_.getSelected();
                if (_loc4_) {
                    _loc5_ = param1.questionChoices[_loc4_.id];
                    if (this._npsPoll) {
                        this._SafeStr_3786 = _loc5_.choiceType;
                    } else {
                        this._SafeStr_3786 = 0;
                    }
                    _loc2_.push(_loc5_.value);
                }
            }
        }
        return _loc2_;
    }

    private populateCheckBoxType(param1: IWindowContainer, param2: PollChoice[]): void {
        let _loc3_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("poll_answer_checkbox_input"), XmlAsset);
        if (!_loc3_) {
            throw new Error("Asset for poll widget hot found: \"poll_answer_checkbox_input\"!");
        }
        let _loc4_: IWindowContainer = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIWindowContainer);
        if (_loc4_ != null) {
            this.populateSelectionList(param2, _loc4_);
            param1.addChild(_loc4_);
        }
    }

    private resolveCheckBoxTypeAnswer(param1: PollQuestion): any[] {
        let _loc5_: IItemListWindow = null;
        let _loc3_: number = 0;
        let _loc6_: IWindowContainer = null;
        let _loc4_: ICheckBoxWindow = null;
        let _loc2_: any[] = [];
        if (this._window != null) {
            _loc5_ = asGuarded(this._window.findChildByName("poll_answer_itemlist"), isIItemListWindow);
            if (_loc5_ != null) {
                _loc3_ = 0;
                while (_loc3_ < _loc5_.numListItems) {
                    _loc6_ = asGuarded(_loc5_.getListItemAt(_loc3_ >>> 0), isIWindowContainer);
                    if (_loc6_ != null) {
                        _loc4_ = asGuarded(_loc6_.findChildByName("poll_answer_checkbox"), isICheckBoxWindow);
                        if (_loc4_ != null) {
                            if (_loc4_.testStateFlag(8)) {
                                _loc2_.push(param1.questionChoices[_loc3_].value);
                            }
                        }
                    }
                    _loc3_++;
                }
            }
        }
        return _loc2_;
    }

    private populateSelectionList(param1: PollChoice[], param2: IWindowContainer): void {
        let _loc7_: IWindowContainer = null;
        let _loc4_: number = 0;
        let _loc5_: ITextWindow = null;
        let _loc3_: IWindow = null;
        let _loc6_: IItemListWindow = asGuarded(param2.findChildByName("poll_answer_itemlist"), isIItemListWindow);
        if (_loc6_ != null) {
            _loc7_ = asGuarded(param2.findChildByName("poll_answer_entity"), isIWindowContainer);
            if (_loc7_ != null) {
                _loc4_ = 0;
                while (_loc4_ < param1.length - 1) {
                    _loc4_++;
                    _loc6_.addListItem(_loc7_.clone());
                }
                _loc4_ = 0;
                while (_loc4_ < param1.length) {
                    _loc7_ = asGuarded(_loc6_.getListItemAt(_loc4_ >>> 0), isIWindowContainer);
                    _loc5_ = asGuarded(_loc7_.findChildByName("poll_answer_entity_text"), isITextWindow);
                    if (_loc5_) {
                        _loc5_.text = param1[_loc4_].choiceText;
                    }
                    _loc3_ = _loc7_.findChildByTag("POLL_SELECTABLE_ITEM");
                    if (_loc3_) {
                        _loc3_.id = _loc4_;
                    }
                    _loc4_++;
                }
            }
        }
    }

    private populateTextLineType(param1: IWindowContainer): void {
        let _loc2_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("poll_answer_text_input"), XmlAsset);
        if (!_loc2_) {
            throw new Error("Asset for poll widget hot found: \"poll_answer_text_input\"!");
        }
        param1.addChild(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)));
    }

    private resolveTextLineTypeAnswer(): any[] {
        let _loc2_: ITextWindow = null;
        let _loc1_: any[] = [];
        if (this._window != null) {
            _loc2_ = asGuarded(this._window.findChildByName("poll_answer_input"), isITextWindow);
            if (_loc2_ != null) {
                _loc1_.push(_loc2_.text);
            }
            return _loc1_;
        }
        throw new Error("Invalid or disposed poll dialog!");
    }

    private populateTextAreaType(param1: IWindowContainer): void {
        this.populateTextLineType(param1);
    }

    private resolveTextAreaTypeAnswer(): any[] {
        return this.resolveTextLineTypeAnswer();
    }

    private cancelPoll(): void {
        this._widget.pollCancelled(this._id);
    }

    private answerPollQuestion(): void {
        let answerArray: any[];
        let answers: any[];
        let message: RoomWidgetPollMessage;
        let answerValue: number = 0;
        let question: PollQuestion = null;
        if (this._npsPoll && this._SafeStr_2949) {
            question = this._SafeStr_2949;
        } else {
            question = this._SafeStr_3313[this._question];
        }
        this._SafeStr_3786 = 0;
        switch (question.questionType - 1) {
            case 0:
                answerArray = this.resolveRadionButtonTypeAnswer(question);
                break;
            case 1:
                answerArray = this.resolveCheckBoxTypeAnswer(question);
                if (answerArray.length < 0) {
                    this._widget.windowManager.alert("${win_error}", "${poll_alert_answer_missing}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                            param1.dispose();
                        });
                    return;
                }
                if (answerArray.length > question.questionChoices.length) {
                    this._widget.windowManager.alert("${win_error}", "${poll_alert_invalid_selection}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                            param1.dispose();
                        });
                    return;
                }
                break;
            case 2:
                answerArray = this.resolveTextLineTypeAnswer();
                break;
            case 3:
                answerArray = this.resolveTextAreaTypeAnswer();
                break;
            default:
                throw new Error("Unknown poll question type: " + question.questionType + "!");
        }
        answers = [];
        message = new RoomWidgetPollMessage("RWPM_ANSWER", this._id);
        message.questionId = question.questionId;
        if (question.questionChoices.length > 0) {
            for (answerValue of answerArray ?? []) {
                answers.push(answerValue);
            }
        } else {
            answers.push(answerArray);
        }
        message.answers = answers;
        this._widget.messageListener.processWidgetMessage(message);
        this.nextQuestion();
    }

    private showCancelConfirm(): void {
        let _loc4_: XmlAsset = null;
        let _loc2_: IWindow = null;
        let _loc3_: IWindow = null;
        let _loc1_: IWindow = null;
        if (!this._SafeStr_2600) {
            _loc4_ = asInstanceOf(this._widget.assets.getAssetByName("poll_cancel_confirm"), XmlAsset);
            this._SafeStr_2600 = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc4_.content, XML), 2), isIFrameWindow);
            this._SafeStr_2600.center();
            _loc2_ = this._SafeStr_2600.findChildByName("header_button_close");
            if (_loc2_ != null) {
                _loc2_.addEventListener("WME_CLICK", this.onCancelPollClose);
            }
            _loc3_ = this._SafeStr_2600.findChildByName("poll_cancel_confirm_button_ok");
            if (_loc3_ != null) {
                _loc3_.addEventListener("WME_CLICK", this.onCancelPollOk);
            }
            _loc1_ = this._SafeStr_2600.findChildByName("poll_cancel_confirm_button_cancel");
            if (_loc1_ != null) {
                _loc1_.addEventListener("WME_CLICK", this.onCancelPollCancel);
            }
        }
    }

    private hideCancelConfirm(): void {
        if (this._SafeStr_2600 != null) {
            this._SafeStr_2600.dispose();
            this._SafeStr_2600 = null;
        }
    }

    private onCancelPollClose = (param1: WindowEvent): void => {
        this.hideCancelConfirm();
    };

    private onCancelPollOk = (param1: WindowEvent): void => {
        this.hideCancelConfirm();
        this.cancelPoll();
    };

    private onCancelPollCancel = (param1: WindowEvent): void => {
        this.hideCancelConfirm();
    };

    private answerableQuestionCount(): void {
        this._SafeStr_4355 = this._SafeStr_3313.length | 0;
        for (const _loc1_ of this._SafeStr_3313 ?? []) {
            if (_loc1_.children.length > 0) {
                this._SafeStr_4355 = this._SafeStr_4355 + 1;
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
