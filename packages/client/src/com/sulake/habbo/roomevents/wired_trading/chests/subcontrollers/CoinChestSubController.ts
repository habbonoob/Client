import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CoinsChestContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/CoinsChestContentsMessageParser';
import type { IWiredChestParent } from '@/com/sulake/habbo/roomevents/wired_trading/chests/IWiredChestParent';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CoinsChestContentsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/chests/CoinsChestContentsMessageEvent';
import { WithdrawCoinsFromChestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/WithdrawCoinsFromChestMessageComposer';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ChestType } from '@/com/sulake/habbo/roomevents/wired_trading/chests/ChestType';
import { AbstractChestSubController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/subcontrollers/AbstractChestSubController';

export class CoinChestSubController extends AbstractChestSubController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.subcontrollers::CoinChestSubController'); }

    static #staticsReady = false;

    public static readonly DARK_THEME_CHEST_NAMES: any[] = ["wf_storage_coins1"];

    private static get CHEST_STATES(): UtilsMap {
        CoinChestSubController.#initStatics();
        return CoinChestSubController.CHEST_STATES;
    }

    private static initChestStates(): UtilsMap {
        let _loc1_: UtilsMap = new UtilsMap();
        _loc1_.add(0, "zero");
        _loc1_.add(1, "low");
        _loc1_.add(20, "medium");
        _loc1_.add(100, "high");
        return _loc1_;
    }

    constructor(param1: IWiredChestParent) {
        super(param1);
        this._view = asGuarded(this.roomEvents.getXmlWindow("coins_chest_contents"), isIWindowContainer);
        this.addMessageEvent(new CoinsChestContentsMessageEvent(this.onCoinsMessage));
        this.withdrawInput.restrict = "0-9";
        this.withdrawButton.addEventListener("WME_CLICK", this.onWithdrawClick);
    }

    declare private _view: IWindowContainer;

    declare private _SafeStr_3713: number;
    static { (this.prototype as any)._SafeStr_3713 = 0; }

    declare private _chestState: string;

    declare private _SafeStr_5677: string;

    declare private _classNameCache: string;

    public override get type(): number {
        return ChestType.TYPE_COIN;
    }

    public override get title(): string {
        return this.localize("wiredchests.coin_chest");
    }

    public override get view(): IWindowContainer {
        return this._view;
    }

    public override get isEmpty(): boolean {
        return this._SafeStr_3713 <= 0;
    }

    public override get itemCount(): number {
        return this._SafeStr_3713;
    }

    public override get allowResizing(): boolean {
        return false;
    }

    public get className(): string {
        if (this._classNameCache != null) {
            return this._classNameCache;
        }
        if (this.wrapperView.viewingChestFurni == null) {
            this._classNameCache = "";
            return this._classNameCache;
        }
        let _loc2_: number = this.wrapperView.viewingChestFurni.getModel().getNumber("furniture_type_id") | 0;
        let _loc1_: IFurnitureData = this.parentController.sessionDataManager.getFloorItemData(_loc2_);
        if (_loc1_ == null) {
            this._classNameCache = "";
            return this._classNameCache;
        }
        this._classNameCache = _loc1_.className;
        return this._classNameCache;
    }

    private get balanceText(): ITextWindow {
        return asGuarded(this._view.findChildByName("balance_txt"), isITextWindow);
    }

    private get coinAmountText(): ITextWindow {
        return asGuarded(this._view.findChildByName("coins_amount_txt"), isITextWindow);
    }

    private get balanceContainerList(): IItemListWindow {
        return asGuarded(this._view.findChildByName("balance_container"), isIItemListWindow);
    }

    private get backgroundImage(): IStaticBitmapWrapperWindow {
        return asGuarded(this._view.findChildByName("bg_img"), isIStaticBitmapWrapperWindow);
    }

    private get withdrawInput(): ITextFieldWindow {
        return asGuarded(this._view.findChildByName("withdraw_input"), isITextFieldWindow);
    }

    private get withdrawButton(): IButtonWindow {
        return asGuarded(this._view.findChildByName("withdraw_btn"), isIButtonWindow);
    }

    public override clear(): void {
        this._SafeStr_3713 = 0;
        super.clear();
    }

    public override updateUI(): void {
        Util.disableSection(this.withdrawButton, !this.canWithdraw || this.isEmpty);
        this._SafeStr_5677 = CoinChestSubController.DARK_THEME_CHEST_NAMES.indexOf(this.className) != -1 ? "dark" : "light";
        this.backgroundImage.assetUri = "wired_chests_images_" + this._SafeStr_5677 + "_coins_chest_balance_" + this._chestState;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._view.dispose();
        this._view = null;
        super.dispose();
    }

    private onWithdrawClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = parseInt(this.withdrawInput.text);
        if (isNaN(_loc2_)) {
            return;
        }
        this.parentController.send(new WithdrawCoinsFromChestMessageComposer(this.viewingChestId, _loc2_ | 0));
    };

    private onCoinsMessage = (param1: CoinsChestContentsMessageEvent): void => {
        let _loc2_: CoinsChestContentsMessageParser = param1.getParser();
        let _loc3_: number = _loc2_.chestId;
        if (_loc2_.isUpdate) {
            if (this.parentController.activeChestId != _loc3_) {
                return;
            }
            this._SafeStr_3713 = _loc2_.coins;
        } else {
            if (this.parentController.requestedChestId != _loc3_) {
                return;
            }
            this._SafeStr_3713 = _loc2_.coins;
            this._chestState = stringOrNull(CoinChestSubController.CHEST_STATES.getValue(0));
            this._classNameCache = null;
            this.parentController.setOpenStatus(_loc3_, this);
        }
        this.coinAmountText.text = String(_loc2_.coins);
        this.balanceContainerList.x = this.balanceContainerList.parent.width / 2 - this.balanceContainerList.width / 2 | 0;
        this._chestState = stringOrNull(CoinChestSubController.CHEST_STATES.getValue(0));
        for (const _loc4_ of CoinChestSubController.CHEST_STATES.getKeys() ?? []) {
            if (_loc2_.coins >= _loc4_) {
                this._chestState = stringOrNull(CoinChestSubController.CHEST_STATES.getValue(_loc4_));
            }
        }
        this.backgroundImage.assetUri = "wired_chests_images_" + this._SafeStr_5677 + "_coins_chest_balance_" + this._chestState;
        this.wrapperView.updateUI();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CoinChestSubController.#staticsReady) return;
        CoinChestSubController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CoinChestSubController, name, { value, writable: true, configurable: true, enumerable: true });
        set("CHEST_STATES", null);
        set("CHEST_STATES", CoinChestSubController.initChestStates());
    }
}
