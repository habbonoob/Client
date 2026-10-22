import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { OfferingRuleView } from '@/com/sulake/habbo/inventory/wired_trading/requirements/offerings/OfferingRuleView';
import type { WiredTradeRequirementsModel } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsModel';
import type { IProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import { ChestItemTypeRenderableWrapper } from '@/com/sulake/habbo/inventory/wired_trading/requirements/offerings/ChestItemTypeRenderableWrapper';
import { isIProductIconWidget } from '@/com/sulake/habbo/window/widgets/IProductIconWidget';

export class OfferingNodeView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading.requirements.offerings::OfferingNodeView'); }

    constructor(param1: IItemListWindow) {
        this._window = asGuarded(param1.clone(), isIItemListWindow);
    }

    declare private _tradeRequirementsModel: WiredTradeRequirementsModel;

    declare private _SafeStr_4257: OfferingRuleView;

    declare private _ruleNode: TradeRequirementNode;

    declare private _i: number;
    static { (this.prototype as any)._i = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _window: IItemListWindow;

    public get window(): IItemListWindow {
        return this._window;
    }

    private get andText(): ITextWindow {
        return asGuarded(this._window.findChildByName("and_text"), isITextWindow);
    }

    private get amountText(): ITextWindow {
        return asGuarded(this._window.findChildByName("amount_text"), isITextWindow);
    }

    private get ruleIcon(): IWindowContainer {
        return asGuarded(this._window.findChildByName("rule_icon"), isIWindowContainer);
    }

    private get furniIcon(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("furni_icon"), isIWidgetWindow);
    }

    private get coinIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("coin_icon"), isIStaticBitmapWrapperWindow);
    }

    public initialize(param1: WiredTradeRequirementsModel, param2: OfferingRuleView, param3: TradeRequirementNode, param4: number): void {
        this._tradeRequirementsModel = param1;
        this._SafeStr_4257 = param2;
        this._ruleNode = param3;
        this._i = param4;
        this.initializeUI();
    }

    public recycle(): void {
        this._tradeRequirementsModel = null;
        this._SafeStr_4257 = null;
        this._ruleNode = null;
        this._i = 0;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._tradeRequirementsModel = null;
        this._SafeStr_4257 = null;
        this._window.dispose();
        this._window = null;
        this._ruleNode = null;
        this._i = 0;
        this._disposed = true;
    }

    private initializeUI(): void {
        let _loc1_: IProductIconWidget = null;
        this.furniIcon.visible = this._ruleNode.type == TradeRequirementNode.TYPE_FURNI;
        this.coinIcon.visible = this._ruleNode.type == TradeRequirementNode.TYPE_COIN;
        this.andText.visible = this._i > 0;
        this.amountText.visible = this._ruleNode.amount > 1;
        if (this._ruleNode.amount > 1) {
            this.amountText.text = this._ruleNode.amount + "x";
        }
        if (this._ruleNode.type == TradeRequirementNode.TYPE_FURNI) {
            _loc1_ = asGuarded(this.furniIcon.widget, isIProductIconWidget);
            _loc1_.productInfo = new ChestItemTypeRenderableWrapper(this._ruleNode.itemType);
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
