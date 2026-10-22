import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { _SafeCls_1969 } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/_SafeCls_1969';

export class AllVariablesInRoom extends _SafeCls_1969 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::AllVariablesInRoom'); }

    declare private _SafeStr_4921: number;
    static { (this.prototype as any)._SafeStr_4921 = 0; }

    private _variables: any[] = null;

    constructor(param1: IMessageDataWrapper) {
        super();
        this._SafeStr_4921 = param1.readInteger();
    }

    public override get variables(): any[] {
        return this._variables;
    }

    public get needsSynchronize(): boolean {
        return this._variables == null;
    }

    public get hash(): number {
        return this._SafeStr_4921;
    }

    public synchronize(param1: WiredVariable[]): void {
        this._variables = [];
        for (const _loc2_ of param1 ?? []) {
            this._variables.push(_loc2_);
        }
    }
}
