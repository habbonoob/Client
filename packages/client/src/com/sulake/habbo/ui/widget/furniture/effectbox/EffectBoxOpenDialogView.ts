import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';

export class EffectBoxOpenDialogView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.effectbox::EffectBoxOpenDialogView'); }

    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7595: string = "cancel";
    private static readonly _SafeStr_7683: string = "ok";

    constructor(param1: FurnitureContextMenuWidget) {
        this._widget = param1;
        this._windowManager = param1.windowManager;
        this._assets = this._widget.assets;
    }

    declare private _window: IWindowContainer;

    declare private _widget: FurnitureContextMenuWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _requestRoomObjectId: number;
    static { (this.prototype as any)._requestRoomObjectId = 0; }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private get connection(): IConnection {
        return this._widget.handler.container.connection;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._disposed = true;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public open(param1: number): void {
        this._requestRoomObjectId = param1;
        this.setWindowContent();
        this._window.visible = true;
    }

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    private setWindowContent(): void {
        let _loc1_: string = null;
        if (!this._window) {
            _loc1_ = "effectbox_xml";
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName(_loc1_).content, XML)), isIWindowContainer);
            this.addClickListener("ok");
            this.addClickListener("cancel");
            this.addClickListener("header_button_close");
            this._window.center();
        }
    }

    private addClickListener(param1: string): void {
        this._window.findChildByName(param1).addEventListener("WME_CLICK", this.onMouseClick);
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        let _loc2_: any = null;
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel":
                this.close();
                break;
            case "ok":
                this.connection.send(new UseFurnitureMessageComposer(this._requestRoomObjectId));
                this.close();
        }
        if (_loc2_) {
            this._widget.messageListener.processWidgetMessage(_loc2_);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
