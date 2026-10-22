import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';

export interface IRoomUI extends IUnknown {
    createDesktop(param1: IRoomSession): IRoomDesktop;
    get chatContainer(): IDisplayObjectWrapper;
    disposeDesktop(): void;
    get desktop(): IRoomDesktop;
    getActiveCanvasId(param1: number): number;
    set visible(param1: boolean);
    hideWidget(param1: string): void;
    showGamePlayerName(param1: number, param2: string, param3: number, param4: number): void;
    mouseEventPositionHasContextMenu(param1: MouseEvent): boolean;
    triggerbottomBarResize(): void;
}

export const IRoomUI = Symbol('com.sulake.habbo.ui::IRoomUI');
registerClassName(IRoomUI, 'com.sulake.habbo.ui::IRoomUI');

export function isIRoomUI(value: unknown): value is IRoomUI {
    return (value as { [IRoomUI]?: true } | null | undefined)?.[IRoomUI] === true;
}
