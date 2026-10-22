import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboInventoryEffectsEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryEffectsEvent';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { EffectsWidget } from '@/com/sulake/habbo/ui/widget/effects/EffectsWidget';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class EffectsWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::EffectsWidgetHandler'); }

    constructor() {
    }

    declare private _widget: EffectsWidget;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container && this._container.inventory) {
            this._container.inventory.events.removeEventListener("HIEE_EFFECTS_CHANGED", this.onEffectsChanged);
        }
        this._container = param1;
        if (this._container && this._container.inventory) {
            this._container.inventory.events.addEventListener("HIEE_EFFECTS_CHANGED", this.onEffectsChanged);
        }
    }

    public get type(): string {
        return "RWE_EFFECTS";
    }

    public set widget(param1: EffectsWidget) {
        this._widget = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.container = null;
            this._widget = null;
            this._disposed = true;
        }
    }

    public getWidgetMessages(): any[] {
        return ["RWRWM_EFFECTS"];
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        if (!param1) {
            return null;
        }
        let _loc2_: any = param1.type;
        if ("RWRWM_EFFECTS" === _loc2_) {
            this._widget.open();
        }
        return null;
    }

    public update(): void {
    }

    public processEvent(param1: Event): void {
    }

    private onEffectsChanged = (param1: HabboInventoryEffectsEvent): void => {
        if (this._widget) {
            this._widget.open();
        }
    };

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
