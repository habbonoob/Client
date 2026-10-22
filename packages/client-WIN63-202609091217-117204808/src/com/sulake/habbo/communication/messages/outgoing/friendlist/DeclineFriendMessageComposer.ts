import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class DeclineFriendMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.friendlist::DeclineFriendMessageComposer'); }

    private _SafeStr_3671: any[] = [];

    constructor() {
    }

    public getMessageArray(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        if (this._SafeStr_3671.length == 0) {
            _loc1_.push(true);
            _loc1_.push(0);
        } else {
            _loc1_.push(false);
            _loc1_.push(this._SafeStr_3671.length);
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_3671.length) {
                _loc1_.push(this._SafeStr_3671[_loc2_]);
                _loc2_++;
            }
        }
        return _loc1_;
    }

    public addDeclinedRequest(param1: number): void {
        this._SafeStr_3671.push(param1);
    }

    public dispose(): void {
        this._SafeStr_3671 = null;
    }

    public get disposed(): boolean {
        return false;
    }

    get [IMessageComposer](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
