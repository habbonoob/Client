import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IOfferProvider extends IDisposable {
    get enabled(): boolean;
    get videoAvailable(): boolean;
    get showingPopup(): boolean;
    load(): void;
    showVideo(): void;
}
