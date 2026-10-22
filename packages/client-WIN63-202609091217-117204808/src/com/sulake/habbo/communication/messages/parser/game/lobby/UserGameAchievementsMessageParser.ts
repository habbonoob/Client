import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AchievementsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/achievements/AchievementsMessageParser';

export class UserGameAchievementsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.lobby::UserGameAchievementsMessageParser'); }

    declare private _gameTypeId: number;
    static { (this.prototype as any)._gameTypeId = 0; }

    declare private _achievements: AchievementsMessageParser;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._gameTypeId = param1.readInteger();
        this._achievements = new AchievementsMessageParser();
        this._achievements.parse(param1);
        return true;
    }

    public get gameTypeId(): number {
        return this._gameTypeId;
    }

    public get achievements(): any[] {
        return this._achievements.achievements;
    }

    public get defaultCategory(): string {
        return this._achievements.defaultCategory;
    }
}
