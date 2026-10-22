import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';

export interface VariableFxRenderer {
    get frame(): VariableFxFrame;
    get isContinuous(): boolean;
    updateData(param1: VariableFxRendererContext, param2: number): void;
    needsUpdate(param1: number): boolean;
    update(param1: number): boolean;
    dispose(): void;
}

export const VariableFxRenderer = Symbol('com.sulake.habbo.room.object.visualization.variablefx::VariableFxRenderer');
registerClassName(VariableFxRenderer, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxRenderer');

export function isVariableFxRenderer(value: unknown): value is VariableFxRenderer {
    return (value as { [VariableFxRenderer]?: true } | null | undefined)?.[VariableFxRenderer] === true;
}
