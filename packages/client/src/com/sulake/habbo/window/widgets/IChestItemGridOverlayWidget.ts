import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IChestItemGridOverlayWidget extends IWidget {
    get contentsCount(): number;
    set contentsCount(param1: number);
    get color(): string;
    set color(param1: string);
}

export const IChestItemGridOverlayWidget = Symbol('com.sulake.habbo.window.widgets::IChestItemGridOverlayWidget');
registerClassName(IChestItemGridOverlayWidget, 'com.sulake.habbo.window.widgets::IChestItemGridOverlayWidget');

export function isIChestItemGridOverlayWidget(value: unknown): value is IChestItemGridOverlayWidget {
    return (value as { [IChestItemGridOverlayWidget]?: true } | null | undefined)?.[IChestItemGridOverlayWidget] === true;
}
