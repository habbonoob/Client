import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { AvatarAction } from '@/com/sulake/habbo/avatar/enum/AvatarAction';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { RoomObjectMoveEvent } from '@/com/sulake/habbo/room/events/RoomObjectMoveEvent';
import { RoomObjectAvatarBlockedUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarBlockedUpdateMessage';
import { RoomObjectAvatarCarryObjectUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarCarryObjectUpdateMessage';
import { RoomObjectAvatarChatUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarChatUpdateMessage';
import { RoomObjectAvatarDanceUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarDanceUpdateMessage';
import { RoomObjectAvatarDirectionUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarDirectionUpdateMessage';
import { RoomObjectAvatarEffectUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarEffectUpdateMessage';
import { RoomObjectAvatarExpressionUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarExpressionUpdateMessage';
import { RoomObjectAvatarFigureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarFigureUpdateMessage';
import { RoomObjectAvatarFlatControlUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarFlatControlUpdateMessage';
import { RoomObjectAvatarGestureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarGestureUpdateMessage';
import { RoomObjectAvatarGuideStatusUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarGuideStatusUpdateMessage';
import { RoomObjectAvatarMutedUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarMutedUpdateMessage';
import { RoomObjectAvatarOwnMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarOwnMessage';
import { RoomObjectAvatarPlayerValueUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPlayerValueUpdateMessage';
import { RoomObjectAvatarPlayingGameMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPlayingGameMessage';
import { RoomObjectAvatarPostureUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarPostureUpdateMessage';
import { RoomObjectAvatarSelectedMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSelectedMessage';
import { RoomObjectAvatarSignUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSignUpdateMessage';
import { RoomObjectAvatarSleepUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarSleepUpdateMessage';
import { RoomObjectAvatarTypingUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarTypingUpdateMessage';
import { RoomObjectAvatarUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarUpdateMessage';
import { RoomObjectAvatarUseObjectUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectAvatarUseObjectUpdateMessage';
import { MovingObjectLogic } from '@/com/sulake/habbo/room/object/logic/MovingObjectLogic';
import { RoomObjectMouseEvent } from '@/com/sulake/room/events/RoomObjectMouseEvent';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class AvatarLogic extends MovingObjectLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::AvatarLogic'); }

    private static readonly _SafeStr_8534: number = 1.5;
    private static readonly EFFECT_TYPE_SPLASH: number = 28;
    private static readonly EFFECT_TYPE_SWIM: number = 29;
    private static readonly _SafeStr_8617: number = 184;
    private static readonly _SafeStr_8048: number = 185;
    private static readonly EFFECT_SPLASH_LENGTH: number = 500;
    private static readonly CARRY_ITEM_NULL: number = 0;
    private static readonly CARRY_ITEM_LAST_CONSUMABLE: number = 999;
    private static readonly CARRY_ITEM_EMPTY_HAND: number = 999999999;
    private static readonly CARRY_ITEM_DELAY_BEFORE_USE: number = 5000;
    private static readonly CARRY_ITEM_EMPTY_HAND_ANIMATION_LENGTH: number = 1500;

    constructor() {
        super();
        this._SafeStr_4875 = getTimer() + this.getBlinkInterval();
    }

    private _selected: boolean = false;
    private _SafeStr_2938: Vector3d = null;
    private _SafeStr_2516: number = 0;
    private _SafeStr_3069: number = 0;
    private _SafeStr_4329: number = 0;
    private _SafeStr_3409: number = 0;
    private _SafeStr_3141: number = 0;
    private _SafeStr_3284: number = 0;
    private _SafeStr_4493: number = 0;
    private _SafeStr_4720: number = 0;
    private _SafeStr_4211: number = 0;
    private _SafeStr_3604: number = 0;
    private _allowUseCarryObject: boolean = false;
    private _SafeStr_4285: number = 0;
    private _SafeStr_4875: number = 0;
    private _SafeStr_4499: number = 0;

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROE_MOUSE_CLICK", "ROME_POSITION_CHANGED", "ROE_MOUSE_ENTER", "ROE_MOUSE_LEAVE", "ROFCAE_MOUSE_BUTTON", "ROFCAE_MOUSE_ARROW"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override dispose(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this._selected && this.object != null) {
            if (this.eventDispatcher != null) {
                _loc1_ = new RoomObjectMoveEvent("ROME_OBJECT_REMOVED", this.object);
                this.eventDispatcher.dispatchEvent(_loc1_);
            }
        }
        super.dispose();
        this._SafeStr_2938 = null;
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc12_: RoomObjectAvatarPostureUpdateMessage = null;
        let _loc24_: RoomObjectAvatarChatUpdateMessage = null;
        let _loc28_: RoomObjectAvatarTypingUpdateMessage = null;
        let _loc13_: RoomObjectAvatarMutedUpdateMessage = null;
        let _loc2_: RoomObjectAvatarPlayingGameMessage = null;
        let _loc20_: RoomObjectAvatarUpdateMessage = null;
        let _loc29_: RoomObjectAvatarDirectionUpdateMessage = null;
        let _loc19_: RoomObjectAvatarGestureUpdateMessage = null;
        let _loc14_: RoomObjectAvatarDanceUpdateMessage = null;
        let _loc15_: RoomObjectAvatarSleepUpdateMessage = null;
        let _loc25_: RoomObjectAvatarPlayerValueUpdateMessage = null;
        let _loc4_: RoomObjectAvatarEffectUpdateMessage = null;
        let _loc27_: number = 0;
        let _loc11_: number = 0;
        let _loc26_: RoomObjectAvatarCarryObjectUpdateMessage = null;
        let _loc8_: RoomObjectAvatarUseObjectUpdateMessage = null;
        let _loc5_: RoomObjectAvatarSignUpdateMessage = null;
        let _loc22_: RoomObjectAvatarFlatControlUpdateMessage = null;
        let _loc23_: number = NaN;
        let _loc17_: RoomObjectAvatarFigureUpdateMessage = null;
        let _loc18_: string = null;
        let _loc9_: string = null;
        let _loc6_: string = null;
        let _loc10_: RoomObjectAvatarBlockedUpdateMessage = null;
        let _loc7_: boolean = false;
        let _loc21_: RoomObjectAvatarSelectedMessage = null;
        let _loc3_: RoomObjectAvatarGuideStatusUpdateMessage = null;
        if (param1 == null || this.object == null) {
            return;
        }
        super.processUpdateMessage(param1);
        let _loc16_: IRoomObjectModelController = this.object.getModelController();
        if (param1 instanceof RoomObjectAvatarPostureUpdateMessage) {
            _loc12_ = param1 instanceof RoomObjectAvatarPostureUpdateMessage ? param1 : null;
            _loc16_.setString("figure_posture", _loc12_.postureType);
            _loc16_.setString("figure_posture_parameter", _loc12_.parameter);
            return;
        }
        if (param1 instanceof RoomObjectAvatarChatUpdateMessage) {
            _loc24_ = param1 instanceof RoomObjectAvatarChatUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_talk", 1);
            this._SafeStr_4329 = getTimer() + _loc24_.numberOfWords * 1000;
            return;
        }
        if (param1 instanceof RoomObjectAvatarTypingUpdateMessage) {
            _loc28_ = param1 instanceof RoomObjectAvatarTypingUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_is_typing", Number(_loc28_.isTyping));
            return;
        }
        if (param1 instanceof RoomObjectAvatarMutedUpdateMessage) {
            _loc13_ = param1 instanceof RoomObjectAvatarMutedUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_is_muted", Number(_loc13_.isMuted));
            return;
        }
        if (param1 instanceof RoomObjectAvatarPlayingGameMessage) {
            _loc2_ = param1 instanceof RoomObjectAvatarPlayingGameMessage ? param1 : null;
            _loc16_.setNumber("figure_is_playing_game", Number(_loc2_.isPlayingGame));
            return;
        }
        if (param1 instanceof RoomObjectAvatarUpdateMessage) {
            _loc20_ = param1 instanceof RoomObjectAvatarUpdateMessage ? param1 : null;
            _loc16_.setNumber("head_direction", _loc20_.dirHead);
            _loc16_.setNumber("figure_can_stand_up", Number(_loc20_.canStandUp));
            _loc16_.setNumber("figure_vertical_offset", _loc20_.baseY);
            return;
        }
        if (param1 instanceof RoomObjectAvatarDirectionUpdateMessage) {
            _loc29_ = param1 instanceof RoomObjectAvatarDirectionUpdateMessage ? param1 : null;
            _loc16_.setNumber("head_direction", _loc29_.dirHead);
            return;
        }
        if (param1 instanceof RoomObjectAvatarGestureUpdateMessage) {
            _loc19_ = param1 instanceof RoomObjectAvatarGestureUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_gesture", _loc19_.gesture);
            this._SafeStr_4493 = getTimer() + 3000;
            return;
        }
        if (param1 instanceof RoomObjectAvatarExpressionUpdateMessage) {
            _loc16_.setNumber("figure_expression", castTo(param1, RoomObjectAvatarExpressionUpdateMessage).expressionType);
            this._SafeStr_3284 = AvatarAction.getExpressionTime(_loc16_.getNumber("figure_expression") | 0);
            if (this._SafeStr_3284 > -1) {
                this._SafeStr_3284 += getTimer();
            }
            return;
        }
        if (param1 instanceof RoomObjectAvatarDanceUpdateMessage) {
            _loc14_ = param1 instanceof RoomObjectAvatarDanceUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_dance", _loc14_.danceStyle);
            return;
        }
        if (param1 instanceof RoomObjectAvatarSleepUpdateMessage) {
            _loc15_ = param1 instanceof RoomObjectAvatarSleepUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_sleep", Number(_loc15_.isSleeping));
            return;
        }
        if (param1 instanceof RoomObjectAvatarPlayerValueUpdateMessage) {
            _loc25_ = param1 instanceof RoomObjectAvatarPlayerValueUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_number_value", _loc25_.value);
            this._SafeStr_4499 = getTimer() + 3000;
            return;
        }
        if (param1 instanceof RoomObjectAvatarEffectUpdateMessage) {
            _loc4_ = param1 instanceof RoomObjectAvatarEffectUpdateMessage ? param1 : null;
            _loc27_ = _loc4_.effect;
            _loc11_ = _loc4_.delayMilliSeconds;
            this.updateEffect(_loc27_, _loc11_, _loc16_);
            return;
        }
        if (param1 instanceof RoomObjectAvatarCarryObjectUpdateMessage) {
            _loc26_ = param1 instanceof RoomObjectAvatarCarryObjectUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_carry_object", _loc26_.itemType);
            _loc16_.setNumber("figure_use_object", 0);
            this._SafeStr_4211 = getTimer();
            if (_loc26_.itemType < 999999999) {
                this._SafeStr_3604 = 0;
                this._allowUseCarryObject = _loc26_.itemType <= 999;
            } else {
                this._SafeStr_3604 = this._SafeStr_4211 + 1500;
                this._allowUseCarryObject = false;
            }
            return;
        }
        if (param1 instanceof RoomObjectAvatarUseObjectUpdateMessage) {
            _loc8_ = param1 instanceof RoomObjectAvatarUseObjectUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_use_object", _loc8_.itemType);
            return;
        }
        if (param1 instanceof RoomObjectAvatarSignUpdateMessage) {
            _loc5_ = param1 instanceof RoomObjectAvatarSignUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_sign", _loc5_.signType);
            this._SafeStr_4720 = getTimer() + 5000;
            return;
        }
        if (param1 instanceof RoomObjectAvatarFlatControlUpdateMessage) {
            _loc22_ = param1 instanceof RoomObjectAvatarFlatControlUpdateMessage ? param1 : null;
            _loc23_ = parseInt(_loc22_.rawData);
            if (_loc23_ == _loc23_ && _loc23_ >= 0 && _loc23_ <= 5) {
                _loc16_.setNumber("figure_flat_control", _loc23_);
            } else {
                _loc16_.setNumber("figure_flat_control", 0);
            }
            return;
        }
        if (param1 instanceof RoomObjectAvatarFigureUpdateMessage) {
            _loc17_ = param1 instanceof RoomObjectAvatarFigureUpdateMessage ? param1 : null;
            _loc18_ = _loc16_.getString("figure");
            _loc9_ = _loc17_.figure;
            _loc6_ = _loc17_.gender;
            if (_loc18_ != null && _loc18_.indexOf(".bds-") != -1) {
                _loc9_ += _loc18_.substr(_loc18_.indexOf(".bds-"));
            }
            _loc16_.setString("figure", _loc9_);
            _loc16_.setString("gender", _loc6_);
            return;
        }
        if (param1 instanceof RoomObjectAvatarBlockedUpdateMessage) {
            _loc10_ = param1 instanceof RoomObjectAvatarBlockedUpdateMessage ? param1 : null;
            _loc7_ = _loc10_.isBlocked;
            _loc16_.setNumber("blocked", _loc7_ ? 1 : 0);
            return;
        }
        if (param1 instanceof RoomObjectAvatarSelectedMessage) {
            _loc21_ = param1 instanceof RoomObjectAvatarSelectedMessage ? param1 : null;
            this._selected = _loc21_.selected;
            this._SafeStr_2938 = null;
            return;
        }
        if (param1 instanceof RoomObjectAvatarGuideStatusUpdateMessage) {
            _loc3_ = param1 instanceof RoomObjectAvatarGuideStatusUpdateMessage ? param1 : null;
            _loc16_.setNumber("figure_guide_status", _loc3_.guideStatus);
            return;
        }
        if (param1 instanceof RoomObjectAvatarOwnMessage) {
            _loc16_.setNumber("own_user", 1);
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        let _loc5_: RoomObjectEvent = null;
        if (this.object == null || param1 == null) {
            return;
        }
        let _loc3_: IRoomObjectModelController = this.object.getModelController();
        let _loc4_: string = null;
        switch (param1.type) {
            case "click":
                _loc4_ = "ROE_MOUSE_CLICK";
                break;
            case "rollOver":
                _loc4_ = "ROE_MOUSE_ENTER";
                if (_loc3_ != null) {
                    _loc3_.setNumber("figure_highlight", 1);
                }
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent("ROFCAE_MOUSE_BUTTON", this.object));
                break;
            case "rollOut":
                if (_loc3_ != null) {
                    _loc3_.setNumber("figure_highlight", 0);
                }
                _loc4_ = "ROE_MOUSE_LEAVE";
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent("ROFCAE_MOUSE_ARROW", this.object));
        }
        if (_loc4_ != null) {
            if (this.eventDispatcher != null) {
                _loc5_ = new RoomObjectMouseEvent(_loc4_, this.object, param1.eventId, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
                this.eventDispatcher.dispatchEvent(_loc5_);
            }
        }
    }

    public override update(param1: number): void {
        let _loc2_: IVector3d = null;
        let _loc4_: RoomObjectEvent = null;
        let _loc3_: IRoomObjectModelController = null;
        super.update(param1);
        if (this._selected && this.object != null) {
            if (this.eventDispatcher != null) {
                _loc2_ = this.object.getLocation();
                if (this._SafeStr_2938 == null || this._SafeStr_2938.x != _loc2_.x || this._SafeStr_2938.y != _loc2_.y || this._SafeStr_2938.z != _loc2_.z) {
                    if (this._SafeStr_2938 == null) {
                        this._SafeStr_2938 = new Vector3d();
                    }
                    this._SafeStr_2938.assign(_loc2_);
                    _loc4_ = new RoomObjectMoveEvent("ROME_POSITION_CHANGED", this.object);
                    this.eventDispatcher.dispatchEvent(_loc4_);
                }
            }
        }
        if (this.object != null) {
            _loc3_ = this.object.getModelController();
            if (_loc3_ != null) {
                this.updateActions(param1, _loc3_);
            }
        }
    }

    private updateEffect(param1: number, param2: number, param3: IRoomObjectModelController): void {
        if (param1 == 28) {
            this._SafeStr_2516 = getTimer() + 500;
            this._SafeStr_3069 = 29;
        } else if (param1 == 184) {
            this._SafeStr_2516 = getTimer() + 500;
            this._SafeStr_3069 = 185;
        } else if (param3.getNumber("figure_effect") == 29) {
            this._SafeStr_2516 = getTimer() + 500;
            this._SafeStr_3069 = param1;
            param1 = 28;
        } else if (param3.getNumber("figure_effect") == 185) {
            this._SafeStr_2516 = getTimer() + 500;
            this._SafeStr_3069 = param1;
            param1 = 184;
        } else {
            if (param2 != 0) {
                this._SafeStr_2516 = getTimer() + param2;
                this._SafeStr_3069 = param1;
                return;
            }
            this._SafeStr_2516 = 0;
        }
        param3.setNumber("figure_effect", param1);
    }

    private updateActions(param1: number, param2: IRoomObjectModelController): void {
        if (this._SafeStr_4329 > 0) {
            if (param1 > this._SafeStr_4329) {
                param2.setNumber("figure_talk", 0);
                this._SafeStr_4329 = 0;
                this._SafeStr_3141 = 0;
                this._SafeStr_3409 = 0;
            } else if (this._SafeStr_3409 == 0 && this._SafeStr_3141 == 0) {
                this._SafeStr_3141 = param1 + this.getTalkingPauseInterval();
                this._SafeStr_3409 = this._SafeStr_3141 + this.getTalkingPauseLength();
            } else if (this._SafeStr_3141 > 0 && param1 > this._SafeStr_3141) {
                param2.setNumber("figure_talk", 0);
                this._SafeStr_3141 = 0;
            } else if (this._SafeStr_3409 > 0 && param1 > this._SafeStr_3409) {
                param2.setNumber("figure_talk", 1);
                this._SafeStr_3409 = 0;
            }
        }
        if (this._SafeStr_3284 > 0 && param1 > this._SafeStr_3284) {
            param2.setNumber("figure_expression", 0);
            this._SafeStr_3284 = 0;
        }
        if (this._SafeStr_4493 > 0 && param1 > this._SafeStr_4493) {
            param2.setNumber("figure_gesture", 0);
            this._SafeStr_4493 = 0;
        }
        if (this._SafeStr_4720 > 0 && param1 > this._SafeStr_4720) {
            param2.setNumber("figure_sign", -1);
            this._SafeStr_4720 = 0;
        }
        if (this._SafeStr_3604 > 0) {
            if (param1 > this._SafeStr_3604) {
                param2.setNumber("figure_carry_object", 0);
                param2.setNumber("figure_use_object", 0);
                this._SafeStr_4211 = this._SafeStr_3604 = 0;
                this._allowUseCarryObject = false;
            }
        }
        if (this._allowUseCarryObject) {
            if (param1 - this._SafeStr_4211 > 5000) {
                if ((param1 - this._SafeStr_4211) % 10000 < 1000) {
                    param2.setNumber("figure_use_object", 1);
                } else {
                    param2.setNumber("figure_use_object", 0);
                }
            }
        }
        if (param1 > this._SafeStr_4875) {
            param2.setNumber("figure_blink", 1);
            this._SafeStr_4875 = param1 + this.getBlinkInterval();
            this._SafeStr_4285 = param1 + this.getBlinkLength();
        }
        if (this._SafeStr_4285 > 0 && param1 > this._SafeStr_4285) {
            param2.setNumber("figure_blink", 0);
            this._SafeStr_4285 = 0;
        }
        if (this._SafeStr_2516 > 0 && param1 > this._SafeStr_2516) {
            param2.setNumber("figure_effect", this._SafeStr_3069);
            this._SafeStr_2516 = 0;
        }
        if (this._SafeStr_4499 > 0 && param1 > this._SafeStr_4499) {
            param2.setNumber("figure_number_value", 0);
            this._SafeStr_4499 = 0;
        }
    }

    private getTalkingPauseInterval(): number {
        return 100 + Math.random() * 200 | 0;
    }

    private getTalkingPauseLength(): number {
        return 75 + Math.random() * 75 | 0;
    }

    private getBlinkInterval(): number {
        return 4500 + Math.random() * 1000 | 0;
    }

    private getBlinkLength(): number {
        return 50 + Math.random() * 200 | 0;
    }

    private targetIsWarping(param1: IVector3d): boolean {
        let _loc2_: IVector3d = this.object.getLocation();
        if (param1 == null) {
            return false;
        }
        if (_loc2_.x == 0 && _loc2_.y == 0) {
            return false;
        }
        if (Math.abs(_loc2_.x - param1.x) > 1.5 || Math.abs(_loc2_.y - param1.y) > 1.5) {
            return true;
        }
        return false;
    }
}
