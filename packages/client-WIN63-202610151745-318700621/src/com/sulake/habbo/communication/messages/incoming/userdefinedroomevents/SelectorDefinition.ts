import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';

export class SelectorDefinition extends Triggerable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::SelectorDefinition'); }

    declare private _SafeStr_5251: boolean;

    declare private _SafeStr_5019: boolean;

    constructor(param1: IMessageDataWrapper) {
        super(param1);
    }

    protected override readDefinitionSpecifics(param1: IMessageDataWrapper): void {
        this._SafeStr_5251 = param1.readBoolean();
        this._SafeStr_5019 = param1.readBoolean();
    }

    public set isFilter(param1: boolean) {
        this._SafeStr_5251 = param1;
    }

    public set isInvert(param1: boolean) {
        this._SafeStr_5019 = param1;
    }

    public get isFilter(): boolean {
        return this._SafeStr_5251;
    }

    public get isInvert(): boolean {
        return this._SafeStr_5019;
    }

    protected override initInstanceFields(): void {
        this._SafeStr_5251 = false;
        this._SafeStr_5019 = false;
        super.initInstanceFields();
    }
}
