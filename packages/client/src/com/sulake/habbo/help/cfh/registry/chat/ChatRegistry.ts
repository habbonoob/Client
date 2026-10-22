import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ChatRegistryItem } from '@/com/sulake/habbo/help/cfh/registry/chat/ChatRegistryItem';

export class ChatRegistry {
    static { registerClassName(this, 'com.sulake.habbo.help.cfh.registry.chat::ChatRegistry'); }

    private static readonly MAX_ITEMS_TO_STORE: number = 120;
    private static readonly ITEMS_TO_PURGE: number = 20;

    constructor() {
    }

    private _registry: ChatRegistryItem[] = new Array<ChatRegistryItem>(0).fill(null);
    private _SafeStr_4262: number = 0;

    declare private _holdPurges: boolean;
    static { (this.prototype as any)._holdPurges = false; }

    public set holdPurges(param1: boolean) {
        this._holdPurges = param1;
    }

    public hasContent(): boolean {
        return this._registry.length > 0;
    }

    public hasContentWithoutChatFromUser(param1: number): boolean {
        return this.getItemsNotByUser(param1).length > 0;
    }

    public getItems(): ChatRegistryItem[] {
        return this._registry;
    }

    public addItem(param1: number, param2: string, param3: number, param4: string, param5: string): void {
        this._registry.push(new ChatRegistryItem(this._SafeStr_4262++, param1, param2, param3, param4, param5));
        this.purgeRegistry();
    }

    public getItem(param1: number): ChatRegistryItem {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._registry.length) {
            if (this._registry[_loc2_].index == param1) {
                return this._registry[_loc2_];
            }
            _loc2_++;
        }
        return null;
    }

    public getItemsByUser(param1: number): ChatRegistryItem[] {
        let _loc3_: number = 0;
        let _loc2_: ChatRegistryItem[] = new Array<ChatRegistryItem>(0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < this._registry.length) {
            if (this._registry[_loc3_].userId == param1) {
                _loc2_.push(this._registry[_loc3_]);
            }
            _loc3_++;
        }
        return _loc2_;
    }

    private purgeRegistry(): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        if (this._holdPurges) {
            return;
        }
        let _loc1_: ChatRegistryItem[] = new Array<ChatRegistryItem>(0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < this._registry.length) {
            _loc4_ = new Date().getTime() - this._registry[_loc3_].chatTime.getTime() | 0;
            _loc2_ = _loc4_ / 65500 | 0;
            if (_loc2_ <= 15) {
                _loc1_.push(this._registry[_loc3_]);
            }
            _loc3_++;
        }
        if (_loc1_.length > 120) {
            _loc1_.splice(0, _loc1_.length - (120 - 20));
        }
        this._registry.splice(0, this._registry.length);
        this._registry = this._registry.concat(_loc1_);
    }

    private getItemsNotByUser(param1: number): ChatRegistryItem[] {
        let _loc3_: number = 0;
        let _loc2_: ChatRegistryItem[] = new Array<ChatRegistryItem>(0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < this._registry.length) {
            if (this._registry[_loc3_].userId != param1) {
                _loc2_.push(this._registry[_loc3_]);
            }
            _loc3_++;
        }
        return _loc2_;
    }
}
