import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { WiredLinkConnection } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkConnection';
import type { WiredLinkController } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredLinkConnectionTableObject } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkConnectionTableObject';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredLinkConnectionsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_link::WiredLinkConnectionsView'); }

    declare private _controller: WiredLinkController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_14559: TableView;

    private _SafeStr_14106: string = "0";
    private _networkName: string = "";

    declare private _SafeStr_14562: IConfirmDialog;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: WiredLinkController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(param2.buildFromXML(XML.from(param1.assets.getAssetByName("wired_link_connections_view_xml").content), 1), isIFrameWindow);
        this._window.procedure = this.onWindowEvent;
        this.nameInput.addEventListener("WKE_KEY_DOWN", this.onNameKeyDown);
        this._SafeStr_14559 = new TableView(param2, this.tableContainer, true);
        this._SafeStr_14559.initialize(Array.from([new TableColumn("room", "${wiredlink.column.room}", 0.28, "left"), new TableColumn("room_id", "${wiredlink.column.room_id}", 0.2), new TableColumn("furni", "${wiredlink.column.furni}", 0.2), new TableColumn("receive_local", "${wiredlink.column.receive_local}", 0.2), new TableColumn("visit", "", 0.12)]), true, false);
        this.tableEmptyText.visible = false;
        this._window.center();
    }

    public showLoading(param1: string, param2: string): void {
        this.closeDeleteDialog();
        this._SafeStr_14106 = param1;
        this.nameInput.text = param2;
        this.updateName(param2);
        this._SafeStr_14559.clear();
        this.statusText.text = "${wiredlink.loading.connections}";
        this.statusText.textColor = 5592405;
        this._window.visible = true;
        this._window.activate();
    }

    public showConnections(param1: WiredLinkConnection[]): void {
        let _loc2_: ITableObject[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_.push(new WiredLinkConnectionTableObject(this._controller, _loc3_));
        }
        this._SafeStr_14559.setObjects(_loc2_, true);
        this.statusText.text = "";
    }

    public showError(param1: number): void {
        this.statusText.text = "${wiredlink.error." + param1 + "}";
        this.statusText.textColor = 11351092;
    }

    public updateName(param1: string): void {
        if (this.nameInput.text == this._networkName) {
            this.nameInput.text = param1;
        }
        this._networkName = param1;
        this._window.caption = this._controller.localizationManager.getLocalizationWithParams("wiredlink.connections.title", "", "name", param1);
    }

    public networkRenamed(param1: string): void {
        this.updateName(param1);
        this.statusText.text = "";
    }

    private onNameKeyDown = (param1: WindowKeyboardEvent): void => {
        if (param1.keyCode == 13) {
            this._controller.renameNetwork(this._SafeStr_14106, this.nameInput.text);
        }
    };

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param2.name == "header_button_close") {
            this.hide();
            return;
        }
        if (param2.name == "rename_btn") {
            this._controller.renameNetwork(this._SafeStr_14106, this.nameInput.text);
        }
        if (this._SafeStr_14562 == null && (param2.name == "delete_btn" || param2.name == "delete_caption")) {
            this._SafeStr_14562 = this._windowManager.confirm("${wiredlink.delete.title}", "${wiredlink.delete.confirm}", 0, this.onDeleteConfirmed);
        }
    };

    private onDeleteConfirmed = (param1: IConfirmDialog, param2: WindowEvent): void => {
        this.closeDeleteDialog();
        if (param2.type == "WE_OK") {
            this._controller.deleteNetwork(this._SafeStr_14106);
        }
    };

    private closeDeleteDialog(): void {
        if (this._SafeStr_14562 != null) {
            this._SafeStr_14562.dispose();
        }
        this._SafeStr_14562 = null;
    }

    public hide(): void {
        this.closeDeleteDialog();
        this._window.visible = false;
        this._SafeStr_14106 = "0";
    }

    public get networkId(): string {
        return this._SafeStr_14106;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.closeDeleteDialog();
        this._SafeStr_14559.dispose();
        this.nameInput.removeEventListener("WKE_KEY_DOWN", this.onNameKeyDown);
        this._window.procedure = null;
        this._window.dispose();
        this._SafeStr_14559 = null;
        this._controller = null;
        this._windowManager = null;
        this._window = null;
    }

    private get tableContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("connections_table"), isIWindowContainer);
    }

    private get tableEmptyText(): ITextWindow {
        return asGuarded(this.tableContainer.findChildByName("nothing_to_display_text"), isITextWindow);
    }

    private get statusText(): ITextWindow {
        return asGuarded(this._window.findChildByName("status_text"), isITextWindow);
    }

    private get nameInput(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("network_name"), isITextFieldWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
