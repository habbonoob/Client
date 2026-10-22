import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetScriptProceedMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetScriptProceedMessage';

export class UiHelpBubbleWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::UiHelpBubbleWidgetHandler'); }

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
        return ["RWPM_ANSWER"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetScriptProceedMessage = param1 instanceof RoomWidgetScriptProceedMessage ? param1 : null;
        if (_loc2_ == null) {
            return null;
        }
        let _loc3_: any = param1.type;
        if ("RWPM_ANSWER" === _loc3_) {
            this._container.roomSession.sendScriptProceed();
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWPM_ANSWER");
        return _loc1_;
    }

    public update(): void {
    }

    public processEvent(param1: Event): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
