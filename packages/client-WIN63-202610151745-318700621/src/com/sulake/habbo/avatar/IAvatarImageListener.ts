import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IAvatarImageListener extends IDisposable {
    avatarImageReady(param1: string): void;
}
