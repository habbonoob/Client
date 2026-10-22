import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IHabboLoadingScreen extends IDisposable {
    updateLoadingBar(param1: number): void;
    showError(param1: string): void;
}
