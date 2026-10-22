import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IWidgetFactory {
    createWidget(param1: string, param2: IWidgetWindow): IWidget;
}
