import { asGuarded, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngineServices } from '@/com/sulake/habbo/room/IRoomEngineServices';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIRoomEngineServices } from '@/com/sulake/habbo/room/IRoomEngineServices';
import { VariableInfoBubbleView } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/tab_variable_overview/VariableInfoBubbleView';
import { RoomObjectHighLighter } from '@/com/sulake/habbo/roomevents/wired_setup/RoomObjectHighLighter';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';

export class VariableHoldersHighlighter implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_variable_overview::VariableHoldersHighlighter'); }

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        this._SafeStr_3548 = new Dictionary();
        this._SafeStr_3476 = new Dictionary();
        this._SafeStr_3471 = [];
        this._assignedBubbles = new UtilsMap();
        let _loc2_: GlowFilter = new GlowFilter(12318714, 1, 4, 4, 4, 1, true, false);
        let _loc3_: ColorMatrixFilter = new ColorMatrixFilter([0.9, 0, 0, 0, 0, 0, 1, 0, 0, 40, 0, 0, 1, 0, 80, 0, 0, 0, 0.85, 0]);
        this._filter = [_loc3_, _loc2_];
        this._roomEvents.roomEngine.events.addEventListener("REOE_REMOVED", this.onRoomObjectRemoved);
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _SafeStr_3548: Map<any, any>;

    declare private _SafeStr_3476: Map<any, any>;

    declare private _filter: any[];

    declare private _SafeStr_3471: VariableInfoBubbleView[];

    declare private _assignedBubbles: UtilsMap;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get roomEngineServices(): IRoomEngineServices {
        return asGuarded(this._roomEvents.roomEngine, isIRoomEngineServices);
    }

    public highlightObject(param1: number, param2: string): void {
        let _loc4_: string = null;
        let _loc3_: boolean = true;
        if (this._SafeStr_3548.has(param1)) {
            _loc4_ = stringOrNull(this._SafeStr_3548.get(param1));
            if (_loc4_ == param2) {
                return;
            }
            _loc3_ = false;
        }
        let _loc5_: IRoomObject = this.getFurniRoomObject(param1);
        if (_loc5_ == null) {
            return;
        }
        this.setFurniObjectHighlightAndValue(_loc3_, _loc5_, param2);
        this._SafeStr_3548.set(param1, param2);
    }

    public highlightUser(param1: number, param2: string): void {
        let _loc5_: string = null;
        let _loc4_: boolean = true;
        if (this._SafeStr_3476.has(param1)) {
            _loc5_ = stringOrNull(this._SafeStr_3476.get(param1));
            if (_loc5_ == param2) {
                return;
            }
            _loc4_ = false;
        }
        let _loc3_: IUserData = this._roomEvents.roomSession.userDataManager.getUserDataByIndex(param1);
        if (_loc3_ == null) {
            return;
        }
        let _loc6_: IRoomObject = this.getUserRoomObject(param1);
        if (_loc6_ == null) {
            return;
        }
        if (_loc3_.type == 2) {
            this.setFurniObjectHighlightAndValue(_loc4_, _loc6_, param2);
        } else {
            this.setUserObjectHighlightAndValue(_loc4_, _loc6_, param2);
        }
        this._SafeStr_3476.set(param1, param2);
    }

    public removeRemovedHolders(param1: Map<any, any>, param2: Map<any, any>): void {
        let _loc6_: number = 0;
        let _loc7_: IRoomObject = null;
        let _loc5_: number = 0;
        let _loc3_: IUserData = null;
        let _loc4_: number[] = [];
        for (_loc6_ of this._SafeStr_3548?.keys() ?? []) {
            if (!(param1.has(_loc6_))) {
                _loc7_ = this.getFurniRoomObject(_loc6_);
                if (_loc7_ != null) {
                    this.removeFurniObjectHighlightAndValue(_loc7_);
                    RoomObjectHighLighter.removeFiltersFromFurni(_loc7_, this._filter);
                }
                _loc4_.push(_loc6_);
            }
        }
        for (_loc6_ of _loc4_ ?? []) {
            this._SafeStr_3548.delete(_loc6_);
        }
        _loc4_ = [];
        for (_loc5_ of this._SafeStr_3476?.keys() ?? []) {
            if (!(param2.has(_loc5_))) {
                _loc7_ = this.getUserRoomObject(_loc5_);
                _loc3_ = this._roomEvents.roomSession.userDataManager.getUserDataByIndex(_loc5_);
                if (_loc7_ != null && _loc3_ != null) {
                    if (_loc3_.type == 2) {
                        this.removeFurniObjectHighlightAndValue(_loc7_);
                    } else {
                        this.removeUserObjectHighlightAndValue(_loc7_);
                    }
                }
                _loc4_.push(_loc5_);
            }
        }
        for (_loc5_ of _loc4_ ?? []) {
            this._SafeStr_3476.delete(_loc5_);
        }
    }

    public clear(): void {
        let _loc1_: Map<any, any> = new Dictionary();
        this.removeRemovedHolders(_loc1_, _loc1_);
    }

    public update(param1: number): void {
        for (const _loc2_ of valuesOf(this._assignedBubbles)) {
            _loc2_.update(param1);
        }
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (this._disposed) {
            return;
        }
        this.clear();
        this._roomEvents.roomEngine.events.removeEventListener("REOE_REMOVED", this.onRoomObjectRemoved);
        for (_loc1_ of this._SafeStr_3471 ?? []) {
            _loc1_.dispose();
        }
        for (_loc1_ of this._assignedBubbles.getValues() ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_3471 = null;
        this._assignedBubbles = null;
        this._SafeStr_3548 = null;
        this._SafeStr_3476 = null;
        this._disposed = true;
    }

    private setFurniObjectHighlightAndValue(param1: boolean, param2: IRoomObject, param3: string): void {
        if (param1) {
            RoomObjectHighLighter.addFiltersToFurni(param2, this._filter);
        }
        this.updateBubbleForObject(param2, param3);
    }

    private setUserObjectHighlightAndValue(param1: boolean, param2: IRoomObject, param3: string): void {
        if (param1) {
            castGuarded(param2, isIRoomObjectController, "com.sulake.room.object.IRoomObjectController").getModelController().setNumber("figure_highlight_variable_holder", 1);
        }
        this.updateBubbleForObject(param2, param3, true);
    }

    private updateBubbleForObject(param1: IRoomObject, param2: string, param3: boolean = false): void {
        let _loc4_: VariableInfoBubbleView = this._assignedBubbles.getValue(param1);
        if (param2 == null && _loc4_ != null) {
            this.recycleBubbleForObject(param1);
        } else if (param2 != null && _loc4_ != null) {
            _loc4_.updateValue(param2);
        } else if (param2 != null && _loc4_ == null) {
            this.reuseOrCreateBubble(param2, param1, param1.getId(), this.roomEngineServices.getRoomObjectCategory(param1.getType()), param3);
        }
    }

    private removeFurniObjectHighlightAndValue(param1: IRoomObject): void {
        RoomObjectHighLighter.removeFiltersFromFurni(param1, this._filter);
        this.recycleBubbleForObject(param1);
    }

    private removeUserObjectHighlightAndValue(param1: IRoomObject): void {
        castGuarded(param1, isIRoomObjectController, "com.sulake.room.object.IRoomObjectController").getModelController().setNumber("figure_highlight_variable_holder", 0);
        this.recycleBubbleForObject(param1);
    }

    private recycleBubbleForObject(param1: IRoomObject): void {
        let _loc2_: VariableInfoBubbleView = this._assignedBubbles.remove(param1);
        if (_loc2_ != null) {
            _loc2_.setInactive();
            this._SafeStr_3471.push(_loc2_);
        }
    }

    private reuseOrCreateBubble(param1: string, param2: IRoomObject, param3: number, param4: number, param5: boolean): VariableInfoBubbleView {
        let _loc6_: VariableInfoBubbleView = null;
        if (this._SafeStr_3471.length > 0) {
            _loc6_ = this._SafeStr_3471.pop();
        } else {
            _loc6_ = new VariableInfoBubbleView(this._roomEvents);
        }
        this._assignedBubbles.add(param2, _loc6_);
        _loc6_.setActive(param1, param3, param4, param5);
        return _loc6_;
    }

    private getFurniRoomObject(param1: number): IRoomObject {
        if (param1 < 0) {
            param1 = -param1;
            return this._roomEvents.roomEngine.getRoomObject(this._roomEvents.roomId, param1, 20);
        }
        return this._roomEvents.roomEngine.getRoomObject(this._roomEvents.roomId, param1, 10);
    }

    private getUserRoomObject(param1: number): IRoomObject {
        return this._roomEvents.roomEngine.getRoomObject(this._roomEvents.roomId, param1, 100);
    }

    private onRoomObjectRemoved = (param1: RoomEngineObjectEvent): void => {
        let _loc3_: number = 0;
        let _loc2_: VariableInfoBubbleView = null;
        _loc3_ = 0;
        while (_loc3_ < this._assignedBubbles.length) {
            _loc2_ = this._assignedBubbles.getWithIndex(_loc3_);
            if (_loc2_.objectId == param1.objectId && _loc2_.category == param1.category) {
                this._assignedBubbles.remove(this._assignedBubbles.getKey(_loc3_));
                _loc2_.setInactive();
                this._SafeStr_3471.push(_loc2_);
            }
            _loc3_ += 1;
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
