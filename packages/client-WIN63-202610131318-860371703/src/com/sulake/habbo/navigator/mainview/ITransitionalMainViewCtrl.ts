import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { TextSearchInputs } from '@/com/sulake/habbo/navigator/TextSearchInputs';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface ITransitionalMainViewCtrl {
    get disposed(): boolean;
    onNavigatorToolBarIconClick(): void;
    dispose(): void;
    open(): void;
    isOpen(): boolean;
    close(): void;
    get mainWindow(): IFrameWindow;
    refresh(): void;
    reloadRoomList(param1: number): boolean;
    startSearch(param1: number, param2: number, param3?: string, param4?: number): void;
    update(param1: number): void;
    get searchInput(): TextSearchInputs;
    openAtPosition(param1: Point): void;
    get isPhaseOneNavigator(): boolean;
}
