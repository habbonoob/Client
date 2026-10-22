import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { ISkinLayout } from '@/com/sulake/core/window/graphics/renderer/ISkinLayout';
import type { ISkinTemplate } from '@/com/sulake/core/window/graphics/renderer/ISkinTemplate';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';

export interface ISkinRenderer extends IDisposable {
    get name(): string;
    parse(param1: IAsset, param2: XMLList, param3: IAssetLibrary): void;
    draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void;
    isStateDrawable(param1: number): boolean;
    addLayout(param1: ISkinLayout): ISkinLayout;
    getLayoutByName(param1: string): ISkinLayout;
    removeLayout(param1: ISkinLayout): ISkinLayout;
    getLayoutByState(param1: number): ISkinLayout;
    registerLayoutForRenderState(param1: number, param2: string): void;
    removeLayoutFromRenderState(param1: number): void;
    hasLayoutForState(param1: number): boolean;
    addTemplate(param1: ISkinTemplate): ISkinTemplate;
    getTemplateByName(param1: string): ISkinTemplate;
    removeTemplate(param1: ISkinTemplate): ISkinTemplate;
    getTemplateByState(param1: number): ISkinTemplate;
    registerTemplateForRenderState(param1: number, param2: string): void;
    removeTemplateFromRenderState(param1: number): void;
    hasTemplateForState(param1: number): boolean;
}

export const ISkinRenderer = Symbol('com.sulake.core.window.graphics.renderer::ISkinRenderer');
registerClassName(ISkinRenderer, 'com.sulake.core.window.graphics.renderer::ISkinRenderer');

export function isISkinRenderer(value: unknown): value is ISkinRenderer {
    return (value as { [ISkinRenderer]?: true } | null | undefined)?.[ISkinRenderer] === true;
}
