import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TradeRequirementRulesDefinition } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRulesDefinition';

export class WiredContractContentsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.contracts::WiredContractContentsMessageParser'); }

    public static readonly _SafeStr_8221: number = 0;
    public static readonly _SafeStr_8481: number = 1;
    public static readonly _SafeStr_8302: number = 2;
    public static readonly _SafeStr_8474: number = 0;
    public static readonly _SafeStr_7757: number = 1;

    constructor() {
    }

    declare private _contractId: number;
    static { (this.prototype as any)._contractId = 0; }

    declare private _contractType: number;
    static { (this.prototype as any)._contractType = 0; }

    declare private _definition: TradeRequirementRulesDefinition;

    declare private _paymentMode: number;
    static { (this.prototype as any)._paymentMode = 0; }

    declare private _receiveText: string;

    declare private _layoutType: string;

    declare private _rewardCategory: number;
    static { (this.prototype as any)._rewardCategory = 0; }

    declare private _showDialog: boolean;
    static { (this.prototype as any)._showDialog = false; }

    declare private _rewardText: string;

    public get contractId(): number {
        return this._contractId;
    }

    public get contractType(): number {
        return this._contractType;
    }

    public get definition(): TradeRequirementRulesDefinition {
        return this._definition;
    }

    public get paymentMode(): number {
        return this._paymentMode;
    }

    public get receiveText(): string {
        return this._receiveText;
    }

    public get layoutType(): string {
        return this._layoutType;
    }

    public get rewardCategory(): number {
        return this._rewardCategory;
    }

    public get showDialog(): boolean {
        return this._showDialog;
    }

    public get rewardText(): string {
        return this._rewardText;
    }

    public flush(): boolean {
        this._contractId = 0;
        this._contractType = 0;
        this._definition = null;
        this._paymentMode = 0;
        this._receiveText = null;
        this._rewardCategory = 0;
        this._showDialog = false;
        this._rewardText = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._contractId = param1.readInteger();
        this._contractType = param1.readShort();
        this._definition = TradeRequirementRulesDefinition.readFromMessage(param1);
        if (this._contractType == 0) {
            this._paymentMode = param1.readShort();
            this._receiveText = param1.readString();
            this._layoutType = param1.readString();
        }
        if (this._contractType == 2) {
            this._rewardCategory = param1.readShort();
            this._showDialog = param1.readBoolean();
            this._rewardText = param1.readString();
        }
        return true;
    }
}
