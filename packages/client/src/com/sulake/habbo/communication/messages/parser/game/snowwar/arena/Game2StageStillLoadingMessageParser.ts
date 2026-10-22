import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2StageStillLoadingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2StageStillLoadingMessageParser'); }

    constructor() {
    }

    declare private _percentage: number;
    static { (this.prototype as any)._percentage = 0; }

    declare private _finishedPlayers: any[];

    public get percentage(): number {
        return this._percentage;
    }

    public get finishedPlayers(): any[] {
        return this._finishedPlayers;
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._percentage = param1.readInteger();
        this._finishedPlayers = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._finishedPlayers.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }
}
