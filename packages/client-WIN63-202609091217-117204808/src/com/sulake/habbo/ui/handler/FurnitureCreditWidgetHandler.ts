import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetCreditFurniUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetCreditFurniUpdateEvent';
import { RoomWidgetCreditFurniRedeemMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetCreditFurniRedeemMessage';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';

export class FurnitureCreditWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureCreditWidgetHandler'); }

    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_FURNI_CREDIT_WIDGET";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_CREDITFURNI", "RWFCRM_REDEEM"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc3_: RoomWidgetFurniToWidgetMessage = null;
        let _loc2_: IRoomObject = null;
        let _loc8_: IRoomObjectModel = null;
        let _loc7_: number = NaN;
        let _loc4_: string = null;
        let _loc9_: boolean = false;
        let _loc5_: RoomWidgetCreditFurniUpdateEvent = null;
        let _loc6_: RoomWidgetCreditFurniRedeemMessage = null;
        switch (param1.type) {
            case "RWFWM_MESSAGE_REQUEST_CREDITFURNI":
                _loc3_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                _loc2_ = this._container.roomEngine.getRoomObject(_loc3_.roomId, _loc3_.id, _loc3_.category);
                if (_loc2_ != null && this._container.isOwnerOfFurniture(_loc2_)) {
                    _loc8_ = _loc2_.getModel();
                    if (_loc8_ != null) {
                        _loc7_ = _loc8_.getNumber("furniture_credit_value");
                        _loc4_ = _loc8_.getString("furniture_nft_credit");
                        _loc9_ = _loc4_ == "true";
                        if (_loc9_ && !this._container.config.getBoolean("nft.credit.converting.enabled")) {
                            return null;
                        }
                        _loc5_ = new RoomWidgetCreditFurniUpdateEvent("RWCFUE_CREDIT_FURNI_UPDATE", _loc3_.id, _loc7_, _loc9_);
                        this._container.events.dispatchEvent(_loc5_);
                    }
                }
                break;
            case "RWFCRM_REDEEM":
                _loc6_ = param1 instanceof RoomWidgetCreditFurniRedeemMessage ? param1 : null;
                if (this._container != null && this._container.roomSession != null) {
                    this._container.roomSession.sendCreditFurniRedeemMessage(_loc6_.objectId);
                }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processEvent(param1: Event): void {
        let _loc2_: Event = null;
        if (this._container != null && this._container.events != null && _loc2_ != null) {
            this._container.events.dispatchEvent(_loc2_);
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
}
