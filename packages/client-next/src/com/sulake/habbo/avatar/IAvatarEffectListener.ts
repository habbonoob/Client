import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IAvatarEffectListener extends IDisposable {
    avatarEffectReady(param1: number): void;
}
