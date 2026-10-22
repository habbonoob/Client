import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { WiredLinkConnection } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkConnection';
import type { WiredLinkNetwork } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredlink/WiredLinkNetwork';
import type { WiredLinkController } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ITableObject } from '@/com/sulake/habbo/window/utils/tableview/ITableObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredLinkConnectionsView } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkConnectionsView';
import { WiredLinkNetworkTableObject } from '@/com/sulake/habbo/roomevents/wired_link/WiredLinkNetworkTableObject';
import { TableColumn } from '@/com/sulake/habbo/window/utils/tableview/TableColumn';
import { TableView } from '@/com/sulake/habbo/window/utils/tableview/TableView';

export class WiredLinkView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_link::WiredLinkView'); }

    declare private _controller: WiredLinkController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_14544: TableView;

    declare private _SafeStr_3503: WiredLinkConnectionsView;

    declare private _SafeStr_14545: IAlertDialog;

    private _SafeStr_2502: ITableObject[] = [];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: WiredLinkController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(param2.buildFromXML(XML.from(param1.assets.getAssetByName("wired_link_view_xml").content), 1), isIFrameWindow);
        this._window.procedure = this.onWindowEvent;
        this._SafeStr_14544 = new TableView(param2, this.tableContainer, true);
        this._SafeStr_14544.initialize(Array.from([new TableColumn("name", "${wiredlink.column.name}", 0.44, "left"), new TableColumn("count", "${wiredlink.column.count}", 0.22), new TableColumn("status", "${wiredlink.column.status}", 0.21), new TableColumn("manage", "", 0.13)]), true, true);
        this.receiveCheckbox.addEventListener("WE_SELECTED", this.onReceiveLocalChanged);
        this.receiveCheckbox.addEventListener("WE_UNSELECTED", this.onReceiveLocalChanged);
        this.tableEmptyText.visible = false;
        this._window.center();
    }

    public showConfiguration(): void {
        this.closeReceiveLocalDialog();
        this._SafeStr_2502.length = 0;
        for (const _loc1_ of this._controller.networks ?? []) {
            this._SafeStr_2502.push(this.tableObject(_loc1_));
        }
        this._SafeStr_2502.sort(WiredLinkNetworkTableObject.compare as (a: ITableObject, b: ITableObject) => number);
        this._SafeStr_14544.setObjects(this._SafeStr_2502, true);
        this.updateReceiveLocal();
        this.updateConnectionText();
        this.nameInput.text = "";
        this.setStatus("");
        if (this._SafeStr_3503 != null) {
            this._SafeStr_3503.hide();
        }
        this._window.visible = true;
        this._window.activate();
    }

    private updateReceiveLocal(): void {
        if (this._controller.receiveLocal) {
            this.receiveCheckbox.select();
        } else {
            this.receiveCheckbox.unselect();
        }
    }

    private tableObject(param1: WiredLinkNetwork): WiredLinkNetworkTableObject {
        return new WiredLinkNetworkTableObject(this._controller, param1, param1.id == this._controller.selectedNetworkId);
    }

    private updateNetworkRows(param1: string, param2: WiredLinkNetwork[]): void {
        let _loc4_: number = 0;
        let _loc3_: boolean = false;
        _loc4_ = this._SafeStr_2502.length - 1;
        while (_loc4_ >= 0) {
            if (this._SafeStr_2502[_loc4_].identifier == param1) {
                this._SafeStr_2502.splice(_loc4_, 1);
            }
            _loc4_--;
        }
        for (const _loc5_ of param2 ?? []) {
            _loc3_ = false;
            _loc4_ = 0;
            while (_loc4_ < this._SafeStr_2502.length) {
                if (this._SafeStr_2502[_loc4_].identifier == _loc5_.id) {
                    this._SafeStr_2502[_loc4_] = this.tableObject(_loc5_);
                    _loc3_ = true;
                    break;
                }
                _loc4_++;
            }
            if (!_loc3_) {
                this._SafeStr_2502.push(this.tableObject(_loc5_));
            }
        }
        this._SafeStr_2502.sort(WiredLinkNetworkTableObject.compare as (a: ITableObject, b: ITableObject) => number);
        this._SafeStr_14544.setObjects(this._SafeStr_2502);
    }

    public operationSucceeded(param1: number, param2: string, param3: WiredLinkNetwork[]): void {
        this.updateNetworkRows(param2, param3);
        if (this._SafeStr_3503 != null) {
            if (this._SafeStr_3503.networkId == param2) {
                this._SafeStr_3503.hide();
            }
            for (const _loc5_ of param3 ?? []) {
                if (this._SafeStr_3503.networkId == _loc5_.id) {
                    if (param1 == 3) {
                        this._SafeStr_3503.networkRenamed(_loc5_.name);
                    } else {
                        this._SafeStr_3503.updateName(_loc5_.name);
                    }
                }
            }
        }
        if (param1 == 2) {
            for (const _loc4_ of param3 ?? []) {
                if (this.nameInput.text == _loc4_.name) {
                    this.nameInput.text = "";
                }
            }
        }
        if (param1 == 1) {
            this.updateReceiveLocal();
        }
        this.updateConnectionText();
        this.setStatus("");
    }

    public operationFailed(param1: number, param2: number): void {
        if (param2 == 1) {
            this.updateReceiveLocal();
        }
        if (param2 == 3 && this._SafeStr_3503 != null && this._SafeStr_3503.networkId != "0") {
            this._SafeStr_3503.showError(param1);
            return;
        }
        if (param2 == 5 || param2 == 4) {
            this._SafeStr_3503.showError(param1);
            return;
        }
        this.setStatus("${wiredlink.error." + param1 + "}");
    }

    public networkDeleted(param1: string): void {
        this.updateNetworkRows(param1, []);
        if (this._SafeStr_3503 != null && this._SafeStr_3503.networkId == param1) {
            this._SafeStr_3503.hide();
        }
        this.updateConnectionText();
        this.setStatus("${wiredlink.deleted}");
    }

    public showConnectionsLoading(param1: string, param2: string): void {
        if (this._SafeStr_3503 == null) {
            this._SafeStr_3503 = new WiredLinkConnectionsView(this._controller, this._windowManager);
        }
        this._SafeStr_3503.showLoading(param1, param2);
    }

    public showConnections(param1: string, param2: WiredLinkConnection[]): void {
        this.setStatus("");
        if (this._SafeStr_3503 != null && this._SafeStr_3503.networkId == param1) {
            this._SafeStr_3503.showConnections(param2);
        }
    }

    private setStatus(param1: string): void {
        this.statusText.text = param1;
        this.statusText.visible = param1.length > 0;
    }

    private updateConnectionText(): void {
        let _loc1_: WiredLinkNetwork = this._controller.getNetwork(this._controller.selectedNetworkId);
        this.selectedText.text = _loc1_ == null ? "${wiredlink.selected.none}" : this._controller.localizationManager.getLocalizationWithParams("wiredlink.selected", "", "name", _loc1_.name);
    }

    private onReceiveLocalChanged = (param1: WindowEvent): void => {
        if (this.receiveCheckbox.isSelected != this._controller.receiveLocal) {
            this._controller.setReceiveLocal(this.receiveCheckbox.isSelected);
        }
    };

    public showReceiveLocalInfo(): void {
        if (this._SafeStr_14545 == null) {
            this._SafeStr_14545 = this._windowManager.alert("${wiredlink.receive.local.title}", "${wiredlink.receive.local.info}", 0, this.onReceiveLocalInfoClosed);
        }
    }

    private onReceiveLocalInfoClosed = (param1: IAlertDialog, param2: WindowEvent): void => {
        this.closeReceiveLocalDialog();
    };

    private closeReceiveLocalDialog(): void {
        if (this._SafeStr_14545 != null) {
            this._SafeStr_14545.dispose();
        }
        this._SafeStr_14545 = null;
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param2.name == "header_button_close") {
            this.hide();
            return;
        }
        switch (param2.name) {
            case "create_btn":
                this._controller.createNetwork(this.nameInput.text);
                break;
            case "clear_btn":
            case "clear_caption":
                this._controller.save("0", this._controller.receiveLocal);
                break;
            case "receive_label_region":
            case "receive_label":
                if (this.receiveCheckbox.isSelected) {
                    this.receiveCheckbox.unselect();
                } else {
                    this.receiveCheckbox.select();
                }
        }
    };

    public hide(): void {
        this.closeReceiveLocalDialog();
        if (this._SafeStr_3503 != null) {
            this._SafeStr_3503.hide();
        }
        this._window.visible = false;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.closeReceiveLocalDialog();
        this.receiveCheckbox.removeEventListener("WE_SELECTED", this.onReceiveLocalChanged);
        this.receiveCheckbox.removeEventListener("WE_UNSELECTED", this.onReceiveLocalChanged);
        this._SafeStr_14544.dispose();
        if (this._SafeStr_3503 != null) {
            this._SafeStr_3503.dispose();
        }
        this._window.procedure = null;
        this._window.dispose();
        this._SafeStr_14544 = null;
        this._SafeStr_3503 = null;
        this._window = null;
        this._SafeStr_2502 = null;
        this._controller = null;
        this._windowManager = null;
    }

    private get tableContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("table_view"), isIWindowContainer);
    }

    private get selectedText(): ITextWindow {
        return asGuarded(this._window.findChildByName("selected_text"), isITextWindow);
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

    private get receiveCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("receive_local"), isICheckBoxWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
