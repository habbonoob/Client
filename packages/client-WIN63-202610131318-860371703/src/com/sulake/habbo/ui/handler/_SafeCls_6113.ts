import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WiredMenuEvent } from '@/com/sulake/habbo/roomevents/events/WiredMenuEvent';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { FurnitureLabelWidget } from '@/com/sulake/habbo/ui/widget/furniture/label/FurnitureLabelWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SetFurnitureLabelMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/SetFurnitureLabelMessageComposer';
import { SetFurnitureLabelSettingsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/SetFurnitureLabelSettingsMessageComposer';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class _SafeCls_6113 implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::_SafeCls_6113'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _widget: FurnitureLabelWidget;

    constructor() {
    }

    public get type(): string {
        return "RWE_FURNITURE_LABEL";
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container == param1) {
            return;
        }
        if (this._container != null) {
            if (this._container.wiredMenu != null && this._container.wiredMenu.events != null) {
                this._container.wiredMenu.events.removeEventListener("WME_PERMISSIONS_CHANGED", this.onPermissionsChanged);
            }
            this._container.removeUpdateListener(this);
        }
        this._container = param1;
        if (this._container != null) {
            this._container.addUpdateListener(this);
            if (this._container.wiredMenu != null && this._container.wiredMenu.events != null) {
                this._container.wiredMenu.events.addEventListener("WME_PERMISSIONS_CHANGED", this.onPermissionsChanged);
            }
        }
        if (this._widget != null) {
            this._widget.permissionsChanged(this.canRead, this.canModify);
        }
    }

    public set widget(param1: FurnitureLabelWidget) {
        this._widget = param1;
        if (this._widget != null) {
            this._widget.permissionsChanged(this.canRead, this.canModify);
        }
    }

    public get canRead(): boolean {
        return this._container != null && this._container.wiredMenu != null && this._container.wiredMenu.hasReadPermission;
    }

    public get canModify(): boolean {
        return this._container != null && this._container.wiredMenu != null && this._container.wiredMenu.hasWritePermission;
    }

    public saveLabel(param1: number, param2: string): void {
        if (this.canModify) {
            this._container.connection.send(new SetFurnitureLabelMessageComposer(param1, param2));
        }
    }

    public saveLabelSettings(param1: number, param2: number, param3: number, param4: boolean): void {
        if (this.canModify) {
            this._container.connection.send(new SetFurnitureLabelSettingsMessageComposer(param1, param2, param3, param4));
        }
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return null;
    }

    public processEvent(param1: Event): void {
    }

    public update(): void {
        if (this._widget != null) {
            this._widget.updatePositions();
        }
    }

    private onPermissionsChanged = (param1: WiredMenuEvent): void => {
        if (this._widget != null) {
            this._widget.permissionsChanged(this.canRead, this.canModify);
        }
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._container != null) {
            if (this._container.wiredMenu != null && this._container.wiredMenu.events != null) {
                this._container.wiredMenu.events.removeEventListener("WME_PERMISSIONS_CHANGED", this.onPermissionsChanged);
            }
            this._container.removeUpdateListener(this);
        }
        this._widget = null;
        this._container = null;
        this._disposed = true;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
