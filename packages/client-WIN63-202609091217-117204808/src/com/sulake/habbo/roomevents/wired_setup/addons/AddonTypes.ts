import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import { AddonDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/AddonDefinition';
import { _SafeCls_2023 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_2023';
import { _SafeCls_6102 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6102';
import { _SafeCls_6103 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6103';
import { _SafeCls_6104 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6104';
import { AnimationTime } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AnimationTime';
import { CarryUsers } from '@/com/sulake/habbo/roomevents/wired_setup/addons/CarryUsers';
import { ChestItemTypeScanner } from '@/com/sulake/habbo/roomevents/wired_setup/addons/chests/ChestItemTypeScanner';
import { CustomContract } from '@/com/sulake/habbo/roomevents/wired_setup/addons/chests/CustomContract';
import { ConditionEvaluation } from '@/com/sulake/habbo/roomevents/wired_setup/addons/ConditionEvaluation';
import { ExceedExecutions } from '@/com/sulake/habbo/roomevents/wired_setup/addons/ExceedExecutions';
import { ExecuteInOrder } from '@/com/sulake/habbo/roomevents/wired_setup/addons/ExecuteInOrder';
import { FurniNamePlaceholderAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/FurniNamePlaceholderAddon';
import { FurniSelectorFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/FurniSelectorFilter';
import { FurniVariableFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/FurniVariableFilter';
import { GlobalPlaceholderAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/GlobalPlaceholderAddon';
import { MovePhysics } from '@/com/sulake/habbo/roomevents/wired_setup/addons/MovePhysics';
import { NoMoveAnimation } from '@/com/sulake/habbo/roomevents/wired_setup/addons/NoMoveAnimation';
import { PickOneRandomlyPropagation } from '@/com/sulake/habbo/roomevents/wired_setup/addons/PickOneRandomlyPropagation';
import { UsernamePlaceholderAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/UsernamePlaceholderAddon';
import { UserSelectorFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/UserSelectorFilter';
import { UserVariableFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/UserVariableFilter';
import { VariableCapturerAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableCapturerAddon';
import { _SafeCls_6096 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6096';
import { _SafeCls_6097 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6097';
import { _SafeCls_6098 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6098';
import { _SafeCls_6099 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6099';
import { _SafeCls_6100 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6100';
import { _SafeCls_6101 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6101';
import { VariableLvlUpAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableLvlUpAddon';
import { VariablePlaceholderAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariablePlaceholderAddon';
import { VariablesWebApiAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariablesWebApiAddon';
import { VariableTextConnectorAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableTextConnectorAddon';
import { VariableTimeUtilAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableTimeUtilAddon';

export class AddonTypes implements ElementTypeHolder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::AddonTypes'); }

    private _types: any[] = [];

    constructor() {
        this._types.push(new ConditionEvaluation());
        this._types.push(new PickOneRandomlyPropagation());
        this._types.push(new _SafeCls_2023());
        this._types.push(new ExceedExecutions());
        this._types.push(new NoMoveAnimation());
        this._types.push(new MovePhysics());
        this._types.push(new CarryUsers());
        this._types.push(new AnimationTime());
        this._types.push(new FurniSelectorFilter());
        this._types.push(new UserSelectorFilter());
        this._types.push(new FurniVariableFilter());
        this._types.push(new UserVariableFilter());
        this._types.push(new UsernamePlaceholderAddon());
        this._types.push(new VariablePlaceholderAddon());
        this._types.push(new VariableCapturerAddon());
        this._types.push(new ExecuteInOrder());
        this._types.push(new ChestItemTypeScanner());
        this._types.push(new FurniNamePlaceholderAddon());
        this._types.push(new CustomContract());
        this._types.push(new _SafeCls_6102());
        this._types.push(new _SafeCls_6103());
        this._types.push(new VariableTextConnectorAddon());
        this._types.push(new VariableLvlUpAddon());
        this._types.push(new VariableTimeUtilAddon());
        this._types.push(new _SafeCls_6099());
        this._types.push(new _SafeCls_6096());
        this._types.push(new _SafeCls_6100());
        this._types.push(new _SafeCls_6097());
        this._types.push(new _SafeCls_6101());
        this._types.push(new _SafeCls_6098());
        this._types.push(new GlobalPlaceholderAddon());
        this._types.push(new _SafeCls_6104());
        this._types.push(new VariablesWebApiAddon());
    }

    public getElementByCode(param1: number): Element {
        for (const _loc2_ of this._types ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getKey(): string {
        return "addon";
    }

    public acceptTriggerable(param1: Triggerable): boolean {
        return (param1 instanceof AddonDefinition ? param1 : null) != null;
    }
}
