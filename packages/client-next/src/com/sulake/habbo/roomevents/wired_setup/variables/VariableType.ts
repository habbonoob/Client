import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';

export interface VariableType extends Element {
    get initialVariableName(): string;
    variableType(): number;
}

export const VariableType = Symbol('com.sulake.habbo.roomevents.wired_setup.variables::VariableType');
registerClassName(VariableType, 'com.sulake.habbo.roomevents.wired_setup.variables::VariableType');

export function isVariableType(value: unknown): value is VariableType {
    return (value as { [VariableType]?: true } | null | undefined)?.[VariableType] === true;
}
