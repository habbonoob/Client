import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';

export interface IRoomWidgetHandler extends IDisposable {
    get type(): string;
    set container(param1: IRoomWidgetHandlerContainer);
    getWidgetMessages(): any[];
    processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent;
    getProcessedEvents(): any[];
    update(): void;
    processEvent(param1: Event): void;
}

export const IRoomWidgetHandler = Symbol('com.sulake.habbo.ui::IRoomWidgetHandler');
registerClassName(IRoomWidgetHandler, 'com.sulake.habbo.ui::IRoomWidgetHandler');

export function isIRoomWidgetHandler(value: unknown): value is IRoomWidgetHandler {
    return (value as { [IRoomWidgetHandler]?: true } | null | undefined)?.[IRoomWidgetHandler] === true;
}
