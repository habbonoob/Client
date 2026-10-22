import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';

export interface IDisplayObjectWrapper extends IWindow {
    setDisplayObject(param1: DisplayObject): void;
    getDisplayObject(): DisplayObject;
}

export const IDisplayObjectWrapper = Symbol('com.sulake.core.window.components::IDisplayObjectWrapper');
registerClassName(IDisplayObjectWrapper, 'com.sulake.core.window.components::IDisplayObjectWrapper');

export function isIDisplayObjectWrapper(value: unknown): value is IDisplayObjectWrapper {
    return (value as { [IDisplayObjectWrapper]?: true } | null | undefined)?.[IDisplayObjectWrapper] === true;
}
