import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRarityItemOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemOverlayWidget';

export interface IRarityItemGridOverlayWidget extends IRarityItemOverlayWidget {
}

export const IRarityItemGridOverlayWidget = Symbol('com.sulake.habbo.window.widgets::IRarityItemGridOverlayWidget');
registerClassName(IRarityItemGridOverlayWidget, 'com.sulake.habbo.window.widgets::IRarityItemGridOverlayWidget');

export function isIRarityItemGridOverlayWidget(value: unknown): value is IRarityItemGridOverlayWidget {
    return (value as { [IRarityItemGridOverlayWidget]?: true } | null | undefined)?.[IRarityItemGridOverlayWidget] === true;
}
