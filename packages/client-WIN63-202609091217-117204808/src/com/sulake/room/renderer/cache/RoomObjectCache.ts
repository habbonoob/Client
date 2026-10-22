import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { Canvas } from '@/com/sulake/habbo/utils/Canvas';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';
import { RoomObjectSpriteData } from '@/com/sulake/room/data/RoomObjectSpriteData';
import { RoomObjectSpriteType } from '@/com/sulake/room/object/enum/RoomObjectSpriteType';
import { RoomObjectCacheItem } from '@/com/sulake/room/renderer/cache/RoomObjectCacheItem';

export class RoomObjectCache {
    static { registerClassName(this, 'com.sulake.room.renderer.cache::RoomObjectCache'); }

    private static readonly MAX_SIZE_FOR_AVG_COLOR: number = 200;
    private _data: Map<any, any> = null;
    private _roomObjectVariableAccurateZ: string = "";

    constructor(param1: string) {
        this._roomObjectVariableAccurateZ = param1;
        this._data = new Dictionary();
    }

    public dispose(): void {
        let _loc1_: RoomObjectCacheItem = null;
        if (this._data != null) {
            for (const _loc2_ of this._data?.keys() ?? []) {
                _loc1_ = this._data.get(_loc2_);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
            }
            this._data = null;
        }
    }

    public getObjectCache(param1: string): RoomObjectCacheItem {
        let _loc2_: RoomObjectCacheItem = this._data.get(param1);
        if (_loc2_ == null) {
            _loc2_ = new RoomObjectCacheItem(this._roomObjectVariableAccurateZ);
            this._data.set(param1, _loc2_);
        }
        return _loc2_;
    }

    public removeObjectCache(param1: string): void {
        let _loc2_: RoomObjectCacheItem = this._data.get(param1);
        if (_loc2_ != null) {
            _loc2_.dispose();
            this._data.delete(param1);
        }
    }

    public getSortableSpriteList(): RoomObjectSpriteData[] {
        let _loc2_: any;
        let _loc1_: RoomObjectCacheItem = null;
        let _loc3_: RoomObjectSpriteData = null;
        let _loc6_: boolean = false;
        let _loc4_: RoomObjectSpriteData[] = [];
        for (const _loc5_ of this._data?.keys() ?? []) {
            _loc1_ = this._data.get(_loc5_);
            for (_loc2_ of _loc1_.sprites.sprites ?? []) {
                if (_loc2_.sprite.spriteType != RoomObjectSpriteType.ROOM_PLANE && _loc2_.sprite.libraryAssetName != "") {
                    _loc3_ = new RoomObjectSpriteData();
                    _loc3_.objectId = _loc1_.objectId;
                    _loc3_.x = Math.round(Number(_loc2_.x)) | 0;
                    _loc3_.y = Math.round(Number(_loc2_.y)) | 0;
                    _loc3_.z = Number(_loc2_.z);
                    _loc3_.name = StringUtil.nonNull(stringOrNull(_loc2_.sprite.libraryAssetName));
                    _loc3_.flipH = _loc2_.sprite.flipH;
                    _loc3_.alpha = Number(_loc2_.sprite.alpha);
                    _loc3_.color = stringOrNull(_loc2_.sprite.color.toString());
                    _loc3_.blendMode = stringOrNull(_loc2_.sprite.blendMode);
                    _loc3_.width = _loc2_.sprite.width | 0;
                    _loc3_.height = _loc2_.sprite.height | 0;
                    _loc3_.objectType = stringOrNull(_loc2_.sprite.objectType);
                    _loc3_.posture = stringOrNull(_loc2_.sprite.assetPosture);
                    _loc6_ = this.isSkewedSprite(_loc2_.sprite);
                    if (_loc6_) {
                        _loc3_.skew = _loc2_.sprite.direction % 4 == 0 ? -0.5 : 0.5;
                    }
                    if ((_loc6_ || _loc3_.name.indexOf("%image.library.url%") >= 0 || _loc3_.name.indexOf("%group.badge.url%") >= 0) && _loc3_.width <= 200 && _loc3_.height <= 200) {
                        _loc3_.color = Canvas.averageColor(_loc2_.sprite.asset).toString();
                        if (_loc2_.sprite.objectType.indexOf("external_image_wallitem") == 0) {
                            _loc3_.frame = true;
                        }
                    }
                    _loc4_.push(_loc3_);
                }
            }
        }
        return _loc4_;
    }

    private isSkewedSprite(param1: IRoomObjectSprite): boolean {
        if (!param1.objectType) {
            return false;
        }
        if (param1.objectType.indexOf("external_image_wallitem") == 0 && param1.tag == "THUMBNAIL") {
            return true;
        }
        if (param1.objectType.indexOf("guild_forum") == 0 && param1.tag == "THUMBNAIL") {
            return true;
        }
        return false;
    }

    public getPlaneSortableSprites(): any[] {
        let _loc2_: any;
        let _loc1_: RoomObjectCacheItem = null;
        let _loc3_: any[] = [];
        for (const _loc4_ of this._data?.keys() ?? []) {
            _loc1_ = this._data.get(_loc4_);
            for (_loc2_ of _loc1_.sprites.sprites ?? []) {
                if (_loc2_.sprite.spriteType == RoomObjectSpriteType.ROOM_PLANE) {
                    _loc3_.push(_loc2_);
                }
            }
        }
        return _loc3_;
    }
}
