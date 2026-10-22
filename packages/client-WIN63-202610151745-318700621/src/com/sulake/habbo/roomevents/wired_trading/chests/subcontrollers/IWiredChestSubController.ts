import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export interface IWiredChestSubController extends IDisposable {
    get type(): number;
    get title(): string;
    get view(): IWindowContainer;
    get isEmpty(): boolean;
    get itemCount(): number;
    clear(): void;
    updateUI(): void;
    get allowResizing(): boolean;
}
