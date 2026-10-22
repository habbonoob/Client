import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TreasureHuntWinnerInfo } from '@/com/sulake/habbo/communication/messages/parser/treasurehunt/TreasureHuntWinnerInfo';

export class TreasureHuntFirstWinnerMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.treasurehunt::TreasureHuntFirstWinnerMessageParser'); }

    declare private _winnerInfo: TreasureHuntWinnerInfo;

    constructor() {
    }

    public flush(): boolean {
        this._winnerInfo = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._winnerInfo = new TreasureHuntWinnerInfo(param1);
        return true;
    }

    public get winnerInfo(): TreasureHuntWinnerInfo {
        return this._winnerInfo;
    }
}
