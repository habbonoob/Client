import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomThumbnailObjectData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/RoomThumbnailObjectData';

export class RoomThumbnailData implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomThumbnailData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc3_: RoomThumbnailObjectData = null;
        this._SafeStr_2502 = [];
        if (param1 == null) {
            return;
        }
        this._bgImgId = param1.readInteger();
        this._frontImgId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = new RoomThumbnailObjectData();
            _loc3_.pos = param1.readInteger();
            _loc3_.imgId = param1.readInteger();
            this._SafeStr_2502.push(_loc3_);
            _loc4_++;
        }
        if (this._bgImgId == 0) {
            this.setDefaults();
        }
    }

    declare private _bgImgId: number;
    static { (this.prototype as any)._bgImgId = 0; }

    declare private _frontImgId: number;
    static { (this.prototype as any)._frontImgId = 0; }

    declare private _SafeStr_2502: any[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get bgImgId(): number {
        return this._bgImgId;
    }

    public set bgImgId(param1: number) {
        this._bgImgId = param1;
    }

    public get frontImgId(): number {
        return this._frontImgId;
    }

    public set frontImgId(param1: number) {
        this._frontImgId = param1;
    }

    public get objects(): any[] {
        return this._SafeStr_2502;
    }

    public setDefaults(): void {
        this._bgImgId = 1;
        this._frontImgId = 0;
        let _loc1_: RoomThumbnailObjectData = new RoomThumbnailObjectData();
        _loc1_.pos = 4;
        _loc1_.imgId = 1;
        this._SafeStr_2502.push(_loc1_);
    }

    public getCopy(): RoomThumbnailData {
        let _loc1_: RoomThumbnailData = new RoomThumbnailData(null);
        _loc1_._bgImgId = this._bgImgId;
        _loc1_._frontImgId = this._frontImgId;
        for (const _loc2_ of this._SafeStr_2502 ?? []) {
            _loc1_._SafeStr_2502.push(_loc2_.getCopy());
        }
        return _loc1_;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._SafeStr_2502 = null;
    }

    public getAsString(): string {
        let _loc1_: string = this._frontImgId + ";";
        _loc1_ += this._bgImgId + ";";
        for (const _loc2_ of this._SafeStr_2502 ?? []) {
            _loc1_ += _loc2_.imgId + "," + _loc2_.pos + ";";
        }
        return _loc1_;
    }

    get [IDisposable](): true {
        return true;
    }
}
