import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ItemMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemMessageData';
import { ItemDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ItemDataParser';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ItemsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemsMessageParser'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ItemsMessageParser.#initStatics();
        return ItemsMessageParser._log;
    }

    constructor() {
    }

    private _items: any[] = [];

    public flush(): boolean {
        this._items = [];
        return true;
    }

    public getItemCount(): number {
        return this._items.length | 0;
    }

    public getItem(param1: number): ItemMessageData {
        if (param1 < 0 || param1 >= this.getItemCount()) {
            return null;
        }
        let _loc2_: ItemMessageData = asInstanceOf(this._items[param1], ItemMessageData);
        if (_loc2_ != null) {
            _loc2_.setReadOnly();
        }
        return _loc2_;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc3_: string = null;
        let _loc2_: ItemMessageData = null;
        if (param1 == null) {
            return false;
        }
        this._items = [];
        let _loc6_: UtilsMap = new UtilsMap();
        let _loc4_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc7_ = param1.readInteger();
            _loc3_ = param1.readString();
            _loc6_.add(_loc7_, _loc3_);
            _loc5_++;
        }
        let _loc8_: number = param1.readInteger();
        ItemsMessageParser._log.info("We have: " + _loc8_ + " items");
        _loc5_ = 0;
        while (_loc5_ < _loc8_) {
            _loc2_ = ItemDataParser.parseItemData(param1);
            _loc2_.ownerName = stringOrNull(_loc6_.getValue(_loc2_.ownerId));
            this._items.push(_loc2_);
            _loc5_++;
        }
        return true;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ItemsMessageParser.#staticsReady) return;
        ItemsMessageParser.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ItemsMessageParser, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.communication.messages.parser.room.engine.ItemsMessageParser"));
    }
}
