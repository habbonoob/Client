import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomThumbnailObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomThumbnailObjectData'); }

    constructor() {
    }

    declare private _pos: number;
    static { (this.prototype as any)._pos = 0; }

    declare private _imgId: number;
    static { (this.prototype as any)._imgId = 0; }

    public get pos(): number {
        return this._pos;
    }

    public set pos(param1: number) {
        this._pos = param1;
    }

    public get imgId(): number {
        return this._imgId;
    }

    public set imgId(param1: number) {
        this._imgId = param1;
    }

    public getCopy(): RoomThumbnailObjectData {
        let _loc1_: RoomThumbnailObjectData = new RoomThumbnailObjectData();
        _loc1_._pos = this._pos;
        _loc1_._imgId = this._imgId;
        return _loc1_;
    }
}
