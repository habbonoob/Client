import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ObjectRemoveMultipleMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectRemoveMultipleMessageParser'); }

    declare private _ids: any[];

    declare private _pickerId: number;
    static { (this.prototype as any)._pickerId = 0; }

    declare private _SafeStr_14137: boolean;
    static { (this.prototype as any)._SafeStr_14137 = false; }

    constructor() {
    }

    public get ids(): any[] {
        return this._ids;
    }

    public get pickerId(): number {
        return this._pickerId;
    }

    public get byInvisibleFurniManager(): boolean {
        return this._SafeStr_14137;
    }

    public flush(): boolean {
        this._ids = [];
        this._pickerId = 0;
        this._SafeStr_14137 = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        if (param1 == null) {
            return false;
        }
        let _loc2_: number = param1.readInteger();
        this._ids = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this.ids.push(param1.readInteger());
            _loc3_++;
        }
        this._pickerId = param1.readInteger();
        this._SafeStr_14137 = param1.readBoolean();
        return true;
    }
}
