import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6129 } from '@/com/sulake/habbo/room/object/logic/_SafeCls_6129';
import type { VariableFxLogicManager } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicManager';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { PetFigureData } from '@/com/sulake/habbo/avatar/pets/PetFigureData';
import { RoomObjectMoveEvent } from '@/com/sulake/habbo/room/events/RoomObjectMoveEvent';
import { RoomObjectAvatarChatUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarChatUpdateMessage';
import { RoomObjectAvatarDirectionUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarDirectionUpdateMessage';
import { RoomObjectAvatarExperienceUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarExperienceUpdateMessage';
import { RoomObjectAvatarFigureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarFigureUpdateMessage';
import { RoomObjectAvatarPetGestureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPetGestureUpdateMessage';
import { RoomObjectAvatarPostureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPostureUpdateMessage';
import { RoomObjectAvatarSelectedMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSelectedMessage';
import { RoomObjectAvatarSleepUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSleepUpdateMessage';
import { RoomObjectAvatarUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarUpdateMessage';
import { RoomObjectFurnitureHighlightUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureHighlightUpdateMessage';
import { RoomObjectFurnitureTransparencyUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectFurnitureTransparencyUpdateMessage';
import { WiredFurnitureEffectState } from '@/com/sulake/habbo/room/object/logic/furniture/WiredFurnitureEffectState';
import { MovingObjectLogic } from '@/com/sulake/habbo/room/object/logic/MovingObjectLogic';
import { RoomObjectMouseEvent } from '@/com/sulake/room/events/RoomObjectMouseEvent';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class PetLogic extends MovingObjectLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::PetLogic'); }

    private _SafeStr_4329: number = 0;
    private _SafeStr_4493: number = 0;
    private _SafeStr_5574: number = 0;
    private _selected: boolean = false;
    private _SafeStr_2938: Vector3d = null;

    declare private _SafeStr_3843: _SafeCls_6129;

    declare private _SafeStr_14797: WiredFurnitureEffectState;

    private _debugMode: boolean = false;
    private _SafeStr_5655: number = 0;
    private _SafeStr_5668: number = 0;
    private _headDirectionDelta: number = 0;
    private _SafeStr_4034: number = 0;
    private _directions: any[] = [];

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROE_MOUSE_CLICK", "ROE_MOUSE_ENTER", "ROE_MOUSE_LEAVE", "ROME_POSITION_CHANGED"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public set roomData(param1: _SafeCls_6129) {
        this._SafeStr_3843 = param1;
    }

    public get roomData(): _SafeCls_6129 {
        return this._SafeStr_3843;
    }

    protected override get variableFxLogicManager(): VariableFxLogicManager {
        return this._SafeStr_3843?.variableFxLogicManager;
    }

    public override dispose(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this._SafeStr_14797 != null) {
            this._SafeStr_14797.dispose();
            this._SafeStr_14797 = null;
        }
        if (this._selected && this.object != null) {
            if (this.eventDispatcher != null) {
                _loc1_ = new RoomObjectMoveEvent("ROME_OBJECT_REMOVED", this.object);
                this.eventDispatcher.dispatchEvent(_loc1_);
            }
        }
        this._directions = null;
        super.dispose();
        this._SafeStr_2938 = null;
        this._SafeStr_3843 = null;
    }

    public override initialize(param1: XML): void {
        let _loc4_: number = 0;
        let _loc6_: XML = null;
        let _loc5_: number = 0;
        super.initialize(param1);
        this._directions = [];
        let _loc2_: XMLList = param1.child("model").child("directions").child("direction");
        let _loc3_: any[] = ["id"];
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length()) {
            _loc6_ = _loc2_.item(_loc4_);
            if (XMLValidator.checkRequiredAttributes(_loc6_, _loc3_)) {
                _loc5_ = parseInt(_loc6_.attribute("id").toString()) | 0;
                this._directions.push(_loc5_);
            }
            _loc4_++;
        }
        this._directions.sort((a, b) => a - b);
        this.object.getModelController().setNumberArray("pet_allowed_directions", this._directions, true);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc4_: RoomObjectFurnitureTransparencyUpdateMessage = null;
        let _loc7_: RoomObjectFurnitureHighlightUpdateMessage = null;
        let _loc9_: RoomObjectAvatarPostureUpdateMessage = null;
        let _loc2_: RoomObjectAvatarUpdateMessage = null;
        let _loc12_: RoomObjectAvatarDirectionUpdateMessage = null;
        let _loc5_: RoomObjectAvatarChatUpdateMessage = null;
        let _loc15_: RoomObjectAvatarPetGestureUpdateMessage = null;
        let _loc10_: RoomObjectAvatarSleepUpdateMessage = null;
        let _loc3_: RoomObjectAvatarSelectedMessage = null;
        let _loc6_: RoomObjectAvatarExperienceUpdateMessage = null;
        let _loc13_: RoomObjectAvatarFigureUpdateMessage = null;
        let _loc14_: string = null;
        let _loc8_: PetFigureData = null;
        if (param1 == null || this.object == null) {
            return;
        }
        let _loc11_: IRoomObjectModelController = this.object.getModelController();
        if (!this._debugMode) {
            super.processUpdateMessage(param1);
            _loc4_ = param1 instanceof RoomObjectFurnitureTransparencyUpdateMessage ? param1 : null;
            if (_loc4_ != null) {
                this.getWiredEffectState().setTransparency(_loc4_.transparency, _loc4_.allowClickThrough, _loc4_.easingMode, _loc4_.initialize, this.getWiredEffectUpdateTime(), this.object.getModelController());
                return;
            }
            _loc7_ = param1 instanceof RoomObjectFurnitureHighlightUpdateMessage ? param1 : null;
            if (_loc7_ != null) {
                this.getWiredEffectState().setHighlight(_loc7_.highlightType, _loc7_.strength, _loc7_.color, _loc7_.animationMode, _loc7_.easingMode, _loc7_.initialize, this.getWiredEffectUpdateTime(), this.object.getModelController());
                return;
            }
            if (this.processVariableFxStatusMessage(param1)) {
                return;
            }
            if (param1 instanceof RoomObjectAvatarPostureUpdateMessage) {
                _loc9_ = param1 instanceof RoomObjectAvatarPostureUpdateMessage ? param1 : null;
                _loc11_.setString("figure_posture", _loc9_.postureType);
                return;
            }
            if (param1 instanceof RoomObjectAvatarUpdateMessage) {
                _loc2_ = param1 instanceof RoomObjectAvatarUpdateMessage ? param1 : null;
                _loc11_.setNumber("head_direction", _loc2_.dirHead);
                return;
            }
            if (param1 instanceof RoomObjectAvatarDirectionUpdateMessage) {
                _loc12_ = param1 instanceof RoomObjectAvatarDirectionUpdateMessage ? param1 : null;
                _loc11_.setNumber("head_direction", _loc12_.dirHead);
                return;
            }
            if (param1 instanceof RoomObjectAvatarChatUpdateMessage) {
                _loc5_ = param1 instanceof RoomObjectAvatarChatUpdateMessage ? param1 : null;
                _loc11_.setNumber("figure_talk", 1);
                this._SafeStr_4329 = getTimer() + _loc5_.numberOfWords * 1000;
                return;
            }
            if (param1 instanceof RoomObjectAvatarPetGestureUpdateMessage) {
                _loc15_ = param1 instanceof RoomObjectAvatarPetGestureUpdateMessage ? param1 : null;
                _loc11_.setString("figure_gesture", _loc15_.gesture);
                this._SafeStr_4493 = getTimer() + 3000;
                return;
            }
            if (param1 instanceof RoomObjectAvatarSleepUpdateMessage) {
                _loc10_ = param1 instanceof RoomObjectAvatarSleepUpdateMessage ? param1 : null;
                _loc11_.setNumber("figure_sleep", Number(_loc10_.isSleeping));
                return;
            }
        }
        if (param1 instanceof RoomObjectAvatarSelectedMessage) {
            _loc3_ = param1 instanceof RoomObjectAvatarSelectedMessage ? param1 : null;
            this._selected = _loc3_.selected;
            this._SafeStr_2938 = null;
            return;
        }
        if (param1 instanceof RoomObjectAvatarExperienceUpdateMessage) {
            _loc6_ = param1 instanceof RoomObjectAvatarExperienceUpdateMessage ? param1 : null;
            _loc11_.setNumber("figure_experience_timestamp", Number(getTimer()));
            _loc11_.setNumber("figure_gained_experience", _loc6_.gainedExperience);
            return;
        }
        if (param1 instanceof RoomObjectAvatarFigureUpdateMessage) {
            _loc13_ = param1 instanceof RoomObjectAvatarFigureUpdateMessage ? param1 : null;
            _loc14_ = _loc11_.getString("figure");
            _loc8_ = new PetFigureData(_loc13_.figure);
            _loc11_.setString("figure", _loc13_.figure);
            _loc11_.setString("race", _loc13_.race);
            _loc11_.setNumber("pet_palette_index", _loc8_.paletteId);
            _loc11_.setNumber("pet_color", _loc8_.color);
            _loc11_.setNumber("pet_type", _loc8_.typeId);
            _loc11_.setNumberArray("pet_custom_layer_ids", _loc8_.customLayerIds);
            _loc11_.setNumberArray("pet_custom_part_ids", _loc8_.customPartIds);
            _loc11_.setNumberArray("pet_custom_palette_ids", _loc8_.customPaletteIds);
            _loc11_.setNumber("pet_is_riding", _loc13_.isRiding ? 1 : 0);
            return;
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        let _loc5_: number = 0;
        let _loc8_: RoomObjectEvent = null;
        if (this.object == null || param1 == null) {
            return;
        }
        let _loc6_: IRoomObjectModelController = this.object.getModelController();
        let _loc3_: IVector3d = null;
        let _loc4_: Vector3d = null;
        let _loc7_: string = null;
        switch (param1.type) {
            case "click":
                _loc7_ = "ROE_MOUSE_CLICK";
                if (this._debugMode) {
                    this.debugMouseEvent(param1);
                }
                break;
            case "rollOver":
                this.setVariableFxHolderHovered(true);
                _loc7_ = "ROE_MOUSE_ENTER";
                break;
            case "rollOut":
                this.setVariableFxHolderHovered(false);
                _loc7_ = "ROE_MOUSE_LEAVE";
                break;
            case "doubleClick":
                break;
            case "mouseDown":
                if (!this._debugMode) {
                    _loc5_ = _loc6_.getNumber("pet_type") | 0;
                    if (_loc5_ == 16) {
                        if (this.eventDispatcher != null) {
                            _loc8_ = new RoomObjectMouseEvent("ROE_MOUSE_DOWN", this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                            this.eventDispatcher.dispatchEvent(_loc8_);
                        }
                    }
                }
        }
        if (_loc7_ != null) {
            if (this.eventDispatcher != null) {
                _loc8_ = new RoomObjectMouseEvent(_loc7_, this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                this.eventDispatcher.dispatchEvent(_loc8_);
            }
        }
    }

    private debugMouseEvent(param1: RoomSpriteMouseEvent): void {
        let _loc3_: number = 0;
        let _loc2_: IRoomObjectModelController = this.object.getModelController();
        if (!param1.altKey && !param1.ctrlKey) {
            _loc3_ = this._directions[this._SafeStr_4034] | 0;
            this.object.setDirection(new Vector3d(_loc3_));
            _loc2_.setNumber("head_direction", _loc3_ + this._headDirectionDelta);
            this._SafeStr_4034 = this._SafeStr_4034 + 1;
            if (this._SafeStr_4034 == this._directions.length) {
                this._SafeStr_4034 = 0;
            }
        } else if (param1.altKey && !param1.ctrlKey) {
            this._SafeStr_5655 = this._SafeStr_5655 + 1;
            _loc2_.setNumber("figure_posture", this._SafeStr_5655);
            _loc2_.setNumber("figure_gesture", NaN);
        } else if (param1.ctrlKey && !param1.altKey) {
            this._SafeStr_5668 = this._SafeStr_5668 + 1;
            _loc2_.setNumber("figure_gesture", this._SafeStr_5668);
        } else {
            this._headDirectionDelta += 45;
            if (this._headDirectionDelta > 45) {
                this._headDirectionDelta = -45;
            }
            _loc3_ = this.object.getDirection().x | 0;
            _loc2_.setNumber("head_direction", _loc3_ + this._headDirectionDelta);
        }
    }

    public override update(param1: number): void {
        let _loc2_: IVector3d = null;
        let _loc3_: RoomObjectEvent = null;
        super.update(param1);
        if (this._SafeStr_14797 != null) {
            this._SafeStr_14797.update(param1, this.object.getModelController());
        }
        if (this._selected && this.object != null) {
            if (this.eventDispatcher != null) {
                _loc2_ = this.object.getLocation();
                if (this._SafeStr_2938 == null || this._SafeStr_2938.x != _loc2_.x || this._SafeStr_2938.y != _loc2_.y || this._SafeStr_2938.z != _loc2_.z) {
                    if (this._SafeStr_2938 == null) {
                        this._SafeStr_2938 = new Vector3d();
                    }
                    this._SafeStr_2938.assign(_loc2_);
                    _loc3_ = new RoomObjectMoveEvent("ROME_POSITION_CHANGED", this.object);
                    this.eventDispatcher.dispatchEvent(_loc3_);
                }
            }
        }
        if (this.object != null && this.object.getModelController() != null) {
            this.updateActions(param1, this.object.getModelController());
        }
    }

    private updateActions(param1: number, param2: IRoomObjectModelController): void {
        if (this._SafeStr_4493 > 0 && param1 > this._SafeStr_4493) {
            param2.setString("figure_gesture", null);
            this._SafeStr_4493 = 0;
        }
        if (this._SafeStr_4329 > 0) {
            if (param1 > this._SafeStr_4329) {
                param2.setNumber("figure_talk", 0);
                this._SafeStr_4329 = 0;
            }
        }
        if (this._SafeStr_5574 > 0 && param1 > this._SafeStr_5574) {
            param2.setNumber("figure_expression", 0);
            this._SafeStr_5574 = 0;
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

    public override transferStateFrom(param1: IRoomObjectEventHandler): void {
        super.transferStateFrom(param1);
        let _loc2_: PetLogic = param1 instanceof PetLogic ? param1 : null;
        if (_loc2_ == null || _loc2_ == this) {
            return;
        }
        if (this._SafeStr_14797 != null) {
            this._SafeStr_14797.dispose();
        }
        this._SafeStr_14797 = _loc2_._SafeStr_14797;
        _loc2_._SafeStr_14797 = null;
    }
}
