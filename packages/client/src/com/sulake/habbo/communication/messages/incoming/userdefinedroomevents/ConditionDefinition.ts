import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';

export class ConditionDefinition extends Triggerable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::ConditionDefinition'); }

    constructor(param1: IMessageDataWrapper) {
        super(param1);
    }

    declare private _quantifierType: number;

    declare private _isInvert: boolean;

    public override get usingCustomInputSources(): boolean {
        return super.usingCustomInputSources || this.quantifierCode != 0;
    }

    declare private _quantifierCode: number;

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
        return this._isInvert;
    }

    protected override readDefinitionSpecifics(param1: IMessageDataWrapper): void {
        this._quantifierCode = param1.readInteger();
    }

    protected override readTypeSpecifics(param1: IMessageDataWrapper): void {
        this._quantifierType = param1.readByte();
        this._isInvert = param1.readBoolean();
    }

    protected override initInstanceFields(): void {
        this._quantifierType = 0;
        this._isInvert = false;
        this._quantifierCode = 0;
        super.initInstanceFields();
    }
}
