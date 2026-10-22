import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectRoomAdEvent } from '@/com/sulake/habbo/room/events/RoomObjectRoomAdEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectRoomAdUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomAdUpdateMessage';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FurnitureRoomBrandingLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureRoomBrandingLogic'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        FurnitureRoomBrandingLogic.#initStatics();
        return FurnitureRoomBrandingLogic._log;
    }

    public static readonly STUFF_DATA_KEY_STATE: string = "state";
    public static readonly STUFF_DATA_KEY_IMAGEURL: string = "imageUrl";
    public static readonly STUFF_DATA_KEY_CLICKURL: string = "clickUrl";
    public static readonly STUFF_DATA_KEY_OFFSET_X: string = "offsetX";
    public static readonly STUFF_DATA_KEY_OFFSET_Y: string = "offsetY";
    public static readonly STUFF_DATA_KEY_OFFSET_Z: string = "offsetZ";

    constructor() {
        super();
        this._SafeStr_5975 = true;
        this._SafeStr_5085 = false;
    }

    declare protected _SafeStr_5975: boolean;
    static { (this.prototype as any)._SafeStr_5975 = false; }

    declare protected _SafeStr_5085: boolean;
    static { (this.prototype as any)._SafeStr_5085 = false; }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (this._SafeStr_5975) {
            this.object.getModelController().setNumber("furniture_selection_disable", 1);
        }
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["RORAE_ROOM_AD_LOAD_IMAGE"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: RoomObjectRoomAdUpdateMessage = null;
        super.processUpdateMessage(param1);
        if (param1 instanceof RoomObjectDataUpdateMessage) {
            this.setupImageFromFurnitureData();
        }
        if (param1 instanceof RoomObjectRoomAdUpdateMessage) {
            _loc2_ = param1 instanceof RoomObjectRoomAdUpdateMessage ? param1 : null;
            switch (_loc2_.type) {
                case "RORUM_ROOM_BILLBOARD_IMAGE_LOADED":
                    this.object.getModelController().setNumber("furniture_branding_image_status", 1, false);
                    break;
                case "RORUM_ROOM_BILLBOARD_IMAGE_LOADING_FAILED":
                    this.object.getModelController().setNumber("furniture_branding_image_status", -1);
                    FurnitureRoomBrandingLogic._log.warn("failed to load billboard image from url " + this.object.getModelController().getString("furniture_branding_image_url"));
            }
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (param1.type == "mouseMove") {
            return;
        }
        let _loc3_: any = param1.type;
        if ("doubleClick" !== _loc3_) {
            super.mouseEvent(param1, param2);
        }
    }

    private setupImageFromFurnitureData(): boolean {
        let _loc9_: MapStuffData = null;
        let _loc2_: number = NaN;
        let _loc12_: number = 0;
        let _loc14_: string = null;
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc5_: string = null;
        let _loc13_: boolean = false;
        if (this.object != null) {
            _loc9_ = new MapStuffData();
            _loc9_.initializeFromRoomObjectModel(this.object.getModel());
            _loc2_ = 0;
            if (!isNaN(_loc2_)) {
                _loc12_ = _loc2_ | 0;
                if (this.object.getState(0) != _loc12_) {
                    this.object.setState(_loc12_, 0);
                    _loc13_ = true;
                }
            }
            _loc14_ = this.forceImageUrlToUseHttps(_loc9_.getValue("imageUrl"));
            if (_loc14_ != null) {
                _loc3_ = this.object.getModelController().getString("furniture_branding_image_url");
                if (_loc3_ == null || this.forceImageUrlToUseHttps(_loc3_) != _loc14_) {
                    this.object.getModelController().setString("furniture_branding_image_url", _loc14_, false);
                    this.object.getModelController().setNumber("furniture_branding_image_status", 0, false);
                    _loc13_ = true;
                }
            }
            _loc4_ = _loc9_.getValue("clickUrl");
            if (_loc4_ != null) {
                _loc5_ = this.object.getModelController().getString("furniture_branding_url");
                if (_loc5_ == null || _loc5_ != _loc4_) {
                    this.object.getModelController().setString("furniture_branding_url", _loc4_);
                    _loc13_ = true;
                }
            }
            if (!isNaN(parseInt(_loc9_.getValue("offsetX")))) {
                _loc13_ = this.updateOffset("furniture_branding_offset_x", this.object.getModelController().getNumber("furniture_branding_offset_x") | 0, parseInt(_loc9_.getValue("offsetX")) | 0);
            }
            if (!isNaN(parseInt(_loc9_.getValue("offsetY")))) {
                _loc13_ = this.updateOffset("furniture_branding_offset_y", this.object.getModelController().getNumber("furniture_branding_offset_y") | 0, parseInt(_loc9_.getValue("offsetY")) | 0);
            }
            if (!isNaN(parseInt(_loc9_.getValue("offsetZ")))) {
                _loc13_ = this.updateOffset("furniture_branding_offset_z", this.object.getModelController().getNumber("furniture_branding_offset_z") | 0, parseInt(_loc9_.getValue("offsetZ")) | 0);
            }
        }
        let _loc10_: string = this.object.getModelController().getString("furniture_branding_image_url");
        let _loc1_: string = this.object.getModelController().getString("furniture_branding_url");
        let _loc6_: number = this.object.getModelController().getNumber("furniture_branding_offset_x") | 0;
        let _loc8_: number = this.object.getModelController().getNumber("furniture_branding_offset_y") | 0;
        let _loc7_: number = this.object.getModelController().getNumber("furniture_branding_offset_z") | 0;
        if (_loc10_ != null) {
            this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent("RORAE_ROOM_AD_LOAD_IMAGE", this.object, _loc10_, _loc1_));
        }
        let _loc11_: string = "imageUrl=" + (_loc10_ != null ? _loc10_ : "") + "\t";
        if (this._SafeStr_5085) {
            _loc11_ += "clickUrl=" + (_loc1_ != null ? _loc1_ : "") + "\t";
        }
        _loc11_ += "offsetX=" + _loc6_ + "\t";
        _loc11_ = _loc11_ + ("offsetY=" + _loc8_ + "\t");
        _loc11_ = _loc11_ + ("offsetZ=" + _loc7_ + "\t");
        this.object.getModelController().setString("RWEIEP_INFOSTAND_EXTRA_PARAM", "RWEIEP_BRANDING_OPTIONS" + _loc11_);
        return _loc13_;
    }

    private forceImageUrlToUseHttps(param1: string): string {
        return param1 != null ? param1.replace("http:", "https:") : null;
    }

    private updateOffset(param1: string, param2: number, param3: number): boolean {
        if (!isNaN(param3) && param2 != param3) {
            this.object.getModelController().setNumber(param1, param3);
            return true;
        }
        return false;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FurnitureRoomBrandingLogic.#staticsReady) return;
        FurnitureRoomBrandingLogic.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FurnitureRoomBrandingLogic, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.room.object.logic.furniture.FurnitureRoomBrandingLogic"));
    }
}
