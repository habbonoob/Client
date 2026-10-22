import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';

export class ConditionDefinition extends Triggerable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::ConditionDefinition'); }

    declare private _quantifierCode: number;

    declare private _quantifierType: number;

    declare private _SafeStr_5019: boolean;

    constructor(param1: IMessageDataWrapper) {
        super(param1);
    }

    protected override readDefinitionSpecifics(param1: IMessageDataWrapper): void {
        this._quantifierCode = param1.readInteger();
    }

    protected override readTypeSpecifics(param1: IMessageDataWrapper): void {
        this._quantifierType = param1.readByte();
        this._SafeStr_5019 = param1.readBoolean();
    }

    public get quantifierCode(): number {
        return this._quantifierCode;
    }

    public set quantifierCode(param1: number) {
        this._quantifierCode = param1;
    }

    public get quantifierType(): number {
        return this._quantifierType;
    }

    public get isInvert(): boolean {
        return this._SafeStr_5019;
    }

    public override get usingCustomInputSources(): boolean {
        return super.usingCustomInputSources || this.quantifierCode != 0;
    }

    protected override initInstanceFields(): void {
        this._quantifierCode = 0;
        this._quantifierType = 0;
        this._SafeStr_5019 = false;
        super.initInstanceFields();
    }
}
