import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILimitedItemOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemOverlayWidget';

export interface ILimitedItemPreviewOverlayWidget extends ILimitedItemOverlayWidget {
}

export const ILimitedItemPreviewOverlayWidget = Symbol('com.sulake.habbo.window.widgets::ILimitedItemPreviewOverlayWidget');
registerClassName(ILimitedItemPreviewOverlayWidget, 'com.sulake.habbo.window.widgets::ILimitedItemPreviewOverlayWidget');

export function isILimitedItemPreviewOverlayWidget(value: unknown): value is ILimitedItemPreviewOverlayWidget {
    return (value as { [ILimitedItemPreviewOverlayWidget]?: true } | null | undefined)?.[ILimitedItemPreviewOverlayWidget] === true;
}
