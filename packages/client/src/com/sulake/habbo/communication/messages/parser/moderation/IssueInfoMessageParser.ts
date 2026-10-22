import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import { PatternMatchData } from '@/com/sulake/habbo/communication/messages/parser/moderation/PatternMatchData';

export class IssueInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::IssueInfoMessageParser'); }

    constructor() {
    }

    declare private _issueData: IssueMessageData;

    public get issueData(): IssueMessageData {
        return this._issueData;
    }

    public flush(): boolean {
        if (!this._issueData) {
        }
        this._issueData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc7_: number = 0;
        let _loc3_: number = param1.readInteger();
        let _loc16_: number = param1.readInteger();
        let _loc19_: number = param1.readInteger();
        let _loc17_: number = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        let _loc8_: number = param1.readInteger();
        let _loc5_: number = param1.readInteger();
        let _loc18_: number = param1.readInteger();
        let _loc14_: string = param1.readString();
        let _loc15_: number = param1.readInteger();
        let _loc11_: string = param1.readString();
        let _loc2_: number = param1.readInteger();
        let _loc13_: string = param1.readString();
        let _loc9_: string = param1.readString();
        let _loc10_: number = param1.readInteger();
        let _loc12_: number = param1.readInteger();
        let _loc6_: any[] = [];
        _loc7_ = 0;
        while (_loc7_ < _loc12_) {
            _loc6_.push(new PatternMatchData(param1));
            _loc7_++;
        }
        this._issueData = new IssueMessageData(_loc3_, _loc16_, _loc19_, _loc17_, _loc4_, _loc8_, _loc5_, _loc18_, _loc14_, _loc15_, _loc11_, _loc2_, _loc13_, _loc9_, _loc10_, _loc6_);
        return true;
    }
}
