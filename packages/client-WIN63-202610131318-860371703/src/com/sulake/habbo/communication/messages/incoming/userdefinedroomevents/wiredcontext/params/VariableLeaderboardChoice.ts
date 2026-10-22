import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class VariableLeaderboardChoice {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::VariableLeaderboardChoice'); }

    declare private _SafeStr_7039: string;

    declare private _SafeStr_14069: string;

    declare private _SafeStr_14070: boolean;
    static { (this.prototype as any)._SafeStr_14070 = false; }

    declare private _canCreateAndDelete: boolean;
    static { (this.prototype as any)._canCreateAndDelete = false; }

    declare private _SafeStr_14071: number;
    static { (this.prototype as any)._SafeStr_14071 = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_7039 = param1.readString();
        this._SafeStr_14069 = param1.readString();
        this._SafeStr_14070 = param1.readBoolean();
        this._canCreateAndDelete = param1.readBoolean();
        this._SafeStr_14071 = param1.readInteger();
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public get technicalName(): string {
        return this._SafeStr_14069;
    }

    public get persistent(): boolean {
        return this._SafeStr_14070;
    }

    public get hasValue(): boolean {
        return this._canCreateAndDelete;
    }

    public get applicableLevelUpCount(): number {
        return this._SafeStr_14071;
    }
}
