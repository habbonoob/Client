import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomThumbnailObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomThumbnailObjectData'); }

    declare private _SafeStr_5790: number;
    static { (this.prototype as any)._SafeStr_5790 = 0; }

    declare private _SafeStr_5945: number;
    static { (this.prototype as any)._SafeStr_5945 = 0; }

    constructor() {
    }

    public getCopy(): RoomThumbnailObjectData {
        let _loc1_: RoomThumbnailObjectData = new RoomThumbnailObjectData();
        _loc1_._SafeStr_5790 = this._SafeStr_5790;
        _loc1_._SafeStr_5945 = this._SafeStr_5945;
        return _loc1_;
    }

    public set pos(param1: number) {
        this._SafeStr_5790 = param1;
    }

    public set imgId(param1: number) {
        this._SafeStr_5945 = param1;
    }

    public get pos(): number {
        return this._SafeStr_5790;
    }

    public get imgId(): number {
        return this._SafeStr_5945;
    }
}
