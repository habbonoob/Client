import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';

export class IssuePickFailedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::IssuePickFailedMessageParser'); }

    declare private _issues: any[];

    declare private _retryEnabled: boolean;
    static { (this.prototype as any)._retryEnabled = false; }

    declare private _retryCount: number;
    static { (this.prototype as any)._retryCount = 0; }

    constructor() {
    }

    public get issues(): any[] {
        return this._issues;
    }

    public get retryEnabled(): boolean {
        return this._retryEnabled;
    }

    public get retryCount(): number {
        return this._retryCount;
    }

    public flush(): boolean {
        this._issues = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc7_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: string = null;
        let _loc4_: IssueMessageData = null;
        this._issues = [];
        let _loc6_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc6_) {
            _loc3_ = param1.readInteger();
            _loc2_ = param1.readInteger();
            _loc5_ = param1.readString();
            _loc4_ = new IssueMessageData(_loc3_, 0, 0, 0, 0, 0, 0, 0, null, 0, null, _loc2_, _loc5_, null, 0, []);
            this._issues.push(_loc4_);
            _loc7_++;
        }
        this._retryEnabled = param1.readBoolean();
        this._retryCount = param1.readInteger();
        return true;
    }
}
