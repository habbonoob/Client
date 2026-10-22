import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SortableSprite } from '@/com/sulake/room/renderer/utils/SortableSprite';

export class RoomObjectSortableSpriteCacheItem {
    static { registerClassName(this, 'com.sulake.room.renderer.cache::RoomObjectSortableSpriteCacheItem'); }

    private _sprites: any[] = [];
    private _updateId1: number = -1;
    private _updateId2: number = -1;
    private _isEmpty: boolean = false;

    constructor() {
    }

    public get spriteCount(): number {
        return this._sprites.length | 0;
    }

    public get isEmpty(): boolean {
        return this._isEmpty;
    }

    public dispose(): void {
        this.setSpriteCount(0);
    }

    public addSprite(param1: SortableSprite): void {
        this._sprites.push(param1);
    }

    public getSprite(param1: number): SortableSprite {
        return this._sprites[param1];
    }

    public get sprites(): any[] {
        return this._sprites;
    }

    public needsUpdate(param1: number, param2: number): boolean {
        if (param1 != this._updateId1 || param2 != this._updateId2) {
            this._updateId1 = param1;
            this._updateId2 = param2;
            return true;
        }
        return false;
    }

    public setSpriteCount(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: SortableSprite = null;
        if (param1 < this._sprites.length) {
            _loc3_ = param1;
            while (_loc3_ < this._sprites.length) {
                _loc2_ = this._sprites[_loc3_];
                if (_loc2_) {
                    _loc2_.dispose();
                }
                _loc3_++;
            }
            this._sprites.splice(param1, this._sprites.length - param1);
        }
        if (this._sprites.length == 0) {
            this._isEmpty = true;
        } else {
            this._isEmpty = false;
        }
    }
}
