import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { PurseEvent } from '@/com/sulake/habbo/catalog/purse/PurseEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { CurrencyIndicatorBase } from '@/com/sulake/habbo/toolbar/extensions/purse/CurrencyIndicatorBase';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class SeasonalCurrencyIndicator extends CurrencyIndicatorBase {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.purse.indicators::SeasonalCurrencyIndicator'); }

    private static readonly BG_COLOR_LIGHT: number = 4286084205;
    private static readonly BG_COLOR_DARK: number = 4283781966;

    declare private _catalog: IHabboCatalog;

    declare private _balance: number;

    declare private _SafeStr_14707: number;

    declare private _toolbar: HabboToolbar;

    constructor(param1: HabboToolbar, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboCatalog, param5: ICoreLocalizationManager, param6: number, param7: number) {
        super(param2, param3);
        this._toolbar = param1;
        this._catalog = param4;
        this._SafeStr_14707 = param6;
        this.bgColorLight = 4286084205;
        this.bgColorDark = 4283781966;
        this.textElementName = "amount";
        this.amountZeroText = param5.getLocalization("purse.snowflakes.zero.amount.text", "Info");
        this.createWindow("purse_indicator_seasonal_xml", null);
        this.setAmount(0);
        param1.extensionView.attachExtension(this.extensionId, this.window, param7);
        this.registerUpdateEvents(param4.events);
        this.initializeCurrencyLayouts();
    }

    private initializeCurrencyLayouts(): void {
        let _loc3_: number = this.displayedActivityPointType;
        let _loc5_: IIconWindow = castGuarded(this.window.findChildByName("seasonal_icon"), isIIconWindow, "com.sulake.core.window.components.IIconWindow");
        _loc5_.style = ActivityPointTypeEnum.getIconStyleFor(_loc3_, this._toolbar, true) >>> 0;
        _loc5_.fitToSize();
        let _loc2_: ITextWindow = castGuarded(this.window.findChildByName("seasonal_name"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc2_.text = this._catalog.getActivityPointName(_loc3_);
        _loc2_.textColor = this.currencyTextColor;
        let _loc1_: IBorderWindow = castGuarded(this.window.findChildByName("seasonal_bg"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        _loc1_.color = this.currencyBackgroundColor;
        let _loc4_: IBorderWindow = castGuarded(this.window.findChildByName("change_overlay"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        _loc4_.color = this.currencyBackgroundColor;
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (!param1) {
            return;
        }
        param1.addEventListener("catalog_purse_activity_point_balance", this.onBalance);
    }

    protected override onContainerClick(param1: WindowMouseEvent): void {
        this._catalog.openCatalogPage(this.catalogPageName);
    }

    public onBalance(param1: PurseEvent): void {
        if (param1.activityPointType == this.displayedActivityPointType) {
            this.setAmount(param1.balance);
            if (this._balance != -1) {
                this.animateChange(this._balance, param1.balance);
            }
            this._balance = param1.balance;
        }
    }

    protected override setAmount(param1: number, param2: number = -1): void {
        let _loc3_: string = param1.toString();
        if (param1 == 0) {
            _loc3_ = this.amountZeroText;
            this.setTextUnderline(true);
        } else {
            this.setTextUnderline(false);
        }
        this.setText(_loc3_);
    }

    public get displayedActivityPointType(): number {
        return this._SafeStr_14707;
    }

    private get extensionId(): string {
        return "purse_seasonal_currency_" + this._SafeStr_14707;
    }

    private get seasonalCurrencyId(): string {
        return this._toolbar.getProperty("seasonalcurrency.id." + this.displayedActivityPointType);
    }

    private get catalogPageName(): string {
        return this._toolbar.getProperty("seasonalcurrencyindicator.page");
    }

    private get currencyColor(): string {
        return this._toolbar.getProperty("seasonalcurrency." + this.seasonalCurrencyId + ".color");
    }

    private get currencyBackgroundColor(): number {
        return ColorConverter.hexToUint(this._toolbar.getProperty("seasonalcurrency.preset." + this.currencyColor + ".border"));
    }

    private get currencyTextColor(): number {
        return ColorConverter.hexToUint(this._toolbar.getProperty("seasonalcurrency.preset." + this.currencyColor + ".font"));
    }

    protected override initInstanceFields(): void {
        this.onBalance = this.onBalance.bind(this);
        this._balance = -1;
        this._SafeStr_14707 = 0;
        super.initInstanceFields();
    }
}
