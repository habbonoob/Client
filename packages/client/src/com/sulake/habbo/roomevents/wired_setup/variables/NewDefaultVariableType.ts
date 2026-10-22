import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import { VariableAvailabilityType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableAvailabilityType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { VariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableType';

export class NewDefaultVariableType extends DefaultElement implements VariableType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::NewDefaultVariableType'); }

    protected static isVariableStored(param1: number): boolean {
        return param1 == VariableAvailabilityType._SafeStr_6650 || param1 == VariableAvailabilityType._SafeStr_6788;
    }

    constructor() {
        super();
    }

    declare private _initialVariableName: string;

    public get initialVariableName(): string {
        return this._initialVariableName;
    }

    public set initialVariableName(param1: string) {
        this._initialVariableName = param1;
        this.variableNameSection.variableName = param1;
    }

    protected get variableNameSection(): VariableNameSection {
        return null;
    }

    public variableType(): number {
        return 0;
    }

    get [VariableType](): true {
        return true;
    }
}
