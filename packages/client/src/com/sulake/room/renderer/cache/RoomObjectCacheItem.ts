import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectLocationCacheItem } from '@/com/sulake/room/renderer/cache/RoomObjectLocationCacheItem';
import { RoomObjectSortableSpriteCacheItem } from '@/com/sulake/room/renderer/cache/RoomObjectSortableSpriteCacheItem';

export class RoomObjectCacheItem {
    static { registerClassName(this, 'com.sulake.room.renderer.cache::RoomObjectCacheItem'); }

    constructor(param1: string) {
        this._location = new RoomObjectLocationCacheItem(param1);
        this._sprites = new RoomObjectSortableSpriteCacheItem();
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    private _location: RoomObjectLocationCacheItem = null;
    private _sprites: RoomObjectSortableSpriteCacheItem = null;

    public get sprites(): RoomObjectSortableSpriteCacheItem {
        return this._sprites;
    }

    public get location(): RoomObjectLocationCacheItem {
        return this._location;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public set objectId(param1: number) {
        this._objectId = param1;
    }

    public dispose(): void {
        if (this._location != null) {
            this._location.dispose();
            this._location = null;
        }
        if (this._sprites != null) {
            this._sprites.dispose();
            this._sprites = null;
        }
    }
}
