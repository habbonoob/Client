import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class FurnitureAliasesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::FurnitureAliasesMessageParser'); }

    constructor() {
        this._aliases = new UtilsMap();
    }

    private _aliases: UtilsMap = null;

    public get aliasCount(): number {
        return this._aliases.length | 0;
    }

    public getName(param1: number): string {
        if (param1 < 0 || param1 >= this.aliasCount) {
            return null;
        }
        return stringOrNull(this._aliases.getKey(param1));
    }

    public getAlias(param1: number): string {
        if (param1 < 0 || param1 >= this.aliasCount) {
            return null;
        }
        return stringOrNull(this._aliases.getWithIndex(param1));
    }

    public flush(): boolean {
        this._aliases.reset();
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: string = null;
        let _loc5_: string = null;
        this._aliases.reset();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = param1.readString();
            _loc5_ = param1.readString();
            this._aliases.remove(_loc2_);
            this._aliases.add(_loc2_, _loc5_);
            _loc4_++;
        }
        return true;
    }
}
