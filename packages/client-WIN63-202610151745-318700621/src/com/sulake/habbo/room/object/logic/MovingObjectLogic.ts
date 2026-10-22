import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxLogicConfig } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicConfig';
import type { VariableFxLogicManager } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicManager';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomObjectEventHandler } from '@/com/sulake/room/object/logic/IRoomObjectEventHandler';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomObjectMoveEvent } from '@/com/sulake/habbo/room/events/RoomObjectMoveEvent';
import { RoomObjectMoveUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectMoveUpdateMessage';
import { RoomObjectVariableFxStatusRemoveMessage } from '@/com/sulake/habbo/room/messages/RoomObjectVariableFxStatusRemoveMessage';
import { RoomObjectVariableFxStatusUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectVariableFxStatusUpdateMessage';
import { VariableFxLogicStatus } from '@/com/sulake/habbo/room/object/logic/VariableFxLogicStatus';
import { VariableFxStatusModelData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelData';
import { VariableFxStatusModelEntry } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelEntry';
import { IRoomObjectEventHandlerStateTransfer } from '@/com/sulake/room/object/logic/IRoomObjectEventHandlerStateTransfer';
import { ObjectLogicBase } from '@/com/sulake/room/object/logic/ObjectLogicBase';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class MovingObjectLogic extends ObjectLogicBase implements IRoomObjectEventHandlerStateTransfer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::MovingObjectLogic'); }

    static #staticsReady = false;

    public static readonly DEFAULT_UPDATE_INTERVAL: number = 500;
    private static readonly VARIABLE_FX_SHOW_ALWAYS: number = 0;
    private static readonly VARIABLE_FX_SHOW_WHEN_VARIABLE_CHANGES: number = 1;
    private static readonly VARIABLE_FX_CHANGE_CREATED: number = 1;
    private static readonly VARIABLE_FX_CHANGE_INCREASED: number = 2;
    private static readonly VARIABLE_FX_CHANGE_DECREASED: number = 4;
    private static readonly VARIABLE_FX_CHANGE_UNCHANGED: number = 8;

    private static get helper_vector(): Vector3d {
        MovingObjectLogic.#initStatics();
        return MovingObjectLogic.helper_vector;
    }
    private static set helper_vector(value: Vector3d) {
        MovingObjectLogic.#initStatics();
        MovingObjectLogic.helper_vector = value;
    }

    private _SafeStr_2559: Vector3d = new Vector3d();
    private _SafeStr_2291: Vector3d = new Vector3d();
    private _liftAmount: number = 0;
    private _lastUpdateTime: number = 0;

    declare private _changeTime: number;
    static { (this.prototype as any)._changeTime = 0; }

    private _SafeStr_4104: number = 500;
    private _overshootTime: number = 0;
    private _curveStrength: number = 0;

    declare private _variableFxStatuses: UtilsMap;

    private _SafeStr_14787: number = 0;
    private _SafeStr_14788: number = 0;
    private _SafeStr_14789: number = -1;
    private _SafeStr_14790: number = 0;
    private _SafeStr_14791: boolean = false;
    private _SafeStr_14792: boolean = false;

    declare private _SafeStr_14793: VariableFxStatusModelData;

    constructor() {
        super();
    }

    protected get lastUpdateTime(): number {
        return this._lastUpdateTime;
    }

    public override dispose(): void {
        this.clearPublishedVariableFxStatusData();
        if (this._SafeStr_14793 != null) {
            this._SafeStr_14793.dispose();
            this._SafeStr_14793 = null;
        }
        this.clearVariableFxStatuses();
        if (this._variableFxStatuses != null) {
            this._variableFxStatuses.dispose();
            this._variableFxStatuses = null;
        }
        this._SafeStr_2291 = null;
        this._SafeStr_2559 = null;
        super.dispose();
    }

    public override set object(param1: IRoomObjectController) {
        super.object = param1;
        if (param1 != null) {
            this._SafeStr_2291.assign(param1.getLocation());
        }
    }

    public transferStateFrom(param1: IRoomObjectEventHandler): void {
        let _loc2_: MovingObjectLogic = param1 instanceof MovingObjectLogic ? param1 : null;
        if (_loc2_ == null || _loc2_ == this) {
            return;
        }
        this._variableFxStatuses = _loc2_._variableFxStatuses;
        this._SafeStr_14787 = _loc2_._SafeStr_14787;
        this._SafeStr_14788 = _loc2_._SafeStr_14788;
        this._SafeStr_14789 = _loc2_._SafeStr_14789;
        this._SafeStr_14790 = _loc2_._SafeStr_14790;
        this._SafeStr_14791 = _loc2_._SafeStr_14791;
        this._SafeStr_14792 = _loc2_._SafeStr_14792;
        this._SafeStr_14793 = _loc2_._SafeStr_14793;
        _loc2_._variableFxStatuses = null;
        _loc2_._SafeStr_14793 = null;
    }

    protected setMoveUpdateInterval(param1: number, param2: number = 0, param3: number = 0): void {
        if (param1 <= 0) {
            param1 = 1;
        }
        this._SafeStr_4104 = param1;
        if (!isNaN(param2) && param2 == 0) {
            param2 = NaN | 0;
        }
        this._overshootTime = param2;
        if (!isNaN(param3) && param3 == 0) {
            this._curveStrength = NaN | 0;
        }
        this._curveStrength = param3;
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc4_: IVector3d = null;
        let _loc2_: number = 0;
        if (param1 == null) {
            return;
        }
        super.processUpdateMessage(param1);
        let _loc3_: RoomObjectMoveUpdateMessage = param1 instanceof RoomObjectMoveUpdateMessage ? param1 : null;
        if (_loc3_ != null && _loc3_.skipPositionUpdate) {
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
        if (_loc3_ == null) {
            return;
        }
        if (this.object != null) {
            if (param1.loc != null) {
                _loc4_ = _loc3_.targetLoc;
                _loc2_ = (isNaN(_loc3_.animationTime) ? 500 : _loc3_.animationTime) | 0;
                this.setMoveUpdateInterval(_loc2_, _loc3_.overshootAnimationTime | 0, this.getCurveStrength(_loc3_));
                this._changeTime = this._lastUpdateTime > 0 ? this._lastUpdateTime : getTimer();
                this._SafeStr_2559.assign(_loc4_);
                this._SafeStr_2559.sub(this._SafeStr_2291);
                this.fixDeltaAndIntervalForOvershooting();
            }
        }
    }

    protected processVariableFxStatusMessage(param1: RoomObjectUpdateMessage): boolean {
        let _loc2_: RoomObjectVariableFxStatusUpdateMessage = null;
        let _loc3_: number = 0;
        let _loc4_: RoomObjectVariableFxStatusRemoveMessage = null;
        if (param1 instanceof RoomObjectVariableFxStatusUpdateMessage) {
            _loc2_ = param1 instanceof RoomObjectVariableFxStatusUpdateMessage ? param1 : null;
            _loc3_ = getTimer();
            this.upsertVariableFxStatus(new VariableFxLogicStatus(_loc2_.configId, _loc2_.variableId, _loc2_.value, _loc2_.overrideMinValue, _loc2_.overrideMaxValue, _loc2_.extra, _loc2_.initialize, _loc3_), _loc3_);
            this.updateVariableFxPublication(_loc3_, this.getVariableFxModelController());
            return true;
        }
        if (param1 instanceof RoomObjectVariableFxStatusRemoveMessage) {
            _loc4_ = param1 instanceof RoomObjectVariableFxStatusRemoveMessage ? param1 : null;
            this.removeVariableFxStatus(_loc4_.configId, _loc4_.variableId);
            this.updateVariableFxPublication(getTimer(), this.getVariableFxModelController());
            return true;
        }
        return false;
    }

    protected getCurveStrength(param1: RoomObjectMoveUpdateMessage): number {
        return param1.curveStrength | 0;
    }

    protected getLocationOffset(): IVector3d {
        return null;
    }

    protected get variableFxLogicManager(): VariableFxLogicManager {
        return null;
    }

    protected setVariableFxHolderHovered(param1: boolean): void {
        if (this._SafeStr_14792 != param1) {
            this._SafeStr_14792 = param1;
            this._SafeStr_14791 = true;
        }
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROME_SLIDE_ANIMATION"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override update(param1: number): void {
        let _loc4_: number = 0;
        let _loc3_: number = NaN;
        let _loc6_: RoomObjectEvent = null;
        let _loc2_: IVector3d = this.getLocationOffset();
        let _loc5_: IRoomObjectModelController = this.object.getModelController();
        if (_loc5_ != null) {
            if (_loc2_ != null) {
                if (this._liftAmount != _loc2_.z) {
                    this._liftAmount = _loc2_.z;
                    _loc5_.setNumber("furniture_lift_amount", this._liftAmount);
                }
            } else if (this._liftAmount != 0) {
                this._liftAmount = 0;
                _loc5_.setNumber("furniture_lift_amount", this._liftAmount);
            }
            this.updateVariableFxPublication(param1, _loc5_);
        }
        if (this._SafeStr_2559.length > 0 || _loc2_ != null) {
            _loc4_ = param1 - this._changeTime;
            if (_loc4_ == this._SafeStr_4104 >> 1) {
                _loc4_++;
            }
            if (_loc4_ > this._SafeStr_4104) {
                _loc4_ = this._SafeStr_4104;
            }
            if (this._SafeStr_2559.length > 0) {
                MovingObjectLogic.helper_vector.assign(this._SafeStr_2559);
                MovingObjectLogic.helper_vector.mul(_loc4_ / this._SafeStr_4104);
                MovingObjectLogic.helper_vector.add(this._SafeStr_2291);
            } else {
                MovingObjectLogic.helper_vector.assign(this._SafeStr_2291);
            }
            if (_loc2_ != null) {
                MovingObjectLogic.helper_vector.add(_loc2_);
            }
            if (!isNaN(this._curveStrength) && this._curveStrength != 0) {
                _loc3_ = this.calculateCurveOffset(_loc4_, this._SafeStr_4104);
                MovingObjectLogic.helper_vector.z += _loc3_;
            }
            if (this.object != null) {
                this.object.setLocation(MovingObjectLogic.helper_vector);
            }
            if (_loc4_ == this._SafeStr_4104) {
                this._SafeStr_2559.x = 0;
                this._SafeStr_2559.y = 0;
                this._SafeStr_2559.z = 0;
            }
            _loc6_ = new RoomObjectMoveEvent("ROME_SLIDE_ANIMATION", this.object);
            this.eventDispatcher.dispatchEvent(_loc6_);
        }
        this._lastUpdateTime = param1;
    }

    private upsertVariableFxStatus(param1: VariableFxLogicStatus, param2: number): void {
        let _loc3_: VariableFxLogicStatus = null;
        if (this._variableFxStatuses == null) {
            this._variableFxStatuses = new UtilsMap();
        }
        let _loc5_: UtilsMap = asInstanceOf(this._variableFxStatuses.getValue(param1.configId), UtilsMap);
        let _loc4_: number = 1;
        if (_loc5_ == null) {
            _loc5_ = new UtilsMap();
            this._variableFxStatuses.add(param1.configId, _loc5_);
        }
        _loc3_ = asInstanceOf(_loc5_.getValue(param1.variableId), VariableFxLogicStatus);
        if (_loc3_ != null) {
            _loc4_ = this.getVariableFxChangeMask(_loc3_.value, param1.value);
            param1.createdAt = _loc3_.createdAt;
            param1._SafeStr_14785 = _loc3_._SafeStr_14785;
            _loc3_.dispose();
            _loc5_.replace(param1.variableId, param1);
        } else {
            _loc5_.add(param1.variableId, param1);
        }
        param1.updatedAt = param2;
        param1.updateId = ++this._SafeStr_14787;
        if (!param1.isInitialize) {
            this.updateVariableFxVisibilityWindow(param1, _loc4_, param2);
        }
        this._SafeStr_14791 = true;
    }

    private removeVariableFxStatus(param1: number, param2: string): void {
        let _loc4_: VariableFxLogicStatus = null;
        if (this._variableFxStatuses == null) {
            return;
        }
        let _loc3_: UtilsMap = asInstanceOf(this._variableFxStatuses.getValue(param1), UtilsMap);
        if (_loc3_ == null) {
            return;
        }
        _loc4_ = asInstanceOf(_loc3_.remove(param2), VariableFxLogicStatus);
        if (_loc4_ != null) {
            _loc4_.dispose();
            this._SafeStr_14791 = true;
        }
        if (_loc3_.length == 0) {
            this._variableFxStatuses.remove(param1);
            _loc3_.dispose();
        }
    }

    private clearVariableFxStatuses(): void {
        let _loc2_: any;
        if (this._variableFxStatuses == null) {
            return;
        }
        for (const _loc1_ of this._variableFxStatuses.getValues() ?? []) {
            for (_loc2_ of valuesOf(_loc1_.getValues())) {
                _loc2_.dispose();
            }
            _loc1_.dispose();
        }
        this._variableFxStatuses.reset();
        this._SafeStr_14791 = true;
    }

    private getVariableFxChangeMask(param1: number, param2: number): number {
        if (param2 > param1) {
            return 2;
        }
        if (param2 < param1) {
            return 4;
        }
        return 8;
    }

    private updateVariableFxVisibilityWindow(param1: VariableFxLogicStatus, param2: number, param3: number): void {
        let _loc4_: VariableFxLogicConfig = this.getVariableFxConfig(param1.configId);
        if (_loc4_ == null || _loc4_.showMode != 1) {
            return;
        }
        if ((_loc4_._SafeStr_14486 & param2) != 0) {
            param1._SafeStr_14785 = param3 + _loc4_.showDuration;
        }
    }

    private updateVariableFxPublication(param1: number, param2: IRoomObjectModelController): void {
        if (param2 == null) {
            return;
        }
        if ((this._variableFxStatuses == null || this._variableFxStatuses.length == 0) && this._SafeStr_14793 == null) {
            this._SafeStr_14791 = false;
            this._SafeStr_14790 = 0;
            return;
        }
        let _loc3_: VariableFxLogicManager = this.variableFxLogicManager;
        let _loc4_: number = _loc3_?.updateId;
        if (this._SafeStr_14789 != _loc4_) {
            this._SafeStr_14789 = _loc4_;
            this._SafeStr_14791 = true;
        }
        if (!this._SafeStr_14791 && (this._SafeStr_14790 <= 0 || param1 < this._SafeStr_14790)) {
            return;
        }
        this.publishVariableFxStatuses(param1, param2);
    }

    private publishVariableFxStatuses(param1: number, param2: IRoomObjectModelController): void {
        let _loc4_: VariableFxStatusModelData = null;
        let _loc9_: VariableFxStatusModelData = null;
        let _loc12_: number = 0;
        let _loc8_: string = null;
        let _loc5_: UtilsMap = null;
        let _loc11_: UtilsMap = null;
        let _loc16_: VariableFxLogicStatus = null;
        let _loc15_: VariableFxLogicConfig = null;
        let _loc10_: VariableFxStatusModelEntry = null;
        let _loc3_: boolean = false;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc13_: UtilsMap = new UtilsMap();
        let _loc14_: number = 0;
        _loc6_ = 0;
        while (this._variableFxStatuses != null && _loc6_ < this._variableFxStatuses.length) {
            _loc12_ = this._variableFxStatuses.getKey(_loc6_) | 0;
            _loc15_ = this.getVariableFxConfig(_loc12_);
            _loc5_ = asInstanceOf(this._variableFxStatuses.getWithIndex(_loc6_), UtilsMap);
            if (!(_loc15_ == null || _loc5_ == null)) {
                _loc7_ = 0;
                while (_loc7_ < _loc5_.length) {
                    _loc8_ = stringOrNull(_loc5_.getKey(_loc7_));
                    _loc16_ = asInstanceOf(_loc5_.getWithIndex(_loc7_), VariableFxLogicStatus);
                    if (_loc16_ != null) {
                        _loc3_ = this.isVariableFxStatusVisible(_loc16_, _loc15_, param1);
                        _loc11_ = asInstanceOf(_loc13_.getValue(_loc12_), UtilsMap);
                        if (_loc11_ == null) {
                            _loc11_ = new UtilsMap();
                            _loc13_.add(_loc12_, _loc11_);
                        }
                        _loc10_ = new VariableFxStatusModelEntry(_loc16_.configId, _loc16_.variableId, _loc16_.createdAt, _loc16_.updateId, _loc16_.value, _loc16_.overrideMinValue, _loc16_.overrideMaxValue, _loc16_.extra.clone(), _loc16_.isInitialize || !_loc3_, !_loc3_);
                        _loc11_.add(_loc8_, _loc10_);
                        if (_loc3_ && _loc15_.showMode == 1 && (!this._SafeStr_14792 || !_loc15_.showOnMouseHover) && _loc16_._SafeStr_14785 > param1 && (_loc14_ <= 0 || _loc16_._SafeStr_14785 < _loc14_)) {
                            _loc14_ = _loc16_._SafeStr_14785;
                        }
                    }
                    _loc7_++;
                }
            }
            _loc6_++;
        }
        if (_loc13_.length > 0) {
            _loc4_ = new VariableFxStatusModelData(++this._SafeStr_14788, _loc13_);
        } else {
            _loc13_.dispose();
        }
        if (this._SafeStr_14793 == null && _loc4_ == null) {
            this._SafeStr_14791 = false;
            this._SafeStr_14790 = _loc14_;
            return;
        }
        _loc9_ = this._SafeStr_14793;
        this._SafeStr_14793 = _loc4_;
        param2.setObject("variable_fx_statuses", _loc4_);
        if (_loc9_ != null) {
            _loc9_.dispose();
        }
        this._SafeStr_14791 = false;
        this._SafeStr_14790 = _loc14_;
    }

    private isVariableFxStatusVisible(param1: VariableFxLogicStatus, param2: VariableFxLogicConfig, param3: number): boolean {
        if (param2.showMode == 0) {
            return true;
        }
        if (param2.showOnMouseHover && this._SafeStr_14792) {
            return true;
        }
        return param2.showMode == 1 && param1._SafeStr_14785 > param3;
    }

    private getVariableFxConfig(param1: number): VariableFxLogicConfig {
        let _loc2_: VariableFxLogicManager = this.variableFxLogicManager;
        if (_loc2_ == null) {
            return null;
        }
        return _loc2_.getConfig(param1);
    }

    private clearPublishedVariableFxStatusData(): void {
        let _loc1_: IRoomObjectModelController = this.getVariableFxModelController();
        if (_loc1_ != null && this._SafeStr_14793 != null) {
            _loc1_.setObject("variable_fx_statuses", null);
        }
    }

    private getVariableFxModelController(): IRoomObjectModelController {
        if (this.object == null) {
            return null;
        }
        return this.object.getModelController();
    }

    private calculateCurveOffset(param1: number, param2: number): number {
        if (isNaN(this._curveStrength) || this._curveStrength == 0) {
            return 0;
        }
        return 4 * (this._curveStrength / 100 * (this._SafeStr_2559.length / 4) / (param2 * param2)) * param1 * (param2 - param1);
    }

    private fixDeltaAndIntervalForOvershooting(): void {
        let _loc1_: number = NaN;
        if (!isNaN(this._overshootTime) && this._overshootTime != 0 && this._SafeStr_4104 != 0) {
            _loc1_ = this._SafeStr_2559.z;
            this._SafeStr_2559.mul((this._SafeStr_4104 + this._overshootTime) / this._SafeStr_4104);
            this._SafeStr_2559.z = _loc1_;
            this._SafeStr_4104 += this._overshootTime;
        }
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

    get [IRoomObjectEventHandlerStateTransfer](): true {
        return true;
    }
}
