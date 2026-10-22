import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomPlaneBitmapMaskData } from '@/com/sulake/habbo/room/object/RoomPlaneBitmapMaskData';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectTileMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectTileMouseEvent';
import { RoomObjectWallMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectWallMouseEvent';
import { RoomObjectRoomColorUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomColorUpdateMessage';
import { RoomObjectRoomFloorHoleUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomFloorHoleUpdateMessage';
import { RoomObjectRoomMaskUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomMaskUpdateMessage';
import { RoomObjectRoomPlanePropertyUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomPlanePropertyUpdateMessage';
import { RoomObjectRoomPlaneVisibilityUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomPlaneVisibilityUpdateMessage';
import { RoomObjectRoomUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectRoomUpdateMessage';
import { RoomPlaneBitmapMaskParser } from '@/com/sulake/habbo/room/object/RoomPlaneBitmapMaskParser';
import { RoomPlaneParser } from '@/com/sulake/habbo/room/object/RoomPlaneParser';
import { isIRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { ObjectLogicBase } from '@/com/sulake/room/object/logic/ObjectLogicBase';
import { ColorTransitioner } from '@/com/sulake/room/utils/ColorTransitioner';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomLogic extends ObjectLogicBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.room::RoomLogic'); }

    protected _SafeStr_2206: RoomPlaneParser = null;
    private _SafeStr_3079: RoomPlaneBitmapMaskParser = null;
    private _SafeStr_3350: ColorTransitioner = null;

    declare private _SafeStr_3956: boolean;
    static { (this.prototype as any)._SafeStr_3956 = false; }

    constructor() {
        super();
        this._SafeStr_2206 = new RoomPlaneParser();
        this._SafeStr_3079 = new RoomPlaneBitmapMaskParser();
        this._SafeStr_3350 = new ColorTransitioner();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROE_MOUSE_MOVE", "ROE_MOUSE_CLICK"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override dispose(): void {
        super.dispose();
        if (this._SafeStr_2206 != null) {
            this._SafeStr_2206.dispose();
            this._SafeStr_2206 = null;
        }
        if (this._SafeStr_3079 != null) {
            this._SafeStr_3079.dispose();
            this._SafeStr_3079 = null;
        }
        this._SafeStr_3350 = null;
    }

    public override initialize(param1: XML): void {
        if (param1 == null || this.object == null) {
            return;
        }
        if (!this._SafeStr_2206.initializeFromXML(param1)) {
            return;
        }
        let _loc2_: IRoomObjectModelController = asGuarded(this.object.getModel(), isIRoomObjectModelController);
        if (_loc2_ != null) {
            _loc2_.setString("room_plane_xml", param1.toString());
            _loc2_.setNumber("room_background_color", 16777215);
            _loc2_.setNumber("room_floor_visibility", 1);
            _loc2_.setNumber("room_wall_visibility", 1);
            _loc2_.setNumber("room_landscape_visibility", 1);
        }
    }

    public override update(param1: number): void {
        let _loc3_: IRoomObjectModelController = null;
        let _loc2_: XML = null;
        super.update(param1);
        this.updateBackgroundColor(param1);
        if (this._SafeStr_3956) {
            if (this.object != null) {
                _loc3_ = asGuarded(this.object.getModel(), isIRoomObjectModelController);
                if (_loc3_ != null) {
                    _loc2_ = this._SafeStr_2206.getXML();
                    _loc3_.setString("room_plane_xml", _loc2_.toString());
                    _loc3_.setNumber("room_floor_hole_update_time", param1);
                    this._SafeStr_2206.initializeFromXML(_loc2_);
                }
            }
            this._SafeStr_3956 = false;
        }
    }

    private updateBackgroundColor(param1: number): void {
        let _loc2_: number = 0;
        let _loc3_: IRoomObjectModelController = null;
        if (this.object == null) {
            return;
        }
        if (this._SafeStr_3350 && this._SafeStr_3350.updateColor(param1)) {
            _loc2_ = this._SafeStr_3350.color;
            _loc3_ = asGuarded(this.object.getModel(), isIRoomObjectModelController);
            if (_loc3_ == null) {
                return;
            }
            _loc3_.setNumber("room_background_color", _loc2_);
        }
    }

    private updatePlaneTypes(param1: RoomObjectRoomUpdateMessage, param2: IRoomObjectModelController): void {
        switch (param1.type) {
            case "RORUM_ROOM_FLOOR_UPDATE":
                param2.setString("room_floor_type", param1.value);
                break;
            case "RORUM_ROOM_WALL_UPDATE":
                param2.setString("room_wall_type", param1.value);
                break;
            case "RORUM_ROOM_LANDSCAPE_UPDATE":
                param2.setString("room_landscape_type", param1.value);
        }
    }

    private updatePlaneMasks(param1: RoomObjectRoomMaskUpdateMessage, param2: IRoomObjectModelController): void {
        let _loc7_: string = null;
        let _loc6_: XML = null;
        let _loc4_: string = null;
        let _loc5_: RoomPlaneBitmapMaskData = null;
        let _loc3_: boolean = false;
        switch (param1.type) {
            case "RORMUM_ADD_MASK":
                _loc7_ = "window";
                if (param1.maskCategory == "hole") {
                    _loc7_ = "hole";
                }
                _loc3_ = this._SafeStr_3079.addMask(param1.maskId, param1.maskType, param1.maskLocation, _loc7_);
                break;
            case "RORMUM_REMOVE_MASK":
                _loc3_ = this._SafeStr_3079.removeMask(param1.maskId);
        }
        if (_loc3_) {
            _loc6_ = this._SafeStr_3079.getXML();
            _loc4_ = _loc6_.toXMLString();
            param2.setString("room_plane_mask_xml", _loc4_);
        }
    }

    private updatePlaneVisibilities(param1: RoomObjectRoomPlaneVisibilityUpdateMessage, param2: IRoomObjectModelController): void {
        let _loc3_: number = 0;
        if (param1.visible) {
            _loc3_ = 1;
        }
        switch (param1.type) {
            case "RORPVUM_FLOOR_VISIBILITY":
                param2.setNumber("room_floor_visibility", _loc3_);
                break;
            case "RORPVUM_WALL_VISIBILITY":
                param2.setNumber("room_wall_visibility", _loc3_);
                param2.setNumber("room_landscape_visibility", _loc3_);
        }
    }

    private updatePlaneProperties(param1: RoomObjectRoomPlanePropertyUpdateMessage, param2: IRoomObjectModelController): void {
        switch (param1.type) {
            case "RORPVUM_FLOOR_THICKNESS":
                param2.setNumber("room_floor_thickness", param1.value);
                break;
            case "RORPPUM_WALL_THICKNESS":
                param2.setNumber("room_wall_thickness", param1.value);
        }
    }

    private updateFloorHoles(param1: RoomObjectRoomFloorHoleUpdateMessage, param2: IRoomObjectModelController): void {
        switch (param1.type) {
            case "RORPFHUM_ADD":
                this._SafeStr_2206.addFloorHole(param1.id, param1.x, param1.y, param1.width, param1.height, param1.invert);
                this._SafeStr_3956 = true;
                break;
            case "RORPFHUM_REMOVE":
                this._SafeStr_2206.removeFloorHole(param1.id);
                this._SafeStr_3956 = true;
        }
    }

    private updateColors(param1: RoomObjectRoomColorUpdateMessage, param2: IRoomObjectModelController): void {
        let _loc3_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: number = param1.color | 0;
        let _loc5_: number = param1.light | 0;
        param2.setNumber("room_colorize_bg_only", Number(param1.bgOnly) | 0);
        if (param1.bgOnly) {
            _loc3_ = _loc4_;
            _loc6_ = _loc5_;
        } else {
            _loc3_ = 16777215;
            _loc6_ = 255;
        }
        if (this._SafeStr_3350) {
            this._SafeStr_3350.startTransition(_loc3_, _loc6_, getTimer());
        }
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        if (param1 == null || this.object == null) {
            return;
        }
        let _loc5_: IRoomObjectModelController = asGuarded(this.object.getModel(), isIRoomObjectModelController);
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: RoomObjectRoomUpdateMessage = param1 instanceof RoomObjectRoomUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            this.updatePlaneTypes(_loc3_, _loc5_);
            return;
        }
        let _loc2_: RoomObjectRoomMaskUpdateMessage = param1 instanceof RoomObjectRoomMaskUpdateMessage ? param1 : null;
        if (_loc2_ != null) {
            this.updatePlaneMasks(_loc2_, _loc5_);
            return;
        }
        let _loc6_: RoomObjectRoomPlaneVisibilityUpdateMessage = param1 instanceof RoomObjectRoomPlaneVisibilityUpdateMessage ? param1 : null;
        if (_loc6_ != null) {
            this.updatePlaneVisibilities(_loc6_, _loc5_);
            return;
        }
        let _loc4_: RoomObjectRoomPlanePropertyUpdateMessage = param1 instanceof RoomObjectRoomPlanePropertyUpdateMessage ? param1 : null;
        if (_loc4_ != null) {
            this.updatePlaneProperties(_loc4_, _loc5_);
            return;
        }
        let _loc8_: RoomObjectRoomFloorHoleUpdateMessage = param1 instanceof RoomObjectRoomFloorHoleUpdateMessage ? param1 : null;
        if (_loc8_ != null) {
            this.updateFloorHoles(_loc8_, _loc5_);
        }
        let _loc7_: RoomObjectRoomColorUpdateMessage = param1 instanceof RoomObjectRoomColorUpdateMessage ? param1 : null;
        if (_loc7_ != null) {
            this.updateColors(_loc7_, _loc5_);
            return;
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        let _loc20_: string = null;
        let _loc14_: number = NaN;
        let _loc23_: number = NaN;
        let _loc24_: number = NaN;
        if (param2 == null) {
            return;
        }
        let _loc7_: RoomSpriteMouseEvent = param1;
        if (_loc7_ == null) {
            return;
        }
        if (this.object == null || param1 == null) {
            return;
        }
        let _loc9_: IRoomObjectModelController = asGuarded(this.object.getModel(), isIRoomObjectModelController);
        if (_loc9_ == null) {
            return;
        }
        let _loc10_: number = 0;
        let _loc11_: string = _loc7_.spriteTag;
        if (_loc11_ != null && _loc11_.indexOf("@") >= 0) {
            _loc10_ = parseInt(_loc11_.substr(_loc11_.indexOf("@") + 1)) | 0;
        }
        if (_loc10_ < 1 || _loc10_ > this._SafeStr_2206.planeCount) {
            if (param1.type == "rollOut") {
                _loc9_.setNumber("room_selected_plane", 0);
            }
            return;
        }
        _loc10_ -= 1;
        let _loc15_: Point = null;
        let _loc4_: IVector3d = this._SafeStr_2206.getPlaneLocation(_loc10_);
        let _loc8_: IVector3d = this._SafeStr_2206.getPlaneLeftSide(_loc10_);
        let _loc19_: IVector3d = this._SafeStr_2206.getPlaneRightSide(_loc10_);
        let _loc25_: IVector3d = this._SafeStr_2206.getPlaneNormalDirection(_loc10_);
        let _loc21_: number = this._SafeStr_2206.getPlaneType(_loc10_);
        if (_loc4_ == null || _loc8_ == null || _loc19_ == null || _loc25_ == null) {
            return;
        }
        let _loc22_: number = _loc8_.length;
        let _loc5_: number = _loc19_.length;
        if (_loc22_ == 0 || _loc5_ == 0) {
            return;
        }
        let _loc27_: number = _loc7_.screenX;
        let _loc28_: number = _loc7_.screenY;
        let _loc26_: Point = new Point(_loc27_, _loc28_);
        _loc15_ = param2.getPlanePosition(_loc26_, _loc4_, _loc8_, _loc19_);
        if (_loc15_ == null) {
            _loc9_.setNumber("room_selected_plane", 0);
            return;
        }
        let _loc3_: Vector3d = Vector3d.product(_loc8_, _loc15_.x / _loc22_);
        _loc3_.add(Vector3d.product(_loc19_, _loc15_.y / _loc5_));
        _loc3_.add(_loc4_);
        let _loc16_: number = _loc3_.x;
        let _loc17_: number = _loc3_.y;
        let _loc18_: number = _loc3_.z;
        if (_loc15_.x >= 0 && _loc15_.x < _loc22_ && _loc15_.y >= 0 && _loc15_.y < _loc5_) {
            _loc9_.setNumber("room_selected_x", _loc16_);
            _loc9_.setNumber("room_selected_y", _loc17_);
            _loc9_.setNumber("room_selected_z", _loc18_);
            _loc9_.setNumber("room_selected_plane", _loc10_ + 1);
            let _loc6_: string = "";
            let _loc12_: number = 0;
            let _loc13_: RoomObjectEvent = null;
            switch (param1.type) {
                case "mouseMove":
                case "rollOver":
                case "mouseDown":
                case "click":
                    _loc20_ = "";
                    if (param1.type == "mouseMove" || param1.type == "rollOver") {
                        _loc20_ = "ROE_MOUSE_MOVE";
                    } else if (param1.type == "click") {
                        _loc20_ = "ROE_MOUSE_CLICK";
                    } else if (param1.type == "mouseDown") {
                        _loc20_ = "ROE_MOUSE_DOWN";
                    }
                    if (this.eventDispatcher != null) {
                        if (_loc21_ == 1) {
                            _loc13_ = new RoomObjectTileMouseEvent(_loc20_, this.object, param1.eventId, _loc16_, _loc17_, _loc18_, param1.altKey, param1.ctrlKey, param1.shiftKey);
                        } else if (_loc21_ == 2 || _loc21_ == 3) {
                            _loc14_ = 90;
                            if (_loc25_ != null) {
                                _loc14_ = _loc25_.x + 90;
                                if (_loc14_ > 360) {
                                    _loc14_ -= 360;
                                }
                            }
                            _loc23_ = _loc8_.length * _loc15_.x / _loc22_;
                            _loc24_ = _loc19_.length * _loc15_.y / _loc5_;
                            _loc13_ = new RoomObjectWallMouseEvent(_loc20_, this.object, param1.eventId, _loc4_, _loc8_, _loc19_, _loc23_, _loc24_, _loc14_);
                        }
                        if (_loc13_ != null) {
                            this.eventDispatcher.dispatchEvent(_loc13_);
                        }
                    }
            }
            return;
        }
        _loc9_.setNumber("room_selected_plane", 0);
    }
}
