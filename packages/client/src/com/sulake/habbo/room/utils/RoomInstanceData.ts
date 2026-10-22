import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FurniStackingHeightMap } from '@/com/sulake/habbo/room/utils/FurniStackingHeightMap';
import type { FurnitureData } from '@/com/sulake/habbo/room/utils/FurnitureData';
import type { SelectedRoomObjectData } from '@/com/sulake/habbo/room/utils/SelectedRoomObjectData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { LegacyWallGeometry } from '@/com/sulake/habbo/room/utils/LegacyWallGeometry';
import { RoomCamera } from '@/com/sulake/habbo/room/utils/RoomCamera';
import { TileObjectMap } from '@/com/sulake/habbo/room/utils/TileObjectMap';

export class RoomInstanceData {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::RoomInstanceData'); }

    constructor(param1: number) {
        this._roomId = param1;
        this._legacyGeometry = new LegacyWallGeometry();
        this._roomCamera = new RoomCamera();
    }

    private _roomId: number = 0;
    private _furniStackingHeightMap: FurniStackingHeightMap = null;
    private _tileObjectMap: TileObjectMap = null;
    private _roomCamera: RoomCamera = null;
    private _worldType: string = null;
    private _SafeStr_2977: UtilsMap = new UtilsMap();
    private _SafeStr_3046: UtilsMap = new UtilsMap();
    private _mouseButtonCursorOwners: any[] = [];
    private _legacyGeometry: LegacyWallGeometry = null;

    public get legacyGeometry(): LegacyWallGeometry {
        return this._legacyGeometry;
    }

    private _selectedObject: SelectedRoomObjectData = null;

    public get selectedObject(): SelectedRoomObjectData {
        return this._selectedObject;
    }

    public set selectedObject(param1: SelectedRoomObjectData) {
        if (this._selectedObject != null) {
            this._selectedObject.dispose();
        }
        this._selectedObject = param1;
    }

    private _placedObject: SelectedRoomObjectData = null;

    public get placedObject(): SelectedRoomObjectData {
        return this._placedObject;
    }

    public set placedObject(param1: SelectedRoomObjectData) {
        if (this._placedObject != null) {
            this._placedObject.dispose();
        }
        this._placedObject = param1;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get furniStackingHeightMap(): FurniStackingHeightMap {
        return this._furniStackingHeightMap;
    }

    public set furniStackingHeightMap(param1: FurniStackingHeightMap) {
        if (this._furniStackingHeightMap != null) {
            this._furniStackingHeightMap.dispose();
        }
        this._furniStackingHeightMap = param1;
        if (this._tileObjectMap) {
            this._tileObjectMap.dispose();
        }
        if (this._furniStackingHeightMap) {
            this._tileObjectMap = new TileObjectMap(this._furniStackingHeightMap.width, this._furniStackingHeightMap.height);
        }
    }

    public get tileObjectMap(): TileObjectMap {
        return this._tileObjectMap;
    }

    public get roomCamera(): RoomCamera {
        return this._roomCamera;
    }

    public get worldType(): string {
        return this._worldType;
    }

    public set worldType(param1: string) {
        this._worldType = param1;
    }

    public dispose(): void {
        if (this._furniStackingHeightMap != null) {
            this._furniStackingHeightMap.dispose();
            this._furniStackingHeightMap = null;
        }
        if (this._legacyGeometry != null) {
            this._legacyGeometry.dispose();
            this._legacyGeometry = null;
        }
        if (this._roomCamera != null) {
            this._roomCamera.dispose();
            this._roomCamera = null;
        }
        if (this._selectedObject != null) {
            this._selectedObject.dispose();
            this._selectedObject = null;
        }
        if (this._placedObject != null) {
            this._placedObject.dispose();
            this._placedObject = null;
        }
        if (this._SafeStr_2977 != null) {
            this._SafeStr_2977.dispose();
            this._SafeStr_2977 = null;
        }
        if (this._SafeStr_3046 != null) {
            this._SafeStr_3046.dispose();
            this._SafeStr_3046 = null;
        }
        if (this._tileObjectMap != null) {
            this._tileObjectMap.dispose();
            this._tileObjectMap = null;
        }
    }

    public addFurnitureData(param1: FurnitureData): void {
        if (param1 != null) {
            this._SafeStr_2977.remove(param1.id);
            this._SafeStr_2977.add(param1.id, param1);
        }
    }

    public getFurnitureData(): FurnitureData {
        if (this._SafeStr_2977.length > 0) {
            return this.getFurnitureDataWithId(this._SafeStr_2977.getKey(0) | 0);
        }
        return null;
    }

    public getFurnitureDataWithId(param1: number): FurnitureData {
        return this._SafeStr_2977.remove(param1);
    }

    public addWallItemData(param1: FurnitureData): void {
        if (param1 != null) {
            this._SafeStr_3046.remove(param1.id);
            this._SafeStr_3046.add(param1.id, param1);
        }
    }

    public getWallItemData(): FurnitureData {
        if (this._SafeStr_3046.length > 0) {
            return this.getWallItemDataWithId(this._SafeStr_3046.getKey(0) | 0);
        }
        return null;
    }

    public getWallItemDataWithId(param1: number): FurnitureData {
        return this._SafeStr_3046.remove(param1);
    }

    public addButtonMouseCursorOwner(param1: string): boolean {
        let _loc2_: number = this._mouseButtonCursorOwners.indexOf(param1);
        if (_loc2_ == -1) {
            this._mouseButtonCursorOwners.push(param1);
            return true;
        }
        return false;
    }

    public removeButtonMouseCursorOwner(param1: string): boolean {
        let _loc2_: number = this._mouseButtonCursorOwners.indexOf(param1);
        if (_loc2_ > -1) {
            this._mouseButtonCursorOwners.splice(_loc2_, 1);
            return true;
        }
        return false;
    }

    public hasButtonMouseCursorOwners(): boolean {
        return this._mouseButtonCursorOwners.length > 0;
    }
}
