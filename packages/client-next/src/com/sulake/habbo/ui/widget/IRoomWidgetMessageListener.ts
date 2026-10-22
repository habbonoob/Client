import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export interface IRoomWidgetMessageListener {
    processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent;
}
