import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetUserGameAchievementsMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.game.lobby::GetUserGameAchievementsMessageComposer'); }

    declare private _gameTypeId: number;
    static { (this.prototype as any)._gameTypeId = 0; }

    constructor(param1: number) {
        this._gameTypeId = param1;
    }

    public getMessageArray(): any[] {
        return [this._gameTypeId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
