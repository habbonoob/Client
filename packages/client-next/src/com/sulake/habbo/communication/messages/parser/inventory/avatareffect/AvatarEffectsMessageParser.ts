import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AvatarEffect } from '@/com/sulake/habbo/communication/messages/incoming/inventory/avatareffect/AvatarEffect';

export class AvatarEffectsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.avatareffect::AvatarEffectsMessageParser'); }

    declare private _effects: any[];

    constructor() {
    }

    public flush(): boolean {
        this._effects = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: AvatarEffect = null;
        this._effects = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = new AvatarEffect();
            _loc2_.type = param1.readInteger();
            _loc2_.subType = param1.readInteger();
            _loc2_.duration = param1.readInteger();
            _loc2_.inactiveEffectsInInventory = param1.readInteger();
            _loc2_.secondsLeftIfActive = param1.readInteger();
            _loc2_.isPermanent = param1.readBoolean();
            this._effects.push(_loc2_);
            _loc4_++;
        }
        return true;
    }

    public get effects(): any[] {
        return this._effects;
    }
}
