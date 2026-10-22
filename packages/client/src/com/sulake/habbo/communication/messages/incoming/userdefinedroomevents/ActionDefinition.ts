import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';

export class ActionDefinition extends Triggerable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::ActionDefinition'); }

    constructor(param1: IMessageDataWrapper) {
        super(param1);
    }

    declare private _delayInPulses: number;

    public get delayInPulses(): number {
        return this._delayInPulses;
    }

    public set delayInPulses(param1: number) {
        this._delayInPulses = param1;
    }

    protected override readDefinitionSpecifics(param1: IMessageDataWrapper): void {
        this._delayInPulses = param1.readInteger();
    }

    protected override initInstanceFields(): void {
        this._delayInPulses = 0;
        super.initInstanceFields();
    }
}
