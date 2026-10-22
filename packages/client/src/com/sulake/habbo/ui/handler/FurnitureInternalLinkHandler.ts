import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureInternalLinkHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureInternalLinkHandler'); }

    private static readonly INTERNAL_LINK_KEY: string = "internalLink";

    constructor() {
    }

    declare private _container: IRoomWidgetHandlerContainer;

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get type(): string {
        return "RWE_INTERNAL_LINK";
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RETWE_REQUEST_INTERNAL_LINK"];
    }

    public update(): void {
    }

    public dispose(): void {
        this._container = null;
    }

    public processEvent(param1: Event): void {
        let _loc5_: RoomEngineToWidgetEvent = null;
        let _loc2_: IRoomObject = null;
        let _loc4_: IRoomObjectModel = null;
        let _loc3_: string = null;
        let _loc6_: any = param1.type;
        if ("RETWE_REQUEST_INTERNAL_LINK" === _loc6_) {
            _loc5_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
            if (param1 != null && this._container.roomEngine != null) {
                _loc2_ = this._container.roomEngine.getRoomObject(_loc5_.roomId, _loc5_.objectId, _loc5_.category);
                if (_loc2_ != null) {
                    _loc4_ = _loc2_.getModel();
                    _loc3_ = stringOrNull(_loc4_.getStringToStringMap("furniture_data").getValue("internalLink"));
                    if (_loc3_ == null || _loc3_.length == 0) {
                        _loc3_ = _loc4_.getString("furniture_internal_link");
                    }
                    if (_loc3_ != null && _loc3_.length > 0) {
                        (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent(_loc3_);
                    }
                }
            }
        }
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
