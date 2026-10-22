import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class UserSongDisksInventoryMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.sound::UserSongDisksInventoryMessageParser'); }

    declare private _SafeStr_2788: UtilsMap;

    constructor() {
        this._SafeStr_2788 = new UtilsMap();
    }

    public get songDiskCount(): number {
        return this._SafeStr_2788.length | 0;
    }

    public getDiskId(param1: number): number {
        if (param1 >= 0 && param1 < this._SafeStr_2788.length) {
            return this._SafeStr_2788.getKey(param1) | 0;
        }
        return -1;
    }

    public getSongId(param1: number): number {
        if (param1 >= 0 && param1 < this._SafeStr_2788.length) {
            return this._SafeStr_2788.getWithIndex(param1) | 0;
        }
        return -1;
    }

    public flush(): boolean {
        this._SafeStr_2788.reset();
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = param1.readInteger();
            _loc5_ = param1.readInteger();
            this._SafeStr_2788.add(_loc4_, _loc5_);
            _loc3_++;
        }
        return true;
    }
}
