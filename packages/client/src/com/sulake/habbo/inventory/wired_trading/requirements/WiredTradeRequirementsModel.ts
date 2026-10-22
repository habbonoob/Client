import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import type { WiredTradingModel } from '@/com/sulake/habbo/inventory/wired_trading/WiredTradingModel';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { TradeRequirement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/TradeRequirement';
import { TradeRequirementWrapper } from '@/com/sulake/habbo/inventory/wired_trading/requirements/TradeRequirementWrapper';
import { WiredTradeRequirementsView } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsView';

export class WiredTradeRequirementsModel implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading.requirements::WiredTradeRequirementsModel'); }

    constructor(param1: WiredTradingModel) {
        this._tradingModel = param1;
        this._view = new WiredTradeRequirementsView(this);
    }

    declare private _tradingModel: WiredTradingModel;

    declare private _view: WiredTradeRequirementsView;

    declare private _SafeStr_2858: TradeRequirementWrapper;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get tradingModel(): WiredTradingModel {
        return this._tradingModel;
    }

    public get requirement(): TradeRequirement {
        return this._SafeStr_2858.requirements;
    }

    public get view(): WiredTradeRequirementsView {
        return this._view;
    }

    public setRequirements(param1: TradeRequirement, param2: boolean): void {
        this._SafeStr_2858 = new TradeRequirementWrapper(param1);
        this._view.requirementsUpdated(param1, param2);
    }

    public requirementsStateUpdated(): void {
        this._view.requirementsStateUpdated();
    }

    public highlightRefresh(): void {
        this._view.highlightRefresh();
    }

    public canOfferFurni(param1: GroupItem): boolean {
        if (this._SafeStr_2858 == null) {
            return true;
        }
        if (param1.getTradeableCount(false) == 0) {
            return false;
        }
        if (this._SafeStr_2858.type == TradeRequirement._SafeStr_7329) {
            return true;
        }
        if (this._SafeStr_2858.type == TradeRequirement._SafeStr_7350) {
            return param1.className.indexOf("CF_") != 0;
        }
        if (this._SafeStr_2858.type == TradeRequirement._SafeStr_7331) {
            return param1.className.indexOf("CF_") == 0;
        }
        if (this._SafeStr_2858.type == TradeRequirement._SafeStr_5338) {
            if (param1.className.indexOf("CF_") == 0) {
                return this._SafeStr_2858.canOfferCreditFurni();
            }
            return this._SafeStr_2858.canOfferNormalFurni(param1);
        }
        return true;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._view.dispose();
        this._view = null;
        this._tradingModel = null;
        this._SafeStr_2858 = null;
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
