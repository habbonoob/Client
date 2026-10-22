import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetMessageListener } from '@/com/sulake/habbo/ui/widget/IRoomWidgetMessageListener';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IRoomWidget {
    get state(): number;
    set messageListener(param1: IRoomWidgetMessageListener);
    get mainWindow(): IWindow;
    get reusable(): boolean;
    set reusable(param1: boolean);
    get widgetType(): string;
    set widgetType(param1: string);
    initialize(param1?: number): void;
    dispose(): void;
    registerUpdateEvents(param1: IEventDispatcher): void;
    unregisterUpdateEvents(param1: IEventDispatcher): void;
    release(): void;
    reuse(param1: IRoomDesktop): void;
}

export const IRoomWidget = Symbol('com.sulake.habbo.ui.widget::IRoomWidget');
registerClassName(IRoomWidget, 'com.sulake.habbo.ui.widget::IRoomWidget');

export function isIRoomWidget(value: unknown): value is IRoomWidget {
    return (value as { [IRoomWidget]?: true } | null | undefined)?.[IRoomWidget] === true;
}
