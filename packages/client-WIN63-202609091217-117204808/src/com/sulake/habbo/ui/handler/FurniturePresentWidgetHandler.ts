import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { RoomSessionPresentEvent } from '@/com/sulake/habbo/session/events/RoomSessionPresentEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetPresentDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPresentDataUpdateEvent';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';
import { RoomWidgetPresentOpenMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPresentOpenMessage';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class FurniturePresentWidgetHandler implements IRoomWidgetHandler, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurniturePresentWidgetHandler'); }

    private static readonly _SafeStr_7439: string = "floor";
    private static readonly TYPE_WALLPAPER: string = "wallpaper";
    private static readonly TYPE_LANDSCAPE: string = "landscape";
    private static readonly TYPE_POSTER: string = "poster";
    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;
    private _objectId: number = -1;
    private _name: string = "";

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FURNI_PRESENT_WIDGET";
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_PRESENT", "RWPOM_OPEN_PRESENT"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc4_: RoomWidgetFurniToWidgetMessage = null;
        let _loc3_: IRoomObject = null;
        let _loc13_: IRoomObjectModel = null;
        let _loc12_: string = null;
        let _loc8_: string = null;
        let _loc14_: string = null;
        let _loc11_: number = 0;
        let _loc5_: string = null;
        let _loc7_: number = 0;
        let _loc10_: ImageResult = null;
        let _loc2_: RoomWidgetPresentDataUpdateEvent = null;
        let _loc6_: boolean = false;
        let _loc9_: RoomWidgetPresentOpenMessage = null;
        switch (param1.type) {
            case "RWFWM_MESSAGE_REQUEST_PRESENT":
                _loc4_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                _loc3_ = this._container.roomEngine.getRoomObject(_loc4_.roomId, _loc4_.id, _loc4_.category);
                if (_loc3_ != null) {
                    _loc13_ = _loc3_.getModel();
                    if (_loc13_ != null) {
                        this._objectId = _loc4_.id;
                        _loc12_ = _loc13_.getString("furniture_data");
                        if (_loc12_ == null) {
                            _loc12_ = "";
                        }
                        _loc8_ = _loc13_.getString("furniture_purchaser_name");
                        _loc14_ = _loc13_.getString("furniture_purchaser_figure");
                        _loc11_ = _loc13_.getNumber("furniture_type_id") | 0;
                        _loc5_ = _loc13_.getString("furniture_extras");
                        _loc7_ = 32;
                        _loc10_ = this._container.roomEngine.getFurnitureImage(_loc11_, new Vector3d(180), _loc7_, null, 0, _loc5_);
                        _loc6_ = _loc13_.getNumber("furniture_trusted_sender") == 1;
                        _loc2_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_PACKAGEINFO", _loc4_.id, _loc12_, this._container.isOwnerOfFurniture(_loc3_), _loc10_.data, _loc8_, _loc14_, false, false, _loc6_);
                        this._container.events.dispatchEvent(_loc2_);
                    }
                }
                break;
            case "RWPOM_OPEN_PRESENT":
                _loc9_ = param1 instanceof RoomWidgetPresentOpenMessage ? param1 : null;
                if (_loc9_.objectId != this._objectId) {
                    return null;
                }
                if (this._container != null) {
                    if (this._container.roomSession != null) {
                        this._container.roomSession.sendPresentOpenMessage(_loc9_.objectId);
                    }
                    if (this._container.roomEngine != null) {
                        this._container.roomEngine.changeObjectModelData(this._container.roomEngine.activeRoomId, _loc9_.objectId, 10, "furniture_disable_picking_animation", 1);
                    }
                }
        }
        return null;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed || this._container == null) {
            return;
        }
        let _loc3_: RoomWidgetPresentDataUpdateEvent = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS_IMAGE", 0, this._name, false, param2);
        this._container.events.dispatchEvent(_loc3_);
    }

    public imageFailed(param1: number): void {
    }

    public getProcessedEvents(): any[] {
        return ["RSPE_PRESENT_OPENED"];
    }

    public processEvent(param1: Event): void {
        let _loc13_: RoomSessionPresentEvent = null;
        let _loc3_: IFurnitureData = null;
        let _loc5_: ImageResult = null;
        let _loc10_: RoomWidgetPresentDataUpdateEvent = null;
        let _loc2_: boolean = false;
        let _loc11_: IRoomObject = null;
        let _loc6_: IProductData = null;
        let _loc14_: string = null;
        let _loc4_: string = null;
        let _loc8_: number = 0;
        let _loc9_: string = null;
        let _loc12_: PetFigureData = null;
        let _loc16_: number = 0;
        let _loc7_: number = 0;
        let _loc15_: ImageResult = null;
        if (param1 == null) {
            return;
        }
        if (this._container != null && this._container.events != null && param1 != null) {
            let _loc17_: string = param1.type;
            if ("RSPE_PRESENT_OPENED" === _loc17_) {
                _loc13_ = param1 instanceof RoomSessionPresentEvent ? param1 : null;
                if (_loc13_ != null) {
                    this._name = "";
                    _loc5_ = null;
                    if (_loc13_.itemType == "s") {
                        _loc3_ = this._container.sessionDataManager.getFloorItemData(_loc13_.classId);
                    } else if (_loc13_.itemType == "i") {
                        _loc3_ = this._container.sessionDataManager.getWallItemData(_loc13_.classId);
                    }
                    _loc2_ = false;
                    if (_loc13_.placedInRoom) {
                        _loc11_ = this._container.roomEngine.getRoomObject(this._container.roomSession.roomId, _loc13_.placedItemId, 10);
                        if (_loc11_ != null) {
                            _loc2_ = this._container.isOwnerOfFurniture(_loc11_);
                        }
                    }
                    switch (_loc13_.itemType) {
                        case "i":
                            if (_loc3_ != null) {
                                switch (_loc3_.className) {
                                    case "floor":
                                        _loc10_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS_FLOOR", 0, this._container.localization.getLocalization("inventory.furni.item.floor.name"), _loc2_, null);
                                        break;
                                    case "landscape":
                                        _loc10_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS_LANDSCAPE", 0, this._container.localization.getLocalization("inventory.furni.item.landscape.name"), _loc2_, null);
                                        break;
                                    case "wallpaper":
                                        _loc10_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS_WALLPAPER", 0, this._container.localization.getLocalization("inventory.furni.item.wallpaper.name"), _loc2_, null);
                                        break;
                                    case "poster":
                                        _loc14_ = _loc13_.productCode;
                                        _loc4_ = null;
                                        if (_loc14_.indexOf("poster") == 0) {
                                            _loc8_ = Number(_loc14_.replace("poster", "")) | 0;
                                            _loc4_ = String(_loc8_);
                                        }
                                        _loc5_ = this._container.roomEngine.getWallItemIcon(_loc13_.classId, this, _loc4_);
                                        _loc6_ = this._container.sessionDataManager.getProductData(_loc14_);
                                        if (_loc6_ != null) {
                                            this._name = _loc6_.name;
                                        } else if (_loc3_ != null) {
                                            this._name = _loc3_.localizedName;
                                        }
                                        if (_loc5_ != null) {
                                            _loc10_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS", 0, this._name, _loc2_, _loc5_.data);
                                        }
                                        break;
                                    default:
                                        _loc5_ = this._container.roomEngine.getWallItemIcon(_loc13_.classId, this);
                                        if (_loc3_ != null) {
                                            this._name = _loc3_.localizedName;
                                        }
                                        if (_loc5_ != null) {
                                            _loc10_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS", 0, this._name, _loc2_, _loc5_.data);
                                        }
                                }
                            }
                            break;
                        case "h":
                            _loc10_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS_CLUB", 0, this._container.localization.getLocalization("widget.furni.present.hc"), false, null);
                            break;
                        default:
                            if (_loc13_.placedItemType == "p") {
                                _loc9_ = _loc13_.petFigureString;
                                if (_loc9_ != null && _loc9_.length > 0) {
                                    _loc12_ = new PetFigureData(_loc9_);
                                    _loc16_ = 2;
                                    _loc7_ = 64;
                                    if (_loc12_.typeId == 15) {
                                        _loc7_ = 32;
                                    }
                                    _loc15_ = this._container.roomEngine.getPetImage(_loc12_.typeId, _loc12_.paletteId, _loc12_.color, new Vector3d(_loc16_ * 45), _loc7_, this, true, 0, _loc12_.customParts);
                                    if (_loc15_ != null) {
                                        _loc5_ = _loc15_;
                                    }
                                }
                            }
                            if (_loc5_ == null) {
                                _loc5_ = this._container.roomEngine.getFurnitureImage(_loc13_.classId, new Vector3d(90), 64, this);
                            }
                            _loc6_ = this._container.sessionDataManager.getProductData(_loc13_.productCode);
                            if (_loc6_ != null) {
                                this._name = _loc6_.name;
                            } else if (_loc3_ != null) {
                                this._name = _loc3_.localizedName;
                            }
                            if (_loc5_ != null) {
                                _loc10_ = new RoomWidgetPresentDataUpdateEvent("RWPDUE_CONTENTS", 0, this._name, _loc2_, _loc5_.data);
                            }
                    }
                    if (_loc10_ != null) {
                        _loc10_.classId = _loc13_.classId;
                        _loc10_.itemType = _loc13_.itemType;
                        _loc10_.placedItemId = _loc13_.placedItemId;
                        _loc10_.placedInRoom = _loc13_.placedInRoom;
                        _loc10_.placedItemType = _loc13_.placedItemType;
                        this._container.events.dispatchEvent(_loc10_);
                    }
                }
            }
        }
    }

    public update(): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
