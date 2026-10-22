import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IHabboLoadingScreen extends IDisposable {
    updateLoadingBar(progress: number): void;
    showError(message: string): void;
}
