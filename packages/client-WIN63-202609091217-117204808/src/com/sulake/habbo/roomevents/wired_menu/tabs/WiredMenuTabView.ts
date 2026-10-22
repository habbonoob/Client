import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface WiredMenuTabView extends IDisposable {
    setTabActive(): void;
    setTabInactive(): void;
    startViewing(): void;
    stopViewing(): void;
    permissionsUpdated(): void;
}
