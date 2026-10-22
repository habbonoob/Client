import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IWiredChestParent } from '@/com/sulake/habbo/roomevents/wired_trading/chests/IWiredChestParent';
import type { IWiredChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/IWiredChestSubController';
import type { WiredChestWrapperView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestWrapperView';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class AbstractChestSubController implements IWiredChestSubController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.subcontrollers::AbstractChestSubController'); }

    constructor(param1: IWiredChestParent) {
        this._parentController = param1;
        this._messageEvents = [];
    }

    declare private _parentController: IWiredChestParent;

    declare private _messageEvents: IMessageEvent[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get parentController(): IWiredChestParent {
        return this._parentController;
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._parentController.roomEvents;
    }

    public get localization(): IHabboLocalizationManager {
        return this._parentController.localization;
    }

    public get canEdit(): boolean {
        return this.wrapperView.canEdit;
    }

    public get canRead(): boolean {
        return this.wrapperView.canRead;
    }

    public get canWithdraw(): boolean {
        return this.wrapperView.canWithdraw;
    }

    public get wrapperView(): WiredChestWrapperView {
        return this._parentController.chestWrapperView;
    }

    public get viewingChestId(): number {
        return this.parentController.chestWrapperView.viewingChestId;
    }

    public get type(): number {
        return -1;
    }

    public get view(): IWindowContainer {
        return null;
    }

    public get title(): string {
        return "";
    }

    public get isEmpty(): boolean {
        return true;
    }

    public get itemCount(): number {
        return 0;
    }

    public get allowResizing(): boolean {
        return true;
    }

    public localize(param1: string): string {
        return this.localization.getLocalization(param1, param1);
    }

    public clear(): void {
    }

    public updateUI(): void {
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.removeMessageEvents();
        this._parentController = null;
        this._disposed = true;
    }

    protected addMessageEvent(param1: IMessageEvent): void {
        this._messageEvents.push(param1);
        this._parentController.addMessageEvent(param1);
    }

    private removeMessageEvents(): void {
        for (const _loc1_ of this._messageEvents ?? []) {
            this._parentController.removeMessageEvent(_loc1_);
            _loc1_.dispose();
        }
        this._messageEvents = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
