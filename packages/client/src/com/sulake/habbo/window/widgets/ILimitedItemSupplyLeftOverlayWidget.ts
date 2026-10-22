import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILimitedItemOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemOverlayWidget';

export interface ILimitedItemSupplyLeftOverlayWidget extends ILimitedItemOverlayWidget {
    get supplyLeft(): number;
    set supplyLeft(param1: number);
}

export const ILimitedItemSupplyLeftOverlayWidget = Symbol('com.sulake.habbo.window.widgets::ILimitedItemSupplyLeftOverlayWidget');
registerClassName(ILimitedItemSupplyLeftOverlayWidget, 'com.sulake.habbo.window.widgets::ILimitedItemSupplyLeftOverlayWidget');

export function isILimitedItemSupplyLeftOverlayWidget(value: unknown): value is ILimitedItemSupplyLeftOverlayWidget {
    return (value as { [ILimitedItemSupplyLeftOverlayWidget]?: true } | null | undefined)?.[ILimitedItemSupplyLeftOverlayWidget] === true;
}
