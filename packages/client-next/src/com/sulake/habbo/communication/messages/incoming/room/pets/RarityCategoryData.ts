import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RarityCategoryData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.pets::RarityCategoryData'); }

    declare private _chance: number;
    static { (this.prototype as any)._chance = 0; }

    declare private _breeds: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._chance = param1.readInteger();
        this._breeds = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._breeds.push(param1.readInteger());
            _loc3_++;
        }
    }

    public dispose(): void {
        this._chance = -1;
        this._breeds = [];
    }

    public get chance(): number {
        return this._chance;
    }

    public get breeds(): any[] {
        return this._breeds;
    }
}
