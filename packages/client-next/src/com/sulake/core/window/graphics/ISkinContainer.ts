import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { DefaultAttStruct } from '@/com/sulake/core/window/utils/DefaultAttStruct';

export interface ISkinContainer extends IDisposable {
    getSkinRendererByTypeAndStyle(param1: number, param2: number): ISkinRenderer;
    getDefaultAttributesByTypeAndStyle(param1: number, param2: number): DefaultAttStruct;
    getTheActualState(param1: number, param2: number, param3: number): number;
}
