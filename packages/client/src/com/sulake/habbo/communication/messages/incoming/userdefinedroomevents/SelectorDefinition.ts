import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';

export class SelectorDefinition extends Triggerable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::SelectorDefinition'); }

    constructor(param1: IMessageDataWrapper) {
        super(param1);
    }

    declare private _isFilter: boolean;

    declare private _isInvert: boolean;

    public get isFilter(): boolean {
        return this._isFilter;
    }

    public set isFilter(param1: boolean) {
        this._isFilter = param1;
    }

    public get isInvert(): boolean {
        return this._isInvert;
    }

    public set isInvert(param1: boolean) {
        this._isInvert = param1;
    }

    protected override readDefinitionSpecifics(param1: IMessageDataWrapper): void {
        this._isFilter = param1.readBoolean();
        this._isInvert = param1.readBoolean();
    }

    protected override initInstanceFields(): void {
        this._isFilter = false;
        this._isInvert = false;
        super.initInstanceFields();
    }
}
