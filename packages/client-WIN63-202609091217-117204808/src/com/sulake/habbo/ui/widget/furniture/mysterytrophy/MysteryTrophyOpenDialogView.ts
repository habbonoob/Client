import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { OpenMysteryTrophyMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/OpenMysteryTrophyMessageComposer';

export class MysteryTrophyOpenDialogView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.mysterytrophy::MysteryTrophyOpenDialogView'); }

    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7595: string = "cancel";
    private static readonly _SafeStr_7683: string = "ok";

    declare private _window: IWindowContainer;

    private _disposed: boolean = false;

    declare private _widget: FurnitureContextMenuWidget;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _requestRoomObjectId: number;
    static { (this.prototype as any)._requestRoomObjectId = 0; }

    constructor(param1: FurnitureContextMenuWidget) {
        this._widget = param1;
        this._windowManager = param1.windowManager;
        this._assets = this._widget.assets;
    }

    public get disposed(): boolean {
        return this._disposed;
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

    private setWindowContent(): void {
        let _loc1_: string = null;
        if (!this._window) {
            _loc1_ = "mysterytrophy_xml";
            this._window = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this._assets.getAssetByName(_loc1_).content, XML)), isIWindowContainer);
            this.addClickListener("ok");
            this.addClickListener("cancel");
            this.addClickListener("header_button_close");
            this._window.center();
        }
    }

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    private addClickListener(param1: string): void {
        this._window.findChildByName(param1).addEventListener("WME_CLICK", this.onMouseClick);
    }

    private onMouseClick = (param1: WindowMouseEvent): void => {
        let _loc2_: string = null;
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel":
                this.close();
                break;
            case "ok":
                _loc2_ = this.getTrophyInscription();
                this.connection.send(new OpenMysteryTrophyMessageComposer(this._requestRoomObjectId, _loc2_));
                this.close();
        }
    };

    private getTrophyInscription(): string {
        let _loc1_: ITextFieldWindow = null;
        if (this._window) {
            _loc1_ = asGuarded(this._window.findChildByName("input"), isITextFieldWindow);
            if (_loc1_) {
                return _loc1_.text;
            }
        }
        return null;
    }

    private get connection(): IConnection {
        return this._widget.handler.container.connection;
    }

    get [IDisposable](): true {
        return true;
    }
}
