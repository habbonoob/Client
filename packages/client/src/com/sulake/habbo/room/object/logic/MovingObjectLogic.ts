import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { RoomObjectMoveEvent } from '@/com/sulake/habbo/room/events/RoomObjectMoveEvent';
import { RoomObjectMoveUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectMoveUpdateMessage';
import { ObjectLogicBase } from '@/com/sulake/room/object/logic/ObjectLogicBase';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class MovingObjectLogic extends ObjectLogicBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::MovingObjectLogic'); }

    static #staticsReady = false;

    public static readonly DEFAULT_UPDATE_INTERVAL: number = 500;

    private static get helper_vector(): Vector3d {
        MovingObjectLogic.#initStatics();
        return MovingObjectLogic.helper_vector;
    }
    private static set helper_vector(value: Vector3d) {
        MovingObjectLogic.#initStatics();
        MovingObjectLogic.helper_vector = value;
    }

    constructor() {
        super();
    }

    private _SafeStr_2559: Vector3d = new Vector3d();
    private _SafeStr_2291: Vector3d = new Vector3d();
    private _liftAmount: number = 0;

    declare private _changeTime: number;
    static { (this.prototype as any)._changeTime = 0; }

    private _SafeStr_4104: number = 500;

    public override set object(param1: IRoomObjectController) {
        super.object = param1;
        if (param1 != null) {
            this._SafeStr_2291.assign(param1.getLocation());
        }
    }

    private _lastUpdateTime: number = 0;

    protected get lastUpdateTime(): number {
        return this._lastUpdateTime;
    }

    protected set moveUpdateInterval(param1: number) {
        if (param1 <= 0) {
            param1 = 1;
        }
        this._SafeStr_4104 = param1;
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_2291 = null;
        this._SafeStr_2559 = null;
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc3_: IVector3d = null;
        if (param1 == null) {
            return;
        }
        super.processUpdateMessage(param1);
        let _loc2_: RoomObjectMoveUpdateMessage = param1 instanceof RoomObjectMoveUpdateMessage ? param1 : null;
        if (_loc2_ != null && _loc2_.skipPositionUpdate) {
            return;
        }
        if (param1.loc != null) {
            this._SafeStr_2291.assign(param1.loc);
        }
        if (param1.loc != null) {
            this._SafeStr_2559.x = 0;
            this._SafeStr_2559.y = 0;
            this._SafeStr_2559.z = 0;
        }
        if (_loc2_ == null) {
            return;
        }
        if (this.object != null) {
            if (param1.loc != null) {
                _loc3_ = _loc2_.targetLoc;
                this.moveUpdateInterval = (isNaN(_loc2_.animationTime) ? 500 : _loc2_.animationTime) | 0;
                this._changeTime = this._lastUpdateTime;
                this._SafeStr_2559.assign(_loc3_);
                this._SafeStr_2559.sub(this._SafeStr_2291);
            }
        }
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROME_SLIDE_ANIMATION"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override update(param1: number): void {
        let _loc3_: number = 0;
        let _loc5_: RoomObjectEvent = null;
        let _loc2_: IVector3d = this.getLocationOffset();
        let _loc4_: IRoomObjectModelController = this.object.getModelController();
        if (_loc4_ != null) {
            if (_loc2_ != null) {
                if (this._liftAmount != _loc2_.z) {
                    this._liftAmount = _loc2_.z;
                    _loc4_.setNumber("furniture_lift_amount", this._liftAmount);
                }
            } else if (this._liftAmount != 0) {
                this._liftAmount = 0;
                _loc4_.setNumber("furniture_lift_amount", this._liftAmount);
            }
        }
        if (this._SafeStr_2559.length > 0 || _loc2_ != null) {
            _loc3_ = param1 - this._changeTime;
            if (_loc3_ == this._SafeStr_4104 >> 1) {
                _loc3_++;
            }
            if (_loc3_ > this._SafeStr_4104) {
                _loc3_ = this._SafeStr_4104;
            }
            if (this._SafeStr_2559.length > 0) {
                MovingObjectLogic.helper_vector.assign(this._SafeStr_2559);
                MovingObjectLogic.helper_vector.mul(_loc3_ / this._SafeStr_4104);
                MovingObjectLogic.helper_vector.add(this._SafeStr_2291);
            } else {
                MovingObjectLogic.helper_vector.assign(this._SafeStr_2291);
            }
            if (_loc2_ != null) {
                MovingObjectLogic.helper_vector.add(_loc2_);
            }
            if (this.object != null) {
                this.object.setLocation(MovingObjectLogic.helper_vector);
            }
            if (_loc3_ == this._SafeStr_4104) {
                this._SafeStr_2559.x = 0;
                this._SafeStr_2559.y = 0;
                this._SafeStr_2559.z = 0;
            }
            _loc5_ = new RoomObjectMoveEvent("ROME_SLIDE_ANIMATION", this.object);
            this.eventDispatcher.dispatchEvent(_loc5_);
        }
        this._lastUpdateTime = param1;
    }

    protected getLocationOffset(): IVector3d {
        return null;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MovingObjectLogic.#staticsReady) return;
        MovingObjectLogic.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MovingObjectLogic, name, { value, writable: true, configurable: true, enumerable: true });
        set("helper_vector", null);
        set("helper_vector", new Vector3d());
    }

    public override get object(): IRoomObjectController {
        return super.object;
    }
}
