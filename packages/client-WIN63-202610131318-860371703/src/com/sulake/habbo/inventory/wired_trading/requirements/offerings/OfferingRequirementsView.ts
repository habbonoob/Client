import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';
import type { WiredTradeRequirementsModel } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TradeRequirement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/TradeRequirement';
import { OfferingRuleView } from '@/com/sulake/habbo/inventory/wired_trading/requirements/offerings/OfferingRuleView';

export class OfferingRequirementsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading.requirements.offerings::OfferingRequirementsView'); }

    public static TYPE_GIVE: number = 0;
    public static TYPE_RECEIVE: number = 1;
    public static readonly RULE_VIEW_POOL: OfferingRuleView[] = new Array<OfferingRuleView>(0).fill(null);

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _tradeRequirementsModel: WiredTradeRequirementsModel;

    declare private _window: IWindowContainer;

    declare private _SafeStr_3117: number;
    static { (this.prototype as any)._SafeStr_3117 = 0; }

    declare private _SafeStr_3718: number;
    static { (this.prototype as any)._SafeStr_3718 = 0; }

    declare private _requirementTemplate: IWindowContainer;

    declare private _rules: TradeRequirementRule[];

    declare private _text: string;

    declare private _canMinimalizeWidth: boolean;
    static { (this.prototype as any)._canMinimalizeWidth = false; }

    declare private _SafeStr_2501: IWindow;

    declare private _SafeStr_2767: OfferingRuleView[];

    constructor(param1: IWindowContainer) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._requirementTemplate = asGuarded(this.rulesList.removeListItemAt(0), isIWindowContainer);
    }

    private static claimRuleView(param1: IWindowContainer): OfferingRuleView {
        let _loc2_: OfferingRuleView = null;
        if (OfferingRequirementsView.RULE_VIEW_POOL.length > 0) {
            _loc2_ = OfferingRequirementsView.RULE_VIEW_POOL.pop();
        } else {
            _loc2_ = new OfferingRuleView(param1);
        }
        return _loc2_;
    }

    private static releaseRuleView(param1: OfferingRuleView): void {
        param1.recycle();
        OfferingRequirementsView.RULE_VIEW_POOL.push(param1);
    }

    public initialize(param1: WiredTradeRequirementsModel, param2: number, param3: TradeRequirementRule[], param4: string, param5: number): void {
        let _loc7_: number = 0;
        let _loc8_: TradeRequirementRule = null;
        let _loc6_: OfferingRuleView = null;
        this._tradeRequirementsModel = param1;
        this._SafeStr_3117 = param2;
        this._rules = param3;
        this._text = param4;
        this._SafeStr_3718 = param5;
        this._SafeStr_2767 = [];
        if (param3 != null) {
            _loc7_ = 0;
            while (_loc7_ < param3.length) {
                _loc8_ = param3[_loc7_];
                _loc6_ = OfferingRequirementsView.claimRuleView(this._requirementTemplate);
                _loc6_.initialize(param1, this, _loc8_, _loc7_);
                this._SafeStr_2767.push(_loc6_);
                _loc7_ += 1;
            }
        }
        this.initializeUI();
    }

    public recycle(): void {
        this._tradeRequirementsModel = null;
        this._SafeStr_3117 = 0;
        this._rules = null;
        this._text = null;
        this._SafeStr_3718 = 0;
        for (const _loc1_ of this._SafeStr_2767 ?? []) {
            if (_loc1_.window.parent != null) {
                (asGuarded(_loc1_.window.parent, isIWindowContainer)).removeChild(_loc1_.window);
            }
            OfferingRequirementsView.releaseRuleView(_loc1_);
        }
        this._SafeStr_2767 = null;
        this.rulesList.removeListItems();
    }

    private initializeUI(): void {
        this.rulesList.visible = false;
        this.customText.visible = false;
        this.anyAllText.visible = false;
        this.anyCoinsText.visible = false;
        this.anyFurniText.visible = false;
        this._canMinimalizeWidth = false;
        this._SafeStr_2501 = null;
        if (this._SafeStr_3117 != TradeRequirement._SafeStr_5338 && this._SafeStr_3718 == OfferingRequirementsView.TYPE_GIVE) {
            if (this._SafeStr_3117 == TradeRequirement._SafeStr_7331) {
                this.anyCoinsText.visible = true;
                this._SafeStr_2501 = this.anyCoinsText;
            } else if (this._SafeStr_3117 == TradeRequirement._SafeStr_7350) {
                this.anyFurniText.visible = true;
                this._SafeStr_2501 = this.anyFurniText;
            } else if (this._SafeStr_3117 == TradeRequirement._SafeStr_7329) {
                this.anyAllText.visible = true;
                this._SafeStr_2501 = this.anyAllText;
            }
        } else {
            if (this._rules != null && this._rules.length > 0) {
                this.rulesList.visible = true;
                this._SafeStr_2501 = this.rulesList;
                for (const _loc1_ of this._SafeStr_2767 ?? []) {
                    this.rulesList.addListItem(_loc1_.window);
                }
                this._canMinimalizeWidth = true;
                for (const _loc2_ of this._rules ?? []) {
                    if (_loc2_.nodes.length != 1) {
                        this._canMinimalizeWidth = false;
                        break;
                    }
                }
            }
            if (!this.rulesList.visible && this._text != null && this._text.length > 0) {
                this.customText.visible = true;
                this.customText.text = this._text;
                this._SafeStr_2501 = this.customText;
                if (this.customText.textWidth <= 100) {
                    this._canMinimalizeWidth = true;
                }
            }
        }
        this.title.text = this._SafeStr_3718 == OfferingRequirementsView.TYPE_GIVE ? this.localization.getLocalization("inventory.wired_trading.requirements.offering") : this.localization.getLocalization("inventory.wired_trading.requirements.receiving");
        this.centerActiveElement();
    }

    public get canMinimalizeWidth(): boolean {
        return this._canMinimalizeWidth;
    }

    public get minBorderHeight(): number {
        if (this._SafeStr_2501 == null) {
            return 0;
        }
        return this._SafeStr_2501.height;
    }

    public centerActiveElement(): void {
        if (this._SafeStr_2501 == null) {
            return;
        }
        this._SafeStr_2501.y = this.requirementsBorder.height / 2 - this._SafeStr_2501.height / 2 | 0;
        if (this._SafeStr_3117 == TradeRequirement._SafeStr_5338 && this._SafeStr_2767 != null && this._SafeStr_2767.length == 1) {
            this._SafeStr_2767[0].center(this.requirementsBorder.width - this.rulesList.x * 2);
        }
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get localization(): IHabboLocalizationManager {
        return this._tradeRequirementsModel.tradingModel.localization;
    }

    public get tradeRequirementsModel(): WiredTradeRequirementsModel {
        return this._tradeRequirementsModel;
    }

    public get requirementTemplate(): IWindowContainer {
        return this._requirementTemplate;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.rulesList.removeListItems();
        for (const _loc1_ of this._SafeStr_2767 ?? []) {
            OfferingRequirementsView.releaseRuleView(_loc1_);
        }
        this._SafeStr_2767 = null;
        this._tradeRequirementsModel = null;
        this._window.dispose();
        this._window = null;
        this._SafeStr_3117 = 0;
        this._requirementTemplate.dispose();
        this._requirementTemplate = null;
        this._rules = null;
        this._text = null;
        this._SafeStr_3718 = 0;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get title(): ITextWindow {
        return asGuarded(this._window.findChildByName("offerings_title"), isITextWindow);
    }

    private get requirementsBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("requirements_definition"), isIBorderWindow);
    }

    private get rulesList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("rules_list"), isIItemListWindow);
    }

    private get customText(): ITextWindow {
        return asGuarded(this._window.findChildByName("custom_text"), isITextWindow);
    }

    private get anyFurniText(): ITextWindow {
        return asGuarded(this._window.findChildByName("any_furni_text"), isITextWindow);
    }

    private get anyCoinsText(): ITextWindow {
        return asGuarded(this._window.findChildByName("any_coins_text"), isITextWindow);
    }

    private get anyAllText(): ITextWindow {
        return asGuarded(this._window.findChildByName("any_all_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
