import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicContext } from '@/com/sulake/core/window/graphics/IGraphicContext';

export interface IGraphicContextHost {
    get name(): string;
    getGraphicContext(param1: boolean): IGraphicContext;
    hasGraphicsContext(): boolean;
}

export const IGraphicContextHost = Symbol('com.sulake.core.window.graphics::IGraphicContextHost');
registerClassName(IGraphicContextHost, 'com.sulake.core.window.graphics::IGraphicContextHost');

export function isIGraphicContextHost(value: unknown): value is IGraphicContextHost {
    return (value as { [IGraphicContextHost]?: true } | null | undefined)?.[IGraphicContextHost] === true;
}
