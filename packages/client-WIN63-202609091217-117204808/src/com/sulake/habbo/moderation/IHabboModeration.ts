import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';

export interface IHabboModeration extends IUnknown {
    userSelected(param1: number, param2: string): void;
}
