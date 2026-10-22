import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export interface IProductImageWidget extends IWidget {
    get productInfo(): IProductDisplayInfo;
    set productInfo(param1: IProductDisplayInfo);
    get pivot(): number;
    set pivot(param1: number);
    get blend(): number;
    set blend(param1: number);
    set unknownImageUri(param1: string);
    clearPreviewer(): void;
    setPlaceholder(): void;
    setUnknownImage(): void;
}

export const IProductImageWidget = Symbol('com.sulake.habbo.window.widgets::IProductImageWidget');
registerClassName(IProductImageWidget, 'com.sulake.habbo.window.widgets::IProductImageWidget');

export function isIProductImageWidget(value: unknown): value is IProductImageWidget {
    return (value as { [IProductImageWidget]?: true } | null | undefined)?.[IProductImageWidget] === true;
}
