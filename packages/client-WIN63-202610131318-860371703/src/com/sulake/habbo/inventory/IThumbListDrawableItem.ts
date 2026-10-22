import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IThumbListDrawableItem {
    set iconImage(param1: BitmapData);
    get iconImage(): BitmapData;
    set isSelected(param1: boolean);
    get isSelected(): boolean;
}

export const IThumbListDrawableItem = Symbol('com.sulake.habbo.inventory::IThumbListDrawableItem');
registerClassName(IThumbListDrawableItem, 'com.sulake.habbo.inventory::IThumbListDrawableItem');

export function isIThumbListDrawableItem(value: unknown): value is IThumbListDrawableItem {
    return (value as { [IThumbListDrawableItem]?: true } | null | undefined)?.[IThumbListDrawableItem] === true;
}
