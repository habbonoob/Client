import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { IRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface IRoomDesktop {
    get events(): IEventDispatcher;
    get roomSession(): IRoomSession;
    processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent;
    getWidget(param1: string): IRoomWidget;
    createWidget(param1: string, param2?: boolean, param3?: IRoomWidget): IRoomWidget;
    disposeWidget(param1: string): void;
    getFirstCanvasId(): number;
    getRoomViewRect(): Rectangle;
    enterAfterSpectate(): void;
    processEvent(param1: Event): void;
}
