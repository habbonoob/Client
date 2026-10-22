import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';

export interface IBadgeImageWidget extends IWidget, IBitmapDataContainer {
    get type(): string;
    set type(param1: string);
    get badgeId(): string;
    set badgeId(param1: string);
    get groupId(): number;
    set groupId(param1: number);
    refresh(): void;
}

export const IBadgeImageWidget = Symbol('com.sulake.habbo.window.widgets::IBadgeImageWidget');
registerClassName(IBadgeImageWidget, 'com.sulake.habbo.window.widgets::IBadgeImageWidget');

export function isIBadgeImageWidget(value: unknown): value is IBadgeImageWidget {
    return (value as { [IBadgeImageWidget]?: true } | null | undefined)?.[IBadgeImageWidget] === true;
}
