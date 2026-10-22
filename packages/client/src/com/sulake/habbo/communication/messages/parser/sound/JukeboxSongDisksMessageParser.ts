import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class JukeboxSongDisksMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.sound::JukeboxSongDisksMessageParser'); }

    constructor() {
        this._songDisks = new UtilsMap();
    }

    declare private _songDisks: UtilsMap;

    declare private _maxLength: number;
    static { (this.prototype as any)._maxLength = 0; }

    public get songDisks(): UtilsMap {
        return this._songDisks;
    }

    public get maxLength(): number {
        return this._maxLength;
    }

    public flush(): boolean {
        this._songDisks.reset();
        this._maxLength = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._maxLength = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        let _loc4_: number = -1;
        let _loc5_: number = -1;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = param1.readInteger();
            _loc5_ = param1.readInteger();
            this._songDisks.add(_loc4_, _loc5_);
            _loc3_++;
        }
        return true;
    }
}
