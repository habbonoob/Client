import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomObjectFurniIconAssetEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurniIconAssetEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectFurniIconUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurniIconUpdateMessage';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { FurnitureChestLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureChestLogic';

export class FurnitureFurniChestLogic extends FurnitureChestLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureFurniChestLogic'); }

    private static readonly LOADING_ICON_PLACEHOLDER: string = "loading_icon";
    private static readonly VISUALS_KEY: string = "visuals";
    private static readonly STATE_KEY: string = "state";
    private _SafeStr_5126: string = "";
    private _assetNamesForVisuals: UtilsMap = new UtilsMap();

    constructor() {
        super();
    }

    private static itemTypeToString(param1: boolean, param2: number, param3: string): string {
        let _loc4_: string = "";
        _loc4_ = _loc4_ + (param1 + ",");
        _loc4_ = _loc4_ + param2;
        if (param3 != "") {
            _loc4_ += "," + param3;
        }
        return _loc4_;
    }

    private static stringToItemType(param1: string): any {
        let _loc4_: any[] = param1.split(",");
        let _loc3_: boolean = _loc4_[0] == "true";
        let _loc5_: number = _loc4_[1] | 0;
        let _loc2_: string = stringOrNull(_loc4_.length > 2 ? _loc4_[2] : "");
        return { "isWallItem": _loc3_, "typeId": _loc5_, "extra": _loc2_ };
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROFIAE_LOAD_FURNI_ICON"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc3_: MapStuffData = null;
        let _loc4_: string = null;
        let _loc6_: string = null;
        super.processUpdateMessage(param1);
        let _loc5_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc5_ != null) {
            _loc3_ = asInstanceOf(_loc5_.data, MapStuffData);
            if (_loc3_ != null) {
                _loc4_ = _loc3_.getValue("visuals");
                if (_loc5_.state % 2 != 1) {
                    _loc4_ = "";
                }
                if (_loc4_ != null && _loc4_ != this._SafeStr_5126) {
                    this._SafeStr_5126 = _loc4_;
                    this.onVisualsChange();
                    this.object.getModelController().setString("furniture_furni_chest_shown_asset_names", this.shownAssetsString);
                    this.update(getTimer());
                }
            }
        }
        let _loc2_: RoomObjectFurniIconUpdateMessage = param1 instanceof RoomObjectFurniIconUpdateMessage ? param1 : null;
        if (_loc2_ != null) {
            if (_loc2_.assetName != "loading_icon") {
                _loc6_ = FurnitureFurniChestLogic.itemTypeToString(_loc2_.wallItem, _loc2_.typeId, _loc2_.extra);
                if (this._assetNamesForVisuals.hasKey(_loc6_) && this._assetNamesForVisuals.getValue(_loc6_) == "loading_icon") {
                    this._assetNamesForVisuals.replace(_loc6_, _loc2_.assetName);
                    this.object.getModelController().setString("furniture_furni_chest_shown_asset_names", this.shownAssetsString);
                    this.update(getTimer());
                }
            }
        }
    }

    private onVisualsChange(): void {
        let _loc1_: any = null;
        this._assetNamesForVisuals = new UtilsMap();
        let _loc2_: any[] = this._SafeStr_5126.split(";");
        for (const _loc3_ of _loc2_ ?? []) {
            if (_loc3_ != "") {
                this._assetNamesForVisuals.add(_loc3_, "loading_icon");
                _loc1_ = FurnitureFurniChestLogic.stringToItemType(stringOrNull(_loc3_));
                this.eventDispatcher.dispatchEvent(new RoomObjectFurniIconAssetEvent("ROFIAE_LOAD_FURNI_ICON", this.object, _loc1_.isWallItem, _loc1_.typeId | 0, stringOrNull(_loc1_.extra)));
            }
        }
    }

    private get shownAssetsString(): string {
        let _loc1_: any[] = [];
        let _loc2_: any[] = this._SafeStr_5126.split(";");
        for (const _loc3_ of _loc2_ ?? []) {
            if (_loc3_ != "") {
                _loc1_.push(this._assetNamesForVisuals.getValue(_loc3_));
            }
        }
        return _loc1_.join(",");
    }
}
