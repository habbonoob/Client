import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { OutfitData } from '@/com/sulake/habbo/communication/messages/incoming/avatar/OutfitData';

export class WardrobeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.avatar::WardrobeMessageParser'); }

    constructor() {
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _outfits: any[];

    public get outfits(): any[] {
        return this._outfits;
    }

    public get state(): number {
        return this._state;
    }

    public flush(): boolean {
        this._state = 0;
        this._outfits = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: OutfitData = null;
        this._state = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = new OutfitData(param1);
            this._outfits.push(_loc2_);
            _loc4_++;
        }
        return true;
    }
}
