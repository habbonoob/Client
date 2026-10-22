import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';

export interface IMeMenuView {
    init(param1: MeMenuWidget, param2: string): void;
    dispose(): void;
    get window(): IWindowContainer;
    updateUnseenItemCount(param1: string, param2: number): void;
}
