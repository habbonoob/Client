import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class Game2SnowWarGameStats {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::Game2SnowWarGameStats'); }

    constructor(param1: IMessageDataWrapper) {
        this._playerWithMostKills = param1.readInteger();
        this._playerWithMostHits = param1.readInteger();
    }

    declare private _playerWithMostKills: number;
    static { (this.prototype as any)._playerWithMostKills = 0; }

    declare private _playerWithMostHits: number;
    static { (this.prototype as any)._playerWithMostHits = 0; }

    public get playerWithMostKills(): number {
        return this._playerWithMostKills;
    }

    public get playerWithMostHits(): number {
        return this._playerWithMostHits;
    }
}
