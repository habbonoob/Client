import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6128 } from '@/com/sulake/habbo/room/object/logic/_SafeCls_6128';
import type { VariableFxLogicManager } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicManager';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectRoomAdEvent } from '@/com/sulake/habbo/room/events/RoomObjectRoomAdEvent';
import { RoomObjectStateChangeEvent } from '@/com/sulake/habbo/room/events/RoomObjectStateChangeEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectFurnitureHighlightUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureHighlightUpdateMessage';
import { RoomObjectFurnitureTransparencyUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureTransparencyUpdateMessage';
import { RoomObjectHeightUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectHeightUpdateMessage';
import { RoomObjectItemDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectItemDataUpdateMessage';
import { RoomObjectMoveUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectMoveUpdateMessage';
import { RoomObjectSelectedMessage } from '@/com/sulake/habbo/room/messages/RoomObjectSelectedMessage';
import { WiredFurnitureEffectState } from '@/com/sulake/habbo/room/object/logic/furniture/WiredFurnitureEffectState';
import { MovingObjectLogic } from '@/com/sulake/habbo/room/object/logic/MovingObjectLogic';
import { RoomObjectMouseEvent } from '@/com/sulake/room/events/RoomObjectMouseEvent';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { isIRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class FurnitureLogic extends MovingObjectLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureLogic'); }

    private static readonly BOUNCE_STEPS: number = 8;
    private static readonly BOUNCE_STEP_HEIGHT: number = 0.0625;
    private _mouseOver: boolean = false;
    private _sizeX: number = 0;
    private _sizeY: number = 0;
    private _sizeZ: number = 0;
    private _SafeStr_6000: number = 0;
    private _SafeStr_6485: number = 0;
    private _SafeStr_5444: number = 0;
    private _SafeStr_5463: boolean = false;
    private _SafeStr_2636: number = 0;

    declare private _storedRotateMessage: RoomObjectUpdateMessage;

    private _locationOffset: Vector3d = new Vector3d();
    private _directions: any[] = [];

    declare private _SafeStr_3843: _SafeCls_6128;

    declare private _SafeStr_14797: WiredFurnitureEffectState;

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["RORAE_ROOM_AD_TOOLTIP_SHOW", "RORAE_ROOM_AD_TOOLTIP_HIDE", "RORAE_ROOM_AD_FURNI_DOUBLE_CLICK", "ROSCE_STATE_CHANGE", "ROE_MOUSE_CLICK", "RORAE_ROOM_AD_FURNI_CLICK", "ROE_MOUSE_DOWN"];
        if (this.widget != null) {
            _loc1_.push("ROWRE_OPEN_WIDGET");
            _loc1_.push("ROWRE_CLOSE_WIDGET");
        }
        if (this.contextMenu != null) {
            _loc1_.push("ROWRE_OPEN_FURNI_CONTEXT_MENU");
            _loc1_.push("ROWRE_CLOSE_FURNI_CONTEXT_MENU");
        }
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override dispose(): void {
        if (this._SafeStr_14797 != null) {
            this._SafeStr_14797.dispose();
            this._SafeStr_14797 = null;
        }
        super.dispose();
        this._storedRotateMessage = null;
        this._directions = null;
        this._SafeStr_3843 = null;
    }

    public override transferStateFrom(param1: IRoomObjectEventHandler): void {
        super.transferStateFrom(param1);
        let _loc2_: FurnitureLogic = param1 instanceof FurnitureLogic ? param1 : null;
        if (_loc2_ == null || _loc2_ == this) {
            return;
        }
        if (this._SafeStr_14797 != null) {
            this._SafeStr_14797.dispose();
        }
        this._SafeStr_14797 = _loc2_._SafeStr_14797;
        _loc2_._SafeStr_14797 = null;
    }

    public override set object(param1: IRoomObjectController) {
        super.object = param1;
        if (param1 != null && param1.getLocation().length > 0) {
            this._SafeStr_5463 = true;
        }
    }

    public set roomData(param1: _SafeCls_6128) {
        this._SafeStr_3843 = param1;
    }

    public get roomData(): _SafeCls_6128 {
        return this._SafeStr_3843;
    }

    protected override get variableFxLogicManager(): VariableFxLogicManager {
        return this._SafeStr_3843?.variableFxLogicManager;
    }

    public override initialize(param1: XML): void {
        let _loc6_: number = 0;
        let _loc11_: XML = null;
        let _loc7_: number = 0;
        if (param1 == null) {
            return;
        }
        this._sizeX = 0;
        this._sizeY = 0;
        this._sizeZ = 0;
        this._directions = [];
        let _loc10_: XMLList = param1.child("model").child("dimensions");
        if (_loc10_.length() == 0) {
            return;
        }
        let _loc2_: XMLList = _loc10_.attribute("x");
        if (_loc2_.length() == 1) {
            this._sizeX = Number(_loc2_);
        }
        _loc2_ = _loc10_.attribute("y");
        if (_loc2_.length() == 1) {
            this._sizeY = Number(_loc2_);
        }
        _loc2_ = _loc10_.attribute("z");
        if (_loc2_.length() == 1) {
            this._sizeZ = Number(_loc2_);
        }
        this._SafeStr_6000 = this._sizeX / 2;
        this._SafeStr_6485 = this._sizeY / 2;
        _loc2_ = _loc10_.attribute("centerZ");
        if (_loc2_.length() == 1) {
            this._SafeStr_5444 = Number(_loc2_);
        } else {
            this._SafeStr_5444 = this._sizeZ / 2;
        }
        let _loc4_: XMLList = param1.child("model").child("directions").child("direction");
        let _loc5_: any[] = ["id"];
        _loc6_ = 0;
        while (_loc6_ < _loc4_.length()) {
            _loc11_ = _loc4_.item(_loc6_);
            if (XMLValidator.checkRequiredAttributes(_loc11_, _loc5_)) {
                _loc7_ = parseInt(_loc11_.attribute("id").toString()) | 0;
                this._directions.push(_loc7_);
            }
            _loc6_++;
        }
        this._directions.sort((a, b) => a - b);
        if (this.object == null || this.object.getModelController() == null) {
            return;
        }
        let _loc9_: XMLList = param1.child("customvars").child("variable");
        let _loc8_: any[] = [];
        for (const _loc3_ of _loc9_ ?? []) {
            _loc8_.push(_loc3_.attribute("name").toString());
        }
        this.object.getModelController().setStringArray("furniture_custom_variables", _loc8_, true);
        this.object.getModelController().setNumber("furniture_size_x", this._sizeX, true);
        this.object.getModelController().setNumber("furniture_size_y", this._sizeY, true);
        if (!this.object.getModelController().hasNumber("furniture_size_z")) {
            this.object.getModelController().setNumber("furniture_size_z", this._sizeZ);
        }
        this.object.getModelController().setNumber("furniture_center_x", this._SafeStr_6000, true);
        this.object.getModelController().setNumber("furniture_center_y", this._SafeStr_6485, true);
        this.object.getModelController().setNumber("furniture_center_z", this._SafeStr_5444, true);
        this.object.getModelController().setNumberArray("furniture_allowed_directions", this._directions, true);
        this.object.getModelController().setNumber("furniture_alpha_multiplier", 1);
    }

    protected getAdClickUrl(param1: IRoomObjectModelController): string {
        return param1.getString("furniture_ad_url");
    }

    protected handleAdClick(param1: number, param2: string, param3: string): void {
        if (this.eventDispatcher != null) {
            this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent("RORAE_ROOM_AD_FURNI_CLICK", this.object));
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        let _loc5_: RoomObjectEvent = null;
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        let _loc4_: IRoomObjectModelController = asGuarded(this.object.getModel(), isIRoomObjectModelController);
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: string = this.getAdClickUrl(_loc4_);
        switch (param1.type) {
            case "mouseMove":
                if (this.eventDispatcher != null) {
                    _loc5_ = new RoomObjectMouseEvent("ROE_MOUSE_MOVE", this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localX = param1.localX | 0;
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localY = param1.localY | 0;
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetX = param1.spriteOffsetX;
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetY = param1.spriteOffsetY;
                    this.eventDispatcher.dispatchEvent(_loc5_);
                }
                break;
            case "rollOver":
                this.setVariableFxHolderHovered(true);
                if (!this._mouseOver) {
                    if (this.eventDispatcher != null && _loc3_ != null && _loc3_.indexOf("http") == 0) {
                        this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent("RORAE_ROOM_AD_TOOLTIP_SHOW", this.object));
                    }
                    if (this.eventDispatcher != null) {
                        _loc5_ = new RoomObjectMouseEvent("ROE_MOUSE_ENTER", this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localX = param1.localX | 0;
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localY = param1.localY | 0;
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetX = param1.spriteOffsetX;
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetY = param1.spriteOffsetY;
                        this.eventDispatcher.dispatchEvent(_loc5_);
                    }
                    this._mouseOver = true;
                }
                break;
            case "rollOut":
                this.setVariableFxHolderHovered(false);
                if (this._mouseOver) {
                    if (this.eventDispatcher != null && _loc3_ != null && _loc3_.indexOf("http") == 0) {
                        this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent("RORAE_ROOM_AD_TOOLTIP_HIDE", this.object));
                    }
                    if (this.eventDispatcher != null) {
                        _loc5_ = new RoomObjectMouseEvent("ROE_MOUSE_LEAVE", this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localX = param1.localX | 0;
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localY = param1.localY | 0;
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetX = param1.spriteOffsetX;
                        (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetY = param1.spriteOffsetY;
                        this.eventDispatcher.dispatchEvent(_loc5_);
                    }
                    this._mouseOver = false;
                }
                break;
            case "doubleClick":
                this.useObject();
                break;
            case "click":
                if (this.eventDispatcher != null) {
                    _loc5_ = new RoomObjectMouseEvent("ROE_MOUSE_CLICK", this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localX = param1.localX | 0;
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).localY = param1.localY | 0;
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetX = param1.spriteOffsetX;
                    (_loc5_ instanceof RoomObjectMouseEvent ? _loc5_ : null).spriteOffsetY = param1.spriteOffsetY;
                    this.eventDispatcher.dispatchEvent(_loc5_);
                }
                if (this.eventDispatcher != null && _loc3_ != null && _loc3_.indexOf("http") == 0) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent("RORAE_ROOM_AD_TOOLTIP_HIDE", this.object));
                }
                if (this.eventDispatcher != null && _loc3_ != null) {
                    this.handleAdClick(this.object.getId(), this.object.getType(), _loc3_);
                }
                if (this.eventDispatcher != null && this.object != null && this.contextMenu != null) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_OPEN_FURNI_CONTEXT_MENU", this.object));
                }
                break;
            case "mouseDown":
                if (this.eventDispatcher != null) {
                    _loc5_ = new RoomObjectMouseEvent("ROE_MOUSE_DOWN", this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                    this.eventDispatcher.dispatchEvent(_loc5_);
                }
        }
    }

    public override useObject(): void {
        let _loc2_: IRoomObjectModelController = null;
        let _loc1_: string = null;
        if (this.object != null) {
            _loc2_ = asGuarded(this.object.getModel(), isIRoomObjectModelController);
            if (_loc2_ != null) {
                _loc1_ = this.getAdClickUrl(_loc2_);
                if (this.eventDispatcher != null && _loc1_ != null && _loc1_.length > 0) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent("RORAE_ROOM_AD_FURNI_DOUBLE_CLICK", this.object, null, _loc1_));
                }
            }
            if (this.eventDispatcher != null) {
                if (this.widget != null) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_OPEN_WIDGET", this.object));
                }
                this.eventDispatcher.dispatchEvent(new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object));
            }
        }
    }

    private handleDataUpdateMessage(param1: RoomObjectDataUpdateMessage): void {
        let _loc2_: IRoomObjectModelController = this.object.getModelController();
        this.object.setState(param1.state, 0);
        if (_loc2_ != null) {
            if (param1.data != null) {
                param1.data.writeRoomObjectModel(_loc2_);
            }
            if (!isNaN(param1.extra)) {
                _loc2_.setString("furniture_extras", String(param1.extra));
                _loc2_.setNumber("furniture_extra", param1.extra);
            }
            _loc2_.setNumber("furniture_state_update_time", this.lastUpdateTime);
        }
    }

    private handleHeightUpdateMessage(param1: RoomObjectHeightUpdateMessage): void {
        let _loc2_: IRoomObjectModelController = this.object.getModelController();
        if (_loc2_ != null) {
            _loc2_.setNumber("furniture_size_z", param1.height);
        }
    }

    private handleItemDataUpdateMessage(param1: RoomObjectItemDataUpdateMessage): void {
        let _loc2_: IRoomObjectModelController = this.object.getModelController();
        if (_loc2_ != null) {
            _loc2_.setString("furniture_itemdata", param1.itemData);
        }
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc5_: IVector3d = null;
        let _loc2_: IVector3d = null;
        let _loc7_: string = null;
        let _loc9_: RoomObjectFurnitureTransparencyUpdateMessage = param1 instanceof RoomObjectFurnitureTransparencyUpdateMessage ? param1 : null;
        if (_loc9_ != null) {
            this.getWiredEffectState().setTransparency(_loc9_.transparency, _loc9_.allowClickThrough, _loc9_.easingMode, _loc9_.initialize, this.getWiredEffectUpdateTime(), this.object.getModelController());
            return;
        }
        let _loc10_: RoomObjectFurnitureHighlightUpdateMessage = param1 instanceof RoomObjectFurnitureHighlightUpdateMessage ? param1 : null;
        if (_loc10_ != null) {
            this.getWiredEffectState().setHighlight(_loc10_.highlightType, _loc10_.strength, _loc10_.color, _loc10_.animationMode, _loc10_.easingMode, _loc10_.initialize, this.getWiredEffectUpdateTime(), this.object.getModelController());
            return;
        }
        if (this.processVariableFxStatusMessage(param1)) {
            return;
        }
        let _loc8_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc8_ != null) {
            this.handleDataUpdateMessage(_loc8_);
            return;
        }
        let _loc4_: RoomObjectHeightUpdateMessage = param1 instanceof RoomObjectHeightUpdateMessage ? param1 : null;
        if (_loc4_ != null) {
            this.handleHeightUpdateMessage(_loc4_);
            return;
        }
        let _loc6_: RoomObjectItemDataUpdateMessage = param1 instanceof RoomObjectItemDataUpdateMessage ? param1 : null;
        if (_loc6_ != null) {
            this.handleItemDataUpdateMessage(_loc6_);
            return;
        }
        if (param1.dir != null && param1.loc != null) {
            if (!(param1 instanceof RoomObjectMoveUpdateMessage)) {
                _loc5_ = this.object.getDirection();
                _loc2_ = this.object.getLocation();
                if (_loc5_ != null && _loc5_.x != param1.dir.x && this._SafeStr_5463 && _loc2_ != null && _loc2_.x == param1.loc.x && _loc2_.y == param1.loc.y && _loc2_.z == param1.loc.z) {
                    this._SafeStr_2636 = 1;
                    this._storedRotateMessage = new RoomObjectUpdateMessage(param1.loc, param1.dir);
                    param1 = null;
                }
            } else if (param1.dir != null) {
                this.object.setDirection(param1.dir);
            }
            this._SafeStr_5463 = true;
        }
        let _loc3_: RoomObjectSelectedMessage = param1 instanceof RoomObjectSelectedMessage ? param1 : null;
        if (this.contextMenu != null && _loc3_ != null && this.eventDispatcher != null && this.object != null) {
            _loc7_ = _loc3_.selected ? "ROWRE_OPEN_FURNI_CONTEXT_MENU" : "ROWRE_CLOSE_FURNI_CONTEXT_MENU";
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(_loc7_, this.object));
        }
        super.processUpdateMessage(param1);
    }

    protected override getLocationOffset(): IVector3d {
        if (this._SafeStr_2636 > 0) {
            this._locationOffset.x = 0;
            this._locationOffset.y = 0;
            if (this._SafeStr_2636 <= 8 / 2) {
                this._locationOffset.z = 0.0625 * this._SafeStr_2636;
            } else if (this._SafeStr_2636 <= 8) {
                if (this._storedRotateMessage) {
                    super.processUpdateMessage(this._storedRotateMessage);
                    this._storedRotateMessage = null;
                }
                this._locationOffset.z = 0.0625 * (8 - this._SafeStr_2636);
            }
            return this._locationOffset;
        }
        return null;
    }

    public override update(param1: number): void {
        super.update(param1);
        if (this._SafeStr_14797 != null) {
            this._SafeStr_14797.update(param1, this.object.getModelController());
        }
        if (this._SafeStr_2636 > 0) {
            this._SafeStr_2636 = this._SafeStr_2636 + 1;
            if (this._SafeStr_2636 > 8) {
                this._SafeStr_2636 = 0;
            }
        }
    }

    private getWiredEffectState(): WiredFurnitureEffectState {
        if (this._SafeStr_14797 == null) {
            this._SafeStr_14797 = new WiredFurnitureEffectState();
        }
        return this._SafeStr_14797;
    }

    private getWiredEffectUpdateTime(): number {
        return this.lastUpdateTime > 0 ? this.lastUpdateTime : getTimer();
    }

    public override tearDown(): void {
        if (this.widget != null && this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_CLOSE_WIDGET", this.object));
        }
        super.tearDown();
    }

    public override get object(): IRoomObjectController {
        return super.object;
    }
}
