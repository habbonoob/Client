import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Perk } from '@/com/sulake/habbo/communication/messages/parser/perk/Perk';

export class PerkAllowancesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.perk::PerkAllowancesMessageParser'); }

    declare private _SafeStr_2982: Perk[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_2982 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: Perk = null;
        this._SafeStr_2982 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = new Perk();
            _loc4_.code = param1.readString();
            _loc4_.errorMessage = param1.readString();
            _loc4_.isAllowed = param1.readBoolean();
            this._SafeStr_2982.push(_loc4_);
            _loc3_++;
        }
        return true;
    }

    public getPerks(): Perk[] {
        return this._SafeStr_2982;
    }

    public isPerkAllowed(param1: string): boolean {
        let _loc2_: Perk = this.getPerk(param1);
        return _loc2_ != null && _loc2_.isAllowed;
    }

    public getPerk(param1: string): Perk {
        for (const _loc2_ of this._SafeStr_2982 ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
        }
        return null;
    }
}
