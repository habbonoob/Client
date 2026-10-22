import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IPollDialog extends IDisposable {
    start(): void;
}
