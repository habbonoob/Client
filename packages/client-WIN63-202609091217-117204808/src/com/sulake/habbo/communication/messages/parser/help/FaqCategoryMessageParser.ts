import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class FaqCategoryMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::FaqCategoryMessageParser'); }

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _description: string;

    declare private _data: UtilsMap;

    constructor() {
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public get description(): string {
        return this._description;
    }

    public get data(): UtilsMap {
        return this._data;
    }

    public flush(): boolean {
        if (this._data != null) {
            this._data.dispose();
        }
        this._data = null;
        this._categoryId = -1;
        this._description = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        let _loc5_: string = null;
        let _loc4_: number = 0;
        this._data = new UtilsMap();
        this._categoryId = param1.readInteger();
        this._description = param1.readString();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = param1.readInteger();
            _loc5_ = param1.readString();
            this._data.add(_loc2_, _loc5_);
            _loc4_++;
        }
        return true;
    }
}
