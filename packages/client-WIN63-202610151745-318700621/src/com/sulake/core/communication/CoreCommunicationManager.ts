import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IConnectionStateListener } from '@/com/sulake/core/communication/connection/IConnectionStateListener';
import type { ICoreCommunicationManager } from '@/com/sulake/core/communication/ICoreCommunicationManager';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import { SocketConnection } from '@/com/sulake/core/communication/connection/SocketConnection';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';

export class CoreCommunicationManager extends Component implements ICoreCommunicationManager, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.core.communication::CoreCommunicationManager'); }

    declare private _SafeStr_3503: any[];

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
        this._SafeStr_3503 = [];
        this.registerUpdateReceiver(this, 0);
    }

    public override dispose(): void {
        this.removeUpdateReceiver(this);
        for (const _loc1_ of this._SafeStr_3503 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_3503 = null;
        super.dispose();
    }

    public createConnection(param1: IConnectionStateListener = null): IConnection {
        let _loc2_: IConnection = new SocketConnection(this, param1);
        this._SafeStr_3503.push(_loc2_);
        return _loc2_;
    }

    public update(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: IConnection = null;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_3503.length) {
            _loc3_ = this._SafeStr_3503[_loc2_];
            _loc3_.processReceivedData();
            if (this.disposed) {
                return;
            }
            if (_loc3_.disposed) {
                this._SafeStr_3503.splice(_loc2_, 1);
            } else {
                _loc2_++;
            }
        }
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
