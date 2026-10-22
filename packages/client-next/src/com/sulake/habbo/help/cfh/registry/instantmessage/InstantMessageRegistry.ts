import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { InstantMessageRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/instantmessage/InstantMessageRegistryItem';

export class InstantMessageRegistry {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.instantmessage::InstantMessageRegistry'); }

    private static readonly ITEMS_TO_PURGE: number = 5;
    private static readonly MAX_MESSAGES_TO_STORE: number = 20;

    declare private _registry: UtilsMap;

    private _SafeStr_4262: number = 0;
    private _SafeStr_5689: number = 0;

    declare private _holdPurges: boolean;
    static { (this.prototype as any)._holdPurges = false; }

    constructor() {
        this._registry = new UtilsMap();
    }

    public addItem(param1: number, param2: string, param3: string): void {
        let _loc5_: any = undefined;
        let _loc4_: any = undefined;
        if (this._registry.hasKey(param1)) {
            _loc5_ = this._registry.getValue(param1);
            _loc5_.push(new InstantMessageRegistryItem(this._SafeStr_4262++, param1, param2, param3));
            this._registry.remove(param1);
            this._registry.add(param1, _loc5_);
        } else {
            _loc4_ = [];
            _loc4_.push(new InstantMessageRegistryItem(this._SafeStr_4262++, param1, param2, param3));
            this._registry.add(param1, _loc4_);
        }
        this._SafeStr_5689 = this._SafeStr_5689 + 1;
        if (this._SafeStr_5689 % 3 == 0) {
            this.purgeRegistry();
        }
    }

    private purgeRegistry(): void {
        let _loc4_: number = 0;
        let _loc1_: any = undefined;
        let _loc3_: any = undefined;
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        if (this._holdPurges) {
            return;
        }
        _loc4_ = 0;
        while (_loc4_ < this._registry.length) {
            _loc1_ = this._registry.getWithIndex(_loc4_);
            _loc3_ = new Array<InstantMessageRegistryItem>(0).fill(null);
            if (_loc1_ && _loc1_.length > 0) {
                _loc7_ = _loc1_[0].userId | 0;
                _loc6_ = 0;
                while (_loc6_ < _loc1_.length) {
                    _loc5_ = new Date().getTime() - _loc1_[_loc6_].chatTime.time | 0;
                    _loc2_ = _loc5_ / 65500 | 0;
                    if (_loc2_ <= 15) {
                        _loc3_.push(_loc1_[_loc6_]);
                    }
                    _loc6_++;
                }
                if (_loc3_.length > 20) {
                    _loc3_.splice(0, _loc3_.length - (20 - 5));
                }
                _loc1_.splice(0, _loc1_.length);
                _loc1_ = _loc1_.concat(_loc3_);
                this._registry.remove(_loc7_);
                this._registry.add(_loc7_, _loc1_);
            }
            _loc4_++;
        }
    }

    public set holdPurges(param1: boolean) {
        this._holdPurges = param1;
    }

    public getItemsByUser(param1: number): InstantMessageRegistryItem[] {
        return this._registry.getValue(param1);
    }

    public hasUserChatted(param1: number): boolean {
        let _loc2_: InstantMessageRegistryItem[] = this.getItemsByUser(param1);
        if (_loc2_) {
            return this.getItemsByUser(param1).length > 0;
        }
        return false;
    }

    public hasContent(): boolean {
        return this._registry.length > 0;
    }

    public getItems(): UtilsMap {
        return this._registry;
    }

    public getItem(param1: number, param2: number): InstantMessageRegistryItem {
        let _loc4_: number = 0;
        let _loc3_: InstantMessageRegistryItem[] = this.getItemsByUser(param1);
        _loc4_ = 0;
        while (_loc4_ < _loc3_.length) {
            if (_loc3_[_loc4_].index == param2) {
                return _loc3_[_loc4_];
            }
            _loc4_++;
        }
        return null;
    }
}
