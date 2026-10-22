import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';

export interface IMeMenuView {
    get window(): IWindowContainer;
    init(param1: MeMenuWidget, param2: string): void;
    dispose(): void;
    updateUnseenItemCount(param1: string, param2: number): void;
}
