import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { ChooserItem } from '@/com/sulake/habbo/ui/widget/chooser/ChooserItem';
import { RoomWidgetChooserContentEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChooserContentEvent';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';

export class UserChooserWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::UserChooserWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_USER_CHOOSER";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWRWM_USER_CHOOSER");
        _loc1_.push("RWROM_SELECT_OBJECT");
        return _loc1_;
    }

    public isChooserDisabled(): boolean {
        return !!(this._container && this._container.roomEngine && this._container.roomEngine.activeRoomHasChooserDisabled);
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetRoomObjectMessage = null;
        if (param1 == null) {
            return null;
        }
        switch (param1.type) {
            case "RWRWM_USER_CHOOSER":
                this.handleUserChooserRequest();
                break;
            case "RWROM_SELECT_OBJECT":
                _loc2_ = param1 instanceof RoomWidgetRoomObjectMessage ? param1 : null;
                if (_loc2_ == null) {
                    return null;
                }
                if (_loc2_.category == 100) {
                    this._container.roomEngine.selectRoomObject(this._container.roomSession.roomId, _loc2_.id, _loc2_.category);
                }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return null;
    }

    public update(): void {
    }

    private compareItems = (param1: ChooserItem, param2: ChooserItem): number => {
        if (param1 == null || param2 == null || param1.name == param2.name || param1.name.length == 0 || param2.name.length == 0) {
            return 1;
        }
        let _loc3_: any[] = [param1.name.toUpperCase(), param2.name.toUpperCase()].sort();
        if (_loc3_.indexOf(param1.name.toUpperCase()) == 0) {
            return -1;
        }
        return 1;
    };

    private handleUserChooserRequest(): void {
        let _loc2_: IRoomObject = null;
        let _loc4_: number = 0;
        let _loc1_: IUserData = null;
        if (this._container == null || this._container.roomSession == null || this._container.roomEngine == null) {
            return;
        }
        if (this._container.roomSession.userDataManager == null) {
            return;
        }
        let _loc6_: number = this._container.roomSession.roomId;
        let _loc5_: any[] = [];
        let _loc3_: number = this._container.roomEngine.getRoomObjectCount(_loc6_, 100);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = this._container.roomEngine.getRoomObjectWithIndex(_loc6_, _loc4_, 100);
            _loc1_ = this._container.roomSession.userDataManager.getUserDataByIndex(_loc2_.getId());
            if (_loc1_ != null) {
                _loc5_.push(new ChooserItem(_loc1_.roomObjectId, 100, _loc1_.name, null, _loc1_.type));
            }
            _loc4_++;
        }
        _loc5_.sort(this.compareItems);
        this._container.events.dispatchEvent(new RoomWidgetChooserContentEvent("RWCCE_USER_CHOOSER_CONTENT", _loc5_));
    }

    public processEvent(param1: Event): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
