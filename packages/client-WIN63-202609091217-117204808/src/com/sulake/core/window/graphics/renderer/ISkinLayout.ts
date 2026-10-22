import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChildEntityArray } from '@/com/sulake/core/window/utils/IChildEntityArray';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface ISkinLayout extends IChildEntityArray {
    get name(): string;
    get width(): number;
    get height(): number;
    get blendMode(): string;
    get transparent(): boolean;
    dispose(): void;
    isFixedWidth(): boolean;
    isFixedHeight(): boolean;
    getDefaultRegion(param1: string, param2: Rectangle): void;
}

export const ISkinLayout = Symbol('com.sulake.core.window.graphics.renderer::ISkinLayout');
registerClassName(ISkinLayout, 'com.sulake.core.window.graphics.renderer::ISkinLayout');

export function isISkinLayout(value: unknown): value is ISkinLayout {
    return (value as { [ISkinLayout]?: true } | null | undefined)?.[ISkinLayout] === true;
}
