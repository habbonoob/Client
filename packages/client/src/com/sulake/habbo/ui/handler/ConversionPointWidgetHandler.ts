import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetConversionPointMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetConversionPointMessage';

export class ConversionPointWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::ConversionPointWidgetHandler'); }

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
        return "RWE_CONVERSION_TRACKING";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWCPM_CONVERSION_POINT"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetConversionPointMessage = null;
        let _loc3_: any = param1.type;
        if ("RWCPM_CONVERSION_POINT" === _loc3_) {
            _loc2_ = param1 instanceof RoomWidgetConversionPointMessage ? param1 : null;
            if (_loc2_ == null) {
                return null;
            }
            this._container.roomSession.sendConversionPoint(_loc2_.category, _loc2_.pointType, _loc2_.action, _loc2_.extraString, _loc2_.extraInt);
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public update(): void {
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
