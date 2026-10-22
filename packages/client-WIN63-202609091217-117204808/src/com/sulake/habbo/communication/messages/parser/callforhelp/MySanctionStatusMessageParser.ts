import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SanctionDTO } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/SanctionDTO';
import { SanctionType } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/SanctionType';

export class MySanctionStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.callforhelp::MySanctionStatusMessageParser'); }

    declare private _sanctions: any[];

    constructor() {
        this._sanctions = [];
    }

    public flush(): boolean {
        this._sanctions = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: SanctionDTO = null;
        this._sanctions = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = new SanctionDTO();
            _loc2_._SafeStr_7471 = this.readSanctionType(param1);
            _loc2_._SafeStr_5549 = param1.readString();
            _loc2_._SafeStr_7352 = param1.readBoolean();
            _loc2_._SafeStr_5613 = param1.readInteger();
            _loc2_._SafeStr_5941 = this.readSanctionType(param1);
            this._sanctions.push(_loc2_);
            _loc4_++;
        }
        return true;
    }

    private readSanctionType(param1: IMessageDataWrapper): SanctionType {
        let _loc2_: SanctionType = new SanctionType();
        _loc2_.name = param1.readString();
        _loc2_._SafeStr_4902 = param1.readInteger();
        _loc2_._SafeStr_7466 = param1.readInteger();
        return _loc2_;
    }

    public get sanctions(): any[] {
        return this._sanctions;
    }
}
