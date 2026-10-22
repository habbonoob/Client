import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CfhSanctionTypeData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CfhSanctionTypeData';

export class CfhSanctionMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.callforhelp::CfhSanctionMessageParser'); }

    constructor() {
    }

    private _issueId: number = -1;
    private _accountId: number = -1;

    declare private _sanctionType: CfhSanctionTypeData;

    public get issueId(): number {
        return this._issueId;
    }

    public get accountId(): number {
        return this._accountId;
    }

    public get sanctionType(): CfhSanctionTypeData {
        return this._sanctionType;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._issueId = param1.readInteger();
        this._accountId = param1.readInteger();
        this._sanctionType = new CfhSanctionTypeData(param1);
        return true;
    }

    public flush(): boolean {
        this._issueId = -1;
        this._accountId = -1;
        this._sanctionType = null;
        return true;
    }
}
