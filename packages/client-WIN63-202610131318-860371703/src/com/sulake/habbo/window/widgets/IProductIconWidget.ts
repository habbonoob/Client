import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export interface IProductIconWidget extends IWidget {
    set productInfo(param1: IProductDisplayInfo);
    get productInfo(): IProductDisplayInfo;
    set blend(param1: number);
    get blend(): number;
    set unknownImageUri(param1: string);
}

export const IProductIconWidget = Symbol('com.sulake.habbo.window.widgets::IProductIconWidget');
registerClassName(IProductIconWidget, 'com.sulake.habbo.window.widgets::IProductIconWidget');

export function isIProductIconWidget(value: unknown): value is IProductIconWidget {
    return (value as { [IProductIconWidget]?: true } | null | undefined)?.[IProductIconWidget] === true;
}
