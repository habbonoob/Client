import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableLeaderboardDescriptorChoice {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.variableleaderboard::VariableLeaderboardDescriptorChoice'); }

    declare private _SafeStr_7039: string;

    declare private _SafeStr_14145: string;

    constructor(param1: string, param2: string) {
        this._SafeStr_7039 = param1;
        this._SafeStr_14145 = param2;
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public get displayName(): string {
        return this._SafeStr_14145;
    }
}
