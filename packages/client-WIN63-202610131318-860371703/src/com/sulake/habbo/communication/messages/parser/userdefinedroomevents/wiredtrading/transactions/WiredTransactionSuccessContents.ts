import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';

export class WiredTransactionSuccessContents {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionSuccessContents'); }

    public static readonly _SafeStr_8322: number = 2;

    declare private _internalId: number;
    static { (this.prototype as any)._internalId = 0; }

    declare private _transactionSuccessTypeId: number;
    static { (this.prototype as any)._transactionSuccessTypeId = 0; }

    declare private _rewardContents: TradeRequirementRule;

    declare private _rewardText: string;

    declare private _openByDefault: boolean;
    static { (this.prototype as any)._openByDefault = false; }

    constructor(param1: number, param2: IMessageDataWrapper) {
        this._internalId = param1;
        this._transactionSuccessTypeId = param2.readInteger();
        if (this._transactionSuccessTypeId == 2 && param2.bytesAvailable > 0) {
            this._rewardContents = TradeRequirementRule.readFromMessage(param2);
            this._rewardText = param2.readString();
            this._openByDefault = param2.readBoolean();
        }
    }

    public get internalId(): number {
        return this._internalId;
    }

    public get transactionSuccessTypeId(): number {
        return this._transactionSuccessTypeId;
    }

    public get rewardContents(): TradeRequirementRule {
        return this._rewardContents;
    }

    public get rewardText(): string {
        return this._rewardText;
    }

    public get openByDefault(): boolean {
        return this._openByDefault;
    }
}
