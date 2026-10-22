import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';

export interface ITrackedWindow extends IDisposable {
    getType(): number;
    getId(): string;
    getFrame(): IFrameWindow;
    show(): void;
}

export const ITrackedWindow = Symbol('com.sulake.habbo.moderation::ITrackedWindow');
registerClassName(ITrackedWindow, 'com.sulake.habbo.moderation::ITrackedWindow');

export function isITrackedWindow(value: unknown): value is ITrackedWindow {
    return (value as { [ITrackedWindow]?: true } | null | undefined)?.[ITrackedWindow] === true;
}
