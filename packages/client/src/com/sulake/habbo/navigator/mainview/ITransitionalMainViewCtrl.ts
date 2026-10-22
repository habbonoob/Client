import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { TextSearchInputs } from '@/com/sulake/habbo/navigator/TextSearchInputs';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export interface ITransitionalMainViewCtrl {
    get disposed(): boolean;
    get mainWindow(): IFrameWindow;
    get searchInput(): TextSearchInputs;
    get isPhaseOneNavigator(): boolean;
    onNavigatorToolBarIconClick(): void;
    dispose(): void;
    open(): void;
    isOpen(): boolean;
    close(): void;
    refresh(): void;
    reloadRoomList(param1: number): boolean;
    startSearch(param1: number, param2: number, param3?: string, param4?: number): void;
    update(param1: number): void;
    openAtPosition(param1: Point): void;
}
