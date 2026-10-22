import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import type { IRoomWidgetMessageListener } from '@/com/sulake/habbo/ui/widget/IRoomWidgetMessageListener';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';

export interface IContextMenuParentWidget {
    get assets(): IAssetLibrary;
    get windowManager(): IHabboWindowManager;
    get messageListener(): IRoomWidgetMessageListener;
    get catalog(): IHabboCatalog;
    get friendList(): IHabboFriendList;
    removeView(param1: ContextInfoView, param2: boolean): void;
}

export const IContextMenuParentWidget = Symbol('com.sulake.habbo.ui.widget.contextmenu::IContextMenuParentWidget');
registerClassName(IContextMenuParentWidget, 'com.sulake.habbo.ui.widget.contextmenu::IContextMenuParentWidget');

export function isIContextMenuParentWidget(value: unknown): value is IContextMenuParentWidget {
    return (value as { [IContextMenuParentWidget]?: true } | null | undefined)?.[IContextMenuParentWidget] === true;
}
