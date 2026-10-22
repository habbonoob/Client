import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';

export interface IActiveActionData {
    get id(): string;
    get actionType(): string;
    get actionParameter(): string;
    set actionParameter(param1: string);
    get startFrame(): number;
    get definition(): IActionDefinition;
    set definition(param1: IActionDefinition);
    get overridingAction(): string;
    set overridingAction(param1: string);
}
