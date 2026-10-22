import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IPane extends IDisposable {
    get paneLevel(): number;
    set isVisible(param1: boolean);
    get isVisible(): boolean;
}

export const IPane = Symbol('com.sulake.habbo.notifications.feed.view.pane::IPane');
registerClassName(IPane, 'com.sulake.habbo.notifications.feed.view.pane::IPane');

export function isIPane(value: unknown): value is IPane {
    return (value as { [IPane]?: true } | null | undefined)?.[IPane] === true;
}
