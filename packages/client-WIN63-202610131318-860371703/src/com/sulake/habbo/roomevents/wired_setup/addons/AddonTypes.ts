import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import { AddonDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/AddonDefinition';
import { _SafeCls_2023 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_2023';
import { _SafeCls_6105 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6105';
import { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6106';
import { _SafeCls_6107 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6107';
import { _SafeCls_6108 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6108';
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
import { VariableLeaderboardAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardAddon';
import { MovePhysics } from '@/com/sulake/habbo/roomevents/wired_setup/addons/MovePhysics';
import { NoMoveAnimation } from '@/com/sulake/habbo/roomevents/wired_setup/addons/NoMoveAnimation';
import { PickOneRandomlyPropagation } from '@/com/sulake/habbo/roomevents/wired_setup/addons/PickOneRandomlyPropagation';
import { UsernamePlaceholderAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/UsernamePlaceholderAddon';
import { UserSelectorFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/UserSelectorFilter';
import { UserVariableFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/UserVariableFilter';
import { VariableAddonImportAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableAddonImportAddon';
import { VariableAddonShareAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableAddonShareAddon';
import { VariableCapturerAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableCapturerAddon';
import { VariableFxBossBarAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/VariableFxBossBarAddon';
import { VariableFxHealthPointsAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/VariableFxHealthPointsAddon';
import { VariableFxLevellingProgressAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/VariableFxLevellingProgressAddon';
import { VariableFxNumberDisplayAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/VariableFxNumberDisplayAddon';
import { VariableFxProgressBarAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/VariableFxProgressBarAddon';
import { VariableFxStatusBarAddon } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/VariableFxStatusBarAddon';
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
        this._types.push(new _SafeCls_6107());
        this._types.push(new _SafeCls_6106());
        this._types.push(new VariableTextConnectorAddon());
        this._types.push(new VariableLvlUpAddon());
        this._types.push(new VariableTimeUtilAddon());
        this._types.push(new VariableAddonShareAddon());
        this._types.push(new VariableAddonImportAddon());
        this._types.push(new VariableLeaderboardAddon());
        this._types.push(new VariableFxHealthPointsAddon());
        this._types.push(new VariableFxProgressBarAddon());
        this._types.push(new VariableFxLevellingProgressAddon());
        this._types.push(new VariableFxStatusBarAddon());
        this._types.push(new VariableFxBossBarAddon());
        this._types.push(new VariableFxNumberDisplayAddon());
        this._types.push(new GlobalPlaceholderAddon());
        this._types.push(new _SafeCls_6108());
        this._types.push(new VariablesWebApiAddon());
        this._types.push(new _SafeCls_6105());
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
