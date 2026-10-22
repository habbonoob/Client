import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AchievementResolutionsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/lobby/AchievementResolutionsMessageParser';

export class AchievementResolutionsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.lobby::AchievementResolutionsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AchievementResolutionsMessageParser);
    }

    public getParser(): AchievementResolutionsMessageParser {
        return this._parser instanceof AchievementResolutionsMessageParser ? this._parser : null;
    }
}
