import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { QuestionAnsweredParser } from '@/com/sulake/habbo/communication/messages/parser/poll/QuestionAnsweredParser';
import type { QuestionFinishedParser } from '@/com/sulake/habbo/communication/messages/parser/poll/QuestionFinishedParser';
import type { QuestionParser } from '@/com/sulake/habbo/communication/messages/parser/poll/QuestionParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { QuestionAnsweredEvent } from '@/com/sulake/habbo/communication/messages/incoming/poll/QuestionAnsweredEvent';
import { QuestionEvent } from '@/com/sulake/habbo/communication/messages/incoming/poll/QuestionEvent';
import { QuestionFinishedEvent } from '@/com/sulake/habbo/communication/messages/incoming/poll/QuestionFinishedEvent';
import { RoomSessionWordQuizEvent } from '@/com/sulake/habbo/session/events/RoomSessionWordQuizEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class WordQuizHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::WordQuizHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (!param1) {
            return;
        }
        param1.addMessageEvent(new QuestionEvent(this.onQuestionStatus));
        param1.addMessageEvent(new QuestionAnsweredEvent(this.onQuestionAnsweredEvent));
        param1.addMessageEvent(new QuestionFinishedEvent(this.onQuestionFinishedEvent));
    }

    private onQuestionStatus = (param1: QuestionEvent): void => {
        let _loc4_: RoomSessionWordQuizEvent = null;
        if (!param1) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: QuestionParser = param1.getParser();
        _loc4_ = new RoomSessionWordQuizEvent("RWPUW_NEW_QUESTION", _loc3_, _loc2_.pollId);
        _loc4_.question = _loc2_.question;
        _loc4_.duration = _loc2_.duration;
        _loc4_.pollType = _loc2_.pollType;
        _loc4_.questionId = _loc2_.questionId;
        _loc4_.pollId = _loc2_.pollId;
        this.listener.events.dispatchEvent(_loc4_);
    };

    private onQuestionAnsweredEvent = (param1: QuestionAnsweredEvent): void => {
        let _loc4_: RoomSessionWordQuizEvent = null;
        if (!param1) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: QuestionAnsweredParser = param1.getParser();
        _loc4_ = new RoomSessionWordQuizEvent("RWPUW_QUESTION_ANSWERED", _loc3_, _loc2_.userId);
        _loc4_.value = _loc2_.value;
        _loc4_.userId = _loc2_.userId;
        _loc4_.answerCounts = _loc2_.answerCounts;
        this.listener.events.dispatchEvent(_loc4_);
    };

    private onQuestionFinishedEvent = (param1: QuestionFinishedEvent): void => {
        let _loc4_: RoomSessionWordQuizEvent = null;
        if (!param1) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: QuestionFinishedParser = param1.getParser();
        _loc4_ = new RoomSessionWordQuizEvent("RWPUW_QUESION_FINSIHED", _loc3_);
        _loc4_.questionId = _loc2_.questionId;
        _loc4_.answerCounts = _loc2_.answerCounts;
        this.listener.events.dispatchEvent(_loc4_);
    };
}
