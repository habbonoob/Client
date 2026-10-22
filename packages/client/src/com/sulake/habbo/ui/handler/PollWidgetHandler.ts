import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomSessionPollEvent } from '@/com/sulake/habbo/session/events/RoomSessionPollEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetPollUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPollUpdateEvent';
import { RoomWidgetPollMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPollMessage';

export class PollWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::PollWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private _container: IRoomWidgetHandlerContainer = null;

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get type(): string {
        return "RWE_ROOM_POLL";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWPM_ANSWER", "RWPM_REJECT", "RWPM_START"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetPollMessage = param1 instanceof RoomWidgetPollMessage ? param1 : null;
        if (_loc2_ == null) {
            return null;
        }
        switch (param1.type) {
            case "RWPM_START":
                this._container.roomSession.sendPollStartMessage(_loc2_.id);
                break;
            case "RWPM_REJECT":
                this._container.roomSession.sendPollRejectMessage(_loc2_.id);
                break;
            case "RWPM_ANSWER":
                this._container.roomSession.sendPollAnswerMessage(_loc2_.id, _loc2_.questionId, _loc2_.answers);
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RSPE_POLL_OFFER");
        _loc1_.push("RSPE_POLL_ERROR");
        _loc1_.push("RSPE_POLL_CONTENT");
        return _loc1_;
    }

    public update(): void {
    }

    public processEvent(param1: Event): void {
        let _loc2_: RoomWidgetPollUpdateEvent = null;
        if (this._container == null || this._container.events == null) {
            return;
        }
        let _loc3_: RoomSessionPollEvent = param1 instanceof RoomSessionPollEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        switch (param1.type) {
            case "RSPE_POLL_OFFER":
                _loc2_ = new RoomWidgetPollUpdateEvent(_loc3_.id, "RWPUW_OFFER");
                _loc2_.summary = _loc3_.summary;
                _loc2_.headline = _loc3_.headline;
                break;
            case "RSPE_POLL_ERROR":
                _loc2_ = new RoomWidgetPollUpdateEvent(_loc3_.id, "RWPUW_ERROR");
                _loc2_.summary = _loc3_.summary;
                _loc2_.headline = _loc3_.headline;
                break;
            case "RSPE_POLL_CONTENT":
                _loc2_ = new RoomWidgetPollUpdateEvent(_loc3_.id, "RWPUW_CONTENT");
                _loc2_.startMessage = _loc3_.startMessage;
                _loc2_.endMessage = _loc3_.endMessage;
                _loc2_.numQuestions = _loc3_.numQuestions;
                _loc2_.questionArray = _loc3_.questionArray;
                _loc2_.npsPoll = _loc3_.npsPoll;
        }
        if (_loc2_ == null) {
            return;
        }
        this._container.events.dispatchEvent(_loc2_);
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
