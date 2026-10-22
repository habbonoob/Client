import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IHabboNotifications extends IUnknown {
    addItem(param1: string, param2: string, param3?: string, param4?: string, param5?: any): void;
    addItemWithBitmap(param1: string, param2: string, param3?: BitmapData, param4?: string, param5?: any): void;
    removeNotificationById(param1: string): void;
    showNotification(param1: string, param2?: UtilsMap): void;
    addSongPlayingNotification(param1: string, param2: string): void;
}

export const IHabboNotifications = Symbol('com.sulake.habbo.notifications::IHabboNotifications');
registerClassName(IHabboNotifications, 'com.sulake.habbo.notifications::IHabboNotifications');

export function isIHabboNotifications(value: unknown): value is IHabboNotifications {
    return (value as { [IHabboNotifications]?: true } | null | undefined)?.[IHabboNotifications] === true;
}
