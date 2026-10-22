import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ItemMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ItemMessageData';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ItemDataParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ItemDataParser'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ItemDataParser.#initStatics();
        return ItemDataParser._log;
    }

    public static parseItemData(param1: IMessageDataWrapper): ItemMessageData {
        let _loc17_: string = null;
        let _loc23_: string = null;
        let _loc13_: number = 0;
        let _loc14_: number = 0;
        let _loc21_: number = 0;
        let _loc15_: number = 0;
        let _loc19_: string = null;
        let _loc10_: any[] = null;
        let _loc16_: number = NaN;
        let _loc18_: number = NaN;
        let _loc8_: number = NaN;
        let _loc11_: number = Number(param1.readString()) | 0;
        let _loc7_: number = param1.readInteger();
        let _loc2_: string = param1.readString();
        let _loc5_: string = param1.readString();
        let _loc3_: number = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        let _loc9_: number = param1.readInteger();
        let _loc20_: number = 0;
        let _loc12_: number = parseFloat(_loc5_);
        if (!isNaN(_loc12_)) {
            _loc20_ = Number(_loc5_) | 0;
        }
        ItemDataParser._log.info("\n\n PARSING WALL ITEM: ");
        ItemDataParser._log.info("wallItemId: " + _loc11_);
        ItemDataParser._log.info("wallItemTypeId: " + _loc7_);
        ItemDataParser._log.info("location: " + _loc2_);
        ItemDataParser._log.info("dataStr: " + _loc5_);
        ItemDataParser._log.info("secondsToExpiration: " + _loc3_);
        ItemDataParser._log.info("state: " + _loc20_);
        let _loc6_: ItemMessageData = null;
        let _loc22_: any[] = null;
        let _loc24_: string = null;
        if (_loc2_.indexOf(":") == 0) {
            _loc6_ = new ItemMessageData(_loc11_, _loc7_, false);
            _loc22_ = _loc2_.split(" ");
            if (_loc22_.length >= 3) {
                _loc17_ = String(_loc22_[0]);
                _loc23_ = String(_loc22_[1]);
                _loc24_ = String(_loc22_[2]);
                if (_loc17_.length > 3 && _loc23_.length > 2) {
                    _loc17_ = _loc17_.substr(3);
                    _loc23_ = _loc23_.substr(2);
                    _loc22_ = _loc17_.split(",");
                    if (_loc22_.length >= 2) {
                        _loc13_ = _loc22_[0] | 0;
                        _loc14_ = _loc22_[1] | 0;
                        _loc22_ = _loc23_.split(",");
                        if (_loc22_.length >= 2) {
                            _loc21_ = _loc22_[0] | 0;
                            _loc15_ = _loc22_[1] | 0;
                            _loc6_.wallX = _loc13_;
                            _loc6_.wallY = _loc14_;
                            _loc6_.localX = _loc21_;
                            _loc6_.localY = _loc15_;
                            _loc6_.dir = _loc24_;
                            _loc6_.data = _loc5_;
                            _loc6_.state = _loc20_;
                        }
                    }
                }
            }
        } else {
            _loc6_ = new ItemMessageData(_loc11_, _loc7_, true);
            _loc22_ = _loc2_.split(" ");
            if (_loc22_.length >= 2) {
                _loc24_ = String(_loc22_[0]);
                if (_loc24_ == "rightwall" || _loc24_ == "frontwall") {
                    _loc24_ = "r";
                } else {
                    _loc24_ = "l";
                }
                _loc19_ = String(_loc22_[1]);
                _loc10_ = _loc19_.split(",");
                if (_loc10_.length >= 3) {
                    _loc16_ = 0;
                    _loc18_ = parseFloat(stringOrNull(_loc10_[0]));
                    _loc8_ = parseFloat(stringOrNull(_loc10_[1]));
                    _loc6_.y = _loc18_;
                    _loc6_.z = _loc8_;
                    _loc6_.dir = _loc24_;
                    _loc6_.data = _loc5_;
                    _loc6_.state = _loc20_;
                }
            }
        }
        _loc6_.usagePolicy = _loc4_;
        _loc6_.ownerId = _loc9_;
        _loc6_.secondsToExpiration = _loc3_;
        return _loc6_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ItemDataParser.#staticsReady) return;
        ItemDataParser.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ItemDataParser, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.communication.messages.parser.room.engine._SafeCls_2063"));
    }
}
