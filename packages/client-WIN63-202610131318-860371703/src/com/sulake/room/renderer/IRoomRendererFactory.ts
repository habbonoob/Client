import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IRoomRenderer } from '@/com/sulake/room/renderer/IRoomRenderer';

export interface IRoomRendererFactory extends IUnknown {
    createRenderer(): IRoomRenderer;
}
