import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetActivatedBadgesComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.badges::SetActivatedBadgesComposer'); }

    declare private _SafeStr_4582: any[];

    private readonly _SafeStr_8040: number = 5;

    constructor() {
        this._SafeStr_4582 = [];
    }

    public addActivatedBadge(param1: string): void {
        if (this._SafeStr_4582.length >= 5) {
            return;
        }
        this._SafeStr_4582.push(param1);
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 1;
        while (_loc2_ <= 5) {
            if (_loc2_ <= this._SafeStr_4582.length) {
                _loc1_.push(_loc2_);
                _loc1_.push(this._SafeStr_4582[_loc2_ - 1]);
            } else {
                _loc1_.push(_loc2_);
                _loc1_.push("");
            }
            _loc2_++;
        }
        return _loc1_;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
