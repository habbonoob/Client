import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface VariableFxRendererPrebake {
    dispose(): void;
}

export const VariableFxRendererPrebake = Symbol('com.sulake.habbo.room.object.visualization.variablefx::VariableFxRendererPrebake');
registerClassName(VariableFxRendererPrebake, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxRendererPrebake');

export function isVariableFxRendererPrebake(value: unknown): value is VariableFxRendererPrebake {
    return (value as { [VariableFxRendererPrebake]?: true } | null | undefined)?.[VariableFxRendererPrebake] === true;
}
