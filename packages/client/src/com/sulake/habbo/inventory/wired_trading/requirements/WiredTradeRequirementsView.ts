import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TradeRequirement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/TradeRequirement';
import type { WiredTradeRequirementsModel } from '@/com/sulake/habbo/inventory/wired_trading/requirements/WiredTradeRequirementsModel';
import type { WiredTradingModel } from '@/com/sulake/habbo/inventory/wired_trading/WiredTradingModel';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIBubbleWindow } from '@/com/sulake/core/window/components/IBubbleWindow';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TradeRequirementRuleType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRuleType';
import { OfferingRequirementsView } from '@/com/sulake/habbo/inventory/wired_trading/requirements/offerings/OfferingRequirementsView';

export class WiredTradeRequirementsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.inventory.wired_trading.requirements::WiredTradeRequirementsView'); }

    private static MIN_BORDER_HEIGHT: number = 80;
    private static BORDER_TOP_BOTTOM_OFFSET: number = 18;
    private static MINIMALIZED_BORDER_WIDTH: number = 122;
    private static NORMAL_BORDER_WIDTH: number = 180;
    private static _SafeStr_5091: OfferingRequirementsView[] = new Array<OfferingRequirementsView>(0).fill(null);

    private static claimRequirementView(param1: IWindowContainer): OfferingRequirementsView {
        let _loc2_: OfferingRequirementsView = null;
        if (WiredTradeRequirementsView._SafeStr_5091.length > 0) {
            _loc2_ = WiredTradeRequirementsView._SafeStr_5091.pop();
        } else {
            _loc2_ = new OfferingRequirementsView(param1);
        }
        return _loc2_;
    }

    private static releaseRequirementView(param1: OfferingRequirementsView): void {
        param1.recycle();
        WiredTradeRequirementsView._SafeStr_5091.push(param1);
    }

    private static easeInOutCubic(param1: number, param2: number, param3: number, param4: number): number {
        let _loc5_: number = param1 / param4;
        let _loc6_: number = -(_loc5_ * 1.75 - 0.7) * (_loc5_ * 1.75 - 0.7) + 1;
        return param2 + param3 * _loc6_;
    }

    constructor(param1: WiredTradeRequirementsModel) {
        this._SafeStr_2134 = param1;
        this.claimRequirementsBubble();
        this.requirementsButton.addEventListener("WME_CLICK", this.onRequirementsClicked);
        this._offeringsTemplate = asGuarded(this.youGiveContainer.getChildByName("offering_requirements_template"), isIWindowContainer);
        this.initializeStretchingWithParent(this._offeringsTemplate, false);
        this._offeringBorderMargins = this._offeringsTemplate.height - this._offeringsTemplate.findChildByName("requirements_definition").height;
        (asGuarded(this._offeringsTemplate.parent, isIWindowContainer)).removeChild(this._offeringsTemplate);
    }

    declare private _SafeStr_2134: WiredTradeRequirementsModel;

    declare private _bubble: IBubbleWindow;

    declare private _offeringsTemplate: IWindowContainer;

    declare private _requirement: TradeRequirement;

    declare private _SafeStr_2722: OfferingRequirementsView;

    declare private _SafeStr_2481: OfferingRequirementsView;

    declare private _offeringBorderMargins: number;
    static { (this.prototype as any)._offeringBorderMargins = 0; }

    declare private _transitionTimer: Timer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get tradingModel(): WiredTradingModel {
        return this._SafeStr_2134.tradingModel;
    }

    public get bubbleTitle(): ITextWindow {
        return asGuarded(this._bubble.findChildByName("bubble_title"), isITextWindow);
    }

    public get highlightBorder(): IBorderWindow {
        return asGuarded(this._bubble.findChildByName("highlight_border"), isIBorderWindow);
    }

    public get youGiveContainer(): IWindowContainer {
        return asGuarded(this._bubble.findChildByName("you_give_container"), isIWindowContainer);
    }

    public get offeringContainersSeparator(): IWidgetWindow {
        return asGuarded(this._bubble.findChildByName("offering_containers_separator"), isIWidgetWindow);
    }

    public get youGetContainer(): IWindowContainer {
        return asGuarded(this._bubble.findChildByName("you_get_container"), isIWindowContainer);
    }

    public get requirementsMetContainer(): IWindowContainer {
        return asGuarded(this._bubble.findChildByName("requirements_met_container"), isIWindowContainer);
    }

    public get requirementsMetHtml(): IHTMLTextWindow {
        return asGuarded(this._bubble.findChildByName("req_met_text"), isIHTMLTextWindow);
    }

    public get requirementsMetIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._bubble.findChildByName("req_met_icon"), isIStaticBitmapWrapperWindow);
    }

    public get additionalTextHtml(): IHTMLTextWindow {
        return asGuarded(this._bubble.findChildByName("additional_text"), isIHTMLTextWindow);
    }

    public get disclaimerTextHtml(): IHTMLTextWindow {
        return asGuarded(this._bubble.findChildByName("disclaimer_text"), isIHTMLTextWindow);
    }

    private get requirementsButton(): IRegionWindow {
        return this._SafeStr_2134.tradingModel.tradingView.requirementsButton;
    }

    private get localization(): IHabboLocalizationManager {
        return this.tradingModel.localization;
    }

    public requirementsUpdated(param1: TradeRequirement, param2: boolean): void {
        let _loc5_: any = undefined;
        this.clear();
        this._requirement = param1;
        let _loc4_: boolean = param1.isPaymentOnly();
        let _loc3_: string = this._SafeStr_2134.tradingModel.tradeTypeLocalization;
        this.bubbleTitle.text = this.localization.getLocalizationWithParams("inventory.wired_trading.requirements.title", "", "type", _loc3_);
        let _loc6_: boolean = !_loc4_ || this._requirement.youGetText != null && this._requirement.youGetText.length > 0;
        this.offeringContainersSeparator.visible = _loc6_;
        this.youGetContainer.visible = _loc6_;
        this._SafeStr_2722 = WiredTradeRequirementsView.claimRequirementView(this._offeringsTemplate);
        this._SafeStr_2722.initialize(this._SafeStr_2134, param1.type, this._requirement.rules.youGiveRule, null, OfferingRequirementsView.TYPE_GIVE);
        this.youGiveContainer.addChild(this._SafeStr_2722.window);
        this.initializeStretchingWithParent(this._SafeStr_2722.window);
        if (_loc6_) {
            _loc5_ = [];
            if (this._requirement.rules != null && this._requirement.rules.youGetRule != null) {
                _loc5_.push(this._requirement.rules.youGetRule);
            }
            this._SafeStr_2481 = WiredTradeRequirementsView.claimRequirementView(this._offeringsTemplate);
            this._SafeStr_2481.initialize(this._SafeStr_2134, param1.type, _loc5_, this._requirement.youGetText, OfferingRequirementsView.TYPE_RECEIVE);
            this.youGetContainer.addChild(this._SafeStr_2481.window);
            this.initializeStretchingWithParent(this._SafeStr_2481.window);
        }
        this.requirementsStateUpdated();
        this.disclaimerTextHtml.visible = _loc4_ && _loc6_;
        if (this.disclaimerTextHtml.visible) {
            this.disclaimerTextHtml.text = this.localization.getLocalizationWithParams("inventory.wired_trading.requirements.receive_text_disclaimer", "", "you_get_name", this.localization.getLocalization("inventory.wired_trading.requirements.receiving"));
            this.resizeHtml(this.disclaimerTextHtml);
        }
        this._bubble.visible = param2;
    }

    public requirementsStateUpdated(): void {
        let _loc3_: string = null;
        if (this._requirement == null) {
            return;
        }
        let _loc2_: boolean = this.tradingModel.canAccept;
        let _loc1_: number = this.tradingModel.extra;
        if (this._requirement.rules != null && this._requirement.rules.type == TradeRequirementRuleType._SafeStr_7343) {
            this.requirementsMetHtml.text = this.localization.getLocalizationWithParams("inventory.wired_trading.requirements.indicator.multi", "", "times", this._requirement.rules.multiplier, "amount", _loc1_);
        } else if (_loc2_) {
            if (this._requirement.rules != null && this._requirement.rules.type == TradeRequirementRuleType._SafeStr_5683 && _loc1_ > 1) {
                this.requirementsMetHtml.text = this.localization.getLocalizationWithParams("inventory.wired_trading.requirements.indicator.met_numbered", "", "amount", _loc1_);
            } else {
                this.requirementsMetHtml.text = this.localization.getLocalization("inventory.wired_trading.requirements.indicator.met");
            }
        } else {
            this.requirementsMetHtml.text = this.localization.getLocalization("inventory.wired_trading.requirements.indicator.not_met");
        }
        this.resizeHtml(this.requirementsMetHtml);
        this.requirementsMetIcon.assetUri = _loc2_ ? "common_check_mark" : "common_cross_mark";
        this.additionalTextHtml.visible = false;
        if (this._requirement.rules != null && this._requirement.rules.type == TradeRequirementRuleType._SafeStr_5683) {
            this.additionalTextHtml.visible = true;
            _loc3_ = this._requirement.isPaymentOnly() ? "inventory.wired_trading.requirements.auto_mode_hint_payment" : "inventory.wired_trading.requirements.auto_mode_hint_trade";
            this.additionalTextHtml.text = this.localization.getLocalizationWithParams(_loc3_, "", "amount", this._requirement.rules.autoMultiplierMax);
            this.resizeHtml(this.additionalTextHtml);
        }
        this.resizeRequirementContainers();
        this.recenter();
    }

    public highlightRefresh(): void {
        this.highlight();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.clear();
        if (this._transitionTimer != null) {
            this._transitionTimer.reset();
            this._transitionTimer = null;
        }
        this.youGiveContainer.addChild(this._offeringsTemplate);
        this._offeringsTemplate = null;
        this._bubble = null;
        this._SafeStr_2134 = null;
        this._requirement = null;
        this._offeringBorderMargins = 0;
        this._disposed = true;
    }

    private claimRequirementsBubble(): void {
        let _loc1_: IWindowContainer = this.tradingModel.getWindowContainer();
        this._bubble = asGuarded(_loc1_.findChildByName("trade_requirements_bubble"), isIBubbleWindow);
        this._bubble.visible = false;
        this.recenter();
    }

    private onRequirementsClicked = (param1: WindowMouseEvent): void => {
        this.toggleVisibility();
    };

    private toggleVisibility(): void {
        this._bubble.visible = !this._bubble.visible;
    }

    private recenter(): void {
        let _loc1_: IRegionWindow = this.requirementsButton;
        this._bubble.x = _loc1_.x + _loc1_.width + 4;
        this._bubble.y = _loc1_.y + _loc1_.height / 2 - this._bubble.height / 2 | 0;
    }

    private clear(): void {
        if (this._SafeStr_2722 != null) {
            this.youGiveContainer.removeChild(this._SafeStr_2722.window);
            WiredTradeRequirementsView.releaseRequirementView(this._SafeStr_2722);
            this._SafeStr_2722 = null;
        }
        if (this._SafeStr_2481 != null) {
            this.youGetContainer.removeChild(this._SafeStr_2481.window);
            WiredTradeRequirementsView.releaseRequirementView(this._SafeStr_2481);
            this._SafeStr_2481 = null;
        }
        this._requirement = null;
    }

    private resizeRequirementContainers(): void {
        let _loc1_: number = WiredTradeRequirementsView.NORMAL_BORDER_WIDTH;
        if (this.youGiveContainer.visible && Boolean(this.youGetContainer.visible) && this._SafeStr_2722 != null && this._SafeStr_2481 != null && this._SafeStr_2722.canMinimalizeWidth && this._SafeStr_2481.canMinimalizeWidth) {
            _loc1_ = WiredTradeRequirementsView.MINIMALIZED_BORDER_WIDTH;
        }
        this.youGiveContainer.width = _loc1_;
        this.youGetContainer.width = _loc1_;
        let _loc2_: number = this._SafeStr_2722.minBorderHeight;
        if (this._SafeStr_2481 != null && this._SafeStr_2481.minBorderHeight > _loc2_) {
            _loc2_ = this._SafeStr_2481.minBorderHeight;
        }
        _loc2_ += 2 * WiredTradeRequirementsView.BORDER_TOP_BOTTOM_OFFSET;
        if (_loc2_ < WiredTradeRequirementsView.MIN_BORDER_HEIGHT) {
            _loc2_ = WiredTradeRequirementsView.MIN_BORDER_HEIGHT;
        }
        this.offeringContainersSeparator.height = _loc2_;
        _loc2_ += this._offeringBorderMargins;
        this.youGiveContainer.height = _loc2_;
        this.youGetContainer.height = _loc2_;
        this._SafeStr_2722.centerActiveElement();
        if (this._SafeStr_2481 != null) {
            this._SafeStr_2481.centerActiveElement();
        }
    }

    private resizeHtml(param1: IHTMLTextWindow): void {
        param1.height = param1.numLines * 15 + 2;
    }

    private initializeStretchingWithParent(param1: IWindowContainer, param2: boolean = true): void {
        if (param2) {
            param1.width = param1.parent.width;
            param1.height = param1.parent.height;
        }
        param1.setParamFlag(128, param2);
        param1.setParamFlag(2048, param2);
    }

    private highlight(): void {
        let border: IBorderWindow;
        let transitionDuration: number = NaN;
        let delay: number = 0;
        let steps: number = 0;
        let minValue: number = NaN;
        let maxValue: number = NaN;
        let updateValue: any = (param1: TimerEvent): void => {
                let _loc2_: number = WiredTradeRequirementsView.easeInOutCubic(this._transitionTimer.currentCount, minValue, maxValue - minValue, steps);
                border.blend = _loc2_;
            };
        let onTimerComplete: any = (param1: TimerEvent): void => {
                border.visible = false;
            };
        if (this._transitionTimer != null && this._transitionTimer.running) {
            this._transitionTimer.stop();
        }
        border = this.highlightBorder;
        transitionDuration = 500;
        delay = 16;
        steps = transitionDuration / delay | 0;
        minValue = 0;
        maxValue = 0.35;
        border.visible = true;
        border.blend = 0;
        if (this._transitionTimer != null) {
            this._transitionTimer.reset();
        } else {
            this._transitionTimer = new Timer(delay, steps);
            this._transitionTimer.addEventListener("timer", updateValue);
            this._transitionTimer.addEventListener("timerComplete", onTimerComplete);
        }
        this._transitionTimer.start();
    }

    get [IDisposable](): true {
        return true;
    }
}
