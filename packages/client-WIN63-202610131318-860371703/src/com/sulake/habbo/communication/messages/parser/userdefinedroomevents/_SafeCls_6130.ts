import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { UserHighlightData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/UserHighlightData';
import { UserTransparencyData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/UserTransparencyData';

export class _SafeCls_6130 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6130'); }

    declare private _SafeStr_14919: UserTransparencyData[];

    declare private _SafeStr_14920: UserHighlightData[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14919 = new Array<UserTransparencyData>(0).fill(null);
        this._SafeStr_14920 = new Array<UserHighlightData>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        if (_loc2_ < 0) {
            return false;
        }
        this._SafeStr_14919 = new Array<UserTransparencyData>(0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14919.push(new UserTransparencyData(param1.readInteger(), param1.readInteger(), param1.readBoolean(), param1.readInteger()));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        if (_loc2_ < 0) {
            return false;
        }
        this._SafeStr_14920 = new Array<UserHighlightData>(0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14920.push(new UserHighlightData(param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger()));
            _loc3_++;
        }
        return true;
    }

    public get transparencies(): UserTransparencyData[] {
        return this._SafeStr_14919;
    }

    public get highlights(): UserHighlightData[] {
        return this._SafeStr_14920;
    }
}
