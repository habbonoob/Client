import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class RoomEventData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomEventData'); }

    constructor(param1: IMessageDataWrapper) {
        this._adId = param1.readInteger();
        this._ownerAvatarId = param1.readInteger();
        this._ownerAvatarName = param1.readString();
        this._flatId = param1.readInteger();
        this._eventType = param1.readInteger();
        this._eventName = param1.readString();
        this._eventDescription = param1.readString();
        let _loc8_: number = param1.readInteger();
        let _loc5_: number = param1.readInteger();
        let _loc9_: Date = new Date();
        let _loc3_: number = Number(_loc9_.getTime());
        let _loc2_: number = _loc8_ * 60 * 1000;
        _loc3_ -= _loc2_;
        let _loc6_: Date = new Date(_loc3_);
        this._creationTime = _loc6_.getDate() + "-" + _loc6_.getMonth() + "-" + _loc6_.getFullYear() + " " + _loc6_.getHours() + ":" + _loc6_.getMinutes();
        let _loc7_: number = Number(_loc9_.getTime());
        let _loc4_: number = _loc5_ * 60 * 1000;
        _loc7_ += _loc4_;
        this._expirationDate = new Date(_loc7_);
        this._categoryId = param1.readInteger();
    }

    declare private _adId: number;
    static { (this.prototype as any)._adId = 0; }

    declare private _ownerAvatarId: number;
    static { (this.prototype as any)._ownerAvatarId = 0; }

    declare private _ownerAvatarName: string;

    declare private _categoryId: number;
    static { (this.prototype as any)._categoryId = 0; }

    declare private _eventType: number;
    static { (this.prototype as any)._eventType = 0; }

    declare private _eventName: string;

    declare private _eventDescription: string;

    declare private _expirationDate: Date;

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    public get flatId(): number {
        return this._flatId;
    }

    declare private _creationTime: string;

    public get creationTime(): string {
        return this._creationTime;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get adId(): number {
        return this._adId;
    }

    public get ownerAvatarId(): number {
        return this._ownerAvatarId;
    }

    public get ownerAvatarName(): string {
        return this._ownerAvatarName;
    }

    public get categoryId(): number {
        return this._categoryId;
    }

    public get eventType(): number {
        return this._eventType;
    }

    public get eventName(): string {
        return this._eventName;
    }

    public get eventDescription(): string {
        return this._eventDescription;
    }

    public get expirationDate(): Date {
        return this._expirationDate;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
