import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { AvatarAction } from '@/com/sulake/habbo/avatar/enum/AvatarAction';
import { RoomSessionWordQuizEvent } from '@/com/sulake/habbo/session/events/RoomSessionWordQuizEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetWordQuizUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetWordQuizUpdateEvent';

export class WordQuizWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::WordQuizWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_WORD_QUIZZ";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public get roomSession(): IRoomSession {
        return this._container ? this._container.roomSession : null;
    }

    public get roomEngine(): IRoomEngine {
        return this._container ? this._container.roomEngine : null;
    }

    public getWidgetMessages(): any[] {
        return ["RWPUW_QUESTION_ANSWERED", "RWPUW_QUESION_FINSIHED", "RWPUW_NEW_QUESTION"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWPUW_QUESTION_ANSWERED");
        _loc1_.push("RWPUW_QUESION_FINSIHED");
        _loc1_.push("RWPUW_NEW_QUESTION");
        return _loc1_;
    }

    public processEvent(param1: Event): void {
        let _loc4_: RoomWidgetWordQuizUpdateEvent = null;
        let _loc3_: IUserData = null;
        if (this._container == null || this._container.events == null || this._container.roomSession == null) {
            return;
        }
        let _loc2_: RoomSessionWordQuizEvent = param1 instanceof RoomSessionWordQuizEvent ? param1 : null;
        if (_loc2_ == null) {
            return;
        }
        switch (param1.type) {
            case "RWPUW_QUESTION_ANSWERED":
                _loc4_ = new RoomWidgetWordQuizUpdateEvent(_loc2_.id, "RWPUW_QUESTION_ANSWERED");
                _loc4_.value = _loc2_.value;
                _loc4_.userId = _loc2_.userId;
                _loc4_.answerCounts = _loc2_.answerCounts;
                _loc3_ = this._container.roomSession.userDataManager.getUserData(_loc2_.userId);
                if (!_loc3_) {
                    return;
                }
                if (_loc4_.value == "0") {
                    this._container.roomEngine.updateObjectUserGesture(this._container.roomSession.roomId, _loc3_.roomObjectId, AvatarAction.getGestureId("sad"));
                } else {
                    this._container.roomEngine.updateObjectUserGesture(this._container.roomSession.roomId, _loc3_.roomObjectId, AvatarAction.getGestureId("sml"));
                }
                break;
            case "RWPUW_QUESION_FINSIHED":
                _loc4_ = new RoomWidgetWordQuizUpdateEvent(_loc2_.id, "RWPUW_QUESION_FINSIHED");
                _loc4_.pollId = _loc2_.pollId;
                _loc4_.questionId = _loc2_.questionId;
                _loc4_.answerCounts = _loc2_.answerCounts;
                break;
            case "RWPUW_NEW_QUESTION":
                _loc4_ = new RoomWidgetWordQuizUpdateEvent(_loc2_.id, "RWPUW_NEW_QUESTION");
                _loc4_.question = _loc2_.question;
                _loc4_.duration = _loc2_.duration;
                _loc4_.pollType = _loc2_.pollType;
                _loc4_.questionId = _loc2_.questionId;
                _loc4_.pollId = _loc2_.pollId;
        }
        if (_loc4_ == null) {
            return;
        }
        this._container.events.dispatchEvent(_loc4_);
    }

    public update(): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
