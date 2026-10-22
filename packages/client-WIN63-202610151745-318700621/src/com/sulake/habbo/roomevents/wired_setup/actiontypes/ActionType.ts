import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';

export interface ActionType extends Element {
    get allowDelaying(): boolean;
}

export const ActionType = Symbol('com.sulake.habbo.roomevents.wired_setup.actiontypes::ActionType');
registerClassName(ActionType, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::ActionType');

export function isActionType(value: unknown): value is ActionType {
    return (value as { [ActionType]?: true } | null | undefined)?.[ActionType] === true;
}
