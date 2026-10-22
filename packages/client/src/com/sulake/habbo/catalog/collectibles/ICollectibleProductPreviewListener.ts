import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';

export interface ICollectibleProductPreviewListener extends IGetImageListener, IDisposable {
    set imageResult(param1: ImageResult);
    set avatarResult(param1: string);
    set badgeResult(param1: string);
    set petResult(param1: string);
    clearPreviewer(): void;
    setEffectResult(param1: string, param2: number): void;
    setUnknownImage(): void;
}
