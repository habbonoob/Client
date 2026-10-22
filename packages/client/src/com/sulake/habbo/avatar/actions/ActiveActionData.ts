import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IActionDefinition } from '@/com/sulake/habbo/avatar/actions/IActionDefinition';
import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';

export class ActiveActionData implements IActiveActionData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.actions::ActiveActionData'); }

    constructor(param1: string, param2: string = "", param3: number = 0) {
        this._actionType = param1;
        this._actionParameter = param2;
        this._startFrame = param3;
    }

    private _actionType: string = "";
    private _actionParameter: string = "";

    declare private _definition: IActionDefinition;

    private _startFrame: number = 0;

    public get startFrame(): number {
        return this._startFrame;
    }

    declare private _overridingAction: string;

    public get overridingAction(): string {
        return this._overridingAction;
    }

    public set overridingAction(param1: string) {
        this._overridingAction = param1;
    }

    public get actionType(): string {
        return this._actionType;
    }

    public get actionParameter(): string {
        return this._actionParameter;
    }

    public set actionParameter(param1: string) {
        this._actionParameter = param1;
    }

    public get definition(): IActionDefinition {
        return this._definition;
    }

    public set definition(param1: IActionDefinition) {
        this._definition = param1;
    }

    public get id(): string {
        if (this._definition == null) {
            return "";
        }
        return this._definition.id + "_" + this._actionParameter;
    }

    public dispose(): void {
        this._actionType = null;
        this._actionParameter = null;
        this._definition = null;
    }

    public toString(): string {
        return "Action: " + this._actionType + "  param: " + this._actionParameter;
    }
}
