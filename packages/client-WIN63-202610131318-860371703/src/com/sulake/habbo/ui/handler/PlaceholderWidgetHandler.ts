import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetShowPlaceholderEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetShowPlaceholderEvent';

export class PlaceholderWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::PlaceholderWidgetHandler'); }

    private _container: IRoomWidgetHandlerContainer = null;

    constructor() {
    }

    public dispose(): void {
        this._container = null;
    }

    public get disposed(): boolean {
        return false;
    }

    public get type(): string {
        return null;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_PLACEHOLDER"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetShowPlaceholderEvent = null;
        let _loc3_: string = param1.type;
        _loc2_ = new RoomWidgetShowPlaceholderEvent("RWSPE_SHOW_PLACEHOLDER");
        this._container.events.dispatchEvent(_loc2_);
        return null;
    }

    public getProcessedEvents(): any[] {
        return null;
    }

    public processEvent(param1: Event): void {
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
