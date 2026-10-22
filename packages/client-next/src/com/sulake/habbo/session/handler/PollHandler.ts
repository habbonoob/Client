import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { PollContentsParser } from '@/com/sulake/habbo/communication/messages/parser/poll/PollContentsParser';
import type { PollErrorParser } from '@/com/sulake/habbo/communication/messages/parser/poll/PollErrorParser';
import type { PollOfferParser } from '@/com/sulake/habbo/communication/messages/parser/poll/PollOfferParser';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { PollContentsEvent } from '@/com/sulake/habbo/communication/messages/incoming/poll/PollContentsEvent';
import { PollErrorEvent } from '@/com/sulake/habbo/communication/messages/incoming/poll/PollErrorEvent';
import { PollOfferEvent } from '@/com/sulake/habbo/communication/messages/incoming/poll/PollOfferEvent';
import { RoomSessionPollEvent } from '@/com/sulake/habbo/session/events/RoomSessionPollEvent';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';

export class PollHandler extends BaseHandler {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::PollHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        super(param1, param2);
        if (!param1) {
            return;
        }
        param1.addMessageEvent(new PollContentsEvent(this.onPollContentsEvent));
        param1.addMessageEvent(new PollOfferEvent(this.onPollOfferEvent));
        param1.addMessageEvent(new PollErrorEvent(this.onPollErrorEvent));
    }

    private onPollOfferEvent = (param1: PollOfferEvent): void => {
        let _loc4_: RoomSessionPollEvent = null;
        if (!param1) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: PollOfferParser = param1.getParser();
        _loc4_ = new RoomSessionPollEvent("RSPE_POLL_OFFER", _loc3_, _loc2_.id);
        _loc4_.summary = _loc2_.headline;
        _loc4_.summary = _loc2_.summary;
        this.listener.events.dispatchEvent(_loc4_);
    };

    private onPollErrorEvent = (param1: PollErrorEvent): void => {
        let _loc4_: RoomSessionPollEvent = null;
        if (!param1) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: PollErrorParser = param1.getParser();
        _loc4_ = new RoomSessionPollEvent("RSPE_POLL_ERROR", _loc3_, -1);
        _loc4_.headline = "???";
        _loc4_.summary = "???";
        this.listener.events.dispatchEvent(_loc4_);
    };

    private onPollContentsEvent = (param1: PollContentsEvent): void => {
        let _loc4_: RoomSessionPollEvent = null;
        if (!param1) {
            return;
        }
        let _loc3_: IRoomSession = this.listener.getSession(this._SafeStr_2161);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: PollContentsParser = param1.getParser();
        _loc4_ = new RoomSessionPollEvent("RSPE_POLL_CONTENT", _loc3_, _loc2_.id);
        _loc4_.startMessage = _loc2_.startMessage;
        _loc4_.endMessage = _loc2_.endMessage;
        _loc4_.numQuestions = _loc2_.numQuestions;
        _loc4_.questionArray = _loc2_.questionArray;
        _loc4_.npsPoll = _loc2_.npsPoll;
        this.listener.events.dispatchEvent(_loc4_);
    };
}
