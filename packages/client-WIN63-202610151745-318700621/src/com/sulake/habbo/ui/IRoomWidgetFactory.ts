import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';

export interface IRoomWidgetFactory extends IDisposable {
    createWidget(param1: string, param2: IRoomWidgetHandler): IRoomWidget;
}
