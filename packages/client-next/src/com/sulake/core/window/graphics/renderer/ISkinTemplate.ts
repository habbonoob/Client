import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';
import type { IChildEntityArray } from '@/com/sulake/core/window/utils/IChildEntityArray';

export interface ISkinTemplate extends IChildEntityArray, IChildEntity {
    get asset(): IAsset;
    dispose(): void;
}

export const ISkinTemplate = Symbol('com.sulake.core.window.graphics.renderer::ISkinTemplate');
registerClassName(ISkinTemplate, 'com.sulake.core.window.graphics.renderer::ISkinTemplate');

export function isISkinTemplate(value: unknown): value is ISkinTemplate {
    return (value as { [ISkinTemplate]?: true } | null | undefined)?.[ISkinTemplate] === true;
}
