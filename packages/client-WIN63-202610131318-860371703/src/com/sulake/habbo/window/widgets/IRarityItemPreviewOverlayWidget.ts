import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRarityItemOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemOverlayWidget';

export interface IRarityItemPreviewOverlayWidget extends IRarityItemOverlayWidget {
}

export const IRarityItemPreviewOverlayWidget = Symbol('com.sulake.habbo.window.widgets::IRarityItemPreviewOverlayWidget');
registerClassName(IRarityItemPreviewOverlayWidget, 'com.sulake.habbo.window.widgets::IRarityItemPreviewOverlayWidget');

export function isIRarityItemPreviewOverlayWidget(value: unknown): value is IRarityItemPreviewOverlayWidget {
    return (value as { [IRarityItemPreviewOverlayWidget]?: true } | null | undefined)?.[IRarityItemPreviewOverlayWidget] === true;
}
