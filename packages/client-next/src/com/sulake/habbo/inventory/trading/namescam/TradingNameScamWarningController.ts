import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { TradingNameScamWarningData } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamWarningData';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { TradingNameScamWarningView } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamWarningView';

export class TradingNameScamWarningController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading.namescam::TradingNameScamWarningController'); }

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _localization: IHabboLocalizationManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _view: TradingNameScamWarningView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IHabboWindowManager, param2: IAssetLibrary, param3: IHabboLocalizationManager, param4: IHabboCommunicationManager) {
        this._windowManager = param1;
        this._SafeStr_3052 = param2;
        this._localization = param3;
        this._communication = param4;
    }

    public show(param1: TradingNameScamWarningData): void {
        if (this._disposed || param1 == null) {
            return;
        }
        if (this._view == null || this._view.disposed) {
            this._view = new TradingNameScamWarningView(this, this._windowManager, this._SafeStr_3052, this._localization);
        }
        this._view.show(param1);
    }

    public hide(): void {
        if (this._view != null && !this._view.disposed) {
            this._view.hide();
        }
    }

    public openProfile(param1: number): void {
        if (this._disposed || param1 <= 0 || this._communication == null || this._communication.connection == null) {
            return;
        }
        this._communication.connection.send(new GetExtendedProfileMessageComposer(param1));
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._windowManager = null;
        this._SafeStr_3052 = null;
        this._localization = null;
        this._communication = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
