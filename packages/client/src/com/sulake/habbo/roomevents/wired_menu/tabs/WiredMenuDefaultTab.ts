import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { WiredMenuTabView } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuTabView';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';

export class WiredMenuDefaultTab implements WiredMenuTabView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs::WiredMenuDefaultTab'); }

    constructor(param1: WiredMenuController, param2: IWindowContainer) {
        this._controller = param1;
        this._container = param2;
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        let _loc3_: IUpdateReceiver = isIUpdateReceiver(this) ? this : null;
        if (_loc3_ != null) {
            param1.context.registerUpdateReceiver(_loc3_, 1);
        }
    }

    private _disposed: boolean = false;

    declare private _controller: WiredMenuController;

    declare private _messageEvents: IMessageEvent[];

    declare private _isActive: boolean;
    static { (this.prototype as any)._isActive = false; }

    declare private _isViewing: boolean;
    static { (this.prototype as any)._isViewing = false; }

    declare private _isLoading: boolean;
    static { (this.prototype as any)._isLoading = false; }

    declare private _container: IWindowContainer;

    public get container(): IWindowContainer {
        return this._container;
    }

    public get controller(): WiredMenuController {
        return this._controller;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public get isViewing(): boolean {
        return this._isViewing;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    protected get localization(): IHabboLocalizationManager {
        return this._controller.localizationManager;
    }

    public setTabActive(): void {
        this._isActive = true;
    }

    public setTabInactive(): void {
        this._isActive = false;
    }

    public startViewing(): void {
        this._isViewing = true;
    }

    public stopViewing(): void {
        this._isViewing = false;
        if (this._isLoading) {
            this._controller.view.loadingContainer.visible = false;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.removeMessageEvents();
        let _loc1_: IUpdateReceiver = isIUpdateReceiver(this) ? this : null;
        if (_loc1_ != null) {
            this.controller.context.removeUpdateReceiver(_loc1_);
        }
        this._container = null;
        this._controller = null;
        this._isActive = false;
        this._isViewing = false;
        this._isLoading = false;
        this._disposed = true;
    }

    public permissionsUpdated(): void {
    }

    protected updateLoadingState(): void {
        let _loc1_: boolean = this.isDataReady();
        if (this._isLoading && _loc1_) {
            this.initializeInterface();
        }
        this._isLoading = !_loc1_;
        let _loc2_: IWindowContainer = this._controller.view.loadingContainer;
        if (this._isViewing && _loc2_.visible != this._isLoading) {
            _loc2_.visible = this._isLoading;
            this.controller.view.window.caption = this.controller.localizationManager.getLocalization(this._isLoading ? "wiredmenu.title.loading" : "wiredmenu.title");
        }
    }

    protected isDataReady(): boolean {
        return true;
    }

    protected initializeInterface(): void {
    }

    protected loc(param1: string): string {
        return this.localization.getLocalization(param1, "");
    }

    protected addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(param1);
        this._controller.addMessageEvent(param1);
    }

    private removeMessageEvents(): void {
        if (this._messageEvents == null) {
            return;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this._controller.removeMessageEvent(_loc1_);
            _loc1_.dispose();
        }
        this._messageEvents = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
