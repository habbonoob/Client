import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILimitedItemOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemOverlayWidget';

export interface ILimitedItemGridOverlayWidget extends ILimitedItemOverlayWidget {
    get animated(): boolean;
    set animated(param1: boolean);
}

export const ILimitedItemGridOverlayWidget = Symbol('com.sulake.habbo.window.widgets::ILimitedItemGridOverlayWidget');
registerClassName(ILimitedItemGridOverlayWidget, 'com.sulake.habbo.window.widgets::ILimitedItemGridOverlayWidget');

export function isILimitedItemGridOverlayWidget(value: unknown): value is ILimitedItemGridOverlayWidget {
    return (value as { [ILimitedItemGridOverlayWidget]?: true } | null | undefined)?.[ILimitedItemGridOverlayWidget] === true;
}
