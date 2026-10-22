import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class AcceptFriendMessageComposer implements IMessageComposer, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.friendlist::AcceptFriendMessageComposer'); }

    private _SafeStr_3981: any[] = [];

    constructor() {
    }

    public getMessageArray(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_3981.length);
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_3981.length) {
            _loc1_.push(this._SafeStr_3981[_loc2_]);
            _loc2_++;
        }
        return _loc1_;
    }

    public addAcceptedRequest(param1: number): void {
        this._SafeStr_3981.push(param1);
    }

    public dispose(): void {
        this._SafeStr_3981 = null;
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
