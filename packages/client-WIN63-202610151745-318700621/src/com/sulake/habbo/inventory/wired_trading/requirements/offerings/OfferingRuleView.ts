import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import type { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';
import type { OfferingRequirementsView } from '@/com/sulake/habbo/inventory/wired_trading/requirements/offerings/OfferingRequirementsView';
import type { WiredTradeRequirementsModel } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsModel';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { OfferingNodeView } from '@/com/sulake/habbo/inventory/wired_trading/requirements/offerings/OfferingNodeView';

export class OfferingRuleView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading.requirements.offerings::OfferingRuleView'); }

    public static MAX_COLS: number = 2;
    public static readonly NODE_VIEW_POOL: OfferingNodeView[] = new Array<OfferingNodeView>(0).fill(null);

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _tradeRequirementsModel: WiredTradeRequirementsModel;

    declare private _SafeStr_4257: OfferingRequirementsView;

    declare private _SafeStr_4334: TradeRequirementRule;

    declare private _i: number;
    static { (this.prototype as any)._i = 0; }

    declare private _window: IWindowContainer;

    declare private _SafeStr_4207: IItemListWindow;

    declare private _nodeTemplate: IItemListWindow;

    private _SafeStr_7005: number = 0;

    declare private _nodes: OfferingNodeView[];

    constructor(param1: IWindowContainer) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._SafeStr_4207 = asGuarded(this.rows.removeListItemAt(0), isIItemListWindow);
        this._nodeTemplate = asGuarded(this._SafeStr_4207.removeListItemAt(0), isIItemListWindow);
        this._SafeStr_7005 = this.rows.x;
    }

    private static claimNodeView(param1: IItemListWindow): OfferingNodeView {
        let _loc2_: OfferingNodeView = null;
        if (OfferingRuleView.NODE_VIEW_POOL.length > 0) {
            _loc2_ = OfferingRuleView.NODE_VIEW_POOL.pop();
        } else {
            _loc2_ = new OfferingNodeView(param1);
        }
        return _loc2_;
    }

    private static releaseNodeView(param1: OfferingNodeView): void {
        param1.recycle();
        OfferingRuleView.NODE_VIEW_POOL.push(param1);
    }

    public initialize(param1: WiredTradeRequirementsModel, param2: OfferingRequirementsView, param3: TradeRequirementRule, param4: number): void {
        let _loc5_: TradeRequirementNode = null;
        let _loc6_: OfferingNodeView = null;
        this._tradeRequirementsModel = param1;
        this._SafeStr_4257 = param2;
        this._SafeStr_4334 = param3;
        this._i = param4;
        this._window.width = param2.window.width;
        this._nodes = [];
        if (param3 != null && param3.nodes != null) {
            param4 = 0;
            while (param4 < param3.nodes.length) {
                _loc5_ = param3.nodes[param4];
                _loc6_ = OfferingRuleView.claimNodeView(this._nodeTemplate);
                _loc6_.initialize(param1, this, _loc5_, param4);
                this._nodes.push(_loc6_);
                param4 += 1;
            }
        }
        this.initializeUI();
    }

    public recycle(): void {
        let _loc2_: IItemListWindow = null;
        this._tradeRequirementsModel = null;
        this._SafeStr_4257 = null;
        this._SafeStr_4334 = null;
        this._i = 0;
        for (const _loc1_ of this._nodes ?? []) {
            if (_loc1_.window.parent != null) {
                _loc1_.window.parent = null;
            }
            OfferingRuleView.releaseNodeView(_loc1_);
        }
        this._nodes = null;
        while (this.rows.numListItems > 0) {
            _loc2_ = asGuarded(this.rows.removeListItemAt(0), isIItemListWindow);
            _loc2_.removeListItems();
            _loc2_.dispose();
        }
    }

    private initializeUI(): void {
        this.rows.x = this._SafeStr_7005;
        let _loc2_: IItemListWindow = null;
        for (const _loc1_ of this._nodes ?? []) {
            if (_loc2_ == null || _loc2_.numListItems >= OfferingRuleView.MAX_COLS) {
                _loc2_ = asGuarded(this._SafeStr_4207.clone(), isIItemListWindow);
                this.rows.addListItem(_loc2_);
            }
            _loc2_.addListItem(_loc1_.window);
        }
        this.orText.visible = this._i > 0;
        this._window.height = this.rows.height;
    }

    public center(param1: number): void {
        this.rows.x = param1 / 2 - this.colsWidth / 2 | 0;
    }

    private get colsWidth(): number {
        let _loc2_: number = 0;
        let _loc3_: IWindow = null;
        let _loc1_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this.rows.numListItems) {
            _loc3_ = this.rows.getListItemAt(_loc2_ >>> 0);
            if (_loc3_.width > _loc1_) {
                _loc1_ = _loc3_.width;
            }
            _loc2_ += 1;
        }
        return _loc1_;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.rows.removeListItems();
        for (const _loc1_ of this._nodes ?? []) {
            OfferingRuleView.releaseNodeView(_loc1_);
        }
        this._nodes = null;
        this._SafeStr_4207.dispose();
        this._nodeTemplate.dispose();
        this._SafeStr_4207 = null;
        this._nodeTemplate = null;
        this._window.dispose();
        this._window = null;
        this._SafeStr_4334 = null;
        this._i = 0;
        this._SafeStr_4257 = null;
        this._tradeRequirementsModel = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get orText(): ITextWindow {
        return asGuarded(this._window.findChildByName("or_text"), isITextWindow);
    }

    private get rows(): IItemListWindow {
        return asGuarded(this._window.findChildByName("rule_nodes_rows"), isIItemListWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
