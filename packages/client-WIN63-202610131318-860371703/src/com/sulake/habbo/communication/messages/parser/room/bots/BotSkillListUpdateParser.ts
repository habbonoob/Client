import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { BotSkillData } from '@/com/sulake/habbo/communication/messages/parser/room/bots/BotSkillData';

export class BotSkillListUpdateParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.bots::BotSkillListUpdateParser'); }

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    declare private _skillList: any[];

    constructor() {
    }

    public get skillList(): any[] {
        return this._skillList;
    }

    public get botId(): number {
        return this._botId;
    }

    public flush(): boolean {
        this._botId = -1;
        this._skillList = new Array(0);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._botId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._skillList.push(new BotSkillData(param1));
            _loc3_++;
        }
        return true;
    }
}
