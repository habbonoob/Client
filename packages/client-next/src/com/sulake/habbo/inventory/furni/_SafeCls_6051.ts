import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import type { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';

export class _SafeCls_6051 {
    static { registerClassName(this, 'com.sulake.habbo.inventory.furni::_SafeCls_6051'); }

    public static readonly MAIN_ALL: string = "all";
    public static readonly MAIN_FLOOR_ITEMS: string = "floor_items";
    public static readonly MAIN_WALL_ITEMS: string = "wall_items";
    public static readonly MAIN_ROOM_LAYOUT: string = "room_layout";
    public static readonly _SafeStr_14291: string = "any";
    public static readonly _SafeStr_14292: string = "sittable";
    public static readonly _SafeStr_14293: string = "layable";
    public static readonly _SafeStr_14294: string = "tiles_or_rugs";
    public static readonly TYPE_LTD: string = "ltd";
    public static readonly _SafeStr_14295: string = "wired";
    public static readonly TYPE_CREDIT_FURNI: string = "credit_furni";
    public static readonly TYPE_CLOTHES: string = "clothes";
    public static readonly _SafeStr_14296: string = "pet_food";
    public static readonly TYPE_COLLECTIBLES: string = "collectibles";
    public static readonly _SafeStr_14297: string = "tradable";
    public static readonly _SafeStr_14298: string = "non_tradable";
    public static readonly _SafeStr_14299: string = "recyclable";
    public static readonly TYPE_WINDOWS: string = "windows";
    public static readonly TYPE_DIMMERS: string = "dimmers";
    public static readonly TYPE_STICKIES: string = "stickies";
    public static readonly _SafeStr_14300: string = "paintings";
    public static readonly TYPE_FLOORS: string = "floors";
    public static readonly TYPE_WALLPAPERS: string = "wallpapers";
    public static readonly TYPE_LANDSCAPE: string = "landscape";

    constructor() {
    }

    public static isRoomLayout(param1: GroupItem): boolean {
        return _SafeCls_6051.hasCategory(param1, 2, 3, 4);
    }

    public static isWallpaper(param1: GroupItem): boolean {
        return _SafeCls_6051.hasCategory(param1, 2);
    }

    public static isFloor(param1: GroupItem): boolean {
        return _SafeCls_6051.hasCategory(param1, 3);
    }

    public static isLandscape(param1: GroupItem): boolean {
        return _SafeCls_6051.hasCategory(param1, 4);
    }

    public static isSittable(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        return _loc2_ != null && _loc2_.canSitOn;
    }

    public static isLayable(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        return _loc2_ != null && _loc2_.canLayOn;
    }

    public static isTilesOrRugs(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        if (_loc2_ == null) {
            return false;
        }
        if (_loc2_.className.startsWith("tile_walkmagic") || _loc2_.className == "hole") {
            return false;
        }
        if (!_loc2_.canPutStuffOn) {
            return false;
        }
        if (_loc2_.furniDataCategory == "rug" || _loc2_.furniDataCategory == "floor") {
            return true;
        }
        let _loc3_: string = _loc2_.className;
        if (_loc3_.startsWith("carpet")) {
            return true;
        }
        if (_loc2_.height > 0.2 || !_loc2_.canStandOn || _loc2_.tileSizeX <= 1 || _loc2_.tileSizeY <= 1) {
            return false;
        }
        return true;
    }

    public static isLtd(param1: GroupItem): boolean {
        let _loc2_: FurnitureItem = _SafeCls_6051.getFurnitureItem(param1);
        return _loc2_ != null && _loc2_.stuffData != null && _loc2_.stuffData.uniqueSerialNumber > 0;
    }

    public static isWired(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        if (_loc2_ == null) {
            return false;
        }
        return _loc2_.className.startsWith("wf_") || Boolean(_loc2_.furniDataCategory.startsWith("wired_"));
    }

    public static isCreditFurni(param1: GroupItem): boolean {
        return _SafeCls_6051.hasCategory(param1, 12) || Boolean(_SafeCls_6051.getClassName(param1).startsWith("CF_"));
    }

    public static isClothes(param1: GroupItem): boolean {
        return _SafeCls_6051.hasCategory(param1, 23);
    }

    public static isPetFood(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        if (_loc2_ == null) {
            return false;
        }
        return _loc2_.className.startsWith("petfood") || _loc2_.furniLine == "pet_food";
    }

    public static isCollectible(param1: GroupItem): boolean {
        return param1 != null && param1.isNft();
    }

    public static isTradable(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        return _loc2_ != null && _loc2_.tradeable;
    }

    public static isNonTradable(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        return _loc2_ != null && !_loc2_.tradeable;
    }

    public static isRecyclable(param1: GroupItem): boolean {
        let _loc2_: FurnitureItem = _SafeCls_6051.getFurnitureItem(param1);
        return _loc2_ != null && _loc2_.recyclable;
    }

    public static isWindow(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        if (_loc2_ == null) {
            return false;
        }
        return _loc2_.className.startsWith("window_") || _loc2_.furniLine == "windows" || _loc2_.furniDataCategory == "window";
    }

    public static isDimmer(param1: GroupItem): boolean {
        let _loc2_: IFurnitureData = _SafeCls_6051.getFurnitureData(param1);
        if (_loc2_ == null) {
            return false;
        }
        return _loc2_.className.startsWith("dimmer_") || _loc2_.furniDataCategory == "dimmer" || _loc2_.furniLine == "dimmers";
    }

    public static isStickie(param1: GroupItem): boolean {
        return _SafeCls_6051.hasCategory(param1, 5);
    }

    public static isPainting(param1: GroupItem): boolean {
        return _SafeCls_6051.getClassName(param1).startsWith("diamond_painting");
    }

    private static getFurnitureData(param1: GroupItem): IFurnitureData {
        return param1 != null ? param1.furniData : null;
    }

    private static getClassName(param1: GroupItem): string {
        return param1 != null ? param1.className : "";
    }

    private static getFurnitureItem(param1: GroupItem): FurnitureItem {
        return param1 != null ? param1.peek() : null;
    }

    private static hasCategory(param1: GroupItem, ...rest: any[]): boolean {
        if (param1 == null) {
            return false;
        }
        for (const _loc3_ of rest ?? []) {
            if (param1.category == _loc3_) {
                return true;
            }
        }
        return false;
    }
}
