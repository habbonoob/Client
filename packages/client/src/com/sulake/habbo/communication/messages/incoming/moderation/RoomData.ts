import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class RoomData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::RoomData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._tags = [];
        this._exists = param1.readBoolean();
        if (!this.exists) {
            return;
        }
        this._name = param1.readString();
        this._desc = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._tags.push(param1.readString());
            _loc3_++;
        }
    }

    declare private _exists: boolean;
    static { (this.prototype as any)._exists = false; }

    declare private _tags: any[];

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    declare private _desc: string;

    public get desc(): string {
        return this._desc;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get tags(): any[] {
        return this._tags;
    }

    public get exists(): boolean {
        return this._exists;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._tags = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
